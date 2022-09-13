let currentObserver = null;

export const observe = func => {
  currentObserver = func;
  func();
  currentObserver = null;
};

export const observable = obj => {
  Object.keys(obj).forEach(key => {
    let value = obj[key];
    const observers = new Set();

    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver) observers.add(currentObserver);
        return value;
      },

      set(val) {
        value = val;
        observers.forEach(func => func());
      },
    });
  });

  return obj;
};
