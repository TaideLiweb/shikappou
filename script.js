(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealNodes = document.querySelectorAll(".reveal:not(.visible)");
  const heroSlides = Array.from(document.querySelectorAll(".hero-bg"));
  const slides = Array.from(document.querySelectorAll(".about-slide"));
  const dots = Array.from(document.querySelectorAll(".about-dot"));
  let activeHeroIndex = 0;
  let activeIndex = 0;
  let timer = null;
  let heroTimer = null;

  if (revealNodes.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.2 }
    );

    revealNodes.forEach(function (node) {
      observer.observe(node);
    });
  }

  function setSlide(index) {
    slides.forEach(function (slide, slideIndex) {
      slide.classList.toggle("is-active", slideIndex === index);
    });

    dots.forEach(function (dot, dotIndex) {
      dot.classList.toggle("is-active", dotIndex === index);
    });

    activeIndex = index;
  }

  function setHeroSlide(index) {
    heroSlides.forEach(function (slide, slideIndex) {
      slide.classList.toggle("is-active", slideIndex === index);
    });

    activeHeroIndex = index;
  }

  function startSlider() {
    if (reduceMotion || slides.length < 2) return;
    timer = window.setInterval(function () {
      setSlide((activeIndex + 1) % slides.length);
    }, 4000);
  }

  function startHeroSlider() {
    if (reduceMotion || heroSlides.length < 2) return;
    heroTimer = window.setInterval(function () {
      setHeroSlide((activeHeroIndex + 1) % heroSlides.length);
    }, 4000);
  }

  dots.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
      setSlide(index);
      if (timer) {
        window.clearInterval(timer);
        startSlider();
      }
    });
  });

  setHeroSlide(0);
  setSlide(0);
  startHeroSlider();
  startSlider();
})();
