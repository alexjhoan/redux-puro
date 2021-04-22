import { applyMiddleware, createStore } from 'redux'
import reducer from './reducers/index'
import middleware from './middleware'

// creamos el store
// el createStore recibe 3 argumentos el primero es el reducer y los otros 2 son opcionales pero el 2do es el estado inicial del la app, y el 3ero es el middleware, para implementar middleware hay qune ponerle siempre de 3ro en el createStore
const store = createStore(reducer, undefined, applyMiddleware(middleware))

export default store

// aqui solo vamos a importar el reducer principal que es el index.js dentro de la carptea de reducer