const keys: Boolean[] = [];

window.addEventListener('keydown', function (e) {
  keys[e.key] = true;
});
window.addEventListener('keyup', function (e) {
  keys[e.key] = false;
});
