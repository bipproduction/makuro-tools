const root = require('child_process').execSync('npm root -g').toString().trim() + '/makuro-tools/node_modules/';
require('colors');
const prompts = require('prompts');
const fs = require('fs');
const fetch = require('node-fetch2')
const { execSync } = require('child_process');
const emotionText = 'clm8jcl8r00019ug4abjwxykn.txt';
const layoutText = 'clm8jclds00039ug44adt9egn.txt';
const host = "https://str.wibudev.com";

(async () => {
    const pilihan = [
        {
            title: "next 13 mantine",
            value: "next 13",
            description: "completed next 13",
            action: async () => {
                const cek = fs.existsSync('./next.config.js')
                const cekEmotion = fs.existsSync('src/app/emotion.tsx')
                if (!cek) return console.log("project tidak terditeksi, buatlah project baru".yellow)
                if (cekEmotion) return console.log("emotion.tsx terditeksi , ini akan mereplace project yang telah ada !".red)
                execSync(`yarn add @mantine/core @mantine/hooks @mantine/next @emotion/server @emotion/react`, { stdio: "inherit" })
                const emt = await fetch(`${host}/file/${emotionText}`).then((v) => v.text()).then(v => v)
                const lyt = await fetch(`${host}/file/${layoutText}`).then((v) => v.text()).then(v => v)

                console.log("install emotion.tsx".cyan)
                fs.writeFileSync('src/app/emotion.tsx', emt)
                console.log("install layout.tsx".cyan)
                fs.writeFileSync('src/app/layout.tsx', lyt)
                console.log("SUCCESS!".green)

            }
        }
    ]

    prompts({
        name: "menu",
        message: "pilih menunya",
        type: "select",
        choices: pilihan
    }).then(({ menu }) => {
        if (!menu) return console.log("bye ...".cyan)
        pilihan.find((v) => v.value === menu).action()
    })
})()