// const { updatePackage } = require("./src/fun");
const prompts = require("prompts");
const { server } = require("./packages/server");
const { CHOICES_TYPE } = require("./models");
require('colors');
const { menu_git } = require('./packages/git');
const { prisma } = require("./packages/prisma");
const { nextjs } = require("./packages/nextjs");
const util = require("./packages/util/util");


// updatePackage()
// check_db()

/**
 * @type {CHOICES_TYPE[]}
 */
const listMainMenu = [
    {
        title: "server",
        value: "server",
        description: "server tools",
        action: server
    },
    {
        title: "git",
        value: "git",
        description: "menu pilihan git",
        action: menu_git
    },
    {
        title: "prisma",
        value: "prisma",
        description: "prisma tools",
        action: prisma
    },
    {
        title: "nextjs",
        value: "nextjs",
        description: "nextjs tools",
        action: nextjs
    },
    {
        title: "util",
        value: "util",
        description: "utility",
        action: util
    }
];

; (async () => {
    await prompts({
        name: "main_menu",
        message: "select menu",
        type: "select",
        choices: listMainMenu
    }).then(({ main_menu }) => {
        if (!main_menu) return console.log("bye ...".cyan)
        listMainMenu.find((v) => v.value === main_menu).action()
    })
})()

