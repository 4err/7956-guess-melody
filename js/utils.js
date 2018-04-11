import {defaultSettings, initialGameStatus, questions} from "./data";
import {showResult, countPoints} from "./modules/count-points";
/**
 * Created by Denis on 30.03.2018.
 */

let screens = null;

let gameStatus = null;

/**
 *
 * @param {string} html
 * @return {Node}
 */
export const getElementFromHtml = (html) => {
  let template = document.createElement(`template`);
  template.innerHTML = html;
  return template.content;
};
/**
 *
 * @param {Object} s
 */
export const setScreens = (s) => {
  screens = s;
};

export const startGame = () => {
  gameStatus = initialGameStatus;
  nextScreen();
};


const getResult = () => {
  gameStatus.points = countPoints(gameStatus.answers);
  return showResult([], gameStatus);
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

const checkAnswer = (answers, time) => {
  let curr = questions[gameStatus.questionNum - 1].answers;
  let err = 0;
  let answer = {
    isCorrect: true,
    time: time
  };

  for (let it of answers) {
    if (!curr[it].isCorrect) {
      err++;
    }
  }

  if (err > 0) {
    gameStatus.mistakes++;
    answer.isCorrect = false;
  }

  gameStatus.answers.push(answer);

  nextScreen();
};

const addListeners = (node, type) => {

  let answerButtons = ``;
  let answers = [];
  let time = 35;

  switch (type) {
    case `welcome`:
      node.querySelector(`.main-play`).addEventListener(`click`, function () {
        nextScreen();
      });
      break;

    case `artist`:
      answerButtons = node.querySelectorAll(`.main-answer`);
      for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].addEventListener(`click`, function () {
          checkAnswer();
        });
      }
      break;

    case `genre`:
      let sendButton = node.querySelector(`.genre-answer-send`);
      answerButtons = node.querySelectorAll(`input[name="answer"]`);

      for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].addEventListener(`change`, function () {
          let checkedNum = document.querySelectorAll(`input[name="answer"]:checked`).length;
          if (checkedNum > 0 && sendButton.disabled) {
            sendButton.disabled = false;
          } else if (checkedNum === 0) {
            sendButton.disabled = true;
          }
        });
      }

      sendButton.addEventListener(`click`, function (e) {
        e.preventDefault();
        let checked = document.querySelectorAll(`input[name="answer"]:checked`);
        for (let it of checked) {
          answers.push(it.value);
        }
        checkAnswer(answers, time);
      });
      break;

    case `result`:
      node.querySelector(`.main-replay`).addEventListener(`click`, function () {
        startGame();
      });
      break;
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

/**
 *
 * @param {string} screenName
 */
export const printScreen = (screenName, params) => {
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

  addListeners(template, screen.type);

  mainView.appendChild(template);
};
