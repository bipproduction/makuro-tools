const prompts = require("prompts")
const { CHOICES_TYPE } = require("../../models")
const next_13 = require("./next_13")


/**
 * @type {CHOICES_TYPE[]}
 */
const listMantine = [
    {
        title: "mantine next 13",
        value: "mantine",
        description: "inject mantine untuk next13",
        action: next_13
    }
]

module.exports = function () {
    prompts({
        name: "nextjs",
        message: "nextjs tools",
        type: "select",
        choices: listMantine
    }).then(({ nextjs }) => {
        if (!nextjs) return console.log("bye ...")
        listMantine.find((v) => v.value === nextjs).action()
    })
}