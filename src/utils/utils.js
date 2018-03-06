export function proxy(target, source) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {

      Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        get: function() {
          return source[key];
        },
        set: function(newVal) {
          source[key] = newVal;
        }
      });
    }
  }
}

export function def(obj, key, val) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      return val;
    },
    set: function(newVal) {
      val = newVal;
    }
  });
}
