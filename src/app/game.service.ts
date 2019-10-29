import { HighScore } from "./models";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
//
// The Observables into this service are used to simulate an async call with the backend
//
export class GameService {
  // HIGHSCORES SAVED ON DB
  private _highScores: { name: string; highScores: HighScore[] }[] = [
    {
      name: "lorenzo",
      highScores: [{ time: 1, moves: 2 }, { time: 1, moves: 2 }]
    }
  ];
  // date of when the game has been started
  private _startTime: Date;

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
    return of(true);
  }
}
