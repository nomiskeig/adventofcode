const fs = require('fs');

const maximums = {
    "red": 12,
    "green": 13,
    "blue": 14
}
class Game {
    constructor(line) {
        this.reds = 0;
        this.greens = 0;
        this.blues = 0;
        let parts = line.split(':');
        this.gameid = parseInt(parts[0].split(' ')[1]);
        // get green cubes
        const greenRegex = /(\d+) green/g;
        for (const [key, value] of Object.entries(maximums)) {
            let pattern = new RegExp(`(\\d+) ${key}`, 'g');
            let matches = parts[1].match(pattern).map(x => x.split(' ')[0]).map(x => parseInt(x));
            console.log(matches);
            for (let match of matches) {
                if (key == "red") {
                    this.reds = replaceIfBigger(this.reds, match);
                }
                if (key == "green") {
                    this.greens = replaceIfBigger(this.greens, match);
                }
                if (key == "blue") {
                    this.blues = replaceIfBigger(this.blues, match);
                }
            }
        }
        console.log(this.reds, this.greens, this.blues)
    }

    isPossible() {
        return this.reds <= 12 && this.greens <= 13 && this.blues <= 14;
    }



}

function replaceIfBigger(a, b) {
    if (a < b) {
        return b;
    }
    return a;
}

fs.readFile('data.txt', 'utf8', (err, data) => {
    let lines = data.split('\n').slice(0, -1);
    let games = [];
    let sum = 0;
    let powersum = 0;
    for (let line of lines) {
        games.push(new Game(line));
        let game = games[games.length - 1];
        if (game.isPossible()) {
            sum += game.gameid;
        }
        powersum += game.reds * game.greens * game.blues;
    }
    console.log("Part 1: " + sum);
    console.log("Part 2: " + powersum)
});
