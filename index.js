"use strict";

class Piece {
  _row;
  _column;
  _name;
  _dir_img;

  constructor(row, column, name, dir_img) {
    this._row = row;
    this._column = column;
    this._name = name;
    this._dir_img = `./assets/img/${dir_img}.png`;
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
const peon_n_1 = new Peon(1, 0, "peon_n_1", "n_peon");
const peon_n_2 = new Peon(1, 1, "peon_n_2", "n_peon");
const peon_n_3 = new Peon(1, 2, "peon_n_3", "n_peon");
const peon_n_4 = new Peon(1, 3, "peon_n_4", "n_peon");
const peon_n_5 = new Peon(1, 4, "peon_n_5", "n_peon");
const peon_n_6 = new Peon(1, 5, "peon_n_6", "n_peon");
const peon_n_7 = new Peon(1, 6, "peon_n_7", "n_peon");
const peon_n_8 = new Peon(1, 7, "peon_n_8", "n_peon");

const peon_b_1 = new Peon(6, 0, "peon_b_1", "b_peon");
const peon_b_2 = new Peon(6, 1, "peon_b_2", "b_peon");
const peon_b_3 = new Peon(6, 2, "peon_b_3", "b_peon");
const peon_b_4 = new Peon(6, 3, "peon_b_4", "b_peon");
const peon_b_5 = new Peon(6, 4, "peon_b_5", "b_peon");
const peon_b_6 = new Peon(6, 5, "peon_b_6", "b_peon");
const peon_b_7 = new Peon(6, 6, "peon_b_7", "b_peon");
const peon_b_8 = new Peon(6, 7, "peon_b_8", "b_peon");
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
      // board[i][j].firstElementChild?.classList.add(`${i}_row_${j}_column`);
      // board[i][j].firstElementChild?.classList.add("ocupated");
    }
  }
};

const setPieces = (board, pieces) => {
  pieces.forEach((piece) => {
    const img = document.createElement("img");
    img.src = `${piece._dir_img}`;
    img.classList.add(`${piece._name}`);
    const div = board[piece.row][piece.column];
    div.appendChild(img);
  });
};

// Coloring the board and setting the pieces
colorBoard(board, "#789461");
setPieces(board, pieces);

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
