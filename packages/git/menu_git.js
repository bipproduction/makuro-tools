const prompts = require("prompts")
const { CHOICES_TYPE } = require("../../models")
const auto_push = require("./auto_push")

/**
 * @type { CHOICES_TYPE[] }
 */
const listMenuGit = [
    {
        title: "auto push",
        description: "push ke server auto",
        value: "auto push",
        action: auto_push
    }
]

module.exports = async function () {
    prompts({
        name: "menu",
        message: "pilihan menu git",
        type: "select",
        choices: listMenuGit
    }).then(({ menu }) => {
        if (!menu) return console.log("bye ...")
        listMenuGit.find((v) => v.value === menu).action()
    })
}