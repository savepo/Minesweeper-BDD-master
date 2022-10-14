let boardSize = 8;
let rows = 8;
let columns = 8;
let numOfMines = 10;
let boardArray;
let columnsArray;
let boardInformation;
let boardTagsInfo;
let numberOfFlags;
let revealedCells = 0;
let timeIsActive = false;
let interval;

window.onload = function () {
    resetClickingFace();
    newGame();
    numberOfFlagsAllowedToPlace();
}

function getMockData() {
    return window.location.search.split("?");
}

function createBoardElements() {
    let firstClick = true;
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
                if (!timeIsActive) {
                    timeIsActive = true;
                    TimeCounterControl();
                }
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

function leftClickEvent() {
    if (!timeIsActive) {
        timeIsActive = true;
        TimeCounterControl();
    }
    revealCell(cell);
}

function resetClickingFace() {
    document.getElementById("faceButton").addEventListener("click", () => {
        deleteBoard();
        clearInterval(interval);
        timeIsActive = false;
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
}

// ========================= BOARD CREATION========================= //

function calculateDimensionsFromMockData() {
    let ContentUrl = window.location.search.split("?");
    let MockData = ContentUrl[1].split("-");
    rows = MockData.length;
    columns = MockData[0].length;
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

function createMarksArray() {
    boardTagsInfo = [rows];
    for (let i = 0; i < rows; i++) {
        boardTagsInfo[i] = [columns];
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            boardTagsInfo[i][j] = "";
        }
    }
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
    document.getElementById("time-counter").innerHTML = "0";
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
    clearInterval(interval);
    firstClick = true;
    timeIsActive = false;
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
            if (boardInformation[i][j] == "*") {
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

function TimeCounterControl() {
    let second = 1;
    interval = setInterval(function () {
        if (timeIsActive) {
            document.getElementById("time-counter").innerHTML = second.toString();
            second++;
        }
    }, 1000);
}