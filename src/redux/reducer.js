// los reducer son funciones que reciben un estado y una funcion y debe de regresar un nuevo estado

// debido a que tenemos que tener un control de los item de la lista, se va agregar un id, y este id va a incrementar por cada item que se agrege

// este Id se agrega afuera de la funcion para que se mantenga como variable global

let id = 0

function reducer(state=[], action) {
  switch(action.type){
    case 'AGREGAR':{
      id++
      // vamos a retornar todos los elementos anteriores mas el que se acaba de agregar, OJO es un array que el estado arriba es un array
      // el payload es el standar de una accion y podemos mandar cualquier propiedad dentro del payload
      return [
        ...state, {
          id,
          text: action.payload.text,
        }
      ]
    }
    case 'BORRAR':{
      // vamos a recibir el ID que queremos eliminar
      // con esta funcion la buscamos dentro del state, el findIndex necesita una funcion dentro de su argumento
      // con findIndex nos devuelve el index del item
      const index = state.findIndex(n => n.id === action.payload.id)

      // ahora eliminamos el index, con el splice, este necesita 2 parametros minimo el index a trabajar y la cantidad de elementos a eliminar despues del index, nota 0 no elimina, con esta funcion tambien se puede agregar ver documentacion
      state.splice(index, 1)

      // Redux no permine hacer cambios directamente en el estado asi que no podemos solo retornar el estado, tenemos que hacer un nuevo array los '...' nos ayudan con esto
      return [...state]
    }
    case 'ALTERNAR':{
      // igual que borrar buscamos el item a editar en este caso, pero en vez del findIndex solo usaremos el Find
      // con find nos devuelve el elemento en si,
      const item = state.find(n => n.id === action.payload.id)

      // ahora solo vamos a cambiar el completado en este caso a lo que sea el opuesto, solo con el '!' antes del item
      // con esto siempre va a hacer el opuesto de lo que este en el estado
      item.completado = !item.completado

      // ahora retornamos el nuevo array
      return [
        ...state
      ]

    }
    default:
      return state
  }
}

export default reducer