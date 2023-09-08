
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
const _ = require('lodash')

const TYPE = {
    title: "",
    value: "",
    description: "",
    action: "",
};

const SERVER_CONFIG = {
    id: '',
    host: '',
    name: '',
    user: '',
    path: ''
}

const dbKey = {
    config: "config"
}

/**
 * @type {SERVER_CONFIG}
 */
let serverActionConfig = {}

if (!db.get(dbKey.config)) {
    db.set(dbKey.config, [])
}


/**
 * @type {TYPE}
 */
const listGit = [
    {
        title: "push",
        description: "git push sesuai dengan branch",
        value: "push",
        action: funPush
    },
    {
        title: "list branch",
        description: "lihat list branch di remote",
        value: "list_branch",
        action: funListBranch
    }
];

/**
 * @type {TYPE}
 */
const listServerAction = [
    {
        title: "log",
        description: "mmelihat log",
        value: "log",
        action: funLog
    },
    {
        title: "build",
        description: "build project server",
        value: "build",
        action: funBuild
    }
]

/**
 * @type {TYPE}
 */
const listServer = [
    {
        title: "set config",
        description: "simpan pengaturan",
        value: "set_config",
        action: funSetConfig
    },
    {
        title: "remove server",
        description: "hapus server dari daftar",
        value: "remove_server",
        action: funRemoveServer
    },
    {
        title: "server list",
        description: "melihat list server",
        value: "server_list",
        action: funServerList
    },
    {
        title: "server action",
        description: "lakukan sesuatu dengan server",
        value: "server_action",
        action: funServerAction
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
        action: funNext13Mantine
    },
    {
        title: "git",
        description: "git tools",
        value: "git",
        action: funGit
    },
    {
        title: "server",
        description: "pengaturan server",
        value: "server",
        action: funServer
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

async function funPush() {
    const isGit = fs.existsSync('.git')
    if (!isGit) return console.log("bukan git dir project!".yellow)
    const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    execSync(`git add -A && git commit -m "makuro-tools $(date)" && git push origin ${currentBranch}`, { stdio: "inherit" })
    console.log(`SUCCESS! branch ${currentBranch}`.green)
}


async function funListBranch() {
    const remoteBranches = execSync('git ls-remote --heads origin', {
        encoding: 'utf-8'
    });

    // Pisahkan hasil menjadi array
    const branchList = remoteBranches.trim().split('\n').map(line => {
        // Mengambil nama branch dari hasil ls-remote
        const parts = line.split('\t');
        return parts[1].replace('refs/heads/', ''); // Hapus 'refs/heads/' dari nama branch
    });

    console.log("-------------------")
    console.log(branchList.join('\n'))
    console.log("-------------------")
}

async function funLog() {
    try {
        const command = `
        source ~/.nvm/nvm.sh
        pm2 log ${serverActionConfig.name}
        `
        execSync(`ssh ${serverActionConfig.user}@${serverActionConfig.host} "${command}"`, {
            stdio: "inherit"
        })
    } catch (error) {
        console.log(`${error}`.red)
    }
}


async function funBuild() {
    try {
        const command = `
        source ~/.nvm/nvm.sh
        cd ${serverActionConfig.path}
        git pull origin build
        yarn install
        npx prisma db push
        yarn build
        pm2 restart ${serverActionConfig.name}
        `
        execSync(`ssh ${serverActionConfig.user}@${serverActionConfig.host} "${command}"`, {
            stdio: "inherit"
        })
    } catch (error) {
        console.log(`${error}`.red)
    }
}

async function funSetConfig() {
    const listForm = ["id", "host", "name", "user", "path"]
    const dataHasil = {}
    for (let f of listForm) {
        dataHasil[f] = await prompts({
            name: "setting",
            message: f,
            type: "text"
        }).then(({ setting }) => setting)
    }

    db.push(dbKey.config, dataHasil)
    console.log("SUCCESS !".green)
}

async function funRemoveServer() {
    /**
             * @type {SERVER_CONFIG[]}
             */
    const lsConfig = db.get(dbKey.config)
    if (_.isEmpty(lsConfig)) return console.log("server kosong silahkan pilih set config".red)
    prompts({
        name: "server_del",
        message: "pilih server yang mau dihapus",
        type: "select",
        choices: lsConfig.map((v) => ({
            title: v.name,
            value: v.name
        }))
    }).then(({ server_del }) => {
        if (!server_del) return console.log("bye ...".cyan)

        let del = lsConfig.filter((v) => v.name !== server_del)
        db.set(dbKey.config, del)
        console.log("SUCCESS!".green)

    })
}


async function funServerList() {
    const lsConfig = db.get(dbKey.config)
    if (_.isEmpty(lsConfig)) return console.log("server kosong silahkan pilih set config".red)
    let nomer = 1;
    console.log("-------------------")
    for (let c of lsConfig) {
        console.log(nomer, c.name)
        nomer++;
    }
    console.log("-------------------")
}

async function funServerAction() {
    const lsConfig = db.get(dbKey.config)
    if (_.isEmpty(lsConfig)) return console.log("server kosong silahkan pilih set config".red)
    prompts({
        name: "select_server",
        type: "select",
        message: "pilih servernya",
        choices: lsConfig.map((v) => ({
            title: v.name,
            value: v.name,
            description: "select server"
        }))
    }).then(({ select_server }) => {
        if (!select_server) return console.log("bye ....".cyan)
        const conf = lsConfig.find((v) => v.name === select_server)
        serverActionConfig = conf
        prompts({
            name: "select_action",
            type: "select",
            message: "server action",
            choices: listServerAction
        }).then(({ select_action }) => {
            if (!select_action) console.log("bye ....".cyan)
            listServerAction.find((v) => v.value === select_action).action()
        })
    })
}


async function funNext13Mantine() {
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


async function funGit() {
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

async function funServer() {
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
