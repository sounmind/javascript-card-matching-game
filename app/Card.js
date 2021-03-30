import CONSTANTS from "./constants";
import GameBoard from "./GameBoard";

export default class Card {
  #imageSource;
  #itsElement;

  constructor(imageSource, orderInBoard) {
    this.#imageSource = imageSource;
    this.#itsElement = GameBoard.getCardElements()[orderInBoard];

    const $cardImage = this.#itsElement.querySelector(CONSTANTS.cardImageQuery);
    $cardImage.src = imageSource;
    $cardImage.dataset.index = orderInBoard;
  }

  getImage = () => this.#imageSource;

  getItsElement = () => this.#itsElement;
}
