const { execSync } = require('child_process')
const { db } = require("@makuro-tools/db")
module.exports = async function checkVersion() {
    const remoteVersion = execSync(`npm show makuro-tools version`).toString().trim()
    const localVersion = db.get('version')

    return !db || remoteVersion !== localVersion
}