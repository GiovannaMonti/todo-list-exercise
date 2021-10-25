import axios from "axios"

async function fetchItems() {
  try {
    const response = await fetch("http://localhost:4000/items")
    return await response.json()
  } catch (rejected) {
    console.log(rejected)
  }
}

const postItem = (item) =>
  axios({
    method: "post",
    url: "http://localhost:4000/items",
    data: item,
  })

const patchItem = (id, prop) =>
  axios({
    method: "patch",
    url: "http://localhost:4000/item/" + id,
    data: { done: !prop },
  })
const deleteItem = (id) =>
  axios({
    method: "delete",
    url: "http://localhost:4000/item/" + id,
  })
export { fetchItems, postItem, patchItem, deleteItem }
