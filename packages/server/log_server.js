const { db } = require("@makuro-tools/db")
const { DB_KEY, DB_ITEM } = require("../../models")
const prompts = require("prompts")
const { execSync } = require('child_process')
const choose = require("./choose")

module.exports = async function () {

    await choose((val) => `pm2 log ${val.name}`)
}