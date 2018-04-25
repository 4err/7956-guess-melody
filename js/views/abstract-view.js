/**
 * Created by Denis on 13.04.2018.
 */

export class AbstractView {
  constructor(data = ``) {
    this.data = data;
    this._element = null;
  }

  get template() {
  }

  render(html) {
    let template = document.createElement(`div`);
    template.innerHTML = html;
    return template;
  }

  bind() {
  }

  get element() {
    if (this._element === null) {
      let node = this.render(this.template);

      this.bind(node);

      this._element = node;
    }

    return this._element;
  }
}
