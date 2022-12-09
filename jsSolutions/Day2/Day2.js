const fs = require('fs');
const readline = require('readline')

getElfWithMostCalories();

async function getElfWithMostCalories() {
    findHighestCalCount('./input.txt');
}

async function findHighestCalCount(filename) {

    var totalScore = 0;

    const file = readline.createInterface({
        input: fs.createReadStream(filename),
        output: process.stdout,
        terminal: false
    });

    file.on('line', async (line) => {
        var scoreMap = new Map([["X",1],["Y",2],["Z",3]]);
        var winningPairs = new Set(["A Y","B Z","C X"]);
        var drawPairs = new Set(["A X","B Y","C Z"]);
        
        var decodedLine = decodePlay(line)
        var myPlay = decodedLine[2];

        if(scoreMap.has(myPlay)) {
            totalScore += scoreMap.get(myPlay);
        }

        if (drawPairs.has(decodedLine)) {
            console.log("DRAW");
            totalScore += 3
        } else if (winningPairs.has(decodedLine)) {
            console.log("YOU WIN");
            totalScore += 6
        }
        else {
            console.log("LOSE");
        }

    });

    file.on('close', () => {
        console.log(totalScore);
    })

}

function decodePlay(line) {
    var keyMap = new Map();
        keyMap.set("A",{X:"Z", Y:"X", Z:"Y"});
        keyMap.set("B",{X:"X", Y:"Y", Z:"Z"});
        keyMap.set("C",{X:"Y", Y:"Z", Z:"X"});

    var roundOptions = keyMap.get(line[0]);
    var myPlay = roundOptions[line[2]];

    return `${line[0]} ${myPlay}`;
}
