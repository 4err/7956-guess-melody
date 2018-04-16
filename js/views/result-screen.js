/**
 * Created by Denis on 11.04.2018.
 */

import {AbstractView} from "./abstract-view";

export class ResultView extends AbstractView {
  get template() {
    return `
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">${this.data.title}</h2>
    <div class="main-stat">${this.data.stat}</div>
    <span role="button" tabindex="0" class="main-replay">${this.data.replay}</span>
`;
  }

  bind(node) {
    node.querySelector(`.main-replay`).addEventListener(`click`, () => {
      this.onClick();
    });
  }

  onClick() {
  }

}
