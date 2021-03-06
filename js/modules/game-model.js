/**
 * Created by Denis on 23.04.2018.
 */

import {initialGameStatus, Result} from "../data/data";
import {clone} from "../helpers/utils";

export default class GameModel {
  constructor(questions) {
    this._questions = questions;
    this._status = Result.NEXT_LEVEL;

    this._timeLineOffsetStep = 7.75;

    this.restart();
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

  get answers() {
    return this._state.answers;
  }

  get currQuestion() {
    return this._state.question;
  }

  get points() {
    return this._state.points;
  }

  set points(points) {
    this._state.points = points;
  }

  hasNextQuestion() {
    return this.getQuestion(this._state.questionNum + 1) !== void 0;
  }

  nextQuestion() {
    this._state.question = this.getQuestion(this._state.questionNum + 1);
    this._state.questionNum++;
  }

  restart() {
    this._state = clone(initialGameStatus);
    this._state.timeOffset = 0;
    this.nextQuestion();
  }

  tick() {
    this._state.time--;

    this._state.timeOffset += this._timeLineOffsetStep;

    if (this._state.time <= 0) {
      this._status = Result.TIME;
    }
  }

  wrongAnswer() {
    this._state.mistakes++;
  }

  addAnswer(answer) {
    this._state.answers.push(answer);
    this.updateStatus();
  }

  updateStatus() {
    if (this._state.mistakes === this._state.maxErrors) {
      this._status = Result.MISTAKES;
    }

    if (!this.hasNextQuestion()) {
      this._status = Result.WIN;
    }
  }

  getQuestion(n) {
    return this._questions[n];
  }
}
