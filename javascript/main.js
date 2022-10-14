let boardSize = 8;
let rows = 8;
let columns = 8;
let numOfMines = 3;
let boardArray;
let columnsArray;
let boardInformation;
let numberOfFlags;
let revealedCells = 0;

window.onload = function () {
    eventListenerForFace();
    newGame();
    numberOfFlagsAllowedToPlace();
}

function getMockData() {
    return window.location.search.split("?");
}



function clickEvent() {
    revealCell();
    console.log("test1");
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
            cell.addEventListener("click", clickEvent => {
                revealCell(cell);
                console.log("hello");
            });
            cell.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                markCell(cell);
            });
            row.append(cell);
        }
    }
}

function eventListenerForFace() {
    document.getElementById("faceButton").addEventListener("click", () => {
        console.log("sdgsg");
        deleteBoard();
        newGame();
    });
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
    numberOfFlags = numOfMines;
}

function showAllMines() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (boardInformation[i][j] == "*") {
                let cell = document.getElementById(i.toString() + "-" + j.toString());
                cell.innerHTML = "&#128163";
                cell.classList.remove("hidden");
                cell.classList.add("unhidden");
                cell.classList.add("disabled");
            }
        }
    }
}

function disableAllCells() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let cell = document.getElementById(i.toString() + "-" + j.toString());
            cell.classList.add("disabled");
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
    numOfMines = 0;
    let MockData = getMockData()[1].split("-");
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (MockData[i].charAt(j) == "*") {
                boardInformation[i][j] = "*";
                numOfMines++;
            }
        }
    }
    numberOfFlags = numOfMines;
    console.log(boardInformation);
}

function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function markCell(cell) {
    if (cell.innerHTML == "") {
        cell.innerHTML = "🚩";
        numberOfFlags--;
        numberOfFlagsAllowedToPlace();
    } else if (cell.innerHTML == "🚩") {
        cell.innerHTML = "❓";
        numberOfFlags++;
        numberOfFlagsAllowedToPlace();
    } else if (cell.innerHTML == "❓") {
        cell.innerHTML = "";
    }
}

function setFaceStatus(path) {
    let face = document.getElementById("faceStatus");
    face.setAttribute("src", path);
}

function newGame() {
    revealedCells = 0;
    setFaceStatus("img\\neutral.png");
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
    numberOfFlagsAllowedToPlace();
    console.log(boardInformation);
}

function deleteBoard() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            document.getElementById(i.toString() + "-" + j.toString()).remove();
        }
    }
}

function numberOfFlagsAllowedToPlace() {
    document.getElementById("flag-counter").innerHTML = numberOfFlags;
}

function lostGame() {
    setFaceStatus("img\\boom.png");
}

function revealCell(cell) {
    // console.log(cell);
    let row = cell.id.split("-")[0];
    let col = cell.id.split("-")[1];
    cell.classList.remove("hidden");
    cell.classList.add("unhidden");
    revealedCells++;
    cell.classList.add("disabled");
    let cellContent = checkCellContent(row, col);
    if (cellContent == "*") {
        cell.innerHTML = "&#128163";
        lostGame();
        showAllMines();
        disableAllCells();
    } else {
        cell.innerHTML = cellContent;
        if (cellContent == 0) {
            revealAdjacentCells(row, col);
        }

        if (revealedCells >= (rows * columns) - numOfMines) {
            setFaceStatus("img\\happy.png");
            disableAllCells();
            tagAllMinesWithFlag();
        }
    }
}

function tagAllMinesWithFlag() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (boardInformation[i][j] == "*"){
                document.getElementById(i.toString() + "-" + j.toString()).innerHTML = "🚩";
            }
        }
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

function revealAdjacentCells(r, c) {
    let ro = r;
    let co = c;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            try {
                ro = r - 1 + i;
                co = c - 1 + j;

                if (document.getElementById(ro.toString() + "-" + co.toString()).classList.contains("hidden")) {
                    document.getElementById(ro.toString() + "-" + co.toString()).classList.remove("hidden");
                    document.getElementById(ro.toString() + "-" + co.toString()).classList.add("unhidden");
                    revealedCells++;
                    document.getElementById(ro.toString() + "-" + co.toString()).innerHTML = countAdjacentMines(ro, co);
                    if (document.getElementById(ro.toString() + "-" + co.toString()).innerHTML == "0") {
                        revealAdjacentCells(ro, co);
                    }

                }
            } catch {
                console.log("Trying to check a cell that is out of the ragne of the array.");
            }
        }
    }
}