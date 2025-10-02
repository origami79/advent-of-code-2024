let parsedInput = []

function parseInput(day, file) {
  const fs = require('fs');
  
  data = fs.readFileSync(`day${day}/${file}.txt`)
  const string = data.toString()
  const stringArray = string.split("\r\n").map(line => line.split("").map(char => parseInt(char)))
  return stringArray
}

parsedInput = parseInput(10, 'input')

const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
const xBound = parsedInput.length
const yBound = parsedInput[0].length

function inBounds (coords) {
  if (coords[0] >= 0 && coords[0] < xBound && coords[1] >= 0 && coords[1] < yBound) {
    return true
  }
}

function traverseTrail (coords, trailEnds) {
  const current = parsedInput[coords[0]][coords[1]]
  const coordsString = coords.join(",")
  if (current == 9 && !trailEnds.includes(coordsString)) {
    trailEnds.push(coordsString)
    return 1
  } 
  let score = 0;
  for (direction of directions) {
    const newCoords = [coords[0] + direction[0], coords[1] + direction[1]]
    if (inBounds(newCoords)) {
      const next = parsedInput[newCoords[0]][newCoords[1]]
      if (next == current + 1) {
        score += traverseTrail(newCoords, trailEnds) 
      }
    }
  }
  return score
}

function trailheadScore (map) {
  let score = 0
  for (let x = 0; x < xBound; x++) {
    for (let y = 0; y < yBound; y++) {
      const current = map[x][y]
      if (current == 0) {
        score += traverseTrail([x,y], [])
      }
    }
  }
  return score
}

console.log(trailheadScore(parsedInput))