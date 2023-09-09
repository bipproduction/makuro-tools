const { FSDB } = require('file-system-db');
const root = require('child_process').execSync('npm root -g').toString().trim() + '/makuro-tools/';
const db = new FSDB(root + 'db.json', false);

module.exports = {
    db,
    root
}