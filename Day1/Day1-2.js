const fs = require('fs');
const readline = require('readline')

getElfWithMostCalories();

async function getElfWithMostCalories() {
    const allCalValues = findHighestCalCount('./input.txt');
    // const sortedValues = binarySort(allCalValues);
    // console.log(sum(sortedValues.slice(2)))
}

function findHighestCalCount(filename) {
    var values = [];
    var currentValue = 0;
    var spaceCount = 0;

    const file = readline.createInterface({
        input: fs.createReadStream(filename),
        output: process.stdout,
        terminal: false
    });

    file.on('line', (line) => {
        if(line.replace(/\s/g, '').length === 0) {
            values.push(currentValue);
            console.log(`${spaceCount} ${currentValue}`);
            currentValue = 0;
            spaceCount++;
            
            console.log(line);
        } else {
            currentValue += parseInt(line);
            console.log(currentValue);
        }
    });

    file.on('close', () => {
        values.push(currentValue);
        console.log(`${spaceCount} ${currentValue}`);

        var sortedArray = values.sort().reverse();
        console.log(sortedArray);
        console.log(sum(sortedArray.slice(1,4)));
    })
}

function binarySort(input) {

}

function sum(input) {
    console.log(input);

    var total = 0;

    for(var i = 0; i < input.length; i++) {
        total += input[i];
    }

    return total;
}

// Import fsPromises
// const fsPromises = require('fs').promises;

// async function readCsv() {
//   // The content will be available after finished reading
//   const content = await fsPromises.readFile('./input.txt');
//   // By default, the content return as Buffer here
//   console.log('content', content);
//   return content;
// }

// console.log('Start reading file');
// (async () => {
//   await readCsv();
//   console.log('Finished reading file');

// })()

// console.log('Running other operation');