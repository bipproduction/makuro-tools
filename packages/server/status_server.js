const { db } = require("@makuro-tools/db")
const { DB_KEY } = require("../../models")
const { prompt } = require("prompts")
const choose = require("./choose")

module.exports = async function (){
    await choose((val) => `git log`)
}