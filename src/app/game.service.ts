import { HighLight } from "./models";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GameService {
  constructor() {}

  get currentUser(): string {
    return localStorage.getItem("currentUser");
  }
  set currentUser(currentuser: string) {
    localStorage.setItem("currentUser", currentuser);
  }

  getUserHighLights(): HighLight[] {
    return [];
  }

  startGame(): Observable<any> {
    return of(true);
  }
}
