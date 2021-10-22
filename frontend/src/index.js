import React from "react"
import ReactDOM from "react-dom"
import { TodoListContainer } from "./components/TodoListContainer.js"
import "./index.css"

ReactDOM.render(<TodoListContainer />, document.getElementById("root"))

/* todo 
separa i componenti in moduli
capisci come scrivere su file json
prova a fare la delete/update passando parametri nell'url (REST)
prova a usare patch invece che post per pare l'update (utilizzando sia il parametro rest per l'id che il body per le robe da aggiornare (credo): 'modifica questo elemento con i dati che ti passo io' )
*/
