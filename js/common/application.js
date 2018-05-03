/**
 * Created by Denis on 25.04.2018.
 */

import WelcomeView from "../views/welcome-view";
import LoadingView from "../views/loading-view";
import GameModel from "../modules/game-model";
import GameScreen from "../modules/game-screen";
import ResultScreen from "../modules/result-screen";
import Loader from "./loader";
import {defaultSettings, Result} from "../data/data";
import {adaptServerData, getAudioList} from "../data/data-adapter";
import {plural} from "../helpers/utils";

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

const showLoadingScreen = (title, text = ``) => {
  const data = {
    title,
    text
  };

  const loading = new LoadingView(data);
  changeView(loading.element, `result`);
};

const loadingAudio = (data) => {
  return new Promise((onLoaded) => {
    const audios = getAudioList(data);
    let currentLoadedAudio = 0;

    for (let audio of audios) {
      let sound = new Audio(audio);

      sound.addEventListener(`canplaythrough`, () => {
        currentLoadedAudio++;
        const text = `${plural(currentLoadedAudio, [`Загружена`, `Загружено`, `Загружено`])} ${currentLoadedAudio}
                    ${plural(currentLoadedAudio, [`мелодия`, `мелодии`, `мелодий`])} из ${audios.size}`;

        showLoadingScreen(`Загружаем музыку!`, text);

        if (currentLoadedAudio === audios.size) {
          onLoaded(data);
        }
      });
    }

  });
};

export default class Application {

  static start() {
    showLoadingScreen(`Загружаем вопросы!`);

    Loader.loadQuestions()
        .then((data)=>adaptServerData(data))
        .then((data) => loadingAudio(data))
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
      showLoadingScreen(`Загружаем статистику!`);
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
      changeView(results.element, `result`);
    }

    results.onRestart = () => {
      this.start();
    };
  }

}
