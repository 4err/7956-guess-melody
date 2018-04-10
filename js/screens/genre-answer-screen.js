/**
 * Created by Denis on 10.04.2018.
 */
const getAnswer = (answer, num) => `
    <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio>${answer.audio}</audio>
              <button class="player-control player-control--pause"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-${num}" id="a-${num}">
          <label class="genre-answer-check" for="a-${num}"></label>
      </div>
`;

export default (answers) => {
  let answersArr = [];
  for (let i = 0; i < answers.length; i++) {
    let it = answers[i];
    answersArr.push(getAnswer(it, i));
  }

  return answersArr.join(``);
};
