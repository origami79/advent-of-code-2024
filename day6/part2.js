function parseInput(day, file) {
  const fs = require('fs');
  
  data = fs.readFileSync(`day${day}/${file}.txt`)
  const stringArray = data.toString().split("\r\n").map(line => {
    return line.split("")
  })
  return stringArray
}

const parsedInput = parseInput(6, 'input')


const directions = {
  "^": [-1,0],
  ">": [0,1],
  "v": [1,0],
  "<": [0,-1]
}

function nextDirection(direction) {
  switch (direction) {
    case "^": return ">";
    case ">": return "v";
    case "v": return "<";
    case "<": return "^";
  }
}

function findGuard(map) {
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[0].length; y++) {
      let current = map[x][y]
      if (current == "^" || current == "v" || current == ">" || current == "<") {
        return [x, y]
      }
    }
  }
}

const guardStart = findGuard(parsedInput)