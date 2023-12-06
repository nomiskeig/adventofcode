const fs = require('fs');

let hposX = 6000;
let hposY = 6000;
let tposX = 6000;
let tposY = 6000;
let posX = [10];
let posY = [10];
for (i = 0; i < 10; i++) {
    posX[i] = 6000;
    posY[i] = 6000;
}
let visited = [];
let visited2 = [];

fs.readFile('testinput2.txt', 'utf8', (err, data) => {
    data
        .split('\n')
        .slice(0, 2000)
        .map((row) => row.split(' '))
        .map((row) => [row[0], Number(row[1])])
        .forEach((row) => {
            //console.log('\n == ' + row[0] + " " + row[1] + " ==")
            for (let i = 0; i < row[1]; i++) {
                if (!visited[tposY]) {
                    visited[tposY] = [];
                }
                visited[tposY][tposX] = true;
                if (row[0] == 'L') {
                    hposX -= 1;
                }
                if (row[0] == 'R') {
                    hposX += 1;
                }
                if (row[0] == 'U') {
                    hposY += 1;
                }
                if (row[0] == 'D') {
                    hposY -= 1;
                }

                if (
                    Math.sqrt(
                        Math.pow(Math.abs(hposX - tposX), 2) +
                        Math.pow(Math.abs(hposY - tposY), 2)
                    ) > 1.5
                ) {
                    // move the tail

                    tposX +=
                        Math.abs(hposX - tposX) == 1 ? hposX - tposX : (hposX - tposX) / 2;
                    tposY +=
                        Math.abs(hposY - tposY) == 1 ? hposY - tposY : (hposY - tposY) / 2;
                }
                //printState();
                if (hposX < 0 || hposY < 0) {
                    console.log('mmh');
                }
            }
        });
    data
        .split('\n')
        .slice(0, 2000)
        .map((row) => row.split(' '))
        .map((row) => [row[0], Number(row[1])])
        .forEach((row) => {
            console.log('\n == ' + row[0] + ' ' + row[1] + ' ==');
            for (let i = 0; i < row[1]; i++) {
                if (!visited2[posY[9]]) {
                    visited2[posY[9]] = [];
                }
                visited2[posY[9]][posX[9]] = true;
                console.log(posX[9], posY[9]);
                if (row[0] == 'L') {
                    posX[0] -= 1;
                }
                if (row[0] == 'R') {
                    posX[0] += 1;
                }
                if (row[0] == 'U') {
                    posY[0] += 1;
                }
                if (row[0] == 'D') {
                    posY[0] -= 1;
                }
                for (let j = 1; j < 10; j++) {
                    if (
                        Math.sqrt(
                            Math.pow(Math.abs(posX[j - 1] - posX[j]), 2) +
                            Math.pow(Math.abs(posY[j - 1] - posY[j]), 2)
                        ) > 1.5
                        //Math.max(Math.abs(posX[j-1]-posX[j]), Math.abs(posY[j-1] - posY[j])) > 1.5
                    ) {
                        // move the tail
                        posX[j] +=
                            Math.abs(posX[j - 1] - posX[j]) == 1
                                ? posX[j - 1] - posX[j]
                                : (posX[j - 1] - posX[j]) / 2;
                        posY[j] +=
                            Math.abs(posY[j - 1] - posY[j]) == 1
                                ? posY[j - 1] - posY[j]
                                : (posY[j - 1] - posY[j]) / 2;
                    }
                }
            }
            printState2();
        });
                if (!visited2[posY[9]]) {
                    visited2[posY[9]] = [];
                }
                visited2[posY[9]][posX[9]] = true;
    let count = 0;
    let count2 = 0;
    for (let i = 0; i < visited.length; i++) {
        if (!visited[i]) {
            continue;
        }
        for (let j = 0; j < visited[i].length; j++) {
            if (visited[i][j] == true) {
                count += 1;
            }
        }
    }
    for (let i = 0; i < visited2.length; i++) {
        if (!visited2[i]) {
            continue;
        }
        for (let j = 0; j < visited2[i].length; j++) {
            if (visited2[i][j] == true) {
                count2 += 1;
            }
        }
    }
    printState3();
    let part1 = count;
    let part2 = count2;

    console.log('Part 1: ' + part1);
    console.log('Part 2: ' + part2);
});

function printState() {
    console.log('\n');
    for (let i = 4; i >= 0; i--) {
        let row = '';
        for (let j = 0; j < 6; j++) {
            if (hposX == j && hposY == i) {
                row += 'H';
            } else if (tposX == j && tposY == i) {
                row += 'T';
            } else row += '.';
        }
        console.log(row);
    }
}
function printState2() {
    console.log('\n');
    for (let i = 6020; i >= 5980; i--) {
        let row = '';
        for (let j = 5980; j < 6020; j++) {
            found = false;
            for (let k = 0; k < 10; k++) {
                if (posX[k] == j && posY[k] == i && !found) {
                    row += '' + k;
                    found = true;
                }
            }
            if (!found) {
                if (i == 6000 && j == 6000) {
                    row += 's';
                } else row += '.';
            }
        }
        console.log(row);
    }
}
function printState3() {
    console.log('\n');
    for (let i = 6020; i >= 5980; i--) {
        let row = '';
        for (let j = 5980; j < 6020; j++) {
            if (visited2[i] && visited2[i][j] == true && !(i == 6000 && j == 6000)) {
                row += '#';
            } else if (i == 6000 && j == 6000) {
                row += 's' } else row += '.';
        }
        console.log(row);
    }
}
