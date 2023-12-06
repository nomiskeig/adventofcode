const fs = require('fs');

fs.readFile('data.txt', 'utf8', (err, data) => {
    let newdata = calculateAmount(data.split('\n').slice(0, -1))
    console.log(newdata)
    let newdata2 = calculateAmount(data.split('\n').slice(0, -1).map(row => replaceWord(row)))
    console.log(newdata2)

    console.log(replaceWord("eightwo"))

})
let calculateAmount = (strings) => {
    return strings.map(row => row.replace(/([a-z]|[A-Z])*/g, '')).map(stringnumber =>
        stringnumber.at(0) + stringnumber.at(stringnumber.length - 1)).map(stringnumber => parseInt(stringnumber)).reduce((acc, curr) => acc + curr, 0)


}

let replaceWord = (string) => {
    let newstring = string.replaceAll(/one/g, "one1one");
    newstring = newstring.replaceAll(/two/g, "two2two");
    newstring = newstring.replaceAll(/three/g, "three3three");
    newstring = newstring.replaceAll(/four/g, "four4four");
    newstring = newstring.replaceAll(/five/g, "five5five");
    newstring = newstring.replaceAll(/six/g, "six6six");
    newstring = newstring.replaceAll(/seven/g, "seven7seven");
    newstring = newstring.replaceAll(/eight/g, "eight8eight");
    newstring = newstring.replaceAll(/nine/g, "nine9nine");
    return newstring
} 
