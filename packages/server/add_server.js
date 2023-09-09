const { db } = require("@makuro-tools/db")
const prompts = require("prompts")
const { DB_KEY } = require("../../models")
const { v4 } = require('uuid')
const _ = require('lodash')

const listItem = ["name", "host", "user", "path"]

module.exports = async function () {
    prompts(listItem.map((v) => ({
        name: v,
        message: `Enter ${v}`,
        type: "text",
    }))).then(async (v) => {

        if (_.values(v).includes('') || _.values(v).length != 4) return console.log("CANCEL ,please completed the form")

        if (!db.has(DB_KEY.server_list)) {
            await new Promise((r) => {
                db.set(DB_KEY.server_list, [])
                r()
            })
        }
        const data = {
            id: v4(),
            ...v
        }
        db.push(DB_KEY.server_list, data)
        console.log("SUCCESS!")
        console.table(data)
    })
}