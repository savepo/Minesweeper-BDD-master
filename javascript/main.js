let boardSize = 8;
let rows = 8;
let columns = 8;
let mines = 10;
let boardArrayVisual;
let boardArrayBackend;
let columnsArray;
let mockDataIsLoaded = false;
let minesNum = 10;

window.onload = function () {
    if (window.location.search.includes("?")) {
        calculateDimensionsFromMockData();
        mockDataIsLoaded = false;
    }
    createBoardArrays();
    createBoardElements();
    printBoard();
    generateBackendBoard();
    if (!window.location.search.includes("?")) {
        generateMinesWithoutMockData();
    } else {
        generateMinesForMockData();
    }
    faceStatus("Neutral");
}

document.addEventListener("click", (event) => {
    try {
        let cell = event.target.id;
        cell = cell.split("-");
        let clickedColumn = cell[0];
        let clickedRow = cell[1];
        checkClickedCellContent(clickedColumn, clickedRow);
        revealingClickedCells(clickedColumn, clickedRow);
        showAdjacentNumberOfMines(clickedColumn, clickedRow);
    } catch {}

    // console.log(boardArrayBackend[clickedColumn][clickedRow]);
    // console.log(boardArrayVisual[clickedColumn][clickedRow], clickedColumn, clickedRow);
});

// CREATING ARRAY
function createBoardArrays() {
    boardArrayVisual = [rows];
    columnsArray = [columns];
    for (let i = 0; i < columns; i++) {
        boardArrayVisual[i] = [columns];
    }
}

// FILLING ELEMENTS ON THE CREATED ARRAY
function createBoardElements() {
    for (let i = 0; i < columns; i++) {
        columnsArray[i] = document.createElement("div");
        columnsArray[i].id = "column" + i.toString();
        columnsArray[i].classList = "column";
        document.getElementById("board").append(columnsArray[i]);
        for (let j = 0; j < rows; j++) {
            boardArrayVisual[i][j] = document.createElement("div");
            boardArrayVisual[i][j].id = i.toString() + "-" + j.toString();
            boardArrayVisual[i][j].classList = "hidden";
            boardArrayVisual[i][j].classList.add("cell");
            boardArrayVisual[i][j].setAttribute("data-testid", i.toString() + "-" + j.toString());
        }
    }
}

// SHOW THE CREATED ARRAY (THE BOARD) ON THE SCREEN
function printBoard() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            document.getElementById("column" + i.toString()).append(boardArrayVisual[j][i]);
        }
    }
}

// GETTING MOCK DATA FROM THE URL
function getMockData() {
    return window.location.search.split("?");
}

// CALCULATING ROWS AND COLUMNS FROM THE INTRODUCED MOCK DATA
function calculateDimensionsFromMockData() {
    let ContentUrl = getMockData();
    let MockData = ContentUrl[1].split("-");
    rows = MockData.length;
    columns = MockData[0].length;
}

// CREATING THE ARRAY WHICH WE WILL USE TO WORK INTERNALLY
function generateBackendBoard() {
    boardArrayBackend = new Array(rows);
    columnsArray = new Array(columns);
    for (let i = 0; i < columns; i++) {
        boardArrayBackend[i] = new Array(columns);
    }  

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {          
            boardArrayBackend[i][j] = "o"
        }
    }
    console.log(boardArrayBackend);
}

// FUNCTION THAT WILL GENERATE RANDOM MINES WHEN A MOCK DATA IS NOT CHARGED
function generateMinesWithoutMockData() {
    for (let i = 0; i < minesNum; i++) {
        x = getRandomInt(0, columns);
        y = getRandomInt(0, rows);

        if (boardArrayBackend[x][y].includes("*")) {
            i--;
        }
        boardArrayBackend[x][y] = "*"; 
    } 
}

// FUNCTION THAT WILL GENERATE THE MINES THAT ARE INDICATED ON THE MOCK DATA
function generateMinesForMockData() {
    let mockData = getMockData();
    let dividedMD = mockData[1].split("-");
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (dividedMD[j].charAt(i).includes("*")) {
                boardArrayBackend[j][i] = "*";
            }          
        }
    }
}

// FUNCTION THAT REVEALS A CELL
function revealingClickedCells(x, y) {
    let id = x + "-" + y;
    document.getElementById(id).classList.remove("hidden");
    document.getElementById(id).classList.add("unhidden");
    if (boardArrayBackend[x][y].includes("*")) {
        document.getElementById(id).innerHTML = "&#128163";
    } 
}

// FUNCTION THAT GENERATES A RANDOM INTEGER
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  // FUNCTION THAT WILL SHOW ALL THE MINES ON THE BOARD WHENEVER THE USER CLICKS A BOMB
function checkClickedCellContent(c, r) {
    if (boardArrayBackend[c][r].includes("*")) {
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                if(boardArrayBackend[i][j].includes("*")) {
                    document.getElementById(i.toString() + "-" + j.toString()).innerHTML = "&#128163";
                    document.getElementById(i.toString() + "-" + j.toString()).classList.remove("hidden");
                    document.getElementById(i.toString() + "-" + j.toString()).classList.add("unhidden");
                }              
            }    
        }
        faceStatus(":(");
    }
}

function showAdjacentNumberOfMines(c, r) {
    let numOfMines = 0;
    console.log(boardArrayBackend);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            try {
                if (boardArrayBackend[parseInt(c) - 1 + i][parseInt(r) - 1 + j] == "*") {
                    numOfMines++;
                }
            } catch {
                console.log("Trying to check a cell that is out of the range of the array");
            }
        }
    }

    console.log(c, r)

    if (boardArrayBackend[parseInt(c)][parseInt(r)] != "*") {
        document.getElementById(c.toString() + "-" + r.toString()).innerHTML = numOfMines.toString();
    }
}

function faceStatus(status) {
    document.getElementById("face").innerHTML = "Face: " + status;
}