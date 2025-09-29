let parsedInput = []

function parseInput(day, file) {
  const fs = require('fs');
  
  data = fs.readFileSync(`day${day}/${file}.txt`)
  const stringArray = data.toString().split("\r\n")
  return stringArray.map(line => {
    return line.split("")
  })
}
parsedInput = parseInput(4, 'input')

const directions = [[1,1], [-1,-1], [1,-1], [-1,1]]

function wordSearch() {
  let counter = 0
  // iterate looking for center A
  for (let x = 0; x < parsedInput.length; x++) {
    const row = parsedInput[x]
    for (let y = 0; y < row.length; y++) {
      if (row[y] == "A") {
        // collect all the diagonals
        let diagonals = []
        for (const direction of directions) {
          const newCoords = [x + direction[0], y + direction[1]]
          if (parsedInput[newCoords[0]]) {
            if (parsedInput[newCoords[0]][newCoords[1]]) {
              diagonals.push(parsedInput[newCoords[0]][newCoords[1]])
            }
          }
        }
        if (diagonals.length == 4) {
          let forward = false
          let backward = false
          if ((diagonals[0] == "M" && diagonals[1] == "S") || (diagonals[0] == "S" && diagonals[1] == "M")) {
            backward = true
          }
          if ((diagonals[2] == "M" && diagonals[3] == "S") || (diagonals[2] == "S" && diagonals[3] == "M")) {
            forward = true
          }
          if (forward && backward) {
            counter++
          }
        }
      }
    }
  }
  return counter
}


console.log(wordSearch())