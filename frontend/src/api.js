import axios from "axios"

async function getItems() {
  try {
    const response = await fetch("http://localhost:4000/items")
    return await response.json()
  } catch (rejected) {
    console.log(rejected)
  }
}

const createItem = (item) =>
  axios({
    method: "post",
    url: "http://localhost:4000/items",
    data: item,
  })

const updateItem = (id, data) =>
  axios({
    method: "patch",
    url: "http://localhost:4000/item/" + id,
    data: data,
  })
const deleteItem = (id) =>
  axios({
    method: "delete",
    url: "http://localhost:4000/item/" + id,
  })
export { getItems, createItem, updateItem, deleteItem }
