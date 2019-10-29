import { GameService } from "../game.service";
import { HighScore } from "../models/highlight";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-highscores",
  templateUrl: "./highlights.component.html",
  styleUrls: ["./highlights.component.css"]
})
export class HighScoreComponent implements OnInit {
  highlights: HighScore[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.getUserHighScores().subscribe(res => {
      this.highlights = res;
    });
  }

  formatTime(milli: number): string {
    let seconds: any = Math.floor((milli / 1000) % 60);
    let minutes: any = Math.floor((milli / (1000 * 60)) % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  }
}
