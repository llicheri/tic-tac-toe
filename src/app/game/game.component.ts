import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Board } from "./../models";
import { GameService } from "../game.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ViewChild } from "@angular/core";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"]
})
export class GameComponent implements OnInit, OnDestroy {
  // modal
  @ViewChild("modal", null) private modal;
  // game board
  board: Board;
  // crono
  crono: string = "00:00";
  // semaphore to render crono
  viewCrono = false;
  //
  message: string = "";
  //
  sub: Subscription;

  constructor(
    private gameService: GameService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.sub = gameService.gameFinish.subscribe(result => {
      this.message = result;
      this.openModal();
    });
  }

  ngOnInit() {
    if (this.gameService.match && this.gameService.match.startTime) {
      this.board = ["", "", "", "", "", "", "", "", ""];
      this.startCrono();
      this.viewCrono = true;
    } else {
      // on page refresh go to home
      this.router.navigateByUrl("home");
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

  openModal() {
    this.modalService
      .open(this.modal, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          switch (result) {
            case "home":
              this.router.navigateByUrl("home");
              break;
            case "newGame":
              this.gameService.startGame().subscribe(() => {
                this.ngOnInit();
              });
              break;
          }
        },
        reason => {
          this.router.navigateByUrl("home");
        }
      );
  }
}
