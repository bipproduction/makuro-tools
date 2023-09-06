const fetch = require('node-fetch2')
fetch('https://raw.githubusercontent.com/bipproduction/makuro-tools/main/config.json').then((v) => v.text()).then((v) => console.log(v))