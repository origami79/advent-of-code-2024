let parsedInput = []

function parseInput(day, file) {
  const fs = require('fs');
  
  data = fs.readFileSync(`day${day}/${file}.txt`)
  const stringArray = data.toString().split("\r\n")
  return stringArray.map(line => {
    return line.split("")
  })
}

const word = "XMAS"
const directions = [[1,0], [1,1], [0,1], [-1,1], [-1,0], [-1,-1], [0,-1], [1,-1]]
let counter = 0

function recurse(coords, direction, index) {
  if (index == word.length) {
    counter ++
    return true
  }
  const newCoords = [coords[0] + direction[0], coords[1] + direction[1]]
  if (newCoords[0] < 0 || newCoords[0] > parsedInput.length-1 || newCoords[1] < 0 || newCoords[1] > parsedInput[0].length-1) {
    return false
  }
  const newLocation = parsedInput[newCoords[0]][newCoords[1]]
  if (newLocation == word[index]) {
    recurse(newCoords, direction, index + 1)
  } else {
    return false
  }
}


function wordSearch() {
  // iterate looking for target[0]
  for (let x = 0; x < parsedInput.length; x++) {
    const row = parsedInput[x]
    for (let y = 0; y < row.length; y++) {
      if (row[y] == word[0]) {
        // check each direction
        for (const direction of directions) {
          recurse([x,y], direction, 1)
        }
      }
    }
  }
  return counter
}


parsedInput = parseInput(4, 'input')
console.log(wordSearch())