"use strict";

class Piece {
  _row;
  _column;
  _name;
  _dir_img;
  _movements;

  constructor(row, column, name, dir_img) {
    this._row = row;
    this._column = column;
    this._name = name;
    this._dir_img = `./assets/img/${dir_img}.png`;
    this._movements = [];
  }

  move(board) {
    clearBoard();
    this.clearMovements();
    board[this._row][this._column].classList.add("click");
  }

  clearMovements() {
    this._movements = [];
  }

  get movements() {
    return this._movements;
  }

  set row(row) {
    this._row = row;
  }

  get row() {
    return this._row;
  }

  set column(column) {
    this._column = column;
  }

  get column() {
    return this._column;
  }

  get name() {
    return this._name;
  }

  get dir_img() {
    return this._dir_img;
  }
}

class Peon extends Piece {
  constructor(row, column, _name, _dir_img) {
    super(row, column, _name, _dir_img);
  }

  checkCapture(mov, color) {
    if (checkMov(this.row + mov, this.column + mov, color)) {
      this.movements.push({ row: this.row + mov, column: this.column + mov });
    }

    if (checkMov(this.row + mov, this.column - mov, color)) {
      this.movements.push({ row: this.row + mov, column: this.column - mov });
    }
  }

  move(board, mov, color) {
    super.move(board);
    this.checkCapture(mov, color);

    //Highlight Possible Movements
    if (checkPeonMov(this.row + mov, this.column)) {
      this.movements.push({ row: this.row + mov, column: this.column });

      if (
        (this.row === 1 && color === "n") ||
        (this.row === 6 && color === "b")
      ) {
        if (checkPeonMov(this.row + mov * 2, this.column)) {
          this.movements.push({ row: this.row + mov * 2, column: this.column });
        }
      }
    }
    if (this.movements.length > 0) {
      highlightMov(board, this);
    }
  }
}

class PeonB extends Peon {
  constructor(row, column, _name, _dir_img) {
    super(row, column, _name, _dir_img);
  }

  checkCapture(mov, color) {
    super.checkCapture(mov, color);
  }

  move(board) {
    super.move(board, -1, "b");
  }
}

class PeonN extends Peon {
  constructor(row, column, _name, _dir_img) {
    super(row, column, _name, _dir_img);
  }

  checkCapture(mov, color) {
    super.checkCapture(mov, color);
  }

  move(board) {
    super.move(board, 1, "n");
  }
}

class Torre extends Piece {
  constructor(row, column, _name, _dir_img) {
    super(row, column, _name, _dir_img);
  }
}

class Obispo extends Piece {
  constructor(row, column, _name, _dir_img) {
    super(row, column, _name, _dir_img);
  }
}

class Caballo extends Piece {
  constructor(row, column, _name, _dir_img) {
    super(row, column, _name, _dir_img);
  }
}

class Rey extends Piece {
  constructor(row, column, _name, _dir_img) {
    super(row, column, _name, _dir_img);
  }
}

class Reina extends Piece {
  constructor(row, column, _name, _dir_img) {
    super(row, column, _name, _dir_img);
  }
}

// Create the pieces
const torre_n_1 = new Torre(0, 0, "torre_n_1", "n_torre");
const torre_n_2 = new Torre(0, 7, "torre_n_2", "n_torre");
const caballo_n_1 = new Caballo(0, 1, "caballo_n_1", "n_caballo");
const caballo_n_2 = new Caballo(0, 6, "caballo_n_2", "n_caballo");
const obispo_n_1 = new Obispo(0, 2, "obispo_n_1", "n_obispo");
const obispo_n_2 = new Obispo(0, 5, "obispo_n_2", "n_obispo");
const rey_n = new Rey(0, 4, "rey_n", "n_rey");
const reina_n = new Reina(0, 3, "reina_n", "n_reina");
const peon_n_1 = new PeonN(1, 0, "peon_n_1", "n_peon");
const peon_n_2 = new PeonN(1, 1, "peon_n_2", "n_peon");
const peon_n_3 = new PeonN(1, 2, "peon_n_3", "n_peon");
const peon_n_4 = new PeonN(1, 3, "peon_n_4", "n_peon");
const peon_n_5 = new PeonN(1, 4, "peon_n_5", "n_peon");
const peon_n_6 = new PeonN(1, 5, "peon_n_6", "n_peon");
const peon_n_7 = new PeonN(1, 6, "peon_n_7", "n_peon");
const peon_n_8 = new PeonN(1, 7, "peon_n_8", "n_peon");

const peon_b_1 = new PeonB(6, 0, "peon_b_1", "b_peon");
const peon_b_2 = new PeonB(6, 1, "peon_b_2", "b_peon");
const peon_b_3 = new PeonB(6, 2, "peon_b_3", "b_peon");
const peon_b_4 = new PeonB(6, 3, "peon_b_4", "b_peon");
const peon_b_5 = new PeonB(6, 4, "peon_b_5", "b_peon");
const peon_b_6 = new PeonB(6, 5, "peon_b_6", "b_peon");
const peon_b_7 = new PeonB(6, 6, "peon_b_7", "b_peon");
const peon_b_8 = new PeonB(6, 7, "peon_b_8", "b_peon");
const torre_b_1 = new Torre(7, 0, "torre_b_1", "b_torre");
const torre_b_2 = new Torre(7, 7, "torre_b_2", "b_torre");
const caballo_b_1 = new Caballo(7, 1, "caballo_b_1", "b_caballo");
const caballo_b_2 = new Caballo(7, 6, "caballo_b_2", "b_caballo");
const obispo_b_1 = new Obispo(7, 2, "obispo_b_1", "b_obispo");
const obispo_b_2 = new Obispo(7, 5, "obispo_b_2", "b_obispo");
const rey_b = new Rey(7, 4, "rey_b", "b_rey");
const reina_b = new Reina(7, 3, "reina_b", "b_reina");

