const { execSync } = require('child_process')
const fs = require('fs')
require('colors')
const { FSDB } = require('file-system-db');
module.exports = async function updatePackage() {
    await new Promise(async (r) => {
        const remoteVersion = execSync('npm show makuro-tools version').toString().trim()

        const tmp_db = JSON.parse(fs.readFileSync('/tmp/makuro-tools/db.json').toString())
        if (!tmp_db.version || tmp_db.version !== remoteVersion) {
            execSync('npm install -g makuro-tools@latest')
            const db = new FSDB('/tmp/makuro-tools/db.json', false)
            db.set('version', remoteVersion)
            console.log("update success !".green)
            process.exit(0)
        }
        r()
    })
}