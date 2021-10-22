import { useRef } from "react"
import { createRandomId } from ".././utils"

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
export { TextInput }
