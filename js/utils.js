/**
 * Created by Denis on 30.03.2018.
 */

/**
 * Slow cloning obj function
 * @param {Object} o
 * @return {Object}
 */
export const clone = (o) => JSON.parse(JSON.stringify(o));

/**
 * Plural function
 * @param {int} num
 * @param {Array} pluralArr
 * @return {*}
 */
export const plural = (num, pluralArr) => {
  let n = Math.abs(num);

  n %= 100;
  if (n >= 5 && n <= 20) {
    return pluralArr[2];
  }
  n %= 10;
  if (n === 1) {
    return pluralArr[0];
  }
  if (n >= 2 && n <= 4) {
    return pluralArr[1];
  }
  return pluralArr[3];
};

/**
 * Creating timer
 * @param {int} t
 * @return {{time: *, completed: number, tick: (function()), onComplete: (function())}}
 */
export const setTimer = (t) => {
  let timer = {
    time: t,
    completed: 0,
    tick() {
      this.time--;

      if (this.time <= 0) {
        this.onComplete();
      }
    },
    onComplete() {
      this.completed = 1;
    }
  };

  return timer;
};
