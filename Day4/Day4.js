const fs = require('fs');
const readline = require('readline')

getOverlappingPairs("./input.txt");

function getOverlappingPairs(filename) {
    var total = 0;
    var numLines = 0;
    
    const file = readline.createInterface({
        input: fs.createReadStream(filename),
        output: process.stdout,
        terminal: false
    });

    file.on('line', async (line) => {
        numLines += 1;
        if (hasOverlap(line)) {
            total+=1;
            console.log(total);
        }
    });

    file.on('close', () => {
        console.log(total);
        console.log("NUMBER OF LINES", numLines);
    })
}

function hasOverlap(line) {
    var pairs = line.split(",");
    var pair1 = pairs[0].split("-");
    var pair2 = pairs[1].split("-");
    var lowRange = Math.min(pair1[0], pair2[0]);

    console.log(lowRange);
    console.log(pair1);
    console.log(pair2);

    if((pair1[0] == pair2[0]) || (pair1[1] == pair2[1])) {
        return true;
    }
    else if (lowRange == parseInt(pair1[0])) {
        console.log("1st has lowest");
        return parseInt(pair1[1]) > parseInt(pair2[1]); // true indicates an identified overlap
    } else if (lowRange == parseInt(pair2[0])) {
        console.log("2nd has lowest");
        return parseInt(pair1[1]) < parseInt(pair2[1]);
    }
};