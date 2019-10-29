import { GameService } from "../game.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  // user logged
  currentUser: string;
  // is user logging in?
  isLoggingIn: boolean = false;
  // name typed by user
  loginName: string;

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit() {
    this.currentUser = this.gameService.currentUser;
  }

  startGame() {
    this.gameService.startGame().subscribe(() => {
      this.router.navigateByUrl("game");
    });
  }

  login() {
    this.isLoggingIn = true;
  }

  logout() {
    this.gameService.currentUser = null;
    this.currentUser = null;
  }

  onSubmit() {
    this.currentUser = this.loginName;
    this.gameService.currentUser = this.loginName;
    this.isLoggingIn = false;
    this.loginName = "";
  }
}
