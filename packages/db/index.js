const os = require('os')
const { FSDB } = require('file-system-db');
const db = new FSDB(`${os.homedir()}/.makuro-tools/db.json`, false);
module.exports = {
    db,
}