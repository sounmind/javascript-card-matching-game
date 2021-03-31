import CONSTANTS from "./constants";
import GameBoard from "./GameBoard";
import Player from "./Player";
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
    const [optionName, optionType] = [target.dataset.optionName, target.dataset.optionType];
    if (optionType === CONSTANTS.playerOptionName) {
      this.#playerOption = optionName;
      this.#createPlayerList();
    }
    if (optionType === CONSTANTS.sizeOptionName) {
      this.#sizeOption = parseInt(target.dataset.optionName);
    }
    Array.from(document.getElementsByClassName(optionType)).forEach(({ classList }) =>
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
    const { invisibleClass, flipClass, unclickableClass, clickedClass } = CONSTANTS;
    GameBoard.$cardsContainer.removeEventListener("click", clickCardCallBack);
    GameBoard.$stopAndShowButton.classList.remove(invisibleClass);
    Array.from(GameBoard.$cards).forEach(($card) => $card.classList.remove(unclickableClass, flipClass));
    ScoreBoard.$statuses.forEach(($status) => $status.classList.add(invisibleClass));

    GameController.$gameOptionContainer.classList.remove(invisibleClass);
    GameController.$gameOptions.forEach(($option) => $option.classList.remove(clickedClass, unclickableClass));
    GameController.$gameResult.textContent = "";
    GameController.$gameDescription.textContent = "";
    GameController.$gameContainer.classList.add(invisibleClass);

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
