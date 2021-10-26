var filesystem = require("./filesystem")
function getItems() {
  return filesystem.readFile
}
function postItem(body) {
  const items = filesystem.readFile
  const item = body
  items.push(item)
  filesystem.writeFile(items)
}
function patchItem(body, params) {
  const items = filesystem.readFile
  const index = items.findIndex((element) => element.id == params.id)
  items[index].done = !body.done
  filesystem.writeFile(items)
}
function deleteItem(params) {
  const items = filesystem.readFile
  const index = items.findIndex((element) => element.id == params.id)
  items.splice(index, 1)
  filesystem.writeFile(items)
}

module.exports = { getItems, postItem, patchItem, deleteItem }
