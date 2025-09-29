const { dir } = require('console');

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

function walkPath(map, guardPosition) {
  let currentGuard = map[guardPosition[0]][guardPosition[1]]
  let direction = directions[currentGuard]
  let newCoords = [guardPosition[0] + direction[0], guardPosition[1] + direction[1]]
  // check if guard is out of bounds
  if (newCoords[0] < 0 || newCoords[0] >= map.length  || newCoords[1] < 0 || newCoords[1] >= map[0].length) {
    console.log("Exiting Map")
    map[guardPosition[0]][guardPosition[1]] = "X"
    return map
  }
  let nextLocation = map[newCoords[0]][newCoords[1]]
  if (nextLocation == "#") {
    currentGuard = nextDirection(currentGuard)
    direction = directions[currentGuard]
    newCoords = [guardPosition[0] + direction[0], guardPosition[1] + direction[1]]
    nextLocation = map[newCoords[0]][newCoords[1]]
  }
  map[guardPosition[0]][guardPosition[1]] = "X"
  map[newCoords[0]][newCoords[1]] = currentGuard
  return walkPath(map, newCoords)
}

const solution = walkPath(parsedInput, guardStart)

function countPath(map) {
  let counter = 0
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[0].length; y++) {
      let current = map[x][y]
      if (current == "X") {
        counter++
      }
    }
  }
  return counter
}
console.log(countPath(solution))