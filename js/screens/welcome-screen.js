/**
 * Created by Denis on 30.03.2018.
 */
import {getElementFromHtml, printScreen} from '../utils';
import artistScreen from './artist-level-screen.js';

const template = `
<section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
      Ошибиться можно 3 раза.<br>
      Удачи!
    </p>
  </section>
`;
const templateNode = getElementFromHtml(template);

templateNode.querySelector(`.main-play`).addEventListener(`click`, function () {
  printScreen(artistScreen);
});

export default templateNode;
