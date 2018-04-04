/**
 * Created by Denis on 03.04.2018.
 */
import {assert} from "chai";
import {countPoints, showResult} from "./count-points";

describe(`Count game points`, () => {
  const notEnoghAnswers = [
    {
      isCorrect: false,
      time: 35
    },
    {
      isCorrect: true,
      time: 25
    },
    {
      isCorrect: false,
      time: 35
    },
    {
      isCorrect: false,
      time: 35
    }
  ];
  const allCorrectAnswersAndSlow = [
    {
      isCorrect: true,
      time: 35
    },
    {
      isCorrect: true,
      time: 35
    },
    {
      isCorrect: true,
      time: 35
    },
    {
      isCorrect: true,
      time: 35
    },
    {
      isCorrect: true,
      time: 35
    },
    {
      isCorrect: true,
      time: 35
    },
    {
      isCorrect: true,
      time: 35
    },
    {
      isCorrect: true,
      time: 35
    },
    {
      isCorrect: true,
      time: 35
    },
    {
      isCorrect: true,
      time: 35
    }
  ];
  const aLotOfAnswers = [
    {
      isCorrect: true,
      time: 35
    },
    {
      isCorrect: true,
      time: 35
    },
    {
      isCorrect: true,
      time: 35
    },
    {
      isCorrect: true,
      time: 35
    },
    {
      isCorrect: true,
      time: 35
    },
    {
      isCorrect: true,
      time: 35
    },
    {
      isCorrect: true,
      time: 35
    },
    {
      isCorrect: true,
      time: 35
    },
    {
      isCorrect: true,
      time: 35
    },
    {
      isCorrect: true,
      time: 35
    },
    {
      isCorrect: true,
      time: 35
    }
  ];

  const allCorrectAnswers = [
    {
      isCorrect: true,
      time: 25
    },
    {
      isCorrect: true,
      time: 25
    }, {
      isCorrect: true,
      time: 25
    }, {
      isCorrect: true,
      time: 25
    }, {
      isCorrect: true,
      time: 25
    }, {
      isCorrect: true,
      time: 25
    }, {
      isCorrect: true,
      time: 25
    }, {
      isCorrect: true,
      time: 25
    }, {
      isCorrect: true,
      time: 25
    }, {
      isCorrect: true,
      time: 25
    }
  ];
  const randomAnswers = [
    {
      isCorrect: true,
      time: 25
    },
    {
      isCorrect: true,
      time: 35
    }, {
      isCorrect: true,
      time: 55
    }, {
      isCorrect: true,
      time: 35
    }, {
      isCorrect: false,
      time: 25
    }, {
      isCorrect: true,
      time: 25
    }, {
      isCorrect: false,
      time: 25
    }, {
      isCorrect: true,
      time: 35
    }, {
      isCorrect: true,
      time: 25
    }, {
      isCorrect: true,
      time: 35
    }
  ];

  it(`should return -1. Not enough answers.`, () => {
    let points = countPoints(notEnoghAnswers, 3);
    assert.equal(points, -1);
  });
  it(`should return -1. A lot of answers.`, () => {
    let points = countPoints(aLotOfAnswers, 3);
    assert.equal(points, -1);
  });
  it(`should return -1. No parameters.`, () => {
    let points = countPoints();
    assert.equal(points, -1);
  });
  it(`should return -1. 3 fails.`, () => {
    let points = countPoints(allCorrectAnswers, 0);
    assert.equal(points, -1);
  });
  it(`should return 10. All correct and slow.`, () => {
    let points = countPoints(allCorrectAnswersAndSlow, 3);
    assert.equal(points, 10);
  });
  it(`should return 20. All correct and fast.`, () => {
    let points = countPoints(allCorrectAnswers, 3);
    assert.equal(points, 20);
  });
  it(`should return 7. Random answers 1.`, () => {
    let points = countPoints(randomAnswers, 1);
    assert.equal(points, 7);
  });
});

describe(`Show current player result`, () => {
  const failByTime = `Время вышло! Вы не успели отгадать все мелодии`;
  const failByNotes = `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  const otherPlayersResults = [10, 5, 12, 18, 19, 1];
  const failPlayerByTime = {
    points: 3,
    notes: 3,
    time: 0
  };
  const failPlayerByNotes = {
    points: 3,
    notes: 0,
    time: 24
  };
  const winTop = {
    points: 20,
    notes: 3,
    time: 12
  };
  const winMiddle = {
    points: 15,
    notes: 1,
    time: 12
  };
  const winBottom = {
    points: 1,
    notes: 1,
    time: 12
  };
  it(`should return fail by time.`, () => {
    let result = showResult(otherPlayersResults, failPlayerByTime);
    assert.equal(result, failByTime);
  });
  it(`should return fail by notes.`, () => {
    let result = showResult(otherPlayersResults, failPlayerByNotes);
    assert.equal(result, failByNotes);
  });

  it(`should return wins.`, () => {
    let result1 = showResult(otherPlayersResults.slice(), winTop);
    assert.equal(result1, `Вы заняли 1-ое место из 7 игроков. Это лучше, чем у 86% игроков`);

    let result2 = showResult(otherPlayersResults.slice(), winMiddle);
    assert.equal(result2, `Вы заняли 3-ое место из 7 игроков. Это лучше, чем у 57% игроков`);

    let result3 = showResult(otherPlayersResults.slice(), winBottom);
    assert.equal(result3, `Вы заняли 6-ое место из 7 игроков. Это лучше, чем у 14% игроков`);
  });

});
