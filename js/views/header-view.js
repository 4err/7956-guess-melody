/*
 * Created by Denis on 10.04.2018.
 */
import AbstractView from "./abstract-view";

export default class HeaderView extends AbstractView {

  get template() {
    return `
<div class="header">
<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="
        stroke-dasharray: 2325;
        stroke-dashoffset: ${this.data.timeOffset};
        filter: url(.#blur); 
        transform: rotate(-90deg) scaleY(-1);
        transform-origin: center
        "></circle>
    </svg>
    <div class="timer-value">
        <span class="timer-value-mins">${Math.floor(this.data.time / 60)}</span><!--    
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${(`0` + (this.data.time % 60)).substr(-2)}</span>
      </div>
    <div class="main-mistakes">
    ${new Array(this.data.mistakes)
      .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
      .join(``)}
    </div>
</div>
`;
  }
}
