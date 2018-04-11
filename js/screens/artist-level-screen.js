/**
 * Created by Denis on 30.03.2018.
 */
import getAnswersTemplate from "./answer-screen";

const template = (question, answers) =>`
    <div class="main-wrap">
      <h2 class="title main-title">Кто исполняет эту песню?</h2>
      <div class="player-wrapper">
        <div class="player">
          <audio src="${question.audio}"></audio>
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

export const artistScreen = (question) => {
  let answersTemplate = getAnswersTemplate(question.answers, `artist`);
  return template(question, answersTemplate);
};

export const artistScreenListeners = (node, callback) => {
  let answers = [];
  let time = 35;

  let answerButtons = node.querySelectorAll(`input[name="answer"]`);
  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].addEventListener(`change`, function () {
      let answer = answerButtons[i].value;
      answers.push(answer);
      callback(answers, time);
    });
  }
};
