/**
 * Created by Denis on 10.04.2018.
 */
export const defaultSettings = {
  time: 300,
  maxErrors: 3,
};

export const COUNT_RULES = {
  isCorrect: 1,
  isFast: 1,
  isFail: 2,
  fastTime: 30
};

export const initialGameStatus = {
  questionNum: -1,
  time: defaultSettings.time,
  mistakes: 0,
  points: 0,
  answers: []
};

export const questions = [
  {
    type: `artist`,
    answers: [
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        name: `Jingle Punks`,
        pic: `https://i.vimeocdn.com/portrait/992615_300x300`,
        isCorrect: false
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=c541cfe3d233b75d`,
        name: `Gunnar Olsen`,
        pic: `https://f4.bcbits.com/img/0004181452_10.jpg`,
        isCorrect: false
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=e8d98b09f89328dc`,
        name: `Audionautix`,
        pic: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
        isCorrect: true
      },
    ]
  },
  {
    type: `genre`,
    text: `Выберите инди-рок треки`,
    answers: [
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        isCorrect: false
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=c541cfe3d233b75d`,
        isCorrect: false
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=e8d98b09f89328dc`,
        isCorrect: true
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=ff09cf8d6a1f705c`,
        isCorrect: false
      },
    ]
  },
  {
    type: `genre`,
    text: `Выберите RnB треки`,
    answers: [
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        isCorrect: false
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=c541cfe3d233b75d`,
        isCorrect: false
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=e8d98b09f89328dc`,
        isCorrect: true
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=ff09cf8d6a1f705c`,
        isCorrect: false
      },
    ]
  },
  {
    type: `genre`,
    text: `Выберите инди-рок треки`,
    answers: [
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        isCorrect: false
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=c541cfe3d233b75d`,
        isCorrect: false
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=e8d98b09f89328dc`,
        isCorrect: true
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=ff09cf8d6a1f705c`,
        isCorrect: false
      },
    ]
  },
  {
    type: `genre`,
    text: `Выберите инди-рок треки`,
    answers: [
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        isCorrect: false
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=c541cfe3d233b75d`,
        isCorrect: false
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=e8d98b09f89328dc`,
        isCorrect: true
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=ff09cf8d6a1f705c`,
        isCorrect: false
      },
    ]
  },
  {
    type: `genre`,
    text: `Выберите инди-рок треки`,
    answers: [
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        isCorrect: false
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=c541cfe3d233b75d`,
        isCorrect: false
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=e8d98b09f89328dc`,
        isCorrect: true
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=ff09cf8d6a1f705c`,
        isCorrect: false
      },
    ]
  },
  {
    type: `genre`,
    text: `Выберите инди-рок треки`,
    answers: [
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        isCorrect: false
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=c541cfe3d233b75d`,
        isCorrect: false
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=e8d98b09f89328dc`,
        isCorrect: true
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=ff09cf8d6a1f705c`,
        isCorrect: false
      },
    ]
  },
  {
    type: `genre`,
    text: `Выберите инди-рок треки`,
    answers: [
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        isCorrect: false
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=c541cfe3d233b75d`,
        isCorrect: false
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=e8d98b09f89328dc`,
        isCorrect: true
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=ff09cf8d6a1f705c`,
        isCorrect: false
      },
    ]
  },
  {
    type: `genre`,
    text: `Выберите инди-рок треки`,
    answers: [
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        isCorrect: false
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=c541cfe3d233b75d`,
        isCorrect: false
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=e8d98b09f89328dc`,
        isCorrect: true
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=ff09cf8d6a1f705c`,
        isCorrect: false
      },
    ]
  },
  {
    type: `genre`,
    text: `Выберите инди-рок треки`,
    answers: [
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        isCorrect: false
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=c541cfe3d233b75d`,
        isCorrect: false
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=e8d98b09f89328dc`,
        isCorrect: true
      },
      {
        audio: `https://www.youtube.com/audiolibrary_download?vid=ff09cf8d6a1f705c`,
        isCorrect: false
      },
    ]
  },

];
