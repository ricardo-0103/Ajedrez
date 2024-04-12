"use strict";

class Piece {
  _row;
  _column;
  _name;
  _dir_img;
  _movements;
  _color;

  constructor(row, column, name, dir_img) {
    this._row = row;
    this._column = column;
    this._name = name;
    this._dir_img = `./assets/img/${dir_img}.png`;
    this._movements = [];
    this._color = this.name.split("_")[1];
  }

  move(board) {
    clearBoard();
    this.clearMovements();
    board[this._row][this._column].classList.add("click");
  }

  moveInOneDirection(contRow, contCol, notRepeat) {
    let movRow = this.row + contRow;
    let movCol = this.column + contCol;
    while (checkMov(movRow, movCol, this.name)) {
      this.movements.push({ row: movRow, column: movCol });
      if (board[movRow][movCol].hasChildNodes()) break;
      if (notRepeat) break;
      movRow += contRow;
      movCol += contCol;
    }
  }

  clearMovements() {
    this._movements = [];
  }

  get movements() {
    return this._movements;
  }

  set movements(movements) {
    this._movements = movements;
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

  get color() {
    return this._color;
  }
}

class Peon extends Piece {
  constructor(row, column, _name, _dir_img) {
    super(row, column, _name, _dir_img);
  }

  checkCapture(mov) {
    if (checkMov(this.row + mov, this.column + mov, this.name)) {
      this.movements.push({ row: this.row + mov, column: this.column + mov });
    }

    if (checkMov(this.row + mov, this.column - mov, this.name)) {
      this.movements.push({ row: this.row + mov, column: this.column - mov });
    }
  }

  move(board, mov, color) {
    super.move(board);
    this.checkCapture(mov);

    //Highlight Possible Movements
    if (checkPeonMov(this.row + mov, this.column)) {
      this.movements.push({ row: this.row + mov, column: this.column });

      //check double movement
      if (
        (this.row === 1 && color === "n") ||
        (this.row === 6 && color === "b")
      ) {
        if (checkPeonMov(this.row + mov * 2, this.column)) {
          this.movements.push({ row: this.row + mov * 2, column: this.column });
        }
      }
    }
    highlightMov(board, this);
  }
}

class PeonB extends Peon {
  constructor(row, column, _name, _dir_img) {
    super(row, column, _name, _dir_img);
  }

  checkCapture(mov) {
    super.checkCapture(mov);
  }

  move(board) {
    super.move(board, -1, "b");
  }
}

class PeonN extends Peon {
  constructor(row, column, _name, _dir_img) {
    super(row, column, _name, _dir_img);
  }

  checkCapture(mov) {
    super.checkCapture(mov);
  }

  move(board) {
    super.move(board, 1, "n");
  }
}

class Torre extends Piece {
  constructor(row, column, _name, _dir_img) {
    super(row, column, _name, _dir_img);
  }

  move(board) {
    super.move(board);

    super.moveInOneDirection(1, 0, false);
    super.moveInOneDirection(-1, 0, false);
    super.moveInOneDirection(0, -1, false);
    super.moveInOneDirection(0, 1, false);

    highlightMov(board, this);
  }
}

class Obispo extends Piece {
  constructor(row, column, _name, _dir_img) {
    super(row, column, _name, _dir_img);
  }

  move(board) {
    super.move(board);

    super.moveInOneDirection(1, 1, false);
    super.moveInOneDirection(-1, -1, false);
    super.moveInOneDirection(1, -1, false);
    super.moveInOneDirection(-1, 1, false);

    highlightMov(board, this);
  }
}

class Caballo extends Piece {
  constructor(row, column, _name, _dir_img) {
    super(row, column, _name, _dir_img);
  }

  move(board) {
    super.move(board);

    super.moveInOneDirection(2, 1, true);
    super.moveInOneDirection(2, -1, true);
    super.moveInOneDirection(-2, -1, true);
    super.moveInOneDirection(-2, 1, true);
    super.moveInOneDirection(1, 2, true);
    super.moveInOneDirection(1, -2, true);
    super.moveInOneDirection(-1, -2, true);
    super.moveInOneDirection(-1, 2, true);

    highlightMov(board, this);
  }
}

class Rey extends Piece {
  constructor(row, column, _name, _dir_img) {
    super(row, column, _name, _dir_img);
  }

  move(board) {
    super.move(board);

    super.moveInOneDirection(1, 0, true);
    super.moveInOneDirection(-1, 0, true);
    super.moveInOneDirection(0, -1, true);
    super.moveInOneDirection(0, 1, true);
    super.moveInOneDirection(1, 1, true);
    super.moveInOneDirection(-1, -1, true);
    super.moveInOneDirection(1, -1, true);
    super.moveInOneDirection(-1, 1, true);

    //  Eliminate moves that put a king adjacent to another
    this.removeAdjacentKingMovements();

    highlightMov(board, this);
  }

  removeAdjacentKingMovements() {
    // Get the coordinates of the other king
    const otherKingRow = pieces.find(
      (piece) => piece.name === `rey_${this.color === "b" ? "n" : "b"}`
    ).row;
    const otherKingColumn = pieces.find(
      (piece) => piece.name === `rey_${this.color === "b" ? "n" : "b"}`
    ).column;

    // Eliminate moves that put a king adjacent to another
    this.movements = this.movements.filter((movement) => {
      return !(
        Math.abs(movement.row - otherKingRow) <= 1 &&
        Math.abs(movement.column - otherKingColumn) <= 1
      );
    });
  }
}
class Reina extends Piece {
  constructor(row, column, _name, _dir_img) {
    super(row, column, _name, _dir_img);
  }

