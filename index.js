"use strict";

class Piece {
  row;
  column;

  constructor(row, column) {
    this.row = row;
    this.column = column;
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
}

class Peon extends Piece {
  constructor(row, column) {
    super(row, column);
  }
}

class Torre extends Piece {
  constructor(row, column) {
    super(row, column);
  }
}

class Obispo extends Piece {
  constructor(row, column) {
    super(row, column);
  }
}

class Caballo extends Piece {
  constructor(row, column) {
    super(row, column);
  }
}

class Rey extends Piece {
  constructor(row, column) {
    super(row, column);
  }
}

class Reina extends Piece {
  constructor(row, column) {
    super(row, column);
  }
}

// Create the pieces
const torre_n_1 = new Torre(0, 0);
const torre_n_2 = new Torre(0, 7);
const caballo_n_1 = new Caballo(0, 1);
const caballo_n_2 = new Caballo(0, 6);
const obispo_n_1 = new Obispo(0, 2);
const obispo_n_2 = new Obispo(0, 5);
const rey_n_1 = new Rey(0, 4);
const reina_n_1 = new Reina(0, 3);
const peon_n_1 = new Peon(1, 0);
const peon_n_2 = new Peon(1, 1);
const peon_n_3 = new Peon(1, 2);
const peon_n_4 = new Peon(1, 3);
const peon_n_5 = new Peon(1, 4);
const peon_n_6 = new Peon(1, 5);
const peon_n_7 = new Peon(1, 6);
const peon_n_8 = new Peon(1, 7);

const peon_b_1 = new Peon(6, 0);
const peon_b_2 = new Peon(6, 1);
const peon_b_3 = new Peon(6, 2);
const peon_b_4 = new Peon(6, 3);
const peon_b_5 = new Peon(6, 4);
const peon_b_6 = new Peon(6, 5);
const peon_b_7 = new Peon(6, 6);
const peon_b_8 = new Peon(6, 7);
const torre_b_1 = new Torre(7, 0);
const torre_b_2 = new Torre(7, 7);
const caballo_b_1 = new Caballo(7, 1);
const caballo_b_2 = new Caballo(7, 6);
const obispo_b_1 = new Obispo(7, 2);
const obispo_b_2 = new Obispo(7, 5);
const rey_b_1 = new Rey(7, 4);
const reina_b_1 = new Reina(7, 3);

const pieces = [];
pieces.push(torre_n_1);
pieces.push(caballo_n_1);
pieces.push(obispo_n_1);
pieces.push(reina_n_1);
pieces.push(rey_n_1);
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

let peon_;
console.log(pieces.findIndex((p, i) => p === peon_n_5));

peon_n_1.row = 4;

let board = [];
let rows = document.querySelectorAll(".row");
rows.forEach((row) => {
  let tempRow = [];
  [...row.getElementsByClassName("column")].forEach((col) => {
    tempRow.push(col);
  });
  board.push(tempRow);
});

const colorBoard = (board, color) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if ((i + j) % 2 != 0) board[i][j].style.background = color;
      board[i][j].firstElementChild?.classList.add(`${i}_row_${j}_column`);
      board[i][j].firstElementChild?.classList.add("ocupated");
    }
  }
};

// Coloring the board
colorBoard(board, "#789461");

[...document.querySelectorAll(".column")].forEach((col) => {
  col.addEventListener("click", function (e) {
    switch (this.firstElementChild?.alt) {
      case "peon":
        movPeon(this);
        break;
      default:
        console.log("Lo lamentamos, por el momento no disponemos.");
    }
    // console.log(`Es ${this.firstElementChild?.classList.contains("ocupated")}`);

    //this.classList.add("click");
    // console.log(this.firstElementChild?.alt);
    // console.log(this.firstElementChild?.classList.value);
  });
});
//  addEventListener("click", function (event) {
//   console.log(event);
//   console.log(event.tarjet);
// });

const movPiece = (piece, row, column) => {};

const movPeon = (peon) => {
  const colorPeon = peon.firstElementChild.classList.value.split("_")[0];
  const locationClass = peon.firstElementChild.classList.value.split(" ")[1];
  const locationRow = locationClass.split("_")[0];
  const locationColumn = locationClass.split("_")[2];

  //Highlight Possible Movements
  peon.classList.add("click");
  if (colorPeon === "b") {
    if (locationRow === "6") {
      console.log("ey");
      board[locationRow - 2][locationColumn].classList.add("click");
      board[locationRow - 2][locationColumn].addEventListener(
        "click",
        function () {
          console.log("presionado");
          board[locationRow - 2][locationColumn].appendChild(
            board[locationRow][locationColumn].firstElementChild
          );
        }
      );
    }
    board[locationRow - 1][locationColumn].classList.add("click");
    board[locationRow - 1][locationColumn].addEventListener(
      "click",
      function () {
        console.log("presionado");
        board[locationRow - 1][locationColumn].appendChild(
          board[locationRow][locationColumn].firstElementChild
        );
      }
    );
  }

  console.log(colorPeon);
  console.log(locationClass);
  console.log(locationRow);
  console.log(locationColumn);
};
