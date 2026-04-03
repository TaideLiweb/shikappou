(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealNodes = document.querySelectorAll(".reveal:not(.visible)");
  const slides = Array.from(document.querySelectorAll(".about-slide"));
  const dots = Array.from(document.querySelectorAll(".about-dot"));
  let activeIndex = 0;
  let timer = null;

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

  function startSlider() {
    if (reduceMotion || slides.length < 2) return;
    timer = window.setInterval(function () {
      setSlide((activeIndex + 1) % slides.length);
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

  setSlide(0);
  startSlider();
})();
