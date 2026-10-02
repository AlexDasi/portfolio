/**
 * Swiper rebuild (stable version)
 * - Vertical MainSwiper: keeps existing navigation behavior
 * - Horizontal WorksSwiper: no loop, no jump glitches, newest projects first
 */

(function () {
  'use strict';

  const MOBILE_BREAKPOINT = 1280;
  const MIN_VISIBLE_PROJECT_YEAR = 2021;
  const HIDDEN_PROJECTS = ['terralava'];
  const MOBILE_WORKS_OBSERVER_MARGIN = '220px 0px';

  function isMobile() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  function isElementNearViewport(element, offset) {
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    const buffer = typeof offset === 'number' ? offset : 0;

    return rect.bottom >= -buffer && rect.top <= window.innerHeight + buffer;
  }

  function isProjectHidden(slide) {
    const worksDiv = slide.querySelector('.works');
    const classList = worksDiv ? Array.from(worksDiv.classList) : [];
    const projectHref = slide.getAttribute('href') || '';

    return HIDDEN_PROJECTS.some(
      (projectSlug) =>
        classList.some((className) => className.includes(projectSlug)) ||
        projectHref.includes(`/projects/${projectSlug}.php`) ||
        projectHref.includes(`projects/${projectSlug}.php`)
    );
  }

  function initMainSwiper() {
    const mainRoot = document.querySelector('.MainSwiper');
    if (window.innerWidth <= 1280) return null;
    if (!mainRoot || typeof Swiper === 'undefined') return null;

    const mainMenu = ['HOME', 'WORKS', 'ABOUT', 'PROCESS', 'CONTACT'];

    const mainPaginationEl = mainRoot.querySelector(':scope > .swiper-pagination');

    const mainSwiper = new Swiper('.MainSwiper', {
      direction: 'vertical',
      speed: 1000,
      allowTouchMove: false,
      spaceBetween: 0,
      slidesPerView: 'auto',
      centeredSlides: true,
      mousewheel: {
        enabled: true,
        forceToAxis: true,
        releaseOnEdges: false,
        thresholdDelta: 5,
        thresholdTime: 300
      },
      pagination: {
        el: mainPaginationEl,
        clickable: true,
        renderBullet(index, className) {
          return `<span class="${className}">${mainMenu[index]}</span>`;
        }
      },
      navigation: {
        nextEl: '.slideNext-btn',
        prevEl: '.slidePrev-btn'
      },
      on: {
        slideChange() {
          const arrow = document.querySelector('.arrow');
          if (!arrow) return;
          // Flecha hacia arriba en la última diapositiva (antes índice fijo 3)
          if (this.activeIndex === this.slides.length - 1) {
            arrow.classList.add('up');
          } else {
            arrow.classList.remove('up');
          }
        }
      }
    });

    const arrowLink = document.querySelector('.arrow-container a');
    if (arrowLink) {
      arrowLink.addEventListener(
        'click',
        function (event) {
          const arrow = document.querySelector('.arrow');
          if (arrow && arrow.classList.contains('up')) {
            event.preventDefault();
            event.stopImmediatePropagation();
            mainSwiper.slideTo(0);
            arrow.classList.remove('up');
          }
        },
        true
      );
    }

    return mainSwiper;
  }

  function parseSlideYear(slide) {
    const yearNode = slide.querySelector('.works--details .yellow-600');
    if (!yearNode) return Number.NEGATIVE_INFINITY;
    // Año más reciente del rango («2025 – 2026» → 2026), para que los proyectos en curso salgan primero
    const years = yearNode.textContent.match(/\d{4}/g);
    return years ? Math.max(...years.map((y) => parseInt(y, 10))) : Number.NEGATIVE_INFINITY;
  }

  function getDirectSlideElements(wrapper) {
    if (!wrapper) return [];

    return Array.from(wrapper.children).filter(
      (child) => child.classList && child.classList.contains('swiper-slide')
    );
  }

  function sortWorksSlidesByNewestFirst(wrapper) {
    const slides = getDirectSlideElements(wrapper);
    if (!slides.length) return;

    const contentSlides = slides.filter((slide) => slide.querySelector('.works'));
    const visibleSlides = contentSlides.filter(
      (slide) => parseSlideYear(slide) >= MIN_VISIBLE_PROJECT_YEAR && !isProjectHidden(slide)
    );

    visibleSlides.sort((a, b) => {
      const yearDiff = parseSlideYear(b) - parseSlideYear(a);
      if (yearDiff !== 0) return yearDiff;
      return 0;
    });

    slides.forEach((slide) => slide.remove());
    visibleSlides.forEach((slide) => wrapper.appendChild(slide));
  }

  function hasWorkingSlides(swiperInstance) {
    return !!(
      swiperInstance &&
      !swiperInstance.destroyed &&
      swiperInstance.slides &&
      swiperInstance.slides.length > 0 &&
      Number.isFinite(swiperInstance.translate)
    );
  }

  function refreshWorksSwiperMobile(swiperInstance) {
    if (!swiperInstance || swiperInstance.destroyed) return false;

    swiperInstance.update();

    if (!swiperInstance.slides || !swiperInstance.slides.length) {
      return false;
    }

    if (swiperInstance.params.loop && typeof swiperInstance.loopFix === 'function') {
      swiperInstance.loopFix();
    }

    swiperInstance.slideToClosest(0);
    return hasWorkingSlides(swiperInstance);
  }

  function scheduleMobileSwiperRecovery(worksRoot) {
    if (!worksRoot) return;

    const retryDelays = [120, 360, 900];

    const attemptRecovery = () => {
      const wrapper = worksRoot.querySelector('.swiper-wrapper');
      const domSlides = getDirectSlideElements(wrapper);

      if (!domSlides.length) return;
      if (hasWorkingSlides(window.worksSwiperMobile)) return;

      destroySwiper(window.worksSwiperMobile);
      window.worksSwiperMobile = initWorksSwiperMobile();
      window.worksSwiper = window.worksSwiperMobile;

      if (window.worksSwiperMobile) {
        refreshWorksSwiperMobile(window.worksSwiperMobile);
      }
    };

    retryDelays.forEach((delay) => {
      window.setTimeout(attemptRecovery, delay);
    });

    window.addEventListener(
      'load',
      () => {
        window.setTimeout(attemptRecovery, 60);
      },
      { once: true }
    );
  }

  function ensureMobileWorksObserver(worksRoot) {
    if (!worksRoot || !isMobile()) return;
    if (window.__worksMobileObserverAttached) return;

    const rebuildIfNeeded = () => {
      if (!isElementNearViewport(worksRoot, 220)) return;
      if (hasWorkingSlides(window.worksSwiperMobile)) return;

      destroySwiper(window.worksSwiperMobile);
      window.worksSwiperMobile = initWorksSwiperMobile();
      window.worksSwiper = window.worksSwiperMobile;
    };

    if (typeof window.IntersectionObserver === 'function') {
      window.__worksMobileObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            rebuildIfNeeded();
          });
        },
        {
          root: null,
          rootMargin: MOBILE_WORKS_OBSERVER_MARGIN,
          threshold: 0.01
        }
      );

      window.__worksMobileObserver.observe(worksRoot);
    } else {
      window.addEventListener('scroll', rebuildIfNeeded, { passive: true });
    }

    window.__worksMobileObserverAttached = true;
  }

  // ---------------------------------------------------------------------------
  // Navegación propia del pasafotos (contador, nombre, barra de progreso, flechas)
  // ---------------------------------------------------------------------------
  function bindWorksNav(worksRoot, swiper) {
    const nav = worksRoot.querySelector('.works-nav');
    if (!nav || !swiper) return;

    const originals = Array.from(
      worksRoot.querySelectorAll('.swiper-wrapper > .swiper-slide:not(.swiper-slide-duplicate)')
    );
    const total = originals.length;
    if (!total) return;

    const names = originals.map((slide) => {
      const title = slide.querySelector('.works--info h2');
      return title ? title.textContent.trim() : '';
    });
    const pad = (n) => String(n).padStart(2, '0');

    const countEl = nav.querySelector('.works-nav__count');
    const totalEl = nav.querySelector('.works-nav__total');
    const nameEl = nav.querySelector('.works-nav__name');
    const progress = nav.querySelector('.works-nav__progress');

    if (totalEl) totalEl.textContent = '/ ' + pad(total);

    if (progress) {
      progress.innerHTML = '';
      names.forEach((name, index) => {
        const seg = document.createElement('button');
        seg.type = 'button';
        seg.className = 'works-nav__seg';
        seg.setAttribute('role', 'tab');
        seg.setAttribute('aria-label', name || 'Project ' + (index + 1));
        seg.addEventListener('click', () => swiper.slideToLoop(index));
        progress.appendChild(seg);
      });
    }

    const update = () => {
      const i = ((swiper.realIndex % total) + total) % total;
      if (countEl) countEl.textContent = pad(i + 1);
      if (nameEl) nameEl.textContent = names[i] || '';
      if (progress) {
        Array.from(progress.children).forEach((seg, k) => {
          seg.classList.toggle('is-active', k === i);
          seg.setAttribute('aria-selected', k === i ? 'true' : 'false');
        });
      }
    };

    const prev = nav.querySelector('.works-nav__btn--prev');
    const next = nav.querySelector('.works-nav__btn--next');
    if (prev) prev.onclick = () => swiper.slidePrev();
    if (next) next.onclick = () => swiper.slideNext();

    swiper.on('realIndexChange', update);
    swiper.on('slideChange', update);
    update();
  }

  // Parámetros comunes: bucle infinito, arrastre y rueda horizontal con imán
  // (freeMode + sticky = se suelta y encaja en el proyecto más cercano).
  // La rueda solo actúa en horizontal (forceToAxis): el scroll vertical sigue
  // moviendo las diapositivas principales, no se secuestra.
  const WORKS_SHARED_PARAMS = {
    direction: 'horizontal',
    loop: true,
    loopAdditionalSlides: 6,
    slidesPerView: 'auto',
    spaceBetween: 0,
    allowTouchMove: true,
    simulateTouch: true,
    grabCursor: true,
    threshold: 6,
    touchAngle: 35,
    preventClicks: true,
    preventClicksPropagation: true,
    watchSlidesProgress: true,
    roundLengths: true,
    observer: true,
    observeParents: true,
    freeMode: {
      enabled: true,
      sticky: true,
      momentum: true,
      momentumRatio: 0.55,
      momentumVelocityRatio: 0.7,
      minimumVelocity: 0.05
    },
    mousewheel: {
      enabled: true,
      forceToAxis: true,
      sensitivity: 0.9,
      thresholdDelta: 3,
      releaseOnEdges: false
    },
    keyboard: { enabled: true, onlyInViewport: true }
  };

  function initWorksSwiperDesktop() {
    if (isMobile()) return null;
    const worksRoot = document.querySelector('.WorksSwiperDesktop');
    if (!worksRoot || typeof Swiper === 'undefined') return null;

    const wrapper = worksRoot.querySelector('.swiper-wrapper');
    if (!wrapper) return null;

    sortWorksSlidesByNewestFirst(wrapper);

    const worksSwiper = new Swiper(worksRoot, Object.assign({}, WORKS_SHARED_PARAMS, {
      centeredSlides: false,
      speed: 520,
      grabCursor: false // el portfolio ya tiene cursor propio
    }));

    bindWorksNav(worksRoot, worksSwiper);


    worksRoot.addEventListener(
      'wheel',
      (event) => {
        if (Math.abs(event.deltaX) > 0) {
          event.preventDefault();
        }
      },
      { passive: false }
    );

    return worksSwiper;
  }

  function initWorksSwiperMobile() {
    if (!isMobile()) return null;
    const worksRoot = document.querySelector('.WorksSwiperMobile');
    if (!worksRoot || typeof Swiper === 'undefined') return null;

    ensureMobileWorksObserver(worksRoot);

    if (!isElementNearViewport(worksRoot, 220)) {
      return null;
    }

    const wrapper = worksRoot.querySelector('.swiper-wrapper');
    if (!wrapper) return null;

    sortWorksSlidesByNewestFirst(wrapper);

    const mobileSwiper = new Swiper(worksRoot, Object.assign({}, WORKS_SHARED_PARAMS, {
      centeredSlides: true,
      speed: 420,
      grabCursor: false,
      // En móvil, una tarjeta por gesto: encaje clásico (más predecible que el modo libre)
      freeMode: { enabled: false },
      shortSwipes: true,
      longSwipesRatio: 0.2,
      resistanceRatio: 0.85,
      on: {
        init(swiper) {
          swiper.update();
          swiper.slideToClosest(0);

          window.requestAnimationFrame(() => {
            refreshWorksSwiperMobile(swiper);
          });
        }
      }
    }));

    bindWorksNav(worksRoot, mobileSwiper);


    window.setTimeout(() => {
      refreshWorksSwiperMobile(mobileSwiper);
    }, 60);

    scheduleMobileSwiperRecovery(worksRoot);

    return mobileSwiper;
  }

  function destroySwiper(swiperInstance) {
    if (!swiperInstance || typeof swiperInstance.destroy !== 'function') return;
    swiperInstance.destroy(true, true);
  }

  function initAllSwipers() {
    window.mainSwiper = initMainSwiper();
    window.worksSwiperDesktop = initWorksSwiperDesktop();
    window.worksSwiperMobile = initWorksSwiperMobile();
    window.worksSwiper = isMobile() ? window.worksSwiperMobile : window.worksSwiperDesktop;
  }

  function boot() {
    let currentMode = isMobile() ? 'mobile' : 'desktop';
    initAllSwipers();

    window.addEventListener(
      'wheel',
      (event) => {
        if (!window.mainSwiper) return;
        if (window.mainSwiper.activeIndex !== 1) return;
        if (Math.abs(event.deltaX) > 0) {
          event.preventDefault();
        }
      },
      { passive: false }
    );

    let resizeTimer = null;
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const nextMode = isMobile() ? 'mobile' : 'desktop';
        if (nextMode === currentMode) return;

        destroySwiper(window.mainSwiper);
        destroySwiper(window.worksSwiperDesktop);
        destroySwiper(window.worksSwiperMobile);

        window.mainSwiper = null;
        window.worksSwiperDesktop = null;
        window.worksSwiperMobile = null;
        window.worksSwiper = null;

        currentMode = nextMode;
        initAllSwipers();
      }, 150);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
