import { HighScore } from "./models";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})

// The Observables are used to simulate an async call with the backend
export class GameService {
  private _highScores: { name: string; highScores: HighScore[] }[] = [
    {
      name: "lorenzo",
      highScores: [{ time: 1, moves: 2 }, { time: 1, moves: 2 }]
    }
  ];

  constructor() {}

  get currentUser(): string {
    const local = localStorage.getItem("currentUser");
    return local ? local : null;
  }
  set currentUser(currentuser: string) {
    localStorage.setItem("currentUser", currentuser);
  }

  getUserHighScores(): Observable<HighScore[]> {
    const dbRecord = this._highScores.find(el => el.name === this.currentUser);
    let ret = [];
    if (dbRecord) {
      ret = dbRecord.highScores;
    }
    return of(ret);
  }

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

  startGame(): Observable<any> {
    return of(true);
  }
}
