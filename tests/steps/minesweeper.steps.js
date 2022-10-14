/* eslint-disable no-undef */
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { get, find } = require('lodash');

const url = 'http://127.0.0.1:5500/index.html';

async function clickCell(cellId) {
    cell = await page.$('#1-1');
    await cell[0].click();
}

async function resetGameTest() {
    await page.locator('data-testid=faceButton').click();
}

async function buttonRightClick(buttonId) {
    await page.locator(`[data-testid="${buttonId}"]`).click({ button: "right" });
}

async function checkMockdata(string) {
    let rows = string.split("-").length;
    let cols = string.split("-")[0].length;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let toBe = await page.locator('data-testid=' + i + "-" + j).innerText();
            if (string.split("-")[i].charAt(j) != ".") {
                expect(string.split("-")[i].charAt(j)).toBe(toBe);
            } else {
                
                expect(await toBe.getAttribute("class")).toBe("hidden");
            }

        }
    }
}

Given('the user opens the app', async () => {
    await page.goto(url);
});


Given('the user loads the following mock data: {string}', async (string) => {
    let url = 'http://127.0.0.1:5500/index.html?' + string;
    await page.goto(url);
});

Then('all the cells should be hidden', async () => {
    const hiddenClass = await page.$$('.hidden');
    const cellClass = await page.$$('.cell');
    expect(hiddenClass.length).toBe(cellClass.length);
});

Then('the number of columns in the board should be {string}', async function (string) {
    const rowClass = await page.$$('#row0 div');
    let rowNumber = rowClass.length;
    expect(rowNumber.toString()).toBe(string);
});

Then('the number of rows in the board should be {string}', async function (string) {
    const columnClass = await page.$$('[class="row"]');

    let columnNumber = columnClass.length;
    expect(columnNumber.toString()).toBe(string);
});


When('the user reveals the cell {string}', async function (string) {
    await page.locator('data-testid=' + string).click();

});

Then('the cell {string} should be revealed', async function (string) {
    const clickedCell = await page.locator('data-testid=' + string);
    const classCell = await clickedCell.getAttribute('class');
    expect(classCell.includes("unhidden")).toBeTruthy();
});

Then('the cell {string} should display a bomb', async (string) => {
    const displayCell = await page.locator('data-testid=' + string).innerText();
    let bomb = "\u{1F4A3}";
    expect(displayCell).toBe(bomb);
});

Then('the cell {string} should show {int}', async function (string, int) {
    const revealedCell = await page.locator('data-testid=' + string).innerText();
    expect(revealedCell).toBe(int.toString());
});

// When ('the user marks the cell {string} as mined', async function(string) {
//     await buttonRightClick(string);
// });

// Then('the cell {string} should show a flag', async function(string){
//     const markedCell = await page.locator('data-testid=' + string).innerText();
//     expect(markedCell).toBe("\u{1F6A9}");
// });

When('the user marks the cell {string} as mined', async function (string) {
    await buttonRightClick(string);
});

When('the user marks the cell {string} as uncertain', async function (string) {
    await buttonRightClick(string);
    await buttonRightClick(string);
});

When('the user marks the cell {string} as no-marked', async function (string) {
    const markedCell = await page.locator('data-testid=' + string).innerText()

    if (markedCell == "\u{1F6A9}") {
        await buttonRightClick(string);
        await buttonRightClick(string);
    } else if (markedCell == "\u{2753}") {
        await buttonRightClick(string);
    }
});

Then('the cell {string} should show a flag', async function (string) {
    const markedCell = await page.locator('data-testid=' + string).innerText();
    expect(markedCell).toBe("\u{1F6A9}");
});

Then('the cell {string} should show a question mark', async function (string) {
    const markedCell = await page.locator('data-testid=' + string).innerText();
    expect(markedCell).toBe("\u{2753}");
});

Then('the cell {string} should show void', async function (string) {
    const markedCell = await page.locator('data-testid=' + string).innerText();
    expect(markedCell).toBe("");
});

Then('the flag counter should show {string}', async function (string) {
    const flagCounter = await page.locator('data-testid=flag-counter').innerText();
    expect(flagCounter).toBe(string);
});

Then('the face image should be {string}', async function (string) {
    const faceImage = await page.locator('data-testid=faceStatus');
    const imageSource = await faceImage.getAttribute('src');
    switch (string) {
        case "serious":
            expect(imageSource).toBe("img\\neutral.png");
            break;

        case "exploded":
            expect(imageSource).toBe("img\\boom.png");
            break;
        default:

            break;
    }
});

Then('all the cells should be enabled', async function () {
    const numOfDisabled = await page.$$('.disabled');;
    expect(numOfDisabled.length).toBe(0);
});

When('the user reset the game', async function () {
    await resetGameTest();
});

When('the user presses on the face image', async function () {
    await resetGameTest();
});

Then('the game should be finished with the following result: {string}', async function (string) {
    const faceImage = await page.locator('data-testid=faceStatus');
    const imageSource = await faceImage.getAttribute('src');
    switch (string) {
        case "Win":
            expect(imageSource).toBe("img\\happy.png");
            break;

        case "Game over":
            expect(imageSource).toBe("img\\boom.png");
            break;
        default:

            break;
    }
});

Then('all the cells should be disabled', async function () {
    const numOfDisabled = await page.$$('.disabled');
    const cellClass = await page.$$('.cell');
    expect(numOfDisabled.length).toBe(cellClass.length);
});

When('the user left-click on the cell {string}', async function (string) {
    await page.locator('data-testid=' + string).click();
});

When('the user right-click on the cell {string}', async function (string) {
    await buttonRightClick(string);
});

Then('the time counter should be {string}', async function (string) {
    const timeCounter = await page.locator('data-testid=time-counter').innerText();
    expect(timeCounter).toBe("0");
});

Then('board should look like: {string}', async function (string) {
    await checkMockdata(string);
});