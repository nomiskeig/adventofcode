const fs = require('fs');

fs.readFile('data.txt', 'utf8', (err, data) => {
    let lines = data.split('\n').slice(0, -1);
    let regx = 1;
    let cycles = 1;
    let values = [];
    let index = 0;


    values.push(regx);
    values.push(regx);
    for (let line of lines) {
        index += 1;
        if (line === "noop") {
            cycles += 1;
            values.push(regx);

        }
        else {
            cycles += 2;
            let number = parseInt(line.split(' ')[1]);
            values.push(regx);
            regx = regx + number;
            values.push(regx);
        }
    }
    //console.log(values[20]);
    //console.log(values[60]);
    //console.log(values[101]);
    //console.log(values[140]);
    //console.log(values[180]);
    //console.log(values[220]);
    let sum = 0;
    for (let i = 20; i <= 220; i += 40) {
        sum += values[i] * i;
    }
    for (let value of values) {
        console.log(value);
    }

    let string = "";
    for (let i = 1; i <= 240; i += 1) {
        console.log("pos: " + values[i])
        console.log("frame: " + ((i-1 % 40)))
        console.log("cycle: " + i)
        let pos = values[i];
        let frame = ((i -1)% 40) ;
        if (frame % 40 === 0) {
            console.log("newline")
        }
        if (frame >= pos - 1 && frame <= pos + 1) {
            string += "#"

        }
        else {
            string += "."
        }
        if ((i ) % 40 === 0 && i-1 !== 240) {
             
            string += "\n"
        }



    }
    console.log(string);
    /** for (let i = 0; i < 240; i += 1) {
         if ((i + 1) % 40 >= values[i] - 1 && (i+1) % 40 <= values[i] + 1) {
             string += "#"
         }
         else {
             string += "."
         }
         if ((i + 1) % 40 === 0 && i !== 240) {
             string += "\n"
         }
        **/

    //(}
    //console.log(string);


})
