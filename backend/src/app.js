var express = require("express")
var cors = require("cors")
var app = express()
var filesystem = require("./filesystem")

app.use(cors())
app.use(express.json())

app.get("/items", function (req, res) {
  res.send(filesystem.readFile)
})
app.post("/items", function (req, res) {
  const items = filesystem.readFile
  const item = req.body
  items.push(item)
  filesystem.writeFile(items)
  res.end()
})
app.patch("/item/:id", function (req, res) {
  const items = filesystem.readFile
  const index = items.findIndex((element) => element.id == req.params.id)
  items[index].done = !req.body.done
  filesystem.writeFile(items)
  res.end()
})
app.delete("/item/:id", function (req, res) {
  const items = filesystem.readFile
  const index = items.findIndex((element) => element.id == req.params.id)
  items.splice(index, 1)
  filesystem.writeFile(items)
  res.end()
})

app.listen(4000)
