import { useState, useEffect } from "react"
import { getItems, createItem, updateItem, deleteItem } from ".././api"
import { TodoList } from "./TodoList"
import { TextInput } from "./TextInput"
function TodoListContainer() {
  const [currentList, setCurrentList] = useState([])
  console.log(currentList)
  useEffect(() => {
    async function getList() {
      const todoThings = await getItems()
      setCurrentList(todoThings)
    }
    getList()
  }, [])
  return (
    <div>
      <h1>IMPORTANT STUFF</h1>
      <TextInput
        onInputSubmit={async (value) => {
          if (value.text !== "") {
            await createItem(value)
            setCurrentList(await getItems())
          } else {
            alert("Type something first, dummy")
          }
        }}
      />
      <TodoList
        items={currentList}
        onCheck={async (id, data) => {
          await updateItem(id, data)
          setCurrentList(await getItems())
        }}
        onDelete={async (id) => {
          await deleteItem(id)
          setCurrentList(await getItems())
        }}
      />
    </div>
  )
}

export { TodoListContainer }
