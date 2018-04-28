/**
 * Created by Denis on 28.04.2018.
 */

import {ResultView} from "../views/result-view";
import {COUNT_RULES, Result} from "../data";
import {plural} from "../utils";

const resultsTemplates = {
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

export class ResultScreen {
  constructor(model) {
    this.model = model;
    this._result = ``;
    this.content = new ResultView(this.result);
  }

  get element() {
    return this.content.element;
  }

  showResult() {
    const view = new ResultView(this._result);
    view.onRestart = this.restartGame.bind(this);

    this.content = view;
  }

  restartGame() {
    this.onRestart();
  }

  countPoints() {
    let points = 0;
    let answers = this.model.answers;

    let lastAnswerTime = 300;
    for (let i = 0; i < answers.length; i++) {
      let currentAnswer = answers[i];
      if (currentAnswer.isCorrect) {
        points += COUNT_RULES.isCorrect;

        if ((lastAnswerTime - currentAnswer.time) < COUNT_RULES.fastTime) {
          points += COUNT_RULES.isFast;
        }
      } else {
        points -= COUNT_RULES.isFail;
      }
      lastAnswerTime = currentAnswer.time;
    }

    this.model.points = points;
  }

  getFailResult() {
    let result = ``;

    if (this.model.status === Result.TIME) {
      result = resultsTemplates.timeout;
      result[`stat`] = `Время вышло!<br>Вы не успели отгадать все мелодии`;
    }

    if (this.model.status === Result.MISTAKES) {
      result = resultsTemplates.fail;
      result[`stat`] = `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`;
    }

    this._result = result;
  }

  getWinResult(statistic) {
    let result = resultsTemplates.win;
    const place = statistic.indexOf(this.model.points) + 1;
    const placesCount = statistic.length;
    const percent = Math.round((placesCount - place) / placesCount * 100);
    result.stat = `Вы заняли ${place}-ое место из ${placesCount} ${plural(placesCount, [`игрока`, `игроков`, `игроков`])}. Это лучше, чем у ${percent}% игроков`;

    this._result = result;
  }

  onRestart() {

  }
}
