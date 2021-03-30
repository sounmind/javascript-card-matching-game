const ERROR_MESSAGE_BOARD_SIZE = "알맞지 않은 카드 개수입니다.";

const QUERY_GAME_CONTAINER = ".game-container";
const QUERY_CARDS_CONTAINER = ".cards-container";
const QUERY_CARD = ".card";
const QUERY_CARD_IMAGE = ".card-image";
const QUERY_GAME_OPTIONS = ".game-options";
const QUERY_GAME_OPTION = ".option";
const QUERY_STATUS = ".status";
const QUERY_SOLO_STATUS = ".status--solo";
const QUERY_DUO_STATUS = ".status--duo";
const QUERY_PLAYER_SCORE = ".player-score";
const QUERY_RESTART_BUTTON = ".restart-button";
const QUERY_STOP_AND_SHOW_BUTTON = ".stop-and-show-button";
const QUERY_GAME_RESULT = ".game-result";
const QUERY_GAME_DESCRIPTION = ".description";
const QUERY_LEFT_PLAYER_NAME = ".left.player-name";
const QUERY_RIGHT_PLAYER_NAME = ".right.player-name";
const QUERY_SOLO_PLAYER_NAME = ".solo.player-name";

const CLASS_CARD = "card";
const CLASS_FLIP = "flip";
const CLASS_UNCLICKABLE = "unclickable";
const CLASS_OPTION = "option";
const CLASS_PLAYER_OPTION = "player-option";
const CLASS_SIZE_OPTION = "size-option";
const CLASS_CLICKED = "clicked";
const CLASS_INVISIBLE = "invisible";
const CLASS_CARD_IMAGE_CONTAINER = "card-image-container";

const TAG_IMG = "IMG";

const PLAYER_OPTION_DUO = "solo";
const PLAYER_OPTION_SOLO = "duo";

const NAME_PLAYER_SOLO = "짝 맞추기 달인";
const NAMES_PLAYER_DUO = ["카드 달인", "카드 장인"];

const MAX_CARD_FLIPS_PER_TURN = 2;

const WAITING_TIME_BEFORE_GAME_START = "1500";
const WAITING_TIME_CARD_MATCHING = "500";

const MESSAGE_TURN_DESCRIPTION = " 님의 차례입니다.";
const MESSAGE_WIN = " (이)가 이겼어요!";
const MESSAGE_DRAW = "서로 비겼어요!";
const MESSAGE_GAME_END = "게임이 끝났어요!";

const CONSTANTS = {
  boardSizeErrorMessage: ERROR_MESSAGE_BOARD_SIZE,

  cardsContainerQuery: QUERY_CARDS_CONTAINER,
  cardQuery: QUERY_CARD,
  cardImageQuery: QUERY_CARD_IMAGE,
  gameOptionsQuery: QUERY_GAME_OPTIONS,
  gameOptionQuery: QUERY_GAME_OPTION,
  gameContainerQuery: QUERY_GAME_CONTAINER,
  statusQuery: QUERY_STATUS,
  soloStatusQuery: QUERY_SOLO_STATUS,
  duoStatusQuery: QUERY_DUO_STATUS,
  playerScoreQuery: QUERY_PLAYER_SCORE,
  restartButtonQuery: QUERY_RESTART_BUTTON,
  stopAndShowButtonQuery: QUERY_STOP_AND_SHOW_BUTTON,
  gameResultQuery: QUERY_GAME_RESULT,
  gameDescriptionQuery: QUERY_GAME_DESCRIPTION,
  leftPlayerNameQuery: QUERY_LEFT_PLAYER_NAME,
  rightPlayerNameQuery: QUERY_RIGHT_PLAYER_NAME,
  soloPlayerNameQuery: QUERY_SOLO_PLAYER_NAME,

  cardClass: CLASS_CARD,
  flipClass: CLASS_FLIP,
  unclickableClass: CLASS_UNCLICKABLE,
  optionClass: CLASS_OPTION,
  playerOptionClass: CLASS_PLAYER_OPTION,
  sizeOptionClass: CLASS_SIZE_OPTION,
  clickedClass: CLASS_CLICKED,
  invisibleClass: CLASS_INVISIBLE,
  cardImageContainerClass: CLASS_CARD_IMAGE_CONTAINER,

  imgTag: TAG_IMG,

  playerOptionSolo: PLAYER_OPTION_DUO,
  playerOptionDuo: PLAYER_OPTION_SOLO,

  soloPlayerName: NAME_PLAYER_SOLO,
  duoPlayerNames: NAMES_PLAYER_DUO,

  maxCardFlipsPerTurn: MAX_CARD_FLIPS_PER_TURN,

  beforeGameStartWaitingTime: WAITING_TIME_BEFORE_GAME_START,
  cardMatchingWaitingTime: WAITING_TIME_CARD_MATCHING,

  turnDescriptionMessage: MESSAGE_TURN_DESCRIPTION,
  winMessage: MESSAGE_WIN,
  drawMessage: MESSAGE_DRAW,
  endMessage: MESSAGE_GAME_END,
};

export default CONSTANTS;
