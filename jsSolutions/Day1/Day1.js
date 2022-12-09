const fs = require('fs');
const readline = require('readline')

getElfWithMostCalories();

async function getElfWithMostCalories() {
    findHighestCalCount('./input.txt');
}

async function findHighestCalCount(filename) {
    var maxCals = 0;
    var currentValue = 0;

    const file = readline.createInterface({
        input: fs.createReadStream(filename),
        output: process.stdout,
        terminal: false
    });

    file.on('line', async (line) => {
        if(line.replace(/\s/g, '').length === 0) {
            if (currentValue > maxCals) {
                maxCals = currentValue;
            }
            currentValue = 0;
        } else {
            currentValue += parseInt(line);
        }
    });

    

    return maxCals;
}
