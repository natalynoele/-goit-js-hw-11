function smoothScroll(domElement, pixel, delay) {
  const intervalToRepeat = 15;
  const step = (intervalToRepeat * pixel) / delay;
  if (step < pixel) {
    domElement.scrollTop += step;
    setTimeout(function () {
      smoothScroll(domElement, pixel - step, delay);
    }, intervalToRepeat);
  }
}

const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

export { smoothScroll, scrollToTop };