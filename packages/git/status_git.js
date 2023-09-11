const { execSync } = require('child_process')

module.exports = async function () {
    execSync('git status', { stdio: "inherit" })
}