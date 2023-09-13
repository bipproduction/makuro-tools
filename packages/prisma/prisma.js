const prompts = require("prompts")
const { CHOICES_TYPE } = require("../../models")
const global_prisma = require("./global_prisma")

/**
 * @type {CHOICES_TYPE[]}
 */
const listPrisma = [
    {
        title: "prisma global",
        description: "generate prisma global",
        value: "global",
        action: global_prisma
    }
]

module.exports = async function () {
    prompts({
        name: 'prisma',
        message: "tools prisma js ts",
        type: "select",
        choices: listPrisma
    }).then(({ prisma }) => {
        if (!prisma) return console.log("bye ...")
        listPrisma.find((v) => v.value === prisma).action()
    })
}