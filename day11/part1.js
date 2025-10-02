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

function blink (numArray) {
  const newArray = []
  for (stone of numArray) {
    if (stone == "0") {
      newArray.push("1")
    } else if (stone.length % 2 == 0) {
      const splits = split(stone)
      newArray.push(splits[0])
      newArray.push(splits[1])
    } else {
      newArray.push(multiply(stone))
    }
  }
  return newArray
}

function blinkMultipleTimes (numArray, numOfBlinks) {
  for (let counter = 0; counter < numOfBlinks; counter++) {
    numArray = blink(numArray)
  } 
  return numArray.length
}

console.log(blinkMultipleTimes(parsedInput, 25))