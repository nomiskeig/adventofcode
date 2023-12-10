const fs = require('fs');
fs.readFile('data.txt', 'utf8', (err, data) => {

    let lines = data.split('\n').slice(0, -1);

    let histories = [];
    let doneCounter = 0;
    let done = []
    for (let i = 0; i < lines.length; i++) {
        histories.push([])

        histories[i].push(lines[i].split(' ').map(x => parseInt(x)))
        done.push(false)
    }
    while (doneCounter < histories.length) {
        for (let i = 0; i < histories.length; i++) {
            if (done[i]) {
                continue;
            }
            let nextSequence = getNextSequence(histories[i][histories[i].length - 1])
            histories[i].push(nextSequence)
            if (isNullSequence(nextSequence)) {
                done[i] = true;
                doneCounter += 1;
            }
        }

    }
    console.log(histories)
    let sum = 0;
    let sum2 = 0;
    for (let history of histories) {
        let next = getNextNumber(history)
        let prev = getPreviousNumber(history)
        console.log(next)
        console.log(prev)
        sum += next; 
        sum2 += prev;
    }
    console.log(sum)
    console.log(sum2)
})


function getNextSequence(sequence) {

    let newSequence = [];
    for (let i = 1; i < sequence.length; i++) {
        newSequence.push(sequence[i] - sequence[i - 1])
    }
    return newSequence;
}

function isNullSequence(sequence) {
    for (let i = 0; i < sequence.length; i++) {
        if (sequence[i] != 0) {
            return false;
        }
    }
    return true;
}


function getNextNumber(sequences) {
    console.log("getNextNumber")
    console.log(sequences)
    let nextNumber = 0;
    for (let i = sequences.length -2; i >= 0; i--) {
        //console.log("next number: " + sequences[i][sequences[i].length - 1])
        nextNumber = nextNumber + sequences[i][sequences[i].length - 1]

    }
    return nextNumber
}
function getPreviousNumber(sequences) {
    let prevNumber = 0;
    for (let i = sequences.length -2; i >= 0; i--) {
        prevNumber = sequences[i][0] - prevNumber 
    }
    return prevNumber
}
