/**
 * Created by Denis on 25.04.2018.
 */

import {WelcomeView} from "./views/welcome-screen";
import {defaultSettings} from "./data";
import {GameModel} from "./modules/game-model";
import {GameScreen} from "./modules/game-screen";
import {ResultView} from "./views/result-screen";

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

  static showWelcome() {
    const welcome = new WelcomeView(defaultSettings);
    welcome.onStart = () => {
      this.showGame();
    };
    changeView(welcome.element, `welcome`);
  }

  static showGame() {
    const gameScreen = new GameScreen(new GameModel());
    gameScreen.onEnd = (stats) => {
      this.showStats(stats);
    };
    changeView(gameScreen.element);
    gameScreen.init();
  }

  static showStats(model) {
    const results = new ResultView(model.result);
    results.onRestart = () => {
      this.showWelcome();
    };
    changeView(results.element, `result`);
  }

}
