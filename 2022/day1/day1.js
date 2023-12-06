const fs = require('fs');

fs.readFile('file1.txt', 'utf8', (err, data) => {
	rows = data
		.split('\n')
		.map((s) => (s != '' ? parseInt(s) : -1))

    console.log(rows)
    result = [0]
    i = 0
    for (const a of rows) {
       if (a != (-1)) {
            result[i] += a
        }
        else {
            i += 1;
            result[i] = 0;
        }
    }
    result.sort().reverse()
    console.log(result.splice(0,3).reduce((acc, curr) => acc + curr, 0))
});
