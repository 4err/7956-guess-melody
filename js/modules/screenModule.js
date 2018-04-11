/**
 * Created by Denis on 11.04.2018.
 */
import {defaultSettings, questions} from "../data";
import {welcomeScreen, welcomeScreenListeners} from "../screens/welcome-screen.js";
import {genreScreen, genreScreenListeners} from "../screens/genre-level-screen.js";
import {resultScreen, resultScreenListeners} from "../screens/result-screen";
import {artistScreen, artistScreenListeners} from "../screens/artist-level-screen.js";
import header from "../screens/header";
import {getElementFromHtml} from "../utils";
import {getResult, gameStatus, checkAnswer, startGame} from "./game";
let screens = {
  welcome: {
    isLevel: false,
    type: `welcome`,
    template: welcomeScreen,
    listener: welcomeScreenListeners
  },
  header: {
    isLevel: false,
    type: ``,
    template: header,
    listener: ``
  },
  genre: {
    isLevel: true,
    type: `genre`,
    template: genreScreen,
    listener: genreScreenListeners
  },
  artist: {
    isLevel: true,
    type: `artist`,
    template: artistScreen,
    listener: artistScreenListeners
  },
  result: {
    isLevel: false,
    type: `result`,
    template: resultScreen,
    listener: resultScreenListeners
  }
};

const cleanScreen = (node, screenName, screen) => {
  node.classList = `main`;

  if (screen.isLevel) {
    node.classList.add(`main--level`);
  }

  node.classList.add(`main--${screen.type}`);

  if (screenName === `header`) {
    const headerView = node.querySelector(`.header`);
    if (headerView) {
      headerView.innerHTML = ``;
    }
  } else {
    node.innerHTML = ``;
  }
};

export const nextScreen = () => {
  let curr = gameStatus.questionNum;
  let mistakes = gameStatus.mistakes;
  let loadingScreen = ``;
  let params = ``;

  if (curr === -1 || curr > 10) {
    loadingScreen = `welcome`;
    params = defaultSettings;
  } else if (curr === 10 || mistakes === 3) {
    loadingScreen = `result`;
    params = getResult();
  } else {
    loadingScreen = questions[curr].type;
    params = questions[curr];
  }
  gameStatus.questionNum++;

  printScreen(loadingScreen, params);
};

/**
 *
 * @param screenName
 * @param params
 */
const printScreen = (screenName, params) => {
  if (!screens) {
    throw new Error(`screens not initialized`);
  }

  let screen = screens[screenName];
  const mainView = document.querySelector(`section.main`);

  cleanScreen(mainView, screenName, screen);

  if (screen.isLevel) {
    printScreen(`header`, gameStatus);
  }

  let template = getElementFromHtml(screen.template(params));
  
  if (screenName !== `header`) {
    screen.listener(template, (function (answers, time) {
      if (screen.isLevel) {
        checkAnswer(answers, time);
      }
      if (screenName === `result`) {
        startGame();
      }
      nextScreen();
    }));
  }
  mainView.appendChild(template);
};
