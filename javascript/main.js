

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
    
    
    

}

document.addEventListener("click", (event) => {
    let cell = event.target.id;
    cell = cell.split("-");
    let clickedColumn = cell[0];
    let clickedRow = cell[1];
    console.log(boardArrayBackend[clickedColumn][clickedRow]);
    // modificar el array y ponerla exposed y atraves de eso cambiar la clase
    // arrayInformation[column][row] = "exposed";
    console.log(boardArrayVisual[clickedColumn][clickedRow], clickedColumn, clickedRow);
    checkClickedCellContent(clickedColumn, clickedRow);
    printBackendBoard(clickedColumn, clickedRow);

});

function getMockData() {
    return window.location.search.split("?");
}

function createBoardArrays() {
    boardArrayVisual = new Array(rows);
    columnsArray = new Array(columns);
    for (let i = 0; i < columns; i++) {
        boardArrayVisual[i] = new Array(columns);
    }
}

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

function printBoard() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            document.getElementById("column" + i.toString()).append(boardArrayVisual[j][i]);
        }
    }
}


function calculateDimensionsFromMockData() {
    let ContentUrl = getMockData();
    let MockData = ContentUrl[1].split("-");
    rows = MockData.length;
    columns = MockData[0].length;
}

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



function printBackendBoard(x, y) {
    let id = x + "-" + y;
    document.getElementById(id).classList.remove("hidden");
    document.getElementById(id).classList.add("unhidden");
    if (boardArrayBackend[x][y].includes("*")) {

        document.getElementById(id).innerHTML = "&#128163";

    }
    
    
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

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
    }
}
