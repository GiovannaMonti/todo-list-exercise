import { TodoListItem } from "./TodoListItem"
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
                onCheck={() => onCheck(item.id, item.done)}
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

export { TodoList }
