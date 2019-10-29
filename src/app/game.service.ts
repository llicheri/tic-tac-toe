import { HighScore, GameValue, GameResult } from "./models";
import { Injectable, EventEmitter } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
//
// The Observables into this service are used to simulate an async call with the backend
//
export class GameService {
  // HIGHSCORES SAVED ON DB
  private _highScores: { name: string; highScores: HighScore[] }[] = [];
  // date of when the game has been started
  private _startTime: Date;
  //
  private _moveCounter: number = 0;
  // current game
  game: GameValue[] = ["", "", "", "", "", "", "", "", ""];
  //
  gameFinish: EventEmitter<GameResult> = new EventEmitter();

  constructor() {}

  get currentUser(): string {
    const local = localStorage.getItem("currentUser");
    return local ? local : null;
  }
  set currentUser(currentuser: string) {
    localStorage.setItem("currentUser", currentuser);
  }
  get startTime(): Date {
    return this._startTime;
  }

  // return saved highscores
  getUserHighScores(): Observable<HighScore[]> {
    const dbRecord = this._highScores.find(el => el.name === this.currentUser);
    let ret = [];
    if (dbRecord) {
      ret = dbRecord.highScores;
    }
    ret = ret.sort((a, b) => {
      return Number(a.time > b.time);
    });
    return of(ret);
  }

  // add an user highscores
  addUserHighscore(highscore: HighScore): Observable<any> {
    const dbRecord = this._highScores.find(el => el.name === this.currentUser);
    // push the new highscore into object
    if (dbRecord) {
      dbRecord.highScores.push(highscore);
    } else {
      // for first highscore create the object
      this._highScores.push({
        name: this.currentUser,
        highScores: [highscore]
      });
    }
    return of();
  }

  // initialize the game
  startGame(): Observable<any> {
    this._startTime = new Date();
    this._moveCounter = 0;
    this.game = ["", "", "", "", "", "", "", "", ""];
    return of(true);
  }

  // this method returns a randon index of the cell the IA crosses
  private getRndmIndex() {
    const indexes = [];
    this.game.forEach((el, index) => {
      if (el === "") {
        indexes.push(index);
      }
    });
    var rndm = Math.floor(Math.random() * indexes.length);
    return indexes[rndm];
  }

  private playerToNum(player: GameValue): number {
    let ret = 0;
    switch (player) {
      case "O":
        ret = -1;
        break;
      case "X":
        ret = 1;
        break;
    }
    return ret;
  }

  // calculate if there si a winner
  private whoWin(): GameValue {
    let winner: GameValue = "";
    const matrix: number[][] = [
      [
        this.playerToNum(this.game[0]),
        this.playerToNum(this.game[1]),
        this.playerToNum(this.game[2])
      ],
      [
        this.playerToNum(this.game[3]),
        this.playerToNum(this.game[4]),
        this.playerToNum(this.game[5])
      ],
      [
        this.playerToNum(this.game[6]),
        this.playerToNum(this.game[7]),
        this.playerToNum(this.game[8])
      ]
    ];
    const sums = [
      matrix[0][0] + matrix[0][1] + matrix[0][2],
      matrix[1][0] + matrix[1][1] + matrix[1][2],
      matrix[2][0] + matrix[2][1] + matrix[2][2],
      matrix[0][0] + matrix[1][0] + matrix[2][0],
      matrix[0][1] + matrix[1][1] + matrix[2][1],
      matrix[0][2] + matrix[1][2] + matrix[2][2],
      matrix[0][0] + matrix[1][1] + matrix[2][2],
      matrix[0][2] + matrix[1][1] + matrix[2][0]
    ];

    if (sums.indexOf(3) >= 0) {
      winner = "X";
    } else if (sums.indexOf(-3) >= 0) {
      winner = "O";
    }

    return winner;
  }

  saveWin() {
    const time = new Date().getTime() - this._startTime.getTime();
    this.addUserHighscore({ moves: this._moveCounter, time: time });
  }

  // functionCalled when a user click on a cell
  userClick(index: number): Observable<GameValue[]> {
    // increment move counter
    this._moveCounter++;
    // cross user cell
    this.game[index] = "X";
    // CALCULATE IA CLICK
    if (!this.whoWin()) {
      this.game[this.getRndmIndex()] = "O";
    }
    // calculate if someone wins
    const winner = this.whoWin();
    if (winner === "X") {
      // win user
      this.gameFinish.emit("win");
      this.saveWin();
    } else if (winner === "O") {
      // win IA
      this.gameFinish.emit("lose");
    } else if (this.game.indexOf("") < 0) {
      // parity
      this.gameFinish.emit("parity");
    }
    // return game to component
    return of(this.game);
  }
}
