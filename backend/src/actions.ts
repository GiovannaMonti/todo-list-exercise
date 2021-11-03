import {readFile, writeFile} from "./filesystem"
function getItems() {
  return readFile
}

type Item = {
  id: number,
  text: string,
  done: boolean
}
type Id = {
  id: string
}

function postItem(body: Item) {
  const items = readFile
  const item = body
  items.unshift(item)
  writeFile(items)
}
function patchItem(body: Item, params: Id) {
  const items = readFile
  const index = items.findIndex((element: Item) => element.id == parseInt(params.id))
  items[index].done = !body.done
  if (items[index].done === true) {
    items.push(items.splice(index, 1)[0])
  } else {
    items.unshift(items.splice(index, 1)[0])
  }
  writeFile(items)
}
function deleteItem(params: Id) {
  const items = readFile
  const index = items.findIndex((element: Item) => element.id == parseInt(params.id))
  items.splice(index, 1)
  writeFile(items)
}

export { getItems, postItem, patchItem, deleteItem }
