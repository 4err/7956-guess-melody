/**
 * Created by Denis on 03.04.2018.
 */

import {plural} from '../utils.js';

const COUNT_RULES = {
  isCorrect: 1,
  isFast: 1,
  isFail: 2,
  fastTime: 30
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
  if (currResult.time === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  }

  if (currResult.notes === 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  }

  statistic.push(currResult.points);
  statistic = statistic.sort((left, right) => right - left);
  const place = statistic.indexOf(currResult.points) + 1;
  const placesCount = statistic.length;
  const percent = Math.round((placesCount - place) / placesCount * 100);

  return `Вы заняли ${place}-ое место из ${placesCount} ${plural(placesCount, [`игрока`, `игроков`, `игроков`])}. Это лучше, чем у ${percent}% игроков`;
};

export const setTimer = (t) => {
  let timer = {
    time: t,
    tick() {
      if (t > 0) {
        this.time--;
      } else {
        this.onComplete();
      }
    },
    onComplete() {
    }
  };

  return timer;
};
