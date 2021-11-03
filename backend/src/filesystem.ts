var fs = require("fs")
const URL = "./src/items.json"

const readFile = JSON.parse(fs.readFileSync(URL))
const writeFile = (items: {id: number,
    text: string,
    done: boolean}[]) => fs.writeFileSync(URL, JSON.stringify(items))

export { readFile, writeFile }
