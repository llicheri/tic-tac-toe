import { Injectable } from "@angular/core";

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
}
