let parsedInput = []

function parseInput(day, file) {
  const fs = require('fs');
  
  data = fs.readFileSync(`day${day}/${file}.txt`)
  const stringArray = data.toString().split(" ")
  return stringArray
}

parsedInput = parseInput(11, 'input')
// console.log({parsedInput})


function split (numString) {
  const middle = (numString.length / 2)
  const left = numString.slice(0, middle)
  const right = parseInt(numString.slice(middle)).toString()
  return [left, right]
}

function multiply (numString) {
  const num = parseInt(numString)
  const product = num * 2024
  return product.toString()
}

function blink (occurances) {
  const newOccurances = {}
  const stones = Object.keys(occurances)
  for (stone of stones) {
    const number = occurances[stone]
    let newVals = []
    if (stone == "0") {
      newVals.push("1")
    } else if (stone.length % 2 == 0) {
      const splits = split(stone)
      newVals.push(splits[0])
      newVals.push(splits[1])
    } else {
      newVals.push(multiply(stone))
    }
    for (val of newVals) {
      if (newOccurances[val]) {
        newOccurances[val] += number
      } else {
        newOccurances[val] = number
      }
    }
  }
  return newOccurances
}

function blinkMultipleTimes (numArray, numOfBlinks) {
  // use a counter object for each individual number value, so you don't have to track EVERY stone, just the unique ones
  let occurances = {}
  for (stone of numArray) {
    if (occurances[stone]) {
      occurances[stone]++
    } else {
      occurances[stone] = 1
    }
  }

  // loop for blinks
  for (let counter = 0; counter < numOfBlinks; counter++) {
    occurances = blink(occurances)
  } 

  // count up how often each number occurs
  let counter = 0
  const stones = Object.keys(occurances)
  for (stone of stones) {
    const number = occurances[stone]
    counter += number
  }

  return counter
}

console.log(blinkMultipleTimes(parsedInput, 75))