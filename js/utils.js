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
