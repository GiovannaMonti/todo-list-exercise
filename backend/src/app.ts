import express from "express"
import cors from "cors"
const app = express()
import {getItems, postItem, patchItem, deleteItem} from "./actions"

app.use(cors())
app.use(express.json())

app.get("/items", function (_req, res) {
  res.send(getItems())
})
app.post("/items", function (req: express.Request, res: express.Response) {
  postItem(req.body)
  res.end()
})
app.patch("/item/:id", function (req, res) {
  patchItem(req.body, req.params)
  res.end()
})
app.delete("/item/:id", function (req, res) {
  deleteItem(req.params)
  res.end()
})

app.listen(4000)
