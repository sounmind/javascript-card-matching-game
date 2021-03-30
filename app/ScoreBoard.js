import CONSTANTS from "./constants";

export default class ScoreBoard {
  $gameStatus;
  $scoreList;
  static $statuses = Array.from(document.querySelectorAll(CONSTANTS.statusQuery));
  static $leftPlayerName = document.querySelector(CONSTANTS.leftPlayerNameQuery);
  static $rightPlayerName = document.querySelector(CONSTANTS.rightPlayerNameQuery);
  static $soloPlayerName = document.querySelector(CONSTANTS.soloPlayerNameQuery);

  #playerOption;
  #maxScore;
  #playerList = [];
  #leftPlayer;
  #rightPlayer;
  #playerNameAndScore = {};

  constructor(gameController) {
    this.#playerOption = gameController.getPlayerOption();
    this.#maxScore = gameController.getSizeOption() / 2;
    this.#playerList = gameController.getPlayerList();
    [this.#leftPlayer, this.#rightPlayer] = this.#playerList;

    this.$gameStatus = ScoreBoard.$statuses.find(
      ({ dataset: { playerOption } }) => playerOption === this.#playerOption
    );
    this.$scoreList = Array.from(this.$gameStatus.querySelectorAll(CONSTANTS.playerScoreQuery));

    for (let i = 0; i < this.#playerList.length; i++) {
      this.#playerNameAndScore[this.#playerList[i].getName()] = { score: 0, scoreElement: this.$scoreList[i] };
      this.$scoreList[i].textContent = 0;
    }

    if (this.#rightPlayer) {
      ScoreBoard.$leftPlayerName.textContent = this.#leftPlayer.getName();
      ScoreBoard.$rightPlayerName.textContent = this.#rightPlayer.getName();
    }
    ScoreBoard.$soloPlayerName.textContent = this.#leftPlayer.getName();

    this.#showStatusElement();
  }

  #showStatusElement = () => this.$gameStatus.classList.remove(CONSTANTS.invisibleClass);

  addScore = (playerName) => {
    const player = this.#playerNameAndScore[playerName];
    player.score += 1;
    player.scoreElement.textContent = player.score;
  };

  getScore = (playerName) => this.#playerNameAndScore[playerName].score;

  isMaxScore = (playerName) => {
    if (this.#rightPlayer) {
      let sumScore = 0;
      for (let i = 0; i < this.#playerList.length; i++) {
        sumScore += this.#playerNameAndScore[this.#playerList[i].getName()].score;
      }
      return sumScore === this.#maxScore;
    } else {
      return this.#playerNameAndScore[playerName].score === this.#maxScore;
    }
  };

  getWinner = () => {
    const leftScore = this.#playerNameAndScore[this.#leftPlayer.getName()].score;
    const rightScore = this.#playerNameAndScore[this.#rightPlayer.getName()].score;
    const winnerScore = Math.max(leftScore, rightScore);
    if (winnerScore === 0 || leftScore === rightScore) {
      return null;
    }
    return this.#playerList.find((player) => this.#playerNameAndScore[player.getName()].score === winnerScore);
  };
}
