function parseInput(day, file) {
  const fs = require('fs');
  
  data = fs.readFileSync(`day${day}/${file}.txt`)
  const stringArray = data.toString().split("\r\n").map(line => line.split(""))
  return stringArray
}

const parsedInput = parseInput(12, 'input-test')
// console.log(gardenMap)

const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
const xBound = parsedInput.length
const yBound = parsedInput[0].length

function inBounds (coords) {
  if (coords[0] >= 0 && coords[0] < xBound && coords[1] >= 0 && coords[1] < yBound) {
    return true
  } else {
    return false
  }
}

function alreadyVisited (coords, matchingPlots) {
  const coordsString = coords.join(",")
  // console.log({coordsString, matchingPlots})
  if (isNaN(matchingPlots[coordsString])) {
    return false
  } 
  return true
}

function mapPlot (x, y, currentPlot, matchingPlots, fences) {
  // console.log("Map Plot", {x, y, currentPlot, matchingPlots, fences})
  let neighbors = 0
  matchingPlots[`${x},${y}`] = 0
  for (direction of directions) {
    // console.log("Direction Check", {direction})
    newCoords = [x + direction[0], y + direction[1]]
    if (inBounds(newCoords) && parsedInput[newCoords[0]][newCoords[1]] == currentPlot && !alreadyVisited(newCoords, matchingPlots)) {
      neighbors ++
      // console.log("Same Plot", {newCoords, neighbors})
      if (!matchingPlots[`${newCoords.join(",")}`]) {
        // console.log("Recursing")
        mapPlot(newCoords[0], newCoords[1], currentPlot, matchingPlots, fences)
      }
    } else {
      const halfX = direction[0] / 2
      const halfY = direction[1] / 2
      const xPosition = [x + halfX, newCoords[0] + halfX].join(",")
      const yPosition = [y + halfY, newCoords[1] + halfY].join(",")
      const fencePosition = [xPosition, yPosition].join(",")
      fences.add(fencePosition)
      // console.log({direction, fencePosition})
    }
  }
}

function walkMap (gardenMap) {
  for (let x = 0; x < xBound; x++) {
    for (let y = 0; y < yBound; y++) {
      const current = gardenMap[x][y]
      const matchingPlots = {}
      const fences = new Set()

      if (current != ".") {
        mapPlot(x, y, current, matchingPlots, fences)
      }
      console.log({x, y, current, matchingPlots, fences})
    }
  }
}

console.log(walkMap(parsedInput))