const pieces = [];
pieces.push(torre_n_1);
pieces.push(caballo_n_1);
pieces.push(obispo_n_1);
pieces.push(reina_n);
pieces.push(rey_n);
pieces.push(obispo_n_2);
pieces.push(caballo_n_2);
pieces.push(torre_n_2);
pieces.push(peon_n_1);
pieces.push(peon_n_2);
pieces.push(peon_n_3);
pieces.push(peon_n_4);
pieces.push(peon_n_5);
pieces.push(peon_n_6);
pieces.push(peon_n_7);
pieces.push(peon_n_8);

pieces.push(peon_b_1);
pieces.push(peon_b_2);
pieces.push(peon_b_3);
pieces.push(peon_b_4);
pieces.push(peon_b_5);
pieces.push(peon_b_6);
pieces.push(peon_b_7);
pieces.push(peon_b_8);
pieces.push(torre_b_1);
pieces.push(caballo_b_1);
pieces.push(obispo_b_1);
pieces.push(reina_b);
pieces.push(rey_b);
pieces.push(obispo_b_2);
pieces.push(caballo_b_2);
pieces.push(torre_b_2);

let pieceMoving = false;
let board = [];
let rows = document.querySelectorAll(".row");
rows.forEach((row) => {
  let tempRow = [];
  [...row.getElementsByClassName("column")].forEach((col) => {
    tempRow.push(col);
  });
  board.push(tempRow);
});

//NOTE:
const colorBoard = (board, color) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if ((i + j) % 2 != 0) board[i][j].style.background = color;
      //Adding the position in the matriz
      board[i][j].classList.add(`posBoard_${i}_${j}`);
    }
  }
};

//NOTE:
const setPieces = (board, pieces) => {
  pieces.forEach((piece) => {
    const img = document.createElement("img");
    img.src = `${piece._dir_img}`;
    img.alt = `${piece._name.split("_")[0]}`;
    img.classList.add(`${piece._name}`);
    const div = board[piece.row][piece.column];
    div.appendChild(img);
  });
};
// const img = document.createElement("img");
// img.src = `./assets/img/b_peon.png`;
// img.alt = `$peon`;
// img.classList.add(`peon_b_4`);
// const div = board[3][3];
// div.appendChild(img);

//NOTE:
const checkMov = (row, col, color) => {
  // check if the position is within the limits of the board
  if (row < 0 || row > 7 || col < 0 || col > 7) return false;
  if (board[row][col].hasChildNodes()) {
    // check de color of the piece
    const pieceColor =
      board[row][col].firstElementChild.classList.value.split("_")[1];
    return pieceColor === color ? false : true;
  }
  return false;
};

const checkPeonMov = (row, col) => !board[row][col].hasChildNodes();

//NOTE:
const highlightMov = (board, piece) => {
  piece.movements.forEach((mov) => {
    const pieceMov = board[mov.row][mov.column];
    pieceMov.classList.add("click");
    pieceMov.classList.add(`posMove_${piece.row}_${piece.column}`);
    pieceMov.classList.add(`${piece.name}`);
  });
};

//NOTE:
const clearBoard = function () {
  [...document.querySelectorAll(".column")].forEach((col) => {
    const className = col.className;
    //Remove all the classes except "column" and the position in the matriz
    col.className = "";
    col.classList.add(className.split(" ")[0]);
    col.classList.add(className.split(" ")[1]);
  });
};

//NOTE:
const findPiece = (pieces, name) => {
  const piece = pieces.find((piece) => piece.name === name);
  return piece;
};

// Coloring the board and setting the pieces
colorBoard(board, "#789461");
setPieces(board, pieces);

//REVIEW:
[...document.querySelectorAll(".column")].forEach((col) => {
  col.addEventListener("click", function (e) {
    if (this.hasChildNodes() && !this.classList.contains("click")) {
      //Find the clicked piece in the array of pieces
      const piece = findPiece(
        pieces,
        this.firstElementChild.classList.value.split(" ")[0]
      );
      piece.move(board);
    } else {
      if (this.classList.contains("click")) {
        //Move piece to the selected box
        const [text1, row, column] = this.classList.value
          .split(" ")
          [this.classList.length - 2].split("_");

        //Check if there is a contrary piece in that position
        if (this.hasChildNodes()) {
          this.removeChild(this.firstElementChild);
        }

        this.appendChild(board[row][column].firstElementChild);

        //Update new piece position
        const piece = findPiece(
          pieces,
          this.className.split(" ")[this.classList.length - 1]
        );
        const [text2, newRow, newColumn] = this.classList.value
          .split(" ")[1]
          .split("_");
        piece.row = Number(newRow);
        piece.column = Number(newColumn);

        clearBoard();
      }
    }
  });
});
