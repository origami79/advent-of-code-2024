let parsedInput = []

function parseInput(day, file) {
  const fs = require('fs');
  data = fs.readFileSync(`day${day}/${file}.txt`)
  const stringArray = data.toString().split("\r\n").map(line => {
    return line.split("")
  })
  return stringArray
}

parsedInput = parseInput(8, 'input')

const xBound = parsedInput.length
const yBound = parsedInput[0].length

function inBounds(coords) {
  if (coords[0] >= 0 && coords[0] < xBound && coords[1] >= 0 && coords[1] < yBound) {
    return true
  } else {
    return false
  }
}
const emptyMap = new Array(xBound).fill().map(() => new Array(yBound).fill().map(() => "."));

function separateFrequencies(grid) {
  const collection = {}
  for (let x = 0; x < xBound; x++) {
    for (let y = 0; y < yBound; y++) {
      const contents = grid[x][y]
      if (contents != "." && collection[contents]) {
        collection[contents].push([x, y])
      } else if (contents != ".") {
        collection[contents] = [[x, y]]
      }
    }
  }
  return collection
}
const antennaList = separateFrequencies(parsedInput)

function findNodes(emptyMap, antennaList) {
  const frequencies = Object.keys(antennaList)
  for (frequency of frequencies) {
    const antennas = antennaList[frequency]
    while (antennas.length > 1) {
      const current = antennas.shift()
      for (i = 0; i < antennas.length; i++) {
        const other = antennas[i]
        let deltaX = current[0] - other[0]
        let deltaY = current[1] - other[1]
        let nodeCoords = [current[0] + deltaX, current[1] + deltaY]
        if (inBounds(nodeCoords) == true) {
          emptyMap[nodeCoords[0]][nodeCoords[1]] = "#"
        }
        if (deltaX < 0) {
          deltaX = Math.abs(deltaX)
        } else {
          deltaX = 0 - deltaX
        }
        if (deltaY < 0) {
          deltaY = Math.abs(deltaY)
        } else {
          deltaY = 0 - deltaY
        }
        nodeCoords = [other[0] + deltaX, other[1] + deltaY]
        if (inBounds(nodeCoords) == true) {
          emptyMap[nodeCoords[0]][nodeCoords[1]] = "#"
        }
      }
    }
  }
  return emptyMap
}

const nodeMap = findNodes(emptyMap, antennaList)

function countNodes(map) {
  counter = 0
  for (let x = 0; x < xBound; x++) {
    for (let y = 0; y < yBound; y++) {
      const contents = map[x][y]
      if (contents == "#") {
        counter ++
      }
    }
  }
  return counter
}

console.log(countNodes(nodeMap))