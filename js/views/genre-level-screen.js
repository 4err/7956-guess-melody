/**
 * Created by Denis on 30.03.2018.
 */
import getAnswersTemplate from "./answer-screen";

const template = (question, answers) =>`
    <div class="main-wrap">
      <h2 class="title">${question.text}</h2>
      <form class="genre">
        ${answers}
        <button class="genre-answer-send" disabled type="submit">Ответить</button>
      </form>
    </div>
`;

export const genreScreen = (question) => {
  let answersTemplate = getAnswersTemplate(question.answers, `genre`);
  return template(question, answersTemplate);
};

export const genreScreenListeners = (node, callback) => {
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

  sendButton.addEventListener(`click`, function (e) {
    e.preventDefault();

    let checked = document.querySelectorAll(`input[name="answer"]:checked`);
    for (let it of checked) {
      answers.push(it.value);
    }

    callback(answers, time);
  });
};

