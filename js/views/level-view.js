/**
 * Created by Denis on 16.04.2018.
 */
import AbstractView from "./abstract-view";

export default class LevelView extends AbstractView {
  constructor(data) {
    super(data);

    this._answers = [];
    this._time = 35;
  }

  get template() {

  }

  answerTemplate() {

  }

  stopAllAudio() {
    const audios = this._element.querySelectorAll(`audio`);

    for (const audio of audios) {
      audio.pause();
      audio.nextElementSibling.classList.remove(`player-control--pause`);
    }
  }

  bindAudio() {
    const audioButtons = this._element.querySelectorAll(`.player .player-control`);

    for (const button of audioButtons) {
      button.addEventListener(`click`, (e) => {
        e.preventDefault();

        if (button.previousElementSibling.paused === false) {
          button.previousElementSibling.pause();
        } else {
          this.stopAllAudio();
          button.previousElementSibling.play();
        }

        button.classList.toggle(`player-control--pause`);

      });
    }

    this.audioAutoStart();
  }

  audioAutoStart() {
    const audio = this._element.querySelector(`audio`);

    audio.addEventListener(`canplaythrough`, () => {
      audio.play();
      audio.nextElementSibling.classList.toggle(`player-control--pause`);
    });
    // audio.play().then(() => {
    //   audio.nextElementSibling.classList.toggle(`player-control--pause`);
    // }).catch(() => {});

  }

  buildAnswers() {
    let answersArr = [];
    for (let i = 0; i < this.data.answers.length; i++) {

      let it = this.data.answers[i];
      let template = this.answerTemplate(it, i);

      answersArr.push(template);
    }

    return answersArr.join(``);
  }

  get answer() {
    return {
      answer: this._answers,
      time: this._time
    };
  }

}
