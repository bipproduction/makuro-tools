const choose = require("./choose")

module.exports = async function () {
    const cmd = (name) => `git pull origin build 
    yarn install 
    npx prisma db push 
    npx prisma generate 
    yarn build 
    pm2 restart ${name}`

    await choose((val) => cmd(val.name))
}