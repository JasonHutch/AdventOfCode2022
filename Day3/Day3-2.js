const fs = require('fs');
const readline = require('readline')

getCompartmentTotals("./input.txt");

function getCompartmentTotals(filename) {
    var total = 0;
    var currentLine = 1;
    var elfGroup = [];
    
    const file = readline.createInterface({
        input: fs.createReadStream(filename),
        output: process.stdout,
        terminal: false
    });

    file.on('line', async (line) => {
        if(currentLine % 3 === 0) {
            // Process + clear my elf group
            elfGroup.push(line);
            var commonChar = findCommonChar(elfGroup);
            total += calcCharValue(commonChar);
            elfGroup = [];
            currentLine++
        } else {
            elfGroup.push(line);
            currentLine++;
        }
    });

    file.on('close', () => {
        console.log(total);
    })

   
}

function findCommonChar(lines) {
    // find common pairs between first two
    console.log(lines);

    var setOne = new Set(lines[0].split(""));
    var matchingSet = new Set();

    for(let currentValue of lines[1]) {
        if(setOne.has(currentValue)) {
            matchingSet.add(currentValue);
        }
    }

    console.log(matchingSet);
    for(let num of lines[2]) {
        if (matchingSet.has(num)) {
            console.log("BADGE NUMBER", num);
            return num;
        }
    }
}

function calcCharValue(char) {
    var charDecimalVal = char.charCodeAt(0);
    if (charDecimalVal > 96) {
        return charDecimalVal - 96;
    } else {
        return charDecimalVal - 38;
    }
}
