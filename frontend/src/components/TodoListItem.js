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

export { TodoListItem }
