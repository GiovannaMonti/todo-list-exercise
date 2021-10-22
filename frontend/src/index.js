import React, { useState, useRef, useEffect } from "react"
import ReactDOM from "react-dom"
import { fetchItems, postItem, patchItem, deleteItem } from "./api.js"
import "./index.css"
const createRandomId = () => Math.round(Math.random() * 1000000)

function TextInput({ onInputSubmit }) {
  const inputRef = useRef()
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const newItem = {
          id: createRandomId(),
          text: inputRef.current.value,
          done: false,
        }
        onInputSubmit(newItem)
        inputRef.current.value = ""
      }}
    >
      <label>To do:</label>
      <input ref={inputRef} type="text" />
      <input type="submit" value="Submit" />
    </form>
  )
}

function TodoListItem({ id, text, onCheck, isChecked, onDelete }) {
  return (
    <li
      style={
        isChecked
          ? {
              color: "gray",
              fontWeight: "normal",
              order: "1",
            }
          : { color: "black", fontWeight: "bold" }
      }
    >
      <input type="checkbox" checked={isChecked} onChange={() => onCheck()} />{" "}
      {text}
      <span
        className="remove"
        onClick={
          () => {
            console.log(id)
            onDelete(id)
          } /* async () => {
          await deleteItem({ id: id, text: text });
          const todoThings = await fetchItems()
          setCurrentList(todoThings)
        } */
        }
      >
        ✖
      </span>
    </li>
  )
}

function TodoList({ items, onCheck, onDelete }) {
  console.log(items)
  return (
    <ul style={{ display: "flex", flexDirection: "column" }}>
      {items.length === 0
        ? ""
        : items.map((item) => {
            return (
              <TodoListItem
                key={item.id}
                id={item.id}
                text={item.text}
                onCheck={() => onCheck(item.id)}
                isChecked={item.done}
                onDelete={() => {
                  onDelete()
                }}
              />
            )
          })}
    </ul>
  )
}

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
        onCheck={async (id) => {
          await patchItem(id)
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

ReactDOM.render(<TodoListContainer />, document.getElementById("root"))

/* todo 
separa i componenti in moduli
capisci come scrivere su file json
prova a fare la delete/update passando parametri nell'url (REST)
prova a usare patch invece che post per pare l'update (utilizzando sia il parametro rest per l'id che il body per le robe da aggiornare (credo): 'modifica questo elemento con i dati che ti passo io' )
*/
