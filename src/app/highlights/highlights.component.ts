import { GameService } from "../game.service";
import { HighScore } from "../models/highlight";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-highlights",
  templateUrl: "./highlights.component.html",
  styleUrls: ["./highlights.component.css"]
})
export class HighlightsComponent implements OnInit {
  highlights: HighScore[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.getUserHighScores().subscribe(res => {
      this.highlights = res;
    });
  }
}
