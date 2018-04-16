/**
 * Created by Denis on 16.04.2018.
 */
import {AbstractView} from "./abstract-view";

export class LevelView extends AbstractView {
  constructor(data) {
    super(data);

    this._answers = [];
    this._time = 35;
  }

  get template() {

  }

  answerTemplate() {

  }

  buildAnswers() {
    let answersArr = [];
    for (let i = 0; i < this.data.answers.length; i++) {

      let it = this.data.answers[i];
      let template = this.answerTemplate(it, i);

      answersArr.push(template);
    }

    return answersArr.join(``);
  }

  get answer() {
    return {
      answer: this._answers,
      time: this._time
    };
  }

}
