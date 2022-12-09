const readline = require('readline');
const fs = require('fs');

rearageStacks();

async function rearageStacks() {
    var stacksObject = await buildStacks();
    var reorderedStacks = reorderStacks(stacksObject);

    console.log("REORDERED", reorderedStacks);
}

async function buildStacks() {
    var data = await readFile("./input.txt");
    var splitData = data.split("\r\n\r\n");
    var stacks = splitData[0];
    var instructions = splitData[1];

    var splitStacks = stacks.split("\n");
    var lineCharNum = splitStacks[0].length;
    var numStacks = splitStacks[0].length / 4;

    var stacks = new Map();

    for(var i = 1; i <= numStacks; i++) {
        stacks.set(i,[]);
    }

    for(var currentLine of splitStacks) {
        var currentIndex = 1;
        var currentStack = 1;

        while(currentIndex < lineCharNum) {
            var char = currentLine[currentIndex];
            if (char !== ' ') {
                stacks.get(currentStack).push(char);
            }

            currentIndex += 4;
            currentStack++;   
        }
    }

    for(const [key, value] of stacks) {
        stacks.set(key,value.slice(0,value.length-1).reverse());
    }

    return {stacks, instructions}
}

function reorderStacks(stackObj) {
    var instructionSplit = stackObj.instructions.split("\r\n");
    var stacks = stackObj.stacks;
    console.log(stacks);

    for(var instruction of instructionSplit) {

        var instructionParts = instruction.split(" ");
        var decodedIntruction = [];
        for(var part of instructionParts) {
            if(parseInt(part)) {
                decodedIntruction.push(parseInt(part));
            }
        }

        numPops = decodedIntruction[0];
        stackOne = decodedIntruction[1];
        stackTwo = decodedIntruction[2];

        var stackOneData = stacks.get(stackOne);
        var stackTwoData = stacks.get(stackTwo);

        if (!numPops || !stackOne || !stackTwo || !stackTwoData || !stackOneData) {
            continue;
        }

        if(stackOneData.length > 0) {
            if(numPops == 1) {
                for(var i = 0; i < numPops; i++) {
                    if(stackOneData.length) {
                        stackTwoData.push(stackOneData.pop());
                    } else {
                        break;
                    }
                }
            }
            else {
                var tempStack = [];

                for(var i = 0; i < numPops; i++) {
                    tempStack.push(stackOneData.pop());
                }

                var tempStackLen = tempStack.length;
                for(var j = 0; j < tempStackLen; j++) {
                    stackTwoData.push(tempStack.pop())
                }
            }

            stacks.set(stackOne, stackOneData);
            stacks.set(stackTwo, stackTwoData);
        }
    }

    return stacks;
    
}

async function readFile(fileName) {
    const data = fs.readFileSync(fileName, "utf8", function (err,data) {
        if (err) {
            console.log(err);
        }

        return data;

    });

    return data;
}