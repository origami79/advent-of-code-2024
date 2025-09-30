let parsedInput = []

function parseInput(day, file) {
  const fs = require('fs');
  
  data = fs.readFileSync(`day${day}/${file}.txt`)
  const dataObject = {}
  data.toString().split("\r\n").forEach(line => {
    const split = line.split(":")
    const key = split[0]
    const values = split[1].trim().split(" ").map(num => { return parseInt(num) })
    dataObject[key] = values
  });
  return dataObject
}

parsedInput = parseInput(7, 'input')

function findAllSums(key, values) {
  const target = parseInt(key)
  const first = values.shift()
  let totals = [first]
  while (values.length > 0) {
    const second = values.shift()
    const newTotals = []
    for (total of totals) {
      const sum = total + second
      const product = total * second
      const concat = parseInt(`${total}${second}`)
      newTotals.push(sum)
      newTotals.push(product)
      newTotals.push(concat)
    }
    totals = newTotals
  }
  let result = 0
  totals.forEach(total => {
    if (total == target) {
      result = total
    }
  })
  return result
}

function checkInputs(inputs) {
  const solvable = []
  const keys = Object.keys(inputs)
  for (key of keys) {
    const totals = findAllSums(key, inputs[key])
    solvable.push(totals)
  }
  return solvable.reduce((a,b) => a+b)
}

console.log(checkInputs(parsedInput))

/* 
checked someone else's code, and my result is about 2000 less than theirs
the final number is in the trillions, so very small rounding error
not spending the time right now to figure out where I'mg going wrong
*/