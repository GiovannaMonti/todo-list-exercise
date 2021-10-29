import { useState, useEffect } from "react"
import { getItems, createItem, updateItem, deleteItem } from ".././api"
import { TodoList } from "./TodoList"
import { TodoListItemWrapper } from "./TodoListItem"
import { TextInput } from "./TextInput"
import { AnimatedDataset } from "react-animated-dataset"
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
    <div className="flex-column">
      <h1>IMPORTANT STUFF</h1>
      <button
        id="sync"
        onClick={async () => {
          setCurrentList(await getItems())
        }}
      >
        Sync
      </button>
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
      {/* <TodoList
        items={currentList}
        onCheck={async (id, data) => {
          await updateItem(id, data)
          setCurrentList(await getItems())
        }}
        onDelete={async (id) => {
          await deleteItem(id)
          setCurrentList(await getItems())
        }}
      /> */}

      <svg>
        <AnimatedDataset
          dataset={currentList}
          tag="text" /* "foreignObject" */
          attrs={{
            x: 30,
            y: (_, i) => (i + 1) * 30,
            text: (item) => item.text,
            class: (item) => (item.done ? "done" : "todo"),
            /*{ <TodoListItemWrapper
                key={item.id}
                id={item.id}
                text={item.text}
                onCheck={() => {}}
                isChecked={item.done}
                onDelete={{}}
              /> }*/
            opacity: 1,
          }}
          init={{ opacity: 0, x: 0 }}
          duration={1000}
          keyFn={(item) => item.id}
        />
        <AnimatedDataset
          dataset={currentList}
          tag="circle"
          attrs={{
            cx: 12,
            cy: (_, i) => (i + 1) * 30 - 8,
            r: 8,
            class: (item) => (item.done ? "checked" : "unchecked"),
            /*{ <TodoListItemWrapper
                key={item.id}
                id={item.id}
                text={item.text}
                onCheck={() => {}}
                isChecked={item.done}
                onDelete={{}}
              /> }*/
            opacity: 1,
          }}
          events={{
            onClick: async (item) => {
              await updateItem(item.id, item)
              setCurrentList(await getItems())
            },
          }}
          init={{ opacity: 0, x: 0 }}
          duration={1000}
          keyFn={(item) => item.id}
        />
        <AnimatedDataset
          dataset={currentList}
          tag="path"
          attrs={{
            transform: (_, i) => `translate(200, ${(i + 1) * 30 - 14})`,
            class: "svg-icon",
            d: "M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z",
            opacity: 1,
          }}
          events={{
            onClick: async (item) => {
              await deleteItem(item.id)
              setCurrentList(await getItems())
            },
          }}
          init={{ opacity: 0, x: 0 }}
          duration={1000}
          keyFn={(item) => item.id}
        />
      </svg>
    </div>
  )
}

export { TodoListContainer }
