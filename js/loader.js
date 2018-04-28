/**
 * Created by Denis on 28.04.2018.
 */

const APP_ID = `7956`;

const QUESTIONS_URL = `https://es.dump.academy/guess-melody/questions`;
const STATS_URL = `https://es.dump.academy/guess-melody/stats/${APP_ID}`;

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export class Loader {
  static loadQuestions() {
    return window.fetch(QUESTIONS_URL)
      .then(checkStatus)
      .then((response) => response.json());
  }

  static getStats() {
    return window.fetch(STATS_URL).then(checkStatus).then((response) => response.json());
  }

  static saveResults(points) {
    const requestSettings = {
      body: JSON.stringify({
        points
      }),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(STATS_URL, requestSettings).then(checkStatus);
  }

}
