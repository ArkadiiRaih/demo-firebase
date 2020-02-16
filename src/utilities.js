import { curry, apply } from "ramda";

export const collectIdsAndDocs = doc => {
  return { id: doc.id, ...doc.data() };
};

export const belongsToCurrentUser = (currentUser, postAuthor) => {
  if (!currentUser) return false;
  if (!postAuthor) return false;
  return currentUser.uid === postAuthor.uid;
};

const debounce_ = curry((immediate, timeMs, fn) => () => {
  let timeout;

  return (...args) => {
    const later = () => {
      timeout = null;

      if (!immediate) {
        apply(fn, args);
      }
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, timeMs);

    if (callNow) {
      apply(fn, args);
    }

    return timeout;
  };
});

export const debounce = debounce_(false)(20);
