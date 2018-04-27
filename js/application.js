/**
 * Created by Denis on 25.04.2018.
 */

import {WelcomeView} from "./views/welcome-screen";
import {GameModel} from "./modules/game-model";
import {GameScreen} from "./modules/game-screen";
import {ResultView} from "./views/result-screen";
import {defaultSettings, QUESTIONS_URL} from "./data";
import {adaptServerData} from "./data-adapter";

const mainView = document.querySelector(`section.main`);
const changeView = (element, type = ``, isLevel = false) => {

  mainView.classList = `main`;

  if (isLevel) {
    mainView.classList.add(`main--level`);
  }

  mainView.classList.add(`main--${type}`);
  mainView.innerHTML = ``;
  mainView.appendChild(element);
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export class Application {

  static start() {
    window.fetch(QUESTIONS_URL)
        .then(checkStatus)
        .then((response) => response.json())
        .then((data)=>adaptServerData(data))
        .then((data)=>Application.showWelcome(data));
  }

  static showWelcome(data) {
    console.log(data);
    const welcome = new WelcomeView(defaultSettings);
    welcome.onStart = () => {
      this.showGame(data);
    };
    changeView(welcome.element, `welcome`);
  }

  static showGame(data) {
    const gameScreen = new GameScreen(new GameModel(data));
    gameScreen.onEnd = (stats) => {
      this.showStats(stats);
    };
    changeView(gameScreen.element, ``, true);
    gameScreen.init();
  }

  static showStats(model) {
    const results = new ResultView(model.result);
    results.onRestart = () => {
      this.start();
    };
    changeView(results.element, `result`);
  }

}
