var filesystem = require("./filesystem")
function getItems() {
  return filesystem.readFile
}
function postItem(body) {
  const items = filesystem.readFile
  const item = body
  items.unshift(item)
  filesystem.writeFile(items)
}
function patchItem(body, params) {
  const items = filesystem.readFile
  const index = items.findIndex((element) => element.id == params.id)
  items[index].done = !body.done
  if (items[index].done === true) {
    items.push(items.splice(index, 1)[0])
  } else {
    items.unshift(items.splice(index, 1)[0])
  }
  filesystem.writeFile(items)
}
function deleteItem(params) {
  const items = filesystem.readFile
  const index = items.findIndex((element) => element.id == params.id)
  items.splice(index, 1)
  filesystem.writeFile(items)
}

module.exports = { getItems, postItem, patchItem, deleteItem }
