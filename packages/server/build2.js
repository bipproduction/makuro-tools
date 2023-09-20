const { execSync } = require('child_process')
const choose = require('./choose')
module.exports = async function () {
    const cmd = (name) => `bash server.sh build`
    await choose((val) => cmd(val.name))
}