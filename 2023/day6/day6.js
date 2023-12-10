const fs = require('fs');
fs.readFile('data.txt', 'utf8', (err, data) => {
    let lines = data.split('\n').slice(0, -1);
    console.log(lines[0]);
    let times = [];
    let hasTime = false;
    let currentTime = ''
    for (let char of lines[0]) {
        if (char.match(/[0-9]/)) {
            hasTime = true;
            currentTime += char;
        } else if (hasTime) {
            times.push(currentTime);
            currentTime = '';
            hasTime = false;
        }

    }
    times.push(currentTime)
    let totalTime = parseInt(times.reduce((a, b) => a + b, ''));
    console.log(totalTime)
    times = times.map((time) => parseInt(time));
    console.log(times);
    let distances = [];
    let hasDistance = false;
    let currentDistance = ''
    for (let char of lines[1]) {
        if (char.match(/[0-9]/)) {
            hasDistance = true;
            currentDistance += char
        } else if (hasDistance) {
            distances.push(currentDistance);
            currentDistance = '';
            hasDistance = false;
        }

    }
    distances.push(currentDistance)
    let totalDistance = parseInt(distances.reduce((a, b) => a + b, ''));
    console.log(totalDistance)
    distances = distances.map((time) => parseInt(time));
    console.log(distances);
    let races = [];
    for (let i = 0; i < times.length; i++) {
        races.push(new Race(times[i], distances[i]));

    }
    let result = 1;
    for (let race of races) {
        result *= race.getPosibilities();
    }
    console.log(result);
    console.log(new Race(totalTime, totalDistance).getPosibilities());


})


class Race {
    time = 0;
    distance = 0;
    constructor(time, distance) {
        this.time = time;
        this.distance = distance;
    }

    getPosibilities() {
        let posibilities = 0;
        for (let i = 1; i < this.time; i++) {
            if ((this.time - i) * i > this.distance) {
                posibilities++;
            }
        }
        return posibilities;
    }
}
