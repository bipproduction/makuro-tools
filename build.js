const fs = require('fs')
const data = fs.readFileSync('./index.js').toString()

const listPackage = ["colors", "prompts", "node-fetch2"]
let hasil = data

for (let d of listPackage) {
    hasil = hasil.replace(`require('${d}')`, `require(root + '${d}')`)
}

fs.writeFileSync('makuro-tools.js', hasil.toString())
console.log("success")

