let parsedInput = []

function parseInput (day, file) {
  const fs = require('fs');
  
  data = fs.readFileSync(`day${day}/${file}.txt`)
  const string = data.toString()
  let isFile = true
  let fileIndex = 0
  let fileArray = []
  for (let i = 0; i < string.length; i++) {
    const curr = parseInt(string[i])
    let char
    if (isFile) {
      char = fileIndex
      fileIndex++
    } else {
      char = "."
    }
    for (let j = 0; j < curr; j++) {
      fileArray.push(char)
    }
    isFile = !isFile
  }
  return fileArray
}

parsedInput = parseInput(9, 'input')
// console.log({parsedInput})

function condenseFiles (fileInput) {
  let fileArray = []
  let files = fileInput
  while (files.length > 1) {
    const currFront = files.shift()
    if (currFront != ".") {
      fileArray.push(currFront)
      continue
    }
    let currLast = files.pop()
    while (currLast == ".") {
      currLast = files.pop()
    }
    fileArray.push(currLast)
  }
  fileArray.push(files.pop())
  return fileArray
}

const condensed = condenseFiles(parsedInput)
// console.log({condensed})

function checkSum (fileString) {
  let sum = 0
  for (let i = 0; i < fileString.length; i++) {
    const curr = fileString[i]
    if (!curr) {
      continue
    }
    const product = curr * i
    sum += product
  }
  return sum
}

console.log(checkSum(condensed))
