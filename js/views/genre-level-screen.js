/**
 * Created by Denis on 30.03.2018.
 */
import {LevelView} from "./level-view";
import {IS_DEBUG} from "../data";

export class GenreView extends LevelView {
  get template() {
    let answers = this.buildAnswers();

    return `
     <div class="main-wrap">
      <h2 class="title">${this.data.text}</h2>
      <form class="genre">
        ${answers}
        <button class="genre-answer-send" disabled type="submit">Ответить</button>
      </form>
    </div>
`;
  }

  answerTemplate(answer, num) {
    let debug = ``;
    if (IS_DEBUG && answer.isCorrect) {
      debug = `debug`;
    }
    return `<div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio src="${answer.audio}"></audio>
              <button class="player-control"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="${num}" id="a-${num}">
          <label class="genre-answer-check ${debug}" for="a-${num}"></label>
      </div>`;
  }

  bind(node) {
    this.bindAudio();
    let sendButton = node.querySelector(`.genre-answer-send`);
    let answerButtons = node.querySelectorAll(`input[name="answer"]`);

    for (let i = 0; i < answerButtons.length; i++) {
      answerButtons[i].addEventListener(`change`, function () {
        let checkedNum = document.querySelectorAll(`input[name="answer"]:checked`).length;
        if (checkedNum > 0 && sendButton.disabled) {
          sendButton.disabled = false;
        } else if (checkedNum === 0) {
          sendButton.disabled = true;
        }
      });
    }

    sendButton.addEventListener(`click`, (e) => {
      e.preventDefault();

      let checked = document.querySelectorAll(`input[name="answer"]:checked`);
      for (let it of checked) {
        this._answers.push(it.value);
      }

      this.onClick(this._answers, this._time);
    });
  }

  onClick() {
  }

}
