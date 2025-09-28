const parsedInput = []

function parseInput() {
  const fs = require('fs');
  
  data = fs.readFileSync('day2/input.txt')
  const stringArray = data.toString().split("\r\n");
  stringArray.forEach((report) => {
    let levels = report.split(" ")
    levels = levels.map((x) => {
      return parseInt(x)
    })
    parsedInput.push(levels)
  })
}

parseInput()

function checkSafe(input) {
  let safeCounter = 0
  input.forEach((report) => {
    let safe = true;
    let asc = true;
    if (report[1] - report[0] < 0) {
      asc = false
    }
    for (let i = 0; i < report.length - 1; i++) {
      let curr = report[i];
      let next = report[i + 1]
      let diff = next - curr
      if (asc && (diff == 1 || diff == 2 || diff == 3)) {
        continue
      } else if (!asc && (diff == -1 || diff == -2 || diff == -3)) {
        continue
      } else {
        safe = false
      }
    }
    if (safe) {
      safeCounter ++
    }
  })
  console.log(safeCounter)
} 

checkSafe(parsedInput)

