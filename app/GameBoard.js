import Card from "./Card";
import CONSTANTS from "./constants";
import IMAGES from "./images";

export default class GameBoard {
  #gameController;
  #scoreBoard;
  #size = 0;
  #cardRepository = [];
  #cardIndexList = [];
  #flippedCards = [];
  #timerId;
  #leftPlayer;
  #rightPlayer;
  #activePlayer;

  static $restartButton = document.querySelector(CONSTANTS.restartButtonQuery);
  static $stopAndShowButton = document.querySelector(CONSTANTS.stopAndShowButtonQuery);
  static $description = document.querySelector(CONSTANTS.gameDescriptionQuery);
  static $cardsContainer = document.querySelector(CONSTANTS.cardsContainerQuery);
  static $cards = document.getElementsByClassName(CONSTANTS.cardClass);

  constructor(gameController) {
    console.log(GameBoard.$cards);

    this.#gameController = gameController;
    this.#scoreBoard = gameController.getScoreBoard();
    this.#size = gameController.getSizeOption();
    GameBoard.$cardsContainer.dataset.size = this.#size;
    this.#createCardElements();

    this.#cardRepository = Array(this.#size);
    this.#cardIndexList = Array(this.#size)
      .fill(0)
      .map((value, index) => (value = index));
    this.#shufflecardIndexList(this.#cardIndexList);
    this.#createAndStoreCards();

    [this.#leftPlayer, this.#rightPlayer] = gameController.getPlayerList();
    this.#activePlayer = this.#leftPlayer;

    GameBoard.$cardsContainer.addEventListener("click", this.#handleClickCard);
    GameBoard.$restartButton.addEventListener(
      "click",
      this.#gameController.handleRestartButton(this.#handleClickCard),
      { once: true }
    );
    GameBoard.$stopAndShowButton.addEventListener("click", this.#handleStopAndShowButton, { once: true });

    this.#printTrunDescription();
  }

  static getCardElements = () => GameBoard.$cards;

  #shufflecardIndexList = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  #createCardElements = () => {
    const card = document.querySelector(".card");
    for (let i = 1; i < this.#size; i++) {
      const newCard = card.cloneNode(true);
      newCard.dataset.number = i;
      GameBoard.$cardsContainer.appendChild(newCard);
    }
  };

  #createAndStoreCards = () => {
    for (let i = 0, j = 0; i < this.#size / 2; i += 1, j += 2) {
      this.#cardRepository[this.#cardIndexList[j]] = new Card(IMAGES[i], this.#cardIndexList[j]);
      this.#cardRepository[this.#cardIndexList[j + 1]] = new Card(IMAGES[i], this.#cardIndexList[j + 1]);
    }
  };

  #handleClickCard = ({ target }) => {
    if (!(target.tagName === CONSTANTS.imgTag || target.classList.contains(CONSTANTS.cardImageContainerClass))) {
      return;
    }
    const cardIndexInBoard = target.dataset.index || target.querySelector(CONSTANTS.imgTag).dataset.index;
    const clickedCard = this.#cardRepository[cardIndexInBoard];

    this.#flippedCards[this.#flippedCards.length] = clickedCard;
    clickedCard.getItsElement().classList.add(CONSTANTS.flipClass, CONSTANTS.unclickableClass);
    if (this.#flippedCards.length === CONSTANTS.maxCardFlipsPerTurn) {
      GameBoard.$cardsContainer.classList.add(CONSTANTS.unclickableClass);
      this.#timerId = setTimeout(this.#judgeCards, CONSTANTS.cardMatchingWaitingTime);
    }
  };

  #judgeCards = () => {
    if (this.#isMatched()) {
      this.#flippedCards.forEach(($card) => $card.getItsElement().classList.add(CONSTANTS.unclickableClass));
    } else {
      this.#flippedCards.forEach(($card) =>
        $card.getItsElement().classList.remove(CONSTANTS.flipClass, CONSTANTS.unclickableClass)
      );
      if (this.#rightPlayer) {
        this.#changeActivePlayer();
      }
    }
    clearTimeout(this.#timerId);
    this.#flippedCards = [];
    GameBoard.$cardsContainer.classList.remove(CONSTANTS.unclickableClass);

    if (this.#scoreBoard.isMaxScore(this.#activePlayer.getName())) {
      this.#printGameResult();
    }
  };

  #isMatched = () => {
    const imageSource = this.#flippedCards[0].getImage();
    for (let i = 1; i < this.#flippedCards.length; i++) {
      if (imageSource !== this.#flippedCards[i].getImage()) {
        return false;
      }
    }
    this.#scoreBoard.addScore(this.#activePlayer.getName());
    return true;
  };

  #changeActivePlayer = () => {
    if (this.#activePlayer === this.#leftPlayer) {
      this.#activePlayer = this.#rightPlayer;
    } else {
      this.#activePlayer = this.#leftPlayer;
    }
    this.#printTrunDescription();
  };

  #printTrunDescription = () =>
    (GameBoard.$description.textContent = this.#activePlayer.getName() + CONSTANTS.turnDescriptionMessage);

  #showAllCards = () => {
    Array.from(GameBoard.$cards).forEach(($card) => {
      $card.classList.add(CONSTANTS.flipClass, CONSTANTS.unclickableClass);
    });
  };

  #printGameResult = () => {
    GameBoard.$stopAndShowButton.classList.add(CONSTANTS.invisibleClass);
    if (this.#rightPlayer) {
      const winner = this.#scoreBoard.getWinner();
      if (winner) {
        this.#gameController.handleWin(winner);
      } else {
        this.#gameController.handleDraw();
      }
    }
    this.#gameController.endGame();
  };

  #handleStopAndShowButton = () => {
    this.#showAllCards();
    this.#printGameResult();
  };
}
