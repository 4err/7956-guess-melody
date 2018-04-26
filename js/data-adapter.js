/**
 * Created by Denis on 26.04.2018.
 */

const QuestionType = {
  GENRE: `genre`,
  ARTIST: `artist`
};

export const adaptServerData = (data) => {
  for (const question of data) {
    switch (question.type) {
      case QuestionType.ARTIST:
        question.audio = question.src;
        question.answers = adaptArtistAnswers(question.answers);
        break;
      case QuestionType.GENRE:
        question.text = question.question;
        question.answers = adaptGenreAnswers(question.answers, question.genre);
        break;
    }
  }

  return data;
};

const adaptArtistAnswers = (answers) =>
  answers.map((answer) => {
    return {
      name: answer.title,
      pic: answer.image.url,
      isCorrect: answer.isCorrect
    };
  });

const adaptGenreAnswers = (answers, genre) =>
  answers.map((answer) => {
    return {
      audio: answer.src,
      isCorrect: answer.genre === genre
    };
  });
