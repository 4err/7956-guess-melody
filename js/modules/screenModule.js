/**
 * Created by Denis on 11.04.2018.
 */
import {defaultSettings, questions} from "../data";
import {WelcomeView} from "../views/welcome-screen.js";
import {GenreView} from "../views/genre-level-screen.js";
import {ResultView} from "../views/result-screen";
import {ArtistView} from "../views/artist-level-screen.js";
import {HeaderView} from "../views/header";
import {getElementFromHtml} from "../utils";
import {getResult, gameStatus, checkAnswer, startGame} from "./game";
let screens = {
  welcome: {
    isLevel: false,
    type: `welcome`,
    Class: WelcomeView
  },
  header: {
    isLevel: false,
    type: ``,
    Class: HeaderView
  },
  genre: {
    isLevel: true,
    type: `genre`,
    Class: GenreView
  },
  artist: {
    isLevel: true,
    type: `artist`,
    Class: ArtistView
  },
  result: {
    isLevel: false,
    type: `result`,
    Class: ResultView
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
 * @param {string} screenName
 * @param {Object} params
 */
const printScreen = (screenName, params) => {
  if (!screens) {
    throw new Error(`screens not initialized`);
  }

  console.log(params);

  let screen = screens[screenName];
  const mainView = document.querySelector(`section.main`);

  cleanScreen(mainView, screenName, screen);

  if (screen.isLevel) {
    printScreen(`header`, gameStatus);
  }

  let view = new screen.Class(params, screen.isLevel, screen.type);

  console.log(view);

  let template1 = view.element();

  // if (screenName !== `header`) {
  //   screen.onClick(template, (function (answers, time) {
  //     if (screen.isLevel) {
  //       checkAnswer(answers, time);
  //     }
  //     if (screenName === `result`) {
  //       startGame();
  //     }
  //     nextScreen();
  //   }));
  // }
  mainView.appendChild(template1);
};
