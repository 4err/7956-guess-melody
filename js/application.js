/**
 * Created by Denis on 25.04.2018.
 */

import {WelcomeView} from "./views/welcome-screen";
import {GameModel} from "./modules/game-model";
import {GameScreen} from "./modules/game-screen";
import {ResultScreen} from "./modules/result-screen";
import {defaultSettings, Result} from "./data";
import {adaptServerData} from "./data-adapter";
import {Loader} from "./loader";

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

export class Application {

  static start() {
    Loader.loadQuestions()
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
    const results = new ResultScreen(model);

    if (model.status === Result.WIN) {
      results.countPoints();

      Loader.saveResults(model.points)
        .then(Loader.getStats)
        .then((stats) => stats.map((result) => (result.points)))
        .then((stats) => (stats.sort((left, right) => right - left)))
        .then((stats) => (results.getWinResult(stats)))
        .then(() => (console.log(results)))
        .then(() => (results.showResult()));
    } else {
      results.getFailResult();
      results.showResult();
    }

    results.onRestart = () => {
      this.start();
    };
    changeView(results.element, `result`);
  }

}
