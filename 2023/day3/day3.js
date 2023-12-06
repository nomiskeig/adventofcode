const fs = require('fs');



let parts = [];
let symbols = [];

class Symbol {
    constructor(row, column, symbol) {
        this.row = row;
        this.column = column;
        this.symbol = symbol;

    }
}
class Part {
    constructor(row, columnStart, columnEnd, value) {
        this.row = row;
        this.columnStart = columnStart;
        this.columnEnd = columnEnd;
        this.value = value;
        this.length = columnEnd - columnStart + 1;
    }
}

fs.readFile('data.txt', 'utf8', (err, data) => {
    let lines = data.split('\n').slice(0, -1);
    for (let i = 0; i < lines.length; i++) {
        parseLine(lines[i], i);
    }
    //console.log(parts);
    //console.log(symbols);
    // sum the parts adjacent to a symbol
    let sum = 0;
    for (let part of parts) {
        console.log(part);
        for (let symbol of symbols) {
            if (isAdjacent(part, symbol)) {
                sum += part.value;
            }
        }
    }
    console.log(sum);
    let gearSum = 0;
    for (let symbol of symbols) {
        
        if (symbol.symbol == '*') {
            let amountAdjacent = 0;
            let adjacentValues = [];
            for (let part of parts) {
                if (isAdjacent(part, symbol)) {
                    amountAdjacent++;
                    adjacentValues.push(part.value);
                }
            }
            if (amountAdjacent == 2) {
                let ratio = adjacentValues[0] * adjacentValues[1];
                gearSum += ratio;
            }


        }


    }
    console.log("gear sum: " + gearSum);

})

function isAdjacent(part, symbol) {
    if ((part.columnEnd <= symbol.column + 1 && part.columnEnd >= symbol.column - 1) ||
        (part.columnStart <= symbol.column + 1 && part.columnStart >= symbol.column - 1)) {
        if (part.row >= symbol.row - 1 && part.row <= symbol.row + 1) {
            //console.log(part + "is adjacent to" + symbol);
            return true;
        }
    }
    //console.log(part)
    return false;
}
function parseLine(line, row) {
    function addPart() {
        let part = new Part(row, currentPartColumnStart, column - 1, parseInt(currentPartValue));
        parts.push(part);
        parsingPart = false;
    }
    let column = 0;
    let parsingPart = false;
    let currentPartColumnStart = 0;
    let currentPartValue = '';
    for (let char of line) {
        if (char == '.') {

            if (parsingPart) {
                addPart();
            }
            column++;
            continue;
        }
        else if (char.match(/[0-9]/)) {
            if (!parsingPart) {
                parsingPart = true;
                currentPartColumnStart = column;
                currentPartValue = char;
                column++;
                continue;
            } else {
                currentPartValue += char;
                column++;
                continue;
            }
        } else {
            if (parsingPart) {
                addPart();
            }
            let symbol = new Symbol(row, column, char);
            symbols.push(symbol);
            column++;
            continue;
        }

    }
    if (parsingPart) {
        addPart();
    }


}
