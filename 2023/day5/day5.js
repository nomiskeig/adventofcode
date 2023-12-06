const fs = require('fs');
fs.readFile('data.txt', 'utf8', (err, data) => {
    let parts = data.split('\n\n')
    //console.log(parts)

    let mappings = [];
    let locations = [];
    let locations2 = [];
    let seeds = parts[0].split(': ')[1].split(' ').map(x => parseInt(x));
    let mapStrings = parts.slice(1);
    //console.log(mapStrings)
    for (let mapString of mapStrings) {
        if (mapString.endsWith('\n')) {

            mapString = mapString.slice(0, -1);
        }
        let mapping = new Mapping(mapString);
        mappings.push(mapping);
    }
    for (let seed of seeds) {
        let next = seed;
        for (let mapping of mappings) {
            next = mapping.map(next);
            // console.log("Mapping " + seed + " from " + before + " to " + next);
        }
        locations.push(next);
    }

    let totalMin = null; 
    let total = 0;
    for (let i = 0; i < seeds.length; i += 2) {
        total += seeds[i + 1];
      /**  for (let j = seeds[i]; j < seeds[i] + seeds[i + 1]; j++) {

            let next = j;
            for (let mapping of mappings) {
                next = mapping.map(next);
            }
            if (totalMin == null || next < totalMin) {
                totalMin = next;
            }

        }
        */
    }
    console.log("Total: " + total);
    console.log("Seeds: " + seeds)
    console.log("Locations: " + locations)
    console.log("Min: " + Math.min(...locations))
    console.log("Min part 2: " + totalMin)

});


class MappingRange {
    constructor(source, destination, range) {
        this.source = source;
        this.destination = destination;
        this.range = range;
    }

    canMap(value) {
        return value >= this.source && value < this.source + this.range;
    }

    map(value) {
        if (this.canMap(value)) {
            return this.destination - this.source + value;
        } else {
            return null;
        }
    }
}
class Mapping {
    constructor(mapString) {
        //console.log(mapString)
        this.maps = mapString.split('\n').slice(1).map(x => x.split(' ').map(x => parseInt(x))).map(array => { return new MappingRange(array[1], array[0], array[2]) });
        //console.log(this.maps)
    }
    map(value) {
        for (let map of this.maps) {
            let mapped = map.map(value);
            if (mapped != null) {
                return mapped;
            }
        }
        return value;


    }


}
