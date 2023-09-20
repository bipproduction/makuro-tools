const prompts = require("prompts");
const { CHOICES_TYPE, DB_KEY } = require("../../models");
const addServer = require("./add_server");
const list_server = require("./list_server");
const remove_server = require("./remove_server");
const log_server = require("./log_server");
const status = require("./status_server");
const build_server = require("./build_server");
const prisma_studio = require("./prisma_studio");
const { db } = require("../db");
const _ = require('lodash');
const build2 = require("./build2");

import('colors')
/**
 * @type {CHOICES_TYPE[]}
 */
const listServerMenu = [
    {
        title: "add",
        value: "add_server",
        description: "create new server",
        action: addServer
    },
    {
        title: "list",
        value: "list_server",
        description: "show list server available",
        action: list_server
    },
    {
        title: "remove",
        value: "remove_server",
        description: "remove server",
        action: remove_server
    },
    {
        title: "log",
        value: "log_server",
        description: "cat server log",
        action: log_server
    },
    {
        title: "status",
        value: "status_server",
        description: "cat server log",
        action: status
    },
    {
        title: "build",
        value: "build_server",
        description: "build di server",
        action: build_server
    },
    {
        title: "studio",
        value: "studio",
        description: "melihat prisma studio",
        action: prisma_studio
    },
    {
        title: "server2",
        value: "server2",
        description: "function new server",
        action: build2
    },

]

module.exports = async function () {
    const ser = db.get(DB_KEY.server_list)
    if (!ser || _.isEmpty(ser)) {
        console.log("empty server , please add one".yellow)
        return addServer()
    }
    prompts({
        name: "server_menu",
        message: "pilih server menu",
        type: "select",
        choices: listServerMenu,
    }).then(({ server_menu }) => {
        if (!server_menu) return console.log("bye ...")
        listServerMenu.find((v) => v.value === server_menu).action()
    })
}