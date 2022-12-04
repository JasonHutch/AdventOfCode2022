const fs = require('fs');
const readline = require('readline')

getCompartmentTotals("./input.txt");

function getCompartmentTotals(filename) {
    var total = 0;
    
    const file = readline.createInterface({
        input: fs.createReadStream(filename),
        output: process.stdout,
        terminal: false
    });

    file.on('line', async (line) => {
        var commonChar = findCommonChar(line);
        total += calcCharValue(commonChar);

    });

    file.on('close', () => {
        console.log(total);
    })

   
}

function findCommonChar(line) {
    var middleIndex = line.length / 2;
    var comp1 = line.substring(0,middleIndex);
    var comp2 = line.substring(middleIndex, line.length);
    var comp1Set = new Set(comp1.split(''));

    // console.log(comp1);
    // console.log(comp2);
    // console.log(comp1Set);

    for(let value of comp2) {
        if (comp1Set.has(value)) {
            return value;
        }
    }
}

function calcCharValue(char) {
    var charDecimalVal = char.charCodeAt(0);
    if (charDecimalVal > 96) {
        return charDecimalVal - 96
    } else {
        return charDecimalVal - 38
    }
}
