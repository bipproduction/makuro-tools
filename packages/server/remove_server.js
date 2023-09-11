const { db } = require("./../db")
const { DB_KEY, DB_ITEM } = require("../../models")
const prompts = require("prompts")



module.exports = async function () {
    /**
     * @type {DB_ITEM[]}
     */
    const serverList = db.get(DB_KEY.server_list)

    prompts({
        name: "select_server",
        message: "select server to remove",
        type: "select",
        choices: serverList.map((v) => ({
            title: v.name,
            description: v.id,
            value: v.id
        }))
    }).then(({ select_server }) => {
        if (!select_server) return console.log("bye ...")
        const selected = serverList.filter((v) => v.id !== select_server)
        db.set(DB_KEY.server_list, selected)
        const lsdb = db.get(DB_KEY.server_list)
        console.table(lsdb)
    })
}