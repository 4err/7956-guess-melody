/**
 * Created by Denis on 27.03.2018.
 */
const views = document.querySelector(`#templates`).content.querySelectorAll(`.main`);
const mainView = document.querySelector(`.main`);

let currentView = 0;

const getView = (num) => {
  mainView.innerHTML = ``;
  mainView.appendChild(views[num]);

};

getView(currentView);

document.addEventListener(`keydown`, function (event) {
  if (event.altKey && (event.which === 37 || event.which === 39)) {
    if (currentView > 0 && event.which === 37) {
      getView(--currentView);
    }

    if (currentView < views.length - 1 && event.which === 39) {
      getView(++currentView);
    }
  }
});


