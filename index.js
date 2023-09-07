const rootPath = require('child_process').execSync('npm root -g').toString().trim() + '/makuro-tools/'
const root = rootPath + 'node_modules/';
require('colors');
const prompts = require('prompts');
const fs = require('fs');
const fetch = require('node-fetch2')
const { execSync } = require('child_process');
const emotionText = 'clm8jcl8r00019ug4abjwxykn.txt';
const layoutText = 'clm8jclds00039ug44adt9egn.txt';
const host = "https://str.wibudev.com";
const { FSDB } = require('file-system-db');
const db = new FSDB('db.json', false);

const TYPE = {
    title: "",
    value: "",
    description: "",
    action: "",
};

/**
 * @type {TYPE}
 */
const listGit = [
    {
        title: "push",
        description: "git push sesuai dengan branch",
        value: "push",
        action: () => {
            const isGit = fs.existsSync('.git')
            if (!isGit) return console.log("bukan git dir project!".yellow)
            const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
            execSync(`git add -A && git commit -m "makuro-tools $(date)" && git push origin ${currentBranch}`, { stdio: "inherit" })
            console.log(`SUCCESS! branch ${currentBranch}`.green)
        }
    }
];

/**
 * @type {TYPE}
 */
const listServer = [
    {
        title: "set config",
        description: "simpan pengaturan",
        value: "set_config",
        action: async () => {

            const listForm = ["host", "name", "user", "password", "path"]
            const dataHasil = {}
            for (let f of listForm) {
                dataHasil[f] = await prompts({
                    name: "setting",
                    message: f,
                    type: "text"
                }).then(({ setting }) => setting)
            }
            

            db.set('server_config', {
                [dataHasil.name]: dataHasil
            })

            console.log("SUCCESS !".green)
        }
    }
]


/**
     * @type {TYPE}
     */
const listPilihan = [
    {
        title: "next 13 mantine",
        value: "next 13",
        description: "completed next 13",
        action: async () => {
            const cek = fs.existsSync('./next.config.js')
            const cekEmotion = fs.existsSync('src/app/emotion.tsx')
            if (!cek) return console.log("project tidak terditeksi, buatlah project baru".yellow)
            if (cekEmotion) return console.log("emotion.tsx terditeksi , ini akan mereplace project yang telah ada !, ACTION BATAL!".red)
            execSync(`yarn add @mantine/core @mantine/hooks @mantine/next @emotion/server @emotion/react`, { stdio: "inherit" })
            const emt = await fetch(`${host}/file/${emotionText}`).then((v) => v.text()).then(v => v)
            const lyt = await fetch(`${host}/file/${layoutText}`).then((v) => v.text()).then(v => v)

            console.log("install emotion.tsx".cyan)
            fs.writeFileSync('src/app/emotion.tsx', emt)
            console.log("install layout.tsx".cyan)
            fs.writeFileSync('src/app/layout.tsx', lyt)
            console.log("SUCCESS!".green)

        }
    },
    {
        title: "git",
        description: "git tools",
        value: "git",
        action: () => {
            prompts({
                name: "git_menu",
                message: "pengaturan git",
                type: "select",
                choices: listGit
            }).then(({ git_menu }) => {
                if (!git_menu) return console.log("bye ...".cyan)
                listGit.find((v) => v.value === git_menu).action()
            })
        }
    },
    {
        title: "server",
        description: "pengaturan server",
        value: "server",
        action: () => {
            prompts({
                name: "server",
                message: "server tools",
                type: "select",
                choices: listServer
            }).then(({ server }) => {
                if (!server) return console.log("bye ...".cyan)
                listServer.find((v) => v.value === server).action()
            })
        }
    }
];


prompts({
    name: "menu",
    message: "pilih menunya",
    type: "select",
    choices: listPilihan
}).then(({ menu }) => {
    if (!menu) return console.log("bye ...".cyan)
    listPilihan.find((v) => v.value === menu).action()
})