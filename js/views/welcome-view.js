/**
 * Created by Denis on 30.03.2018.
 */
import {plural} from "../helpers/utils";
import {AbstractView} from "./abstract-view";

export class WelcomeView extends AbstractView {
  get template() {
    return `
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;${Math.round(this.data.time / 60)} ${plural(Math.round(this.data.time / 60), [`минуту`, `минуты`, `минут`])} ответить на все вопросы.<br>
      Ошибиться можно ${this.data.maxErrors} ${plural(this.data.maxErrors, [`раз`, `раза`, `раз`])}.<br>
      Удачи!
    </p>
`;
  }

  bind(node) {
    node.querySelector(`.main-play`).addEventListener(`click`, () => {
      this.onStart();
    });
  }

  onStart() {

  }

}

