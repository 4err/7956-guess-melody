/**
 * Created by Denis on 03.04.2018.
 */

const COUNT_RULES = {
  isCorrect: 1,
  isFast: 1,
  isFail: 2,
  fastTime: 30
};

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

export const plural = (num, pluralArr) => {
  let n = Math.abs(num);

  n %= 100;
  if (n >= 5 && n <= 20) {
    return pluralArr[2];
  }
  n %= 10;
  if (n === 1) {
    return pluralArr[0];
  }
  if (n >= 2 && n <= 4) {
    return pluralArr[1];
  }
  return pluralArr[3];
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
    result[`stat`] = `Время вышло!\nВы не успели отгадать все мелодии`;
    return result;
  }

  if (currResult.mistakes === 3) {
    result = resultsTemplates.fail;
    result[`stat`] = `У вас закончились все попытки.<br> Ничего, повезёт в следующий раз!`;
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

export const setTimer = (t) => {
  let timer = {
    time: t,
    completed: 0,
    tick() {
      this.time--;

      if (this.time <= 0) {
        this.onComplete();
      }
    },
    onComplete() {
      this.completed = 1;
    }
  };

  return timer;
};