  move(board) {
    super.move(board);

    super.moveInOneDirection(1, 0, false);
    super.moveInOneDirection(-1, 0, false);
    super.moveInOneDirection(0, -1, false);
    super.moveInOneDirection(0, 1, false);
    super.moveInOneDirection(1, 1, false);
    super.moveInOneDirection(-1, -1, false);
    super.moveInOneDirection(1, -1, false);
    super.moveInOneDirection(-1, 1, false);

    highlightMov(board, this);
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
let selectedPiece;
let playerTurn = "b";
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
const checkMov = (row, col, pieceName) => {
  const color = pieceName.split("_")[1];
  const typePiece = pieceName.split("_")[0];
  // check if the position is within the limits of the board
  if (row < 0 || row > 7 || col < 0 || col > 7) return false;

  if (board[row][col].hasChildNodes()) {
    // check de color of the piece
    // if the piece in that position has the contrary colour, then it can be killed
    const pieceColor =
      board[row][col].firstElementChild.classList.value.split("_")[1];
    return pieceColor === color ? false : true;
  } else if (typePiece !== "peon") {
    return true;
  }
  return false;
};

const checkPeonMov = (row, col) => !board[row][col].hasChildNodes();

//NOTE:
const highlightMov = (board, piece) => {
  if (piece.movements.length > 0) {
    piece.movements.forEach((mov) => {
      const pieceMov = board[mov.row][mov.column];
      pieceMov.classList.add("click");
    });
  }
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

//NOTE:
const checkTurn = (piece) => (playerTurn === piece.color ? true : false);

//NOTE:
const changeTurn = () => {
  playerTurn = playerTurn === "b" ? "n" : "b";
};

//REVIEW:
function isJaque(color) {
  // Encuentra la posición del rey del color especificado
  const king = pieces.find((piece) => piece.name === `rey_${color}`);
  const kingRow = king.row;
  const kingColumn = king.column;

  // Encuentra las piezas del otro color
  const opponentPieces = pieces.filter((piece) => piece.color !== color);

  // Verifica si alguna pieza del oponente puede moverse a la posición del rey
  for (const opponentPiece of opponentPieces) {
    opponentPiece.move(board);
    clearBoard();
    for (const movement of opponentPiece.movements) {
      if (movement.row === kingRow && movement.column === kingColumn) {
        board[movement.row][movement.column]?.classList?.add("jaque");
        return true; // El rey está en jaque
      }
    }
  }

  return false; // El rey no está en jaque
}

//REVIEW:
function checkForLegalMoves(kingColor) {
  // Obtener todas las piezas del jugador actual
  const currentPlayerPieces = pieces.filter(
    (piece) => piece.color === kingColor
  );
  // Verificar si alguna de las piezas puede moverse para sacar al rey del jaque o bloquear la amenaza
  for (const piece of currentPlayerPieces) {
    piece.move(board);
    clearBoard();
    for (const movement of piece.movements) {
      // Simulate the move to see if it gets the king out of jaque or blocks the threat
      const tempRow = piece.row;
      const tempColumn = piece.column;
      piece.row = movement.row;
      piece.column = movement.column;

      let killPiece = false;
      let pieceToDelete;
      let deletedPieceIndex;
      let imgDeletedPiece;
      //Check if there is a contrary piece in that position, and remove the piece
      if (board[piece.row][piece.column].hasChildNodes()) {
        pieceToDelete = findPiece(
          pieces,
          board[piece.row][piece.column].firstElementChild.classList.value
        );
        deletedPieceIndex = pieces.indexOf(pieceToDelete);
        pieces.splice(deletedPieceIndex, 1)[0];

        // Delete the piece from the array of pieces and from the board
        imgDeletedPiece = board[piece.row][piece.column].firstElementChild;
        board[piece.row][piece.column].removeChild(
          board[piece.row][piece.column].firstElementChild
        );

        // A piece was killed
        killPiece = true;
      }

      //Move the piece to the selected box
      board[piece.row][piece.column].appendChild(
        board[tempRow][tempColumn].firstElementChild
      );

      if (!isJaque(kingColor)) {
        // The movement put the king out of jaque

        //Put everything as it was before
        restorePosition(
          board,
          pieces,
          tempRow,
          tempColumn,
          piece,
          killPiece,
          pieceToDelete,
          imgDeletedPiece,
          deletedPieceIndex
        );

        // board[tempRow][tempColumn].appendChild(
        //   board[piece.row][piece.column].firstElementChild
        // );

        // if (killPiece) {
        //   board[piece.row][piece.column].appendChild(imgDeletedPiece);
        //   pieces.splice(deletedPieceIndex, 0, pieceToDelete);
        // }

        // piece.row = tempRow; // Restore the original position of the piece
        // piece.column = tempColumn;
        return true;
      }

      restorePosition(
        board,
        pieces,
        tempRow,
        tempColumn,
        piece,
        killPiece,
        pieceToDelete,
        imgDeletedPiece,
        deletedPieceIndex
      );
    }
  }

  return false; // There are no moves available to remove the king from jaque or block the threat
}

//NOTE:
const restorePosition = (
  board,
  pieces,
  originalRow,
  originalColumn,
  pieceToRestore,
  wasAPieceKilled,
  pieceDeleted,
  imgOfPieceDeleted,
  deletedPieceIndex
) => {
  board[originalRow][originalColumn].appendChild(
    board[pieceToRestore.row][pieceToRestore.column].firstElementChild
  );

  if (wasAPieceKilled) {
    board[originalRow][originalColumn].appendChild(imgOfPieceDeleted);
    pieces.splice(deletedPieceIndex, 0, pieceDeleted);
  }

  pieceToRestore.row = originalRow; // Restore the original position of the piece
  pieceToRestore.column = originalColumn;
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
      selectedPiece = piece;
      piece.move(board);
      //check if the user in turn is playing
      // if (checkTurn(piece)) {
      //   selectedPiece = piece;
      //   piece.move(board);
      // }
    } else {
      const userMove = this?.firstElementChild?.className;
      //Check the user dosen't click the same piece or one not posible movement
      if (this.classList.contains("click") && userMove !== selectedPiece.name) {
        //Check if there is a contrary piece in that position, and remove the piece
        if (this.hasChildNodes()) {
          // Delete the piece from the array of pieces
          const pieceToDelete = findPiece(
            pieces,
            this.firstElementChild.classList.value
          );
          pieces.splice(pieces.indexOf(pieceToDelete), 1);
          this.removeChild(this.firstElementChild);
        }

        //Move the piece to the selected box
        this.appendChild(
          board[selectedPiece.row][selectedPiece.column].firstElementChild
        );

        //Update new piece position
        const [text2, newRow, newColumn] = this.classList.value
          .split(" ")[1] //selecting the position on the board
          .split("_");
        selectedPiece.row = Number(newRow);
        selectedPiece.column = Number(newColumn);

        // Check if the moved piece puts the opponent king in jaque
        const opponentKingColor = selectedPiece.color === "b" ? "n" : "b";
        if (isJaque(opponentKingColor)) {
          console.log(`El rey ${opponentKingColor} está en jaque.`);

          // Verificar si hay movimientos disponibles para sacar al rey del jaque o bloquear la amenaza
          const isLegalMoveAvailable = checkForLegalMoves(opponentKingColor);

          if (!isLegalMoveAvailable) {
            console.log(
              `Jaque mate. ¡El jugador ${selectedPiece.color} ha ganado!`
            );
            // Aquí puedes realizar cualquier acción adicional que necesites para el jaque mate
          }
        }

        clearBoard();
        changeTurn();
      }
    }
  });
});
