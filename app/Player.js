export default class Player {
  #name;

  constructor(name) {
    this.#name = name;
  }

  getName = () => this.#name;
}
