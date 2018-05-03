/**
 * Created by Denis on 28.04.2018.
 */

import AbstractView from "./abstract-view";

export default class LoadingView extends AbstractView {

  get template() {
    return `<section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">${this.data.title}</h2>
    <div class="main-stat">${this.data.text}</div>`;
  }
}
