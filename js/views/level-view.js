/**
 * Created by Denis on 16.04.2018.
 */
import {AbstractView} from "./abstract-view";

export class LevelView extends AbstractView {
  get template() {

  }

  answerTemplate() {

  }

  buildAnswers() {
    let answersArr = [];
    for (let i = 0; i < this.data.answers.length; i++) {
      let it = this.data[i];
      let template = this.answerTemplate(it, i);

      answersArr.push(template);
    }

    return answersArr.join(``);
  }

}
