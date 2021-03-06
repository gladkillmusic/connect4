/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

 
 //creates dynamic board using WIDTH & HEIGHT constants for rows/cells

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  
  for (let y = 0; y < HEIGHT; y++){
    board.push([]);
    for (let x = 0; x < WIDTH; x++) {
      board[y].push(null);
    }
  }

  //log to make sure our board looks good
  //console.log("this is the board", board);

}

/** makeHtmlBoard: make HTML table and row of column tops. */




function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board" - DONE
  const htmlBoard = document.getElementById("board");

  // TODO: add comment for this code
  //initialize player input row and game board cells
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  //initializes rest of game board based on width/height constraints

  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for (let row = HEIGHT - 1; row>= 0 ; row--) {
    if (board[row][x] === null) return row;
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let gamePiece = document.createElement("div");
  let targetCell = document.getElementById(`${y}-${x}`);

  gamePiece.classList.add("piece", `p${currPlayer}`);
  targetCell.append(gamePiece);
  //console.log("y & x" +y +" " + x + " " +targetCell);

}

/** endGame: announce game end */

function endGame(msg="wawoo") {
  // TODO: pop up alert message
  alert(msg);
  resetBoard();
  resetLogic();
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  let targetRow = board[y];
  //console.log("targetRow " + targetRow);
  targetRow[x] = currPlayer;
  


  //check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }
  
  
 
  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (isBoardFull()) {
    endGame("it's a tie!");
  }
  
  switchPlayer();

}

//swap player at end of go
function switchPlayer(){

  currPlayer = currPlayer===1  ? 2 : 1;
  console.log("Player "+currPlayer);
}

//checks to see if all spots are filled up
function isBoardFull(){
    return board.every(function(row){
      return row.every(function(cell) {
        return cell !== null;
      
   })
  }); 
}


 function resetLogic(){
   for (let i = 0; i < board.length; i++) {
     for (let j = 0; j < board[i].length; j++) {
       board[i][j] = null;
     }
   }


 }

 function resetBoard(){
   let gamePieces = document.querySelectorAll(".piece");
   for (let piece of gamePieces) {
     piece.remove();
   }
 }

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
