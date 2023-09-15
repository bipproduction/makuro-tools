const { execSync } = require('child_process')
const fs = require('fs')
module.exports = function () {
    if (!fs.existsSync('src/app')) return console.log("bukan di project nextjs")
    const root = execSync('npm root -g').toString().trim() + "/makuro-tools"
    const emotion = fs.readFileSync(root + "/assets/mantine/emotion.txt").toString().trim()
    const layout = fs.readFileSync(root + "/assets/mantine/layout.txt").toString().trim()

    console.log("copy emotion")
    fs.writeFileSync('src/app/emotion.tsx', emotion, "utf-8")
    console.log("copy layout")
    fs.writeFileSync('src/app/layout.tsx', layout, "utf-8")
    console.log("success")
}