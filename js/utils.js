/**
 * Created by Denis on 30.03.2018.
 */

/**
 *
 * @param {string} html
 * @return {Node}
 */
export const getElementFromHtml = (html) => {
  let template = document.createElement(`template`);
  template.innerHTML = html;
  return template.content.cloneNode(true);
};

/**
 *
 * @param {Node} screen
 */
export const printScreen = (screen) => {
  const mainView = document.querySelector(`.main`);
  mainView.innerHTML = ``;
  mainView.appendChild(screen);
};
