import { BoardGame } from "./board-game";
import { GameValue, GameResult, Board } from "./index";
export class Match {
  // Time of match starting
  private _startTime: Date;
  public get startTime(): Date {
    return this._startTime;
  }
  public initStartTime() {
    this._startTime = new Date();
  }
  // Time of match finish
  private _endTime: Date;
  public get endTime(): Date {
    return this._endTime;
  }
  public initEndTime() {
    this._endTime = new Date();
  }
  // User who win the match
  private _winner: GameValue;
  public get winner(): GameValue {
    return this._winner;
  }
  public set winner(winner: GameValue) {
    this._winner = winner;
  }
  // Actual result of the Game
  private _gameResult: GameResult;
  public get gameResult(): GameResult {
    return this._gameResult;
  }
  public set gameResult(gameResult: GameResult) {
    this._gameResult = gameResult;
  }
  // click of the user
  private _moveCounter: number;
  public get moveCounter(): number {
    return this._moveCounter;
  }
  public incrementMoveCounter() {
    this._moveCounter++;
  }
  // board of the game
  private _boardGame: BoardGame;
  public get boardGame(): BoardGame {
    return this._boardGame;
  }

  constructor() {
    this.initStartTime();
    this._endTime = null;
    this.winner = "";
    this.gameResult = "ongoing";
    this._moveCounter = 0;
    this._boardGame = new BoardGame();
  }
}
