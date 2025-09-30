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
      newTotals.push(sum)
      newTotals.push(product)
      // console.log("Key", key, "Totals:", totals, "Second:", second, "New Totals:", newTotals)
    }
    totals = newTotals
  }
  // console.log("Key:", key, "Totals before matching", totals)
  let result = 0
  totals.forEach(total => {
    if (total == target) {
      result = total
    }
  })
  // console.log("Key:", key, "Totals after matching", totals)
  return result
}

function checkInputs(inputs) {
  const solvable = []
  const keys = Object.keys(inputs)
  for (key of keys) {
    // console.log("Starting loop for key:", key)
    const totals = findAllSums(key, inputs[key])
    // console.log({key, totals})
    solvable.push(totals)
  }
  return solvable.reduce((a,b) => a+b)
}

console.log(checkInputs(parsedInput))