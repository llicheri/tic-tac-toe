import { GameValue } from "./index";
import { Board } from "./";
export class BoardGame {
  private _board: Board;
  public get board(): Board {
    return this._board;
  }
  // cross a cell of the board
  public crossCell(index: number, user: GameValue) {
    this._board[index] = user;
  }
  // get the value of a specific cell of the board
  public getCellValue(index: number) {
    return this._board[index];
  }
  // cross a random cell of the board for the IA
  public crossRandomIACell() {
    // create an array of indexes of the cells no marked
    const indexes = [];
    this.board.forEach((el, index) => {
      if (el === "") {
        indexes.push(index);
      }
    });
    // select a random element
    var rndm = Math.floor(Math.random() * indexes.length);
    this.crossCell(indexes[rndm], "O");
  }

  constructor() {
    this._board = ["", "", "", "", "", "", "", "", ""];
  }
}
