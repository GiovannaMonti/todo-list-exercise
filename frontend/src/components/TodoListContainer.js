import { useState, useEffect } from "react"
import { fetchItems, postItem, patchItem, deleteItem } from ".././api"
import { TodoList } from "./TodoList"
import { TextInput } from "./TextInput"
function TodoListContainer() {
  const [currentList, setCurrentList] = useState([])
  console.log(currentList)
  useEffect(() => {
    async function fetchList() {
      const todoThings = await fetchItems()
      setCurrentList(todoThings)
    }
    fetchList()
  }, [])
  return (
    <div>
      <h1>IMPORTANT STUFF</h1>
      <TextInput
        onInputSubmit={async (value) => {
          if (value.text !== "") {
            await postItem(value)
            setCurrentList(await fetchItems())
          } else {
            alert("Type something first, dummy")
          }
        }}
      />
      <TodoList
        items={currentList}
        onCheck={async (id, prop) => {
          await patchItem(id, prop)
          setCurrentList(await fetchItems())
        }}
        onDelete={async (id) => {
          await deleteItem(id)
          setCurrentList(await fetchItems())
        }}
      />
    </div>
  )
}

export { TodoListContainer }
