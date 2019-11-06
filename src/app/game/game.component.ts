import { Board } from "./../models/index";
import { GameService } from "../game.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"]
})
export class GameComponent implements OnInit, OnDestroy {
  board: Board = ["", "", "", "", "", "", "", "", ""];
  // crono
  crono: string = "00:00";
  // semaphore to render crono
  viewCrono = false;
  //
  message: string;
  //
  sub: Subscription;

  constructor(private gameService: GameService, private router: Router) {
    this.sub = gameService.gameFinish.subscribe(result => {
      // when game finish alert and go back to home
      alert(result);
      this.router.navigateByUrl("home");
    });
  }

  ngOnInit() {
    if (this.gameService.match.startTime) {
      this.startCrono();
      this.viewCrono = true;
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  startCrono(): void {
    setInterval(() => {
      const now = new Date().getTime();
      const duration = now - this.gameService.match.startTime.getTime(); // milliseconds
      let seconds: any = Math.floor((duration / 1000) % 60);
      let minutes: any = Math.floor((duration / (1000 * 60)) % 60);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      this.crono = minutes + ":" + seconds;
    }, 1000);
  }

  onCellClick(index: number) {
    if (this.board[index] === "") {
      this.gameService.userClick(index).subscribe(newGame => {
        this.board = newGame;
      });
    }
  }
}
