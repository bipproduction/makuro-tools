const { db } = require("./../db")
const { DB_KEY } = require("../../models")

module.exports = async function(){
    const lsSer = db.get(DB_KEY.server_list)
    console.table(lsSer)
}