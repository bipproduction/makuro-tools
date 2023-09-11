const prompts = require("prompts")
const { CHOICES_TYPE } = require("../../models")
const auto_push = require("./auto_push")
const status_git = require("./status_git")

/**
 * @type { CHOICES_TYPE[] }
 */
const listMenuGit = [
    {
        title: "push",
        description: "push ke server auto",
        value: "push",
        action: auto_push
    },
    {
        title: "status",
        description: "status git",
        value: "status",
        action: status_git
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