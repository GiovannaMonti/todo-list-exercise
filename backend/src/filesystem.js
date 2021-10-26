var fs = require("fs")
const URL = "./src/items.json"

const readFile = JSON.parse(fs.readFileSync(URL))
const writeFile = (items) => fs.writeFileSync(URL, JSON.stringify(items))

module.exports = { readFile, writeFile }
