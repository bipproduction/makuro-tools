const prompts = require("prompts");
const { CHOICES_TYPE } = require('./../../models');
const crypto = require("./crypto");

/**
 * @type { CHOICES_TYPE[] }
 */
const listMenu = [
    {
        title: "crypto",
        description: "generate crypto",
        value: "crypto",
        action: crypto
    }
]

module.exports = async function () {
    prompts({
        name: "util",
        message: "utility",
        type: "select",
        choices: listMenu
    }).then(({ util }) => {
        if (!util) return console.log("bye .....")
        listMenu.find((v) => v.value === util).action()
    })
}