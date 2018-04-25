/**
 * Created by Denis on 23.04.2018.
 */

import {initialGameStatus, Result} from "../data";
import {getQuestion, countPoints, showResult} from "./game";
import {clone} from "../utils";

export class GameModel {
  constructor() {
    this.restart();

    this._status = Result.NEXT_LEVEL;
  }

  get state() {
    return this._state;
  }

  get status() {
    return this._status;
  }

  get time() {
    return this._state.time;
  }

  get mistakes() {
    return this._state.mistakes;
  }

  get currQuestion() {
    return this._state.question;
  }

  hasNextQuestion() {
    return getQuestion(this._state.questionNum + 1) !== void 0;
  }

  nextQuestion() {
    this._state.question = getQuestion(this._state.questionNum + 1);
    this._state.questionNum++;
  }

  restart() {
    this._state = clone(initialGameStatus);
    this.nextQuestion();
  }

  tick() {
    this._state.time--;
  }

  wrongAnswer() {
    this._state.mistakes++;
  }

  addAnswer(answer) {
    this._state.answers.push(answer);
    this.updateStatus();
  }

  updateStatus() {
    if (this._state.time === 0) {
      this._status = Result.TIME;
    }

    if (this._state.mistakes === this._state.maxErrors) {
      this._status = Result.MISTAKES;
    }

    if (!this.hasNextQuestion()) {
      this._status = Result.WIN;
    }
  }

  get result() {
    this._state.points = countPoints(this._state.answers);
    return showResult([], this._state);
  }
}