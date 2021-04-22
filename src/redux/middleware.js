// NOTE: Middleware: middleware es un intermediario entre los actions y los reducers, que funciona como de filtro en que verifica que todo esta antes de enviarlo a reducers

// tambien nos permite tener disponible todas las acciones del store de redux a travez de los middleware

// el middleware debe tener la habilidad de detener una accion, emitir nuevas acciones, accesar al estado de la aplicacion o modificar acciones y por ultimo poder decidir el flujo de si se detiene esta accion o si continua.

// el middleware tiene que recibir e argumentos como primier argumento el store, 2do el next y 3ro la accion
function middlewareOld(store, next, action) {
  
  // obtener el estado de la aplicacion
  const state = store.getState()

  // emitir una nueva accion
  store.dispatch({
    type: 'TEST'
  })
  
  // para decidir el flujo de la accion redux nos facilita la funcion next(), pero esta hay que invocarla como 2 argumento y pasarle de nuevo la accion original y si siempremente no se desea continua con la accion, solmanete no se invoca el next
  next(action)

  // es muy frecuente que los middleware no continuen con la accion original, pero emiten una nueva
}

// los middleware no se implementan de la manera anterior si no de implementean de una manera llamada currie que es la siguiente

// en realidad los middleware solo reciben un armento que es el store
function middlewareNew(store) {

  // siempre returnan un funcion y esta recibe como argumento el next y dentro de esta otra funcion que recibe el action
  return function(next) {
    return function(action) {
      const state = store.getState()
      store.dispatch({
        type: 'TEST'
      })
      next(action)
    }
  }
}

// esta es la forma correcta de pasar los middleware la de arriba como era para explicar los conceptos

// una manera mas eficiente es usar las arrowFunction, ya que este recibe un store, que a su vez recibe un next y que recibe un action, esta es la mejor a usar

const actions =[]

const middleware = store => next => action => {
  // const state = store.getState()
  // store.dispatch({
  //   type: 'TEST'
  // })

  // prueba para guardar las acciones en el localStrage
  actions.push(action)

  // recuerda que los localStorage solo guardan string por eso usamos el json.stringify
  localStorage.setItem('actions', JSON.stringify(actions))

  next(action)
}

export default middleware

// esta forma de pasar los middleware esta documentada en redux seccion middleware