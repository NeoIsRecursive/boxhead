declare global {
  interface Window {
    keys: Map<string, boolean>;
  }
}

const setUpKeys = () => {
  window.keys = new Map<string, boolean>();

  window.addEventListener('keydown', function (e) {
    window.keys.set(e.key, true);
  });
  window.addEventListener('keyup', function (e) {
    window.keys.set(e.key, false);
  });
};

export default setUpKeys;
