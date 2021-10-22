import React, { useState, useRef, useEffect } from "react"
import ReactDOM from "react-dom"
import { fetchItems, postItem, deleteItem } from "./api.js"
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
      <input
        type="checkbox"
        onChange={(e) => {
          onCheck(e.target.checked)
        }}
      />{" "}
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

function TodoList({ items, onCheck, checklistConfig, onDelete }) {
  return (
    <ul style={{ display: "flex", flexDirection: "column" }}>
      {items.length === 0 || checklistConfig.length === 0
        ? ""
        : items.map(({ id, text }) => {
            return (
              <TodoListItem
                key={id}
                id={id}
                text={text}
                onCheck={() => onCheck(id)}
                isChecked={
                  checklistConfig[
                    checklistConfig.findIndex((element) => element.id === id)
                  ].done
                }
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
  const [checklistConfig, setChecklistConfig] = useState([])
  console.log("render", checklistConfig)
  // questo log stampa l'array check aggiornato all'ultimo render del componente
  // console.log(checklistConfig)
  useEffect(() => {
    // Create an scoped async function in the hook
    async function fetchList() {
      const todoThings = await fetchItems()
      setCurrentList(todoThings)
      setChecklistConfig(
        todoThings.map((obj) => {
          let rObj = {}
          rObj.id = obj.id
          rObj.done = false
          return rObj
        })
      )
    }
    // Execute the created function directly
    fetchList()
  }, [])
  return (
    <div>
      <h1>IMPORTANT STUFF</h1>
      <TextInput
        onInputSubmit={(value) => {
          if (value.text !== "") {
            setCurrentList([...currentList, value])
            setChecklistConfig([
              ...checklistConfig,
              { id: value.id, done: false },
            ])
            postItem(value)
          } else {
            alert("Type something first, dummy")
          }
        }}
      />
      <TodoList
        items={currentList}
        onCheck={(id) => {
          //quando viene cliccata una checkbox, questi due log stampano rispettivamente:
          // l'array check per come era prima del click
          // l'index in corrispondenza del quale è stata cliccata la checkbox
          // console.log(checklistConfig)
          // console.log(index)
          const checklistCopy = [...checklistConfig]
          const checklistIndex = checklistCopy.findIndex(
            (element) => element.id === id
          )
          checklistCopy[checklistIndex].done =
            !checklistCopy[checklistIndex].done
          setChecklistConfig(checklistCopy)
        }}
        checklistConfig={checklistConfig}
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
unisci i due stati in uno solo
capisci come scrivere su file json
prova a fare la delete/update passando parametri nell'url (REST)
*/
