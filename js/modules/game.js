/**
 * Created by Denis on 11.04.2018.
 */
import {COUNT_RULES, initialGameStatus, questions} from "../data";
import {clone, plural} from "../utils";

export let gameStatus = null;

let resultsTemplates = {
  timeout: {
    title: `Увы и ах!`,
    replay: `Попробовать ещё раз`
  },
  fail: {
    title: `Какая жалость!`,
    replay: `Попробовать ещё раз`
  },
  win: {
    title: `Вы настоящий меломан!`,
    replay: `Сыграть ещё раз`
  }
};

export const startGame = () => {
  gameStatus = clone(initialGameStatus);
};


export const getResult = () => {
  gameStatus.points = countPoints(gameStatus.answers);
  return showResult([], gameStatus);
};

export const checkAnswer = (answers, time) => {
  let curr = questions[gameStatus.questionNum - 1].answers;
  let err = 0;
  let answer = {
    isCorrect: true,
    time
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

  return gameStatus;
};

export const countPoints = (answers = [], notes = 3) => {
  let points = 0;

  if (answers.length < 10 || notes === 0 || answers.length > 10) {
    return -1;
  }

  for (let i = 0; i < answers.length; i++) {
    let currentAnswer = answers[i];
    if (currentAnswer.isCorrect) {
      points += COUNT_RULES.isCorrect;

      if (currentAnswer.time < COUNT_RULES.fastTime) {
        points += COUNT_RULES.isFast;
      }
    } else {
      points -= COUNT_RULES.isFail;
    }
  }
  return points;
};

export const showResult = (statistic, currResult) => {
  let result = ``;

  if (currResult.time === 0) {
    result = resultsTemplates.timeout;
    result[`stat`] = `Время вышло!<br>Вы не успели отгадать все мелодии`;
    return result;
  }

  if (currResult.mistakes === 3) {
    result = resultsTemplates.fail;
    result[`stat`] = `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`;
    return result;
  }

  result = resultsTemplates.win;
  statistic.push(currResult.points);
  statistic = statistic.sort((left, right) => right - left);
  const place = statistic.indexOf(currResult.points) + 1;
  const placesCount = statistic.length;
  const percent = Math.round((placesCount - place) / placesCount * 100);

  result.stat = `Вы заняли ${place}-ое место из ${placesCount} ${plural(placesCount, [`игрока`, `игроков`, `игроков`])}. Это лучше, чем у ${percent}% игроков`;
  return result;
};
