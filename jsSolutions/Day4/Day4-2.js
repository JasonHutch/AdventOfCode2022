const fs = require('fs');
const readline = require('readline')

getOverlappingPairs("./input.txt");

function getOverlappingPairs(filename) {
    var total = 0;
    
    const file = readline.createInterface({
        input: fs.createReadStream(filename),
        output: process.stdout,
        terminal: false
    });

    file.on('line', async (line) => {
        if (hasOverlap(line)) {
            total+=1;
            console.log(total);
        }
    });

    file.on('close', () => {
        console.log(total);
    })
}

function hasOverlap(line) {
    var pairs = line.split(",");
    var pair1 = pairs[0].split("-");
    var pair2 = pairs[1].split("-");
    var smallestUpperBound = Math.min(pair1[1], pair2[1]);

     if((pair1[0] == pair2[0]) || (pair1[1] == pair2[1])) {
         return true;
     }

    if (smallestUpperBound == parseInt(pair1[1])) {
        return smallestUpperBound >= parseInt(pair2[0]); // true indicates an identified overlap
    } else if (smallestUpperBound == parseInt(pair2[1])) {
        return smallestUpperBound >= parseInt(pair1[0]);
    }
};