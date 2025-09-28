// take two arrays of numbers
// sort each one from smallest to largest
// for each index, subtract the number at that index in each list to find the difference and add that number to a counter
// return that counter

let array1 = []
let array2 = []
let distance = 0

function parseInput() {
  const fs = require('fs');
  
  data = fs.readFileSync('day1/input.txt')
  const stringArray = data.toString().split("\r\n");
  stringArray.forEach((line) => {
    let pair = line.split("   ")
    array1.push(parseInt(pair[0]))
    array2.push(parseInt(pair[1]))
  })
}

parseInput()
array1 = array1.sort()
array2 - array2.sort()
// console.log({array1, array2})

for (let i = 0; i < array1.length; i++) {
  let counter = array2.filter(x => x === array1[i]).length
  let difference = array1[i] * counter
  distance += difference
}

console.log({distance})