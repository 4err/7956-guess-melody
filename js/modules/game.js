/**
 * Created by Denis on 11.04.2018.
 */
import {COUNT_RULES, STATS_URL} from "../data";
import {plural} from "../utils";

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

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export const getStats = () => {
   return window.fetch(STATS_URL)
    .then(checkStatus)
    .then((response) => response.json());
};

export const saveResults = (points) => {
  const requestSettings = {
    body: JSON.stringify(points),
    headers: {
      'Content-Type': `application/json`
    },
    method: `POST`
  };
  return fetch(STATS_URL, requestSettings).then(checkStatus);
};


export const showResult = (currResult) => {
  let result = ``;

  // if (currResult.time === 0) {
  //   result = resultsTemplates.timeout;
  //   result[`stat`] = `Время вышло!<br>Вы не успели отгадать все мелодии`;
  //   return result;
  // }
  //
  // if (currResult.mistakes === 3) {
  //   result = resultsTemplates.fail;
  //   result[`stat`] = `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`;
  //   return result;
  // }

  console.log(currResult);
  saveResults({
    points: currResult.points
  }).then(() => getStats())
    .then((stats) => stats.map((result) => (result.points)))
    .then((statistic) => (statistic.sort((left, right) => right - left)))
    .then((statistic) => {
      result = resultsTemplates.win;
      const place = statistic.indexOf(currResult.points) + 1;
      const placesCount = statistic.length;
      const percent = Math.round((placesCount - place) / placesCount * 100);
      result.stat = `Вы заняли ${place}-ое место из ${placesCount} ${plural(placesCount, [`игрока`, `игроков`, `игроков`])}. Это лучше, чем у ${percent}% игроков`;

      return result;
    })
    .then(console.log);
  return result;
};
