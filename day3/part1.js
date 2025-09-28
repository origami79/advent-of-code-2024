let parsedInput = []

function parseInput(day, file) {
  const fs = require('fs');
  
  data = fs.readFileSync(`day${day}/${file}.txt`)
  const stringArray = [data.toString()] //.split("\r\n");
  const regex = /mul\(\d?\d?\d,\d?\d?\d\)/gm
  let matches = []
  stringArray.forEach((line) => {
    matches = [...line.matchAll(regex)]
  })
  matches = matches.map((array) => {
    let item = array[0]
    let nums = item.slice(4, item.length-1).split(',')
    return [parseInt(nums[0]), parseInt(nums[1])]
  })
  return matches
}

parsedInput = parseInput(3, 'input')

function execute(inputArray) {
  let result = 0
  inputArray.forEach((inst) => {
    let product = inst[0] * inst[1]
    result += product
  })

  return result
}

console.log(execute(parsedInput))