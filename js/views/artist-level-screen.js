/**
 * Created by Denis on 30.03.2018.
 */
import {LevelView} from "./level-view";

export class ArtistView extends LevelView {
  get template() {
    let answers = this.buildAnswers();

    return `
    <div class="main-wrap">
      <h2 class="title main-title">Кто исполняет эту песню?</h2>
      <div class="player-wrapper">
        <div class="player">
          <audio src="${this.data.audio}"></audio>
          <button class="player-control player-control--pause"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <form class="main-list">
          ${answers}
      </form>
    </div>
`;
  }

  answerTemplate(answer, num) {
    return `<div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${num}" name="answer" value="${num}"/>
          <label class="main-answer" for="answer-${num}">
            <img class="main-answer-preview" src="${answer.pic}"
                 alt="${answer.name}" width="134" height="134">
            ${answer.name}
          </label>
    </div>`;
  }

  bind(node) {
    let answerButtons = node.querySelectorAll(`input[name="answer"]`);
    for (let i = 0; i < answerButtons.length; i++) {
      answerButtons[i].addEventListener(`change`, () => {
        let answer = answerButtons[i].value;
        this._answers.push(answer);
        this.onClick(this._answers);
      });
    }
  }

  onClick() {
  }

}