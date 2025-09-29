let parsedInput = []

function parseInput(day, file) {
  const fs = require('fs');
  
  data = fs.readFileSync(`day${day}/${file}.txt`)
  const string = data.toString().split("\r\n\r\n")
  let rules = string[0].split("\r\n")
  rules = rules.map((line) => {
    return line.split("|");
  })
  let updates = string[1].split("\r\n")
  updates = updates.map((line) => {
    return line.split(",")
  })
  return {rules, updates}
}

function formatRules(rules) {
  let dict = {}
  for (rule of rules) {
    if (dict[rule[0]]) {
      dict[rule[0]].push(rule[1])
    } else {
      dict[rule[0]] = [rule[1]]
    }
  }
  return dict
}

parsedInput = parseInput(5, 'input')
const rules = formatRules(parsedInput.rules)

function checkUpdates(updatesList) {
  let validUpdates = []
  // iterate through updates
  for (let update of updatesList) {
    let copy = []
    let valid = true
    while (update.length > 1) {
      const last = update.pop()
      const conflicts = rules[last]
      if (conflicts == undefined) {
        copy.unshift(last)
        continue
      }
      const overlaps = update.filter(elem => conflicts.includes(elem));
      if (overlaps.length == 0) {
        copy.unshift(last)
      } else {
        valid = false
      }
    }
    if (valid) {
      validUpdates.push(copy)
    }
  }
  return validUpdates
}
const passingUpdates = checkUpdates(parsedInput.updates)

function calculateScore(updates) {
  let score = 0
  for (update of updates) {
    const length = update.length
    const half = length / 2
    const middle = parseInt(update[half - 1])
    score += middle
  }
  return score
}

const score = calculateScore(passingUpdates)
console.log({score})