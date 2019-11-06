import { HighScore, GameValue, GameResult, Match, User } from "./models";
import { Injectable, EventEmitter } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
//
// The Observables into this service are used to simulate an async call with the backend
//
export class GameService {
  // actual match
  private _match: Match;
  public get match(): Match {
    return this._match;
  }
  // HIGHSCORES SAVED ON DB
  get usersHighScores(): User[] {
    const local = localStorage.getItem("usersHighScores");
    return local ? JSON.parse(local) : [];
  }
  private addHighScore(highScore: HighScore) {
    // add highscore only if the user is logged in
    if (this.currentUser) {
      const userHighScores = this.usersHighScores;
      const dbRecord = userHighScores.find(el => el.name === this.currentUser);
      // push the new highscore into object
      if (dbRecord) {
        dbRecord.highScores.push(highScore);
      } else {
        // for first highscore create the object
        userHighScores.push({
          name: this.currentUser,
          highScores: [highScore]
        });
      }
      // update local storage object
      localStorage.setItem("usersHighScores", JSON.stringify(userHighScores));
    }
  }
  // emitter of the finish of the game
  gameFinish: EventEmitter<GameResult> = new EventEmitter();

  constructor() {}

  get currentUser(): string {
    const local = localStorage.getItem("currentUser");
    return local ? local : null;
  }
  set currentUser(currentuser: string) {
    if (currentuser) {
      localStorage.setItem("currentUser", currentuser);
    } else {
      localStorage.removeItem("currentUser");
    }
  }

  // return saved highscores
  getUserHighScores(limit = 10): Observable<HighScore[]> {
    const dbRecord = this.usersHighScores.find(
      el => el.name === this.currentUser
    );
    let ret = [];
    if (dbRecord) {
      ret = dbRecord.highScores;
    }
    ret = ret.sort((a, b) => {
      return Number(a.time > b.time);
    });
    // take only decided range elements
    ret = ret.slice(0, limit);
    return of(ret);
  }

  // initialize the game
  startGame(): Observable<any> {
    this._match = new Match();
    return of(true);
  }

  // calculate if there si a winner
  private calculateWinner() {
    // map from player to num
    const playerToNum = {
      "": 0,
      X: 1,
      O: -1
    };
    const matrix: number[][] = [
      [
        playerToNum[this.match.boardGame.getCellValue(0)],
        playerToNum[this.match.boardGame.getCellValue(1)],
        playerToNum[this.match.boardGame.getCellValue(2)]
      ],
      [
        playerToNum[this.match.boardGame.getCellValue(3)],
        playerToNum[this.match.boardGame.getCellValue(4)],
        playerToNum[this.match.boardGame.getCellValue(5)]
      ],
      [
        playerToNum[this.match.boardGame.getCellValue(6)],
        playerToNum[this.match.boardGame.getCellValue(7)],
        playerToNum[this.match.boardGame.getCellValue(8)]
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
      this.match.winner = "X";
      this.match.gameResult = "win";
    } else if (sums.indexOf(-3) >= 0) {
      this.match.winner = "O";
      this.match.gameResult = "lose";
    } else if (this.match.boardGame.board.indexOf("") < 0) {
      this.match.gameResult = "parity";
    }
  }

  saveWin() {
    this.match.initEndTime();
    const highscore: HighScore = {
      moves: this.match.moveCounter,
      time: this.match.endTime.getTime() - this.match.startTime.getTime()
    };
    this.addHighScore(highscore);
  }

  // functionCalled when a user click on a cell
  userClick(index: number): Observable<GameValue[]> {
    // increment move counter
    this.match.incrementMoveCounter();
    // cross user cell
    this.match.boardGame.crossCell(index, "X");
    // calculate if user wins
    this.calculateWinner();
    // CALCULATE IA CLICK
    if (!this.match.winner) {
      this.match.boardGame.crossRandomIACell();
      // calculate if ia wins
      this.calculateWinner();
    }
    //  if match is finish emit the result
    if (this.match.gameResult !== "ongoing") {
      this.gameFinish.emit(this.match.gameResult);
      // if game has beeen win save the highscore
      if (this.match.gameResult === "win") {
        this.saveWin();
      }
    }
    // return game to component
    return of(this.match.boardGame.board);
  }
}
