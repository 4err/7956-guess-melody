/**
 * Created by Denis on 30.03.2018.
 */

let screens = null;

/**
 *
 * @param {string} html
 * @return {Node}
 */
export const getElementFromHtml = (html) => {
  let template = document.createElement(`template`);
  template.innerHTML = html;
  return template.content.children[0];
};
/**
 *
 * @param {Object} s
 */
export const setScreens = (s) => {
  screens = s;
};

/**
 *
 * @param {string} screenName
 */
export const printScreen = (screenName) => {
  if (!screens) {
    throw new Error(`screens not initialized`);
  }

  let screen = screens[screenName];
  const mainView = document.querySelector(`section.main`);
  mainView.innerHTML = ``;
  mainView.appendChild(screen);
};

export const plural = (num, pluralArr) => {
  let n = Math.abs(num);

  n %= 100;
  if (n >= 5 && n <= 20) {
    return pluralArr[2];
  }
  n %= 10;
  if (n === 1) {
    return pluralArr[0];
  }
  if (n >= 2 && n <= 4) {
    return pluralArr[1];
  }
  return pluralArr[3];
};
