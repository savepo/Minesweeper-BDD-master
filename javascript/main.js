let boardSize = 8;
let rows = 8;
let columns = 8;
let numOfMines = 10;
let boardArray;
let columnsArray;
let boardInformation;

window.onload = function () {
    if (window.location.search.includes("?")) {
        calculateDimensionsFromMockData();
        setBoardSize(rows, columns)
    }
    createBoardElements();
    createBoardInformation();
    if (window.location.search.includes("?")) {
        setMinesFromMockData();
    } else {
        setRandomMines();
    }

    console.log(boardInformation);
}

function getMockData() {
    return window.location.search.split("?");
}



function createBoardElements() {
    for (let i = 0; i < rows; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        row.id = "row" + i;
        document.getElementById("board").append(row);
        for (let j = 0; j < columns; j++) {
            let cell = document.createElement("div");
            cell.id = i.toString() + "-" + j.toString();
            cell.classList.add("hidden");
            cell.classList.add("cell");
            cell.setAttribute("data-testid", i.toString() + "-" + j.toString());
            cell.addEventListener("click", function () {
                console.log(cell);
                revealCell(cell);
            });
            cell.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                markCell(cell);
            });
            row.append(cell);
        }
    }
}

function createBoardInformation() {
    boardInformation = [rows];
    for (let i = 0; i < rows; i++) {
        boardInformation[i] = [columns];
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            boardInformation[i][j] = "o";
        }
    }
    console.log(boardInformation);
}



function calculateDimensionsFromMockData() {
    let ContentUrl = window.location.search.split("?");
    let MockData = ContentUrl[1].split("-");
    rows = MockData.length;
    columns = MockData[0].length;
}


function setRandomMines() {
    for (let i = 0; i < numOfMines; i++) {
        boardInformation[generateRandomInt(0, rows)][generateRandomInt(0, columns)];
    }
}

function setBoardSize(rows, columns) {
    let widthpx = 50 * columns;
    let heightpx = 50 * rows;

    document.getElementById("board").style.width = widthpx + "px";
    document.getElementById("board").style.height = heightpx + "px";
}

function createBoardInformation() {
    boardInformation = [rows];
    for (let i = 0; i < rows; i++) {
        boardInformation[i] = [columns];
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            boardInformation[i][j] = "o";
        }
    }
    console.log(boardInformation);
}

function calculateDimensionsFromMockData() {
    let ContentUrl = window.location.search.split("?");
    let MockData = ContentUrl[1].split("-");
    rows = MockData.length;
    columns = MockData[0].length;
}


function setRandomMines() {
    for (let i = 0; i < numOfMines; i++) {
        boardInformation[generateRandomInt(0, rows)][generateRandomInt(0, columns)] = "*";
    }
}

function revealCell(cell) {
    console.log(cell);
    let row = cell.id.split("-")[0];
    let col = cell.id.split("-")[1];
    cell.classList.remove("hidden");
    cell.classList.add("unhidden");
    let cellContent = checkCellContent(row, col);
    if (cellContent == "*") {
        cell.innerHTML = "&#128163";
        showAllMines();
    } else {
        cell.innerHTML = cellContent;
    }
}

function checkCellContent(r, c) {
    if (boardInformation[parseInt(r)][parseInt(c)] == "*") {
        return "*";
    } else if (boardInformation[r][c] == "o") {
        return countAdjacentMines(r, c);
    }
}

function countAdjacentMines(r, c) {
    let numOfAdjacentMines = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            try {
                if (boardInformation[r - 1 + i][c - 1 + j] == "*") {
                    numOfAdjacentMines++;
                }
            } catch {
                console.log("Trying to check a cell that is out of the ragne of the array.");
            }
        }
    }
    return numOfAdjacentMines;
}

function showAllMines() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (boardInformation[i][j] == "*") {
                let cell = document.getElementById(i.toString() + "-" + j.toString());
                cell.innerHTML = "&#128163";
                cell.classList.remove("hidden");
                cell.classList.add("unhidden");
            }
        }
    }
}

function setBoardSize(rows, columns) {
    let widthpx = 50 * columns;
    let heightpx = 50 * rows;
    
    document.getElementById("board").style.width = widthpx + "px";
    document.getElementById("board").style.height = heightpx + "px";
}

function setMinesFromMockData() {
    let MockData = getMockData()[1].split("-");
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (MockData[i].charAt(j) == "*") {
                boardInformation[i][j] = "*";
            }
        }
    }
    console.log(boardInformation);
}

function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function markCell(cell) {
    if (cell.innerHTML == "") {
        cell.innerHTML = "🚩";
    } else if (cell.innerHTML == "🚩") {
        cell.innerHTML = "❓";
    } else if (cell.innerHTML == "❓") {
        cell.innerHTML = "";
    }

}
