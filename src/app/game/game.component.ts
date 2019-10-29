import { GameService } from "../game.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"]
})
export class GameComponent implements OnInit {
  game: any[] = ["X", "", "", "", "O", "X", "", "", ""];
  // crono
  crono: string = "00:00";
  // semaphore to render crono
  viewCrono = false;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    if (this.gameService.startTime) {
      this.startCrono();
      this.viewCrono = true;
    }
  }

  startCrono(): void {
    setInterval(() => {
      const now = new Date().getTime();
      const duration = now - this.gameService.startTime.getTime(); // milliseconds
      let seconds: any = Math.floor((duration / 1000) % 60);
      let minutes: any = Math.floor((duration / (1000 * 60)) % 60);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      this.crono = minutes + ":" + seconds;
    }, 1000);
  }
}
