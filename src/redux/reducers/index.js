import { combineReducers } from 'redux'
import ordenes from './ordenes'
import usuarios from './usuarios'

//  este es el reducer principal y auqi vamos a combiar los demas reducer, importando los otros reducer y metiendolo en uno principal, esto se hace asi xq el store solo recibe un solo reducer

// importante ese reducer nos va a retornar un objeto con los estados de los otros reducer en una lista

// function reducer(state={}, action) {
//   return {
//     ordenes: ordenes(state.ordenes, action),
//     usuarios: usuarios(state.usuarios, action)
//   }
// }

// esta es la manera en que funciona la manera antigua de combinar reducer, pero redux ya tiene en su libreria el combineReducer que se usa de la siguiente manera.

const reducer = combineReducers({
  ordenes,
  usuarios,
})

// es mas comodo usar esta libreria

export default reducer
