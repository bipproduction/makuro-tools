const { db } = require("@makuro-tools/db")
const prompts = require("prompts")
const { DB_KEY } = require("../../models")
const { execSync } = require('child_process')

/**
 * 
 * @param {(val: DB_ITEM) => string} cmd 
 */
module.exports = async function (cmd) {
    /**
     * @type {DB_ITEM[]}
     */
    const lsServer = db.get(DB_KEY.server_list)
    await prompts({
        name: "select_server",
        message: "select server",
        type: "select",
        choices: lsServer.map((v) => ({
            title: v.name,
            value: v.id,
            description: v.id
        }))
    }).then(({ select_server }) => {
        if (!select_server) return console.log("bye ...")

        /**
         * @type { DB_ITEM }
         */
        const data = lsServer.find((v) => v.id === select_server)
        const command = `
        source ~/.nvm/nvm.sh
        cd ${data.path}
        ${cmd(data)}
        `
        execSync(`ssh ${data.user}@${data.host} "${command}"`, { stdio: "inherit" })
    })
}