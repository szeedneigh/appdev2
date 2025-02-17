const fs = require('fs')

console.log("Starting to read file...");

const readReflection = () => {
  fs.readFile('reflection.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
    console.log("Done reading file.")
  })
}

readReflection();