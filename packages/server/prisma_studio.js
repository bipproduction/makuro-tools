const prompts = require("prompts")
const choose = require("./choose")
const { execSync } = require('child_process')
const { CHOICES_TYPE } = require("../../models")


/**
 * @type {CHOICES_TYPE[]}
 */
const listStudio = [
    {
        title: "start",
        value: "start",
        description: "to start prisma studio",
        action: async () => {
            const cmd = `bash studio start`
            choose((val) => cmd)
        }
    },
    {
        title: "stop",
        value: "stop",
        description: "to stop prisma studio",
        action: async () => {
            const cmd = `bash studio stop`
            choose((val) => cmd)
        }
    }
]

module.exports = async function () {
    prompts({
        name: "studio",
        type: "select",
        message: "pilih action",
        choices: listStudio
    }).then(({ studio }) => {
        if (!studio) return console.log('bye ...')
        listStudio.find((v) => v.value === studio).action()
    })

}