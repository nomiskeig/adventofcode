const fs = require('fs');
fs.readFile('data.txt', 'utf8', (err, data) => {

    let lines = data.split('\n').slice(0, -1);
    let directions = lines[0];
    console.log(directions)
    lines = lines.slice(2)
    let map = {};
    for (let line of lines) {
        let node = new Node(line)
        map[node.name] = node
    }
    console.log(map)
    let part2 = true;
    if (!part2) {

        let currentNode = map["AAA"]
        let found = false;
        let counter = 0;
        while (!found) {
            for (let char in directions) {
                counter += 1;

                if (directions[char] == "R") {
                    currentNode = map[currentNode.right]
                }
                else {
                    currentNode = map[currentNode.left]
                }
            }
            if (currentNode.name == "ZZZ") {
                found = true;
            }
        }
        console.log(counter)
    }

    if (part2) {
        let currentNodes = [];
        for (const key in map) {
            console.log(key)
            if (key[2] == "A") {
                currentNodes.push(map[key])

            }

        }
        console.log(currentNodes)
        let counter = 0;
        let found = false;
        let steps = []
        let done = []
        let doneCounter = 0;
        for (let i = 0; i < currentNodes.length; i++) {
            steps[i] = 0;
            done[i] = false;
        }
        while (doneCounter < currentNodes.length) {
            for (let char in directions) {
                for (let i = 0; i < currentNodes.length; i++) {
                    if (done[i]) {
                        continue;
                    }

                    steps[i] += 1;

                    if (directions[char] == "R") {
                        currentNodes[i] = map[currentNodes[i].right]
                    }
                    else {
                        currentNodes[i] = map[currentNodes[i].left]
                    }
                    if (currentNodes[i].name[2] == "Z") {
                        done[i] = true;
                        doneCounter += 1;
                    }

                }
            }
        }
        console.log(steps)
        console.log(lcm(...steps))
    }



});


const lcm = (...arr) => {
    const gcd = (x, y) => (!y ? x : gcd(y, x % y));
    const _lcm = (x, y) => (x * y) / gcd(x, y);
    return [...arr].reduce((a, b) => _lcm(a, b));
};
function deapthSearch(start, goal, map) {
    console.log(start, goal)
    if (start == goal) {
        return 0;
    }
    if (start == map[start].right) {
        return Number.MAX_VALUE;
    }
    let node = map[start]
    let left = deapthSearch(node.left, goal, map)
    let right = deapthSearch(node.right, goal, map)
    return Math.min(left, right) + 1


}



class Node {
    constructor(line) {

        let parts = line.split(" = ");
        this.name = parts[0]
        parts = parts[1].slice(1, -1).split(", ")
        this.right = parts[1]
        this.left = parts[0]
    }

}
