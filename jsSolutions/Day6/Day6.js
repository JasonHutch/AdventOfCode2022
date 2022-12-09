const fs = require('fs');

getStartOfPacket();

async function getStartOfPacket() {
    var data = await readFile("./input.txt");
    var startingCharNum = findStartOfPacket(data);
    console.log(startingCharNum);
}

function findStartOfPacket(data) {
    var uniqueChars = 4;
    var low = 0;
    var high = uniqueChars;

    while (high <= data.length) {
        var packetSet = new Set(data.substring(low, high));
        
        if (packetSet.size === uniqueChars) {
            return high;
        } else {
            low++;
            high++;
        }
    }
    return -1;
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