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
  return new Promise((onLoaded, onError) => {
    const audios = getAudioList(data);
    let fragment = document.createDocumentFragment();

    for (let audio of audios) {
      let sound = document.createElement(`audio`);
      sound.src = audio;
      sound.style.display = `none`;
      sound.classList = `inserted-audio`;
      fragment.appendChild(sound);
    }
    document.body.appendChild(fragment);

    let insertedAudios = document.querySelectorAll(`.inserted-audio`);

    let currentLoadedAudio = 0;
    for (let audio of insertedAudios) {
      audio.load();
      audio.addEventListener(`canplaythrough`, () => {
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

const loadingAudioNew = (data) => {
  return new Promise((onLoaded, onError) => {
    const audios = getAudioList(data);
    let currentLoadedAudio = 0;

    for (let audio of audios) {
      let sound = new Audio(audio);
      sound.style.display = `none`;

      sound.load();
      sound.addEventListener(`canplaythrough`, () => {
        currentLoadedAudio++;
        const text = `${plural(currentLoadedAudio, [`Загружена`, `Загружено`, `Загружено`])} ${currentLoadedAudio}
                    ${plural(currentLoadedAudio, [`мелодия`, `мелодии`, `мелодий`])} из ${audios.size}`;

        showLoadingScreen(`Загружаем музыку!`, text);

        if (currentLoadedAudio === audios.size) {
          onLoaded(data);
        }
      });

      sound.addEventListener(`error`, function failed(e) {
        // audio playback failed - show a message saying why
        // to get the source of the audio element use $(this).src
        switch (e.target.error.code) {
          case e.target.error.MEDIA_ERR_ABORTED:
            onError('You aborted the video playback.');

            break;
          case e.target.error.MEDIA_ERR_NETWORK:
            onError('A network error caused the audio download to fail.');
            break;
          case e.target.error.MEDIA_ERR_DECODE:
            onError('The audio playback was aborted due to a corruption problem or because the video used features your browser did not support.');
            break;
          case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
            onError('The video audio not be loaded, either because the server or network failed or because the format is not supported.');
            break;
          default:
            onError('An unknown error occurred.');
            break;
        }
      }, true);
    }

  });
};

export default class Application {

  static start() {
    showLoadingScreen(`Загружаем вопросы!`);

    Loader.loadQuestions()
      .then((data)=>adaptServerData(data))
      .then((data) => loadingAudioNew(data))
      .then((data)=>Application.showWelcome(data))
      .catch((e)=>console.log(e));
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
