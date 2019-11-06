export * from "./highscore";
export * from "./match";
export * from "./board-game";
export type Board = GameValue[];
// "" -> void , "X" -> user, "O" -> IA
export type GameValue = "" | "X" | "O";
export type GameResult = "win" | "lose" | "parity" | "ongoing";
