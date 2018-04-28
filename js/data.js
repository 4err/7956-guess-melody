/**
 * Created by Denis on 10.04.2018.
 */
export const defaultSettings = {
  time: 300,
  maxErrors: 3,
};

export const IS_DEBUG = true;

export const COUNT_RULES = {
  isCorrect: 1,
  isFast: 1,
  isFail: 2,
  fastTime: 30
};

export const Result = {
  TIME: 0,
  MISTAKES: 1,
  WIN: 2,
  NEXT_LEVEL: 3
};

export const initialGameStatus = {
  questionNum: -1,
  time: defaultSettings.time,
  mistakes: 0,
  maxErrors: defaultSettings.maxErrors,
  points: 0,
  answers: []
};
