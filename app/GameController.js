import CONSTANTS from "./constants";
import GameBoard from "./GameBoard";
import Player from "./player";
import ScoreBoard from "./ScoreBoard";

export default class GameController {
  static $gameOptionContainer = document.querySelector(CONSTANTS.gameOptionsQuery);
  static $gameOptions = document.querySelectorAll(CONSTANTS.gameOptionQuery);
  static $gameResult = document.querySelector(CONSTANTS.gameResultQuery);
  static $gameDescription = document.querySelector(CONSTANTS.gameDescriptionQuery);
  static $gameContainer = document.querySelector(CONSTANTS.gameContainerQuery);

  #playerOption;
  #sizeOption;
  #gameBoard;
  #scoreBoard;
  #playerList = [];

  constructor() {
    GameController.$gameOptionContainer.addEventListener("click", this.#handleClickGameOption);
  }

  #handleClickGameOption = ({ target }) => {
    const targetClassList = Array.from(target.classList);
    if (!targetClassList.includes(CONSTANTS.optionClass)) {
      return;
    }
    const [optionNameClass, optionTypeClass] = [targetClassList.pop(), targetClassList.pop()];
    if (optionTypeClass === CONSTANTS.playerOptionClass) {
      this.#playerOption = optionNameClass;
      this.#createPlayerList();
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
        GameController.$gameOptionContainer.classList.add(CONSTANTS.invisibleClass);
        this.#startGame();
      }, CONSTANTS.beforeGameStartWaitingTime);
    }
  };

  #createPlayerList = () => {
    if (this.#playerOption === CONSTANTS.playerOptionSolo) {
      this.#playerList.push(new Player(CONSTANTS.soloPlayerName));
    }
    if (this.#playerOption === CONSTANTS.playerOptionDuo) {
      CONSTANTS.duoPlayerNames.forEach((name) => this.#playerList.push(new Player(name)));
    }
  };

  #startGame = () => {
    GameController.$gameContainer.classList.remove(CONSTANTS.invisibleClass);
    this.#scoreBoard = new ScoreBoard(this);
    this.#gameBoard = new GameBoard(this);
  };

  getPlayerOption = () => this.#playerOption;

  getSizeOption = () => this.#sizeOption;

  getPlayerList = () => this.#playerList;

  getGameBoard = () => this.#gameBoard;

  getScoreBoard = () => this.#scoreBoard;

  handleRestartButton = (clickCardCallBack) => () => {
    GameBoard.$cardsContainer.removeEventListener("click", clickCardCallBack);
    GameBoard.$stopAndShowButton.classList.remove(CONSTANTS.invisibleClass);
    Array.from(GameBoard.$cards).forEach(($card) =>
      $card.classList.remove(CONSTANTS.unclickableClass, CONSTANTS.flipClass)
    );
    ScoreBoard.$statuses.forEach(($status) => $status.classList.add(CONSTANTS.invisibleClass));

    GameController.$gameOptionContainer.classList.remove(CONSTANTS.invisibleClass);
    GameController.$gameOptions.forEach(($option) =>
      $option.classList.remove(CONSTANTS.clickedClass, CONSTANTS.unclickableClass)
    );
    GameController.$gameResult.textContent = "";
    GameController.$gameDescription.textContent = "";

    GameController.$gameContainer.classList.add(CONSTANTS.invisibleClass);

    this.#playerOption = null;
    this.#sizeOption = null;
    this.#gameBoard = null;
    this.#scoreBoard = null;
    this.#playerList = [];
  };

  handleWin = (winner) => (GameController.$gameDescription.textContent = winner.getName() + CONSTANTS.winMessage);

  handleDraw = () => (GameController.$gameDescription.textContent = CONSTANTS.drawMessage);

  endGame = () => (GameController.$gameResult.textContent = CONSTANTS.endMessage);
}
