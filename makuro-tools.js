var colors;
try {
    require('./config.json')
    colors = require("colors")
    const prompts = require('prompts')

    prompts({
        name: "menu",
        message: "pilih menunya",
        type: "select",
        choices: [
            {
                title: "menu 1",
                description: "pilih aja menunya",
                value: "m"
            }
        ]
    }).then(({ menu }) => {
        console.log(menu)
    })

} catch (error) {
    const root = require('child_process').execSync('npm root -g').toString().trim() + '/makuro-tools/node_modules/'
    console.log(root)
    colors = require(root + 'colors')
    const prompts = require(root + 'prompts')
    

    // prompts({
    //     name: "menu",
    //     message: "pilih menunya",
    //     type: "select",
    //     choices: [
    //         {
    //             title: "menu 1",
    //             description: "pilih aja menunya",
    //             value: "m"
    //         }
    //     ]
    // }).then(({ menu }) => {
    //     console.log(menu)
    // })

}   