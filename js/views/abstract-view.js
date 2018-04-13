/**
 * Created by Denis on 13.04.2018.
 */

export class AbstractView {
  constructor(data = ``, isLevel = false, type = ``) {
    this.isLevel = isLevel;
    this.type = type;
    this.data = data;
    this._element = null;
  }

  get template() {
  }

  render(html) {
    let template = document.createElement(`template`);
    template.innerHTML = html;
    return template.content;
  }

  bind() {
  }

  get element() {
    if (this._element === null) {
      let node = this.render(this.template(this.data));
      this.bind(node);
    }

    return this._element;
  }
}
