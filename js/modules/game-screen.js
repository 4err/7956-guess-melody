/**
 * Created by Denis on 25.04.2018.
 */

import HeaderView from "../views/header-view";
import GenreView from "../views/genre-level-view.js";
import ArtistView from "../views/artist-level-view.js";
import {Result} from "../data/data";

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.header = new HeaderView(this.model.state);
    this.content = this.question;

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this._interval = null;
  }

  get element() {
    return this.root;
  }

  get question() {
    const currentQuestion = this.model.currQuestion;
    let question = ``;

    switch (currentQuestion.type) {
      case `artist`:
        question = new ArtistView(currentQuestion);
        break;
      case `genre`:
        question = new GenreView(currentQuestion);
        break;
      default:
        throw new Error(`Missing question type`);
    }

    return question;
  }

  init() {
    this.nextQuestion();

    this._interval = setInterval(() => {
      if (this.model.status === Result.TIME) {
        this.endGame();
      }
      this.model.tick();
      this.updateHeader();
    }, 1000);
  }

  endGame() {
    clearInterval(this._interval);
    this.onEnd(this.model);
  }

  updateHeader() {
    const header = new HeaderView(this.model.state);
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
  }

  updateContent(view) {
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
  }

  nextQuestion() {
    this.updateHeader();

    const question = this.question;
    question.onAnswerClick = this.checkAnswer.bind(this);
    this.updateContent(question);
  }

  checkAnswer(answers) {
    let curr = this.model.currQuestion.answers;
    let err = 0;
    let answer = {
      isCorrect: true,
      time: this.model.time
    };

    for (let it of answers) {
      if (!curr[it].isCorrect) {
        err++;
      }
    }

    if (err > 0) {
      this.model.wrongAnswer();
      answer.isCorrect = false;
    }

    this.model.addAnswer(answer);

    if (this.model.status === Result.NEXT_LEVEL) {
      this.model.nextQuestion();
      this.nextQuestion();
    } else {
      this.endGame();
    }

  }

  onEnd() {

  }
}

