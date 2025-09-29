let parsedInput = []

function parseInput(day, file) {
  const fs = require('fs');
  
  data = fs.readFileSync(`day${day}/${file}.txt`)
  const string = data.toString()
  return string
}

parsedInput = parseInput(3, 'input')