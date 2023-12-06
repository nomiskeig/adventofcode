const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    rows = data.split('\n').splice(0, 300);
    part1 = rows
        .map((row) => [
            row.slice(0, row.length / 2),
            row.slice(row.length / 2, row.length),
        ])
        .map((arr) => getRedundant(arr[0], arr[1]))
        .reduce((acc, curr) => acc + getPrio(curr), 0);

    console.log(rows)
    part2 = rows
        .reduce(
            (acc, curr) => {
                if (acc[acc.length - 1].length < 3) {
                    acc[acc.length - 1].push(curr);
                    return acc;
                } else {
                    return [...acc, [curr]];
                }
            },
            [[]]
        )
       .map((group) => getRedundant3(group[0], group[1], group[2]))
        .reduce((acc, curr) => acc + getPrio(curr), 0);

    console.log('Part 1: ' + part1);
    console.log('Part 2: ' + part2);
});
function getRedundant(str1, str2) {
    res = '';
    for (letter1 of str1.split('')) {
        for (letter2 of str2.split('')) {
            if (letter1 == letter2 && !res.includes(letter1)) {
                res += letter1;
            }
        }
    }
    return res;
}
function getRedundant3(str1, str2, str3) {
    //console.log(str1, str2, str3)
    return getRedundant(getRedundant(str1, str2), getRedundant(str2, str3));
}
function getPrio(letter) {
    console.log(letter)
    let patternSmall = /[a-z]/;
    if (patternSmall.test(letter)) {
        return letter.codePointAt(0) - 96;
    }
    return letter.codePointAt(0) - 38;
}
