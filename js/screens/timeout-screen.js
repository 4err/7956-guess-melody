/**
 * Created by Denis on 30.03.2018.
 */
import {getElementFromHtml, printScreen} from "../utils";

const template = `
<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Увы и ах!</h2>
    <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
  </section>
`;
const templateNode = getElementFromHtml(template);

templateNode.querySelector(`.main-replay`).addEventListener(`click`, function () {
  printScreen(`welcome`);
});

export default templateNode;
