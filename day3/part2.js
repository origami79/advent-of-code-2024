let parsedInput = []

function parseInput(day, file) {
  const fs = require('fs');
  
  data = fs.readFileSync(`day${day}/${file}.txt`)
  const string = data.toString()
  const instrRegex = /mul\(\d?\d?\d,\d?\d?\d\)/gm
  let instructions = []
  instructions = [...string.matchAll(instrRegex)]
  instructions = instructions.map((array) => {
    let item = array[0]
    let nums = item.slice(4, item.length-1).split(',')
    nums = [parseInt(nums[0]), parseInt(nums[1])]
    return [nums, array.index]
  })
  const allowRegex = /do\(\)/gm
  const disallowRegex = /don't\(\)/gm
  let allows = [...string.matchAll(allowRegex)].map((array) => {
    return [true, array.index]
  })
  let disallows = [...string.matchAll(disallowRegex)].map((array) => {
    return [false, array.index]
  })
  let matches = instructions.concat(allows, disallows).sort((a, b) => {
    return a[1] - b[1]
  })
  return matches
}


parsedInput = parseInput(3, 'input')

function execute(inputArray) {
  let result = 0
  let allowed = true
  inputArray.forEach((inst) => {
    if (inst[0] == false) {
      allowed = false
    } else if (typeof inst[0] == 'object' && allowed) {
      let product = inst[0][0] * inst[0][1]
      result += product
    } else if (inst[0] == true) {
      allowed = true
    }
  })

  return result
}

console.log(execute(parsedInput))