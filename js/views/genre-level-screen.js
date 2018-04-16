/**
 * Created by Denis on 30.03.2018.
 */
import getAnswersTemplate from "./answer-screen";

import {LevelView} from "./level-view";

export class GenreView extends LevelView {
  get template() {
    let answers = this.buildAnswers();

    return `
     <div class="main-wrap">
      <h2 class="title">${this.data.question.text}</h2>
      <form class="genre">
        ${answers}
        <button class="genre-answer-send" disabled type="submit">Ответить</button>
      </form>
    </div>
`;
  }

  answerTemplate(answer, num) {
    return `<div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio src="${answer.audio}"></audio>
              <button class="player-control player-control--pause"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="${num}" id="a-${num}">
          <label class="genre-answer-check" for="a-${num}"></label>
      </div>`;
  }

  bind(node) {
    // let answers = [];
    // let time = 35;
    //
    // let answerButtons = node.querySelectorAll(`input[name="answer"]`);
    // for (let i = 0; i < answerButtons.length; i++) {
    //   answerButtons[i].addEventListener(`change`, () => {
    //     let answer = answerButtons[i].value;
    //     answers.push(answer);
    //     this.onClick(answers, time);
    //   });
    // }

    let answers = [];
    let time = 35;
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
        answers.push(it.value);
      }

      this.onClick(answers, time);
    });
  }

  onClick() {
  }

}

// const template = (question, answers) =>`
//     <div class="main-wrap">
//       <h2 class="title">${question.text}</h2>
//       <form class="genre">
//         ${answers}
//         <button class="genre-answer-send" disabled type="submit">Ответить</button>
//       </form>
//     </div>
// `;
//
// export const genreScreen = (question) => {
//   let answersTemplate = getAnswersTemplate(question.answers, `genre`);
//   return template(question, answersTemplate);
// };
//
// export const genreScreenListeners = (node, callback) => {
//   let answers = [];
//   let time = 35;
//   let sendButton = node.querySelector(`.genre-answer-send`);
//   let answerButtons = node.querySelectorAll(`input[name="answer"]`);
//
//   for (let i = 0; i < answerButtons.length; i++) {
//     answerButtons[i].addEventListener(`change`, function () {
//       let checkedNum = document.querySelectorAll(`input[name="answer"]:checked`).length;
//       if (checkedNum > 0 && sendButton.disabled) {
//         sendButton.disabled = false;
//       } else if (checkedNum === 0) {
//         sendButton.disabled = true;
//       }
//     });
//   }
//
//   sendButton.addEventListener(`click`, function (e) {
//     e.preventDefault();
//
//     let checked = document.querySelectorAll(`input[name="answer"]:checked`);
//     for (let it of checked) {
//       answers.push(it.value);
//     }
//
//     callback(answers, time);
//   });
// };

