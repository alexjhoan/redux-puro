import { createStore } from './redux-old'  //explicacion de como funciona la libreria

// reducers son funciones generadoras de estados, esta recibe 2 argumentos 1. es el estado anterior de este reducer, el segundo argumento es la accion que modifica este estado

function reducer(state={}, action) {
  switch(action.type){
    case 'NUEVA': //este es el tipo de accion que recibe, en este caso se llama NUEVA si la revibe corre la accion
      return action.payload // el payload es donde esta, lo que va a cambiar el estado

    //si no recibe la el tipo de accion 'NUEVA' envia de nuevo el estado para esto se usa el defauld en switch
    default:
      return state
  }
}

const store = createStore(reducer)

// el subscribe se va a ejecutar siempre que alla un cambiio en el estado

store.subscribe(() => {
  const state = store.getstate   //para obtener el estado de la aplicacion
  console.log(state)
})

// vamos a hacer que corra
// vamos a hacer una trampa para que corrar una vez cada segundo con setInterval

setInterval(() => {
  store.dispatch({
    type: 'NUEVA',
    payload: {
      value: 'Math.random()'   //valor random para correr el ejemplo
    }
  })  
}, 2000);