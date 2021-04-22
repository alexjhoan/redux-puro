function createStore(reducer) {
  //primero tenemos que tener todo el estado de la aplicacion dentro de un objeto, es el primer principio de redux
  let state ={}
  
  //aqui vamos a guardar a los subscriptores
  let subscribers = []

  const store ={
    // getState nos va a permitir obtener todos los estados de la aplicacion
    getState(){
      return { ...state } 
      //lo hacemos de esta manera para no modificar el estado, basicamnte estamos creando un nuevo objeto con las propiedades de state
    },

    // nos permite emitir una accion por lo tanto requiere un action, esta accion funciona a travez de los reducers
    dispatch(action){
      //basicamente lo que se va a hacer es llamar al reducer y cambiamos el estado
      state = reducer(state, action)

      //aqui vamos a llamar a la lista de subscriptores, ya que cada vez que que se cambia el estado es xq se llamo un dispatch por eso esta es el mejor lugar para llamar a los subscriptores y estos los podemos recorrer con un for

      for (let callback of subscribers) {
        callback(state)
        
      }
    },

    //subscribe nos permite registrarnos para recibir notificaciones cuando cambie el estado por lo tanto recibe una funcion un callback
    subscribe(callback){
      subscribers.push(callback)
    }
  }

  return store
}

export {createStore}