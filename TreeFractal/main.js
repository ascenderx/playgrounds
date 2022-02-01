function window_onLoad() {
  const cvs = document.getElementById('cvs');
  function window_onResize() {
    cvs.width = cvs.parentElement.clientWidth;
    cvs.height = cvs.parentElement.clientHeight;
  }
  window_onResize();
  window.addEventListener('resize', window_onResize);
}

window.addEventListener('load', window_onLoad);

