/**
 * Created by Denis on 10.04.2018.
 */
const getGenreAnswer = (answer, num) => `
    <div class="genre-answer">
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
      </div>
`;

const getArtistAnswer = (answer, num) => `
    <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${num}" name="answer" value="${num}"/>
          <label class="main-answer" for="answer-${num}">
            <img class="main-answer-preview" src="${answer.pic}"
                 alt="${answer.name}" width="134" height="134">
            ${answer.name}
          </label>
    </div>
`;

export default (answers, type) => {
  let answersArr = [];
  for (let i = 0; i < answers.length; i++) {
    let it = answers[i];
    let template = ``;
    switch (type) {
      case `genre`:
        template = getGenreAnswer(it, i);
        break;
      case `artist`:
        template = getArtistAnswer(it, i);
        break;
    }

    answersArr.push(template);
  }

  return answersArr.join(``);
};
