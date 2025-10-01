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
    const section = []
    for (let j = 0; j < curr; j++) {
      section.push(char)
    }
    if (section.length > 0) { fileArray.push(section) }
    isFile = !isFile
  }
  return fileArray
}

parsedInput = parseInput(9, 'input')
// console.log({parsedInput})

function joinArray (arrOfArrs) {
  const arrayOfStrings = arrOfArrs.map(arr => { return arr.join("") })
  return arrayOfStrings.join("")
}

function condenseFiles (fileInput) {
  let files = fileInput
  for (let i = files.length - 1; i > 1; i--) {
    // grab last file chunk
    const currBack = files[i]
    if (currBack[0] == ".") {
      // if empty space, skip to next iteration
      continue
    }
    // find length of chunk
    const length = currBack.length
    // iterate from *front* of list to find an empty space of the same or greater length
    for (let j = 0; j < i; j++) {
      const currFront = files[j]
      if (currFront[0] == "." && currFront.length >= length) {
        // replace current chunk with currBack and break iteration, but KEEP any overflow space
        const replace = Array(length).fill(".")
        files.splice(i, 1, replace)
        const diff = currFront.length - length
        currFront.length = diff
        files.splice(j, 0, currBack)
        // push i back up to account for new file further up in array
        i++
        break
      }
    }
  }
  return files
}

const condensed = condenseFiles(parsedInput)
// console.log(joinArray(condensed))

function checkSum (fileArray) {
  let sum = 0
  const flattened = fileArray.flat(1)
  for (let i = 0; i < flattened.length; i++) {
    const curr = flattened[i]
    if (typeof curr == "number") {
      const product = curr * i
      sum += product
    }
  }
  return sum
}

console.log(checkSum(condensed))
