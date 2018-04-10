/**
 * Created by Denis on 30.03.2018.
 */
import {getElementFromHtml, printScreen} from "../utils";
import header from "./header";
import {gameStatus} from "../data";
import getAnswersTemplate from "./genre-answer-screen";

const answersTemplate = getAnswersTemplate(question.answers);
const template = (question) =>`
    <div class="main-wrap">
      <h2 class="title">${question.text}</h2>
      <form class="genre">
        ${answersTemplate}
        <button class="genre-answer-send" disabled type="submit">Ответить</button>
      </form>
    </div>
`;

const headerNode = getElementFromHtml(header(gameStatus));
const templateNode = getElementFromHtml(template(question));

const results = [`resultFail`, `resultTimeout`, `resultWin`];
const answers = templateNode.querySelectorAll(`input[name="answer"]`);
let sendButton = templateNode.querySelector(`.genre-answer-send`);

for (let i = 0; i < answers.length; i++) {
  answers[i].addEventListener(`change`, function () {
    let checkedNum = document.querySelectorAll(`input[name="answer"]:checked`).length;
    if (checkedNum > 0 && sendButton.disabled) {
      sendButton.disabled = false;
    } else if (checkedNum === 0) {
      sendButton.disabled = true;
    }
  });
}

sendButton.addEventListener(`click`, function () {
  printScreen(results[Math.floor(Math.random() * 3)]);
});
export default templateNode;
