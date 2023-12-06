const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    score = 0;
	rows = data
		.split('\n')
        .map(row => row.split(' '))
        .slice(0, 2500);
    rows.forEach(row => score += getScoreNew(row[0], row[1]));

    console.log(score)

});

function getScore(a,b) {
    self = b 
    opp = a 
    if (self == 'X' && opp == 'A')  {
        return 4;
    }
    if (self == 'X' && opp == 'B') {
        return 1;
    }
    if (self == 'X'&& opp == 'C') {
        return 7;
    }
    if (self == 'Y' && opp == 'A')  {
        return 8;
    }
    if (self == 'Y' && opp == 'B') {
        return 5;
    }
    if (self == 'Y'&& opp == 'C') {
        return 2;
    }
    if (self == 'Z' && opp == 'A')  {
        return 3;
    }
    if (self == 'Z' && opp == 'B') {
        return 9;
    }
    if (self == 'Z'&& opp == 'C') {
        return 6;
    }


}

function getScoreNew(a, b) {
    outcome = b;
    opp = a;
    if (outcome == 'X' && opp == 'A')  {
        return 3;
    }
    if (outcome == 'X' && opp == 'B') {
        return 1;
    }
    if (outcome == 'X'&& opp == 'C') {
        return 2;
    }
    if (outcome == 'Y' && opp == 'A')  {
        return 4;
    }
    if (outcome == 'Y' && opp == 'B') {
        return 5;
    }
    if (outcome == 'Y'&& opp == 'C') {
        return 6;
    }
    if (outcome == 'Z' && opp == 'A')  {
        return 8;
    }
    if (outcome == 'Z' && opp == 'B') {
        return 9;
    }
    if (outcome == 'Z'&& opp == 'C') {
        return 7;
    }

}


