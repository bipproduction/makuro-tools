const fs = require('fs')
const { execSync } = require('child_process')
module.exports = async function () {
    // if (!fs.existsSync('prisma')) {
    //     return console.log("tidak di project yang ada prismanya")
    // }

    if (!fs.existsSync('modules')) {
        console.log("create modules dir")
        fs.mkdirSync('modules')
    }
    if (!fs.existsSync('modules/bin')) {
        console.log("create modules/bin dir")
        fs.mkdirSync('modules/bin')
    }

    const root = execSync('npm root -g').toString().trim() + "/makuro-tools"
    const fl = fs.readFileSync(root + '/assets/prisma/prisma.txt').toString()
    fs.writeFileSync('modules/bin/prisma.ts', fl, "utf-8")
    console.log("success, file modules/bin/prisma.ts")
}