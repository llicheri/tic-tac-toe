export interface HighScore {
  /** used seconds */
  time: number;
  /** used moves */
  moves: number;
  /** aggregation value to sort the highscores */
  aggregate?: number;
}
