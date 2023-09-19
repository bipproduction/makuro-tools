const { execSync } = require('child_process');
// const prompts = require('prompts');
const _ = require('lodash')
const prompts = require('prompts')

module.exports = async function () {
    try {
        const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
        const ls = ["title", "des", "note"]
        prompts(ls.map((v) => ({
            name: v,
            message: `masukkan ${v}`,
            type: 'text',
            float: true
        }))).then((v) => {
            if (_.values(v).includes("") || _.values(v).length != 3) return console.log("completed form please!")
            execSync(`git add -A && git commit -m "title: ${v.title} \ndes: ${v.des} \nnote:${v.note}" && git push origin ${currentBranch}`, { stdio: "inherit" })
        })
    } catch (error) {
        console.log("error , cek commit")
    }

}