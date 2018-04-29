/**
 * Created by Denis on 25.04.2018.
 */

import {WelcomeView} from "../views/welcome-view";
import {LoadingView} from "../views/loading-view";
import {GameModel} from "../modules/game-model";
import {GameScreen} from "../modules/game-screen";
import {ResultScreen} from "../modules/result-screen";
import {defaultSettings, Result} from "../data/data";
import {adaptServerData} from "../data/data-adapter";
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
    const loading = new LoadingView();
    changeView(loading.element, `result`);

    Loader.loadQuestions()
        .then((data)=>adaptServerData(data))
        .then((data)=>Application.showWelcome(data));
  }

  static showWelcome(data) {
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
      const loading = new LoadingView();
      changeView(loading.element, `result`);
      results.countPoints();

      Loader.saveResults(model.points)
          .then(Loader.getStats)
          .then((stats) => stats.map((result) => (result.points)))
          .then((stats) => (stats.sort((left, right) => right - left)))
          .then((stats) => (results.getWinResult(stats)))
          .then(() => (results.showResult()))
          .then(()=> (changeView(results.element, `result`)));
    } else {
      results.getFailResult();
      results.showResult();
    }

    results.onRestart = () => {
      this.start();
    };
  }

}
