const fs = require('fs')
module.exports = async function checkDb() {
    if (!fs.existsSync('/tmp')) {
        fs.mkdirSync("/tmp")
    }

    if (!fs.existsSync('/tmp/makuro-tools')) {
        fs.mkdirSync("/tmp/makuro-tools")
    }

    if (!fs.existsSync('/tmp/makuro-tools/db.json')) {
        fs.writeFileSync("/tmp/makuro-tools/db.json", "{}", "utf-8")
    }
}