var express = require("express")
var cors = require("cors")
var app = express()
var actions = require("./actions")

app.use(cors())
app.use(express.json())

app.get("/items", function (req, res) {
  res.send(actions.getItems())
})
app.post("/items", function (req, res) {
  actions.postItem(req.body)
  res.end()
})
app.patch("/item/:id", function (req, res) {
  actions.patchItem(req.body, req.params)
  res.end()
})
app.delete("/item/:id", function (req, res) {
  actions.deleteItem(req.params)
  res.end()
})

app.listen(4000)
