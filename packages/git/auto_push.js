const { execSync } = require('child_process');
// const prompts = require('prompts');
const _ = require('lodash')
const prompts = require('prompts')

module.exports = async function () {
    try {
        const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
        execSync(`git add -A && git commit -m "title: auto \ndes: auto \nnote:auto" && git push origin ${currentBranch}`, { stdio: "inherit" })
        console.log("success")
    } catch (error) {
        console.log("gagal, error")
    }
}