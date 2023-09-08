const fs = require('fs')
const data = fs.readFileSync('./index.js').toString()
require('colors')
const { execSync } = require('child_process')
const TOKEN = "Fe26.2*1*b073b6179a6f13fdb17193a56b860159e3e3ca56cc401ac68c748668ed8fc9e4*UBhZ9FyzhFaM27henQr9NQ*LLrXC8_2ixPIuEyCxp7izNPB4qjFxLF0Elih2DjalkI*1695267694074*d6ee88fb0fd93eedc9beb689fa9cab92f0f3b64e5b56bf958c66ac595b7c7b29*Vq7yXTfhMpk5G7iTLDh6lk_X_B5938NqG8RpmdoT5kA~2"
const URL = "https://str.wibudev.com"


const re = `const rootPath = require('child_process').execSync('npm root -g').toString().trim() + '/makuro-tools/'
const root = rootPath + 'node_modules/';
`
try {
    console.log("build ...".cyan)
    const listPackage = ["colors", "prompts", "node-fetch2", "file-system-db", "lodash"]
    let hasil = re
    hasil += data

    for (let d of listPackage) {
        hasil = hasil.replace(`require('${d}')`, `require(root + '${d}')`)
        hasil = hasil.replace(`FSDB('db.json', false)`, `FSDB(rootPath + 'db.json', false)`)
    }

    fs.writeFileSync('makuro-tools.js', hasil.toString())
    // execSync(`curl -s -X POST -H "Authorization: Bearer ${TOKEN}" -F "file=@./makuro-tools.js" ${URL}/file/update?id=clm7dfkjl00049u30fde4wbqv`)
    console.log("SUCCESS !".green)
} catch (error) {
    console.log("ERROR!".red)
    console.log(error)
}

