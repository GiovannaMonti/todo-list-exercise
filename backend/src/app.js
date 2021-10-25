var express = require("express")
var cors = require("cors")
var app = express()
var fs = require("fs")
var items
fs.readFile("./src/items.json", function (err, data) {
  if (err) {
    return console.log(err)
  }
  items = JSON.parse(data)
})
app.use(cors())

app.use(express.json())

app.get("/hello", function (req, res) {
  res.send("Hello World!")
})

app.get("/items", function (req, res) {
  return res.json(items)
})
app.post("/items", function (req, res) {
  const item = req.body
  items.push(item)
  fs.writeFile("./src/items.json", JSON.stringify(items), function (err) {
    if (err) return console.log(err)
  })
  res.end()
})
app.patch("/item/:id", function (req, res) {
  const index = items.findIndex((element) => element.id == req.params.id)
  items[index].done = req.body.done
  fs.writeFile("./src/items.json", JSON.stringify(items), function (err) {
    if (err) return console.log(err)
  })
  res.end()
})
app.delete("/item/:id", function (req, res) {
  const index = items.findIndex((element) => element.id == req.params.id)
  items.splice(index, 1)
  fs.writeFile("./src/items.json", JSON.stringify(items), function (err) {
    if (err) return console.log(err)
  })
  res.end()
})

app.listen(4000)
