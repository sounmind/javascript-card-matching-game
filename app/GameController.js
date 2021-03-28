import CONSTANTS from "./constants";
import GameBoard from "./GameBoard";

export default class GameController {
  $gameOption = document.querySelector(CONSTANTS.gameOptionQuery);
  $gameContainer = document.querySelector(CONSTANTS.gameContainerQuery);
  #playerOption;
  #sizeOption;
  #gameBoard;

  constructor() {
    this.$gameOption;
    this.$gameOption.addEventListener("click", this.#handleClickGameOption);
  }

  #handleClickGameOption = ({ target }) => {
    const targetClassList = Array.from(target.classList);
    if (!targetClassList.includes(CONSTANTS.optionClass)) {
      return;
    }
    const [optionNameClass, optionTypeClass] = [targetClassList.pop(), targetClassList.pop()];
    if (optionTypeClass === CONSTANTS.playerOptionClass) {
      this.#playerOption = optionNameClass;
    }
    if (optionTypeClass === CONSTANTS.sizeOptionClass) {
      this.#sizeOption = parseInt(target.dataset.size);
    }
    Array.from(document.getElementsByClassName(optionTypeClass)).forEach(({ classList }) =>
      classList.add(CONSTANTS.unclickableClass)
    );
    target.classList.add(CONSTANTS.clickedClass);
    if (this.#playerOption && this.#sizeOption) {
      setTimeout(() => {
        this.$gameOption.classList.add(CONSTANTS.invisibleClass);
        this.#startGame();
      }, CONSTANTS.beforeGameStartWaitingTime);
    }
  };

  #startGame = () => {
    this.$gameContainer.classList.remove(CONSTANTS.invisibleClass);
    const $status = Array.from(document.querySelectorAll(CONSTANTS.statusQuery)).find(
      ({ dataset: { playerOption } }) => playerOption === this.#playerOption
    );
    $status.classList.remove(CONSTANTS.invisibleClass);

    this.#gameBoard = new GameBoard(this.#sizeOption);
  };

  handleClickReset = () => {};

  quitGame = () => {};

  endGame = () => {};
}
