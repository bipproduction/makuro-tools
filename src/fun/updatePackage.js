const { db, root } = require('@makuro-tools/db')
const { execSync } = require('child_process')
const fs = require('fs')
module.exports = async function updatePackage() {
    await new Promise(async (r) => {
        const remoteVersion = execSync('npm show makuro-tools version').toString().trim()
        execSync('npm update -g makuro-tools')
        if (!fs.existsSync(root + 'db.json')) {
            fs.writeFileSync(root + "db.json", "{}", "utf-8")
        }
        db.set('version', remoteVersion)
        r()
    })
}