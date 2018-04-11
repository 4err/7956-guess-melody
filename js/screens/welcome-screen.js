/**
 * Created by Denis on 30.03.2018.
 */
import {plural} from "../modules/count-points";

export const welcomeScreen = (settings) => `
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;${Math.round(settings.time / 60)} ${plural(Math.round(settings.time / 60), [`минуту`, `минуты`, `минут`])} ответить на все вопросы.<br>
      Ошибиться можно ${settings.maxErrors} ${plural(settings.maxErrors, [`раз`, `раза`, `раз`])}.<br>
      Удачи!
    </p>
`;

export const welcomeScreenListeners = (node, callback) => {
  node.querySelector(`.main-play`).addEventListener(`click`, function () {
    callback();
  });
};
