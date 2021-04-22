import store from './redux/store'

const itemListDOM = $('#itemList')
const itemDOM = $('#item')
const txtNuevaNotaDOM = $('#txtNuevaNota')

// vamos a hacer que cuando se presione enter en el input se tome automatico y se agregue al estado
txtNuevaNotaDOM.keyup((e) => {
  // el keyCode 13 corresponde a la tecla enter
  if (e.keyCode === 13) {
    // vamos a guardar en una variable el valor del input
    const text = txtNuevaNotaDOM.val()

    // tambien tenemos que reiniciar el input para que no quede texto despues del enter
    txtNuevaNotaDOM.val('')

    // ahora corremos el dispatch para que se agregue al estado
    store.dispatch({
      type: 'AGREGAR',
      payload: {
        text: text
      }
    })
  }
})

// vamos a definir la funcion que va a mostrar la lista
function actualizarLista(items) {
  // 1. limpiamos la lista cada vez, con un truco de jQuery, pasandole un html vacio al item
  itemListDOM.html('')

  // ahora hacemos un ciclo for para recorer la lista
  for (let item of items) {

    // clonamos el item de la lista 
    const cloneDOM = itemDOM.clone()

    // buscamos los elementos que van a tener funcionalidades dentro de la lista con find de jquery
    const chkHabilitadoDom = cloneDOM.find('input')
    const btnBorrarDom = cloneDOM.find('button')
    const lblNombreDom = cloneDOM.find('span')

    // hay que remover la clase d-none que la tiene los item de la lista con remuveClass
    cloneDOM.removeClass('d-none')

    // vamos a agregar el texto en el span
    lblNombreDom.html(item.text)
    // tambien vamos a hacer que cuando este check el texto se subreraye
    if (item.completado) {
      lblNombreDom.css('text-decoration', 'line-through')      
    }

    // con prop de jquery podemos cambiar la propiedad del checkbox
    // basicamente aqui le indicamos que si existe item.completado, agregale el checked al checkbox
    chkHabilitadoDom.prop('checked', item.completado)
    // pasamos el evento onclick
    chkHabilitadoDom.on('click', () => {
      store.dispatch({
        type: 'ALTERNAR',
        // en el payload vamos a mandar el id del item que actualmente esta siendo renderizado
        payload: {
          id: item.id
        }
      })
    })

    // evento onclick del boton de borrar
    btnBorrarDom.on('click', () => {
      // en esta funcion lo que se va a hacer es emitir una funcion, esto lo hacemos con dispatch de redux
      // solo hay que especificar que tipo de accion vamos a mandar y que tipo de infomacion le vamos a mandar por medio del payload
      store.dispatch({
        type: 'BORRAR',
        // en el payload vamos a mandar el id del item que actualmente esta siendo renderizado
        payload: {
          id: item.id
        }
      })
    })

    // por ultimo vamos a agregar este item clonado a la lista, el cual ya en este punto ah sido totalmente modificado
    itemListDOM.append(cloneDOM)
  }
}

// vamos a hacer un subscribe para que nos muestre los cambios que se realicen
store.subscribe(() => {
  const state = store.getState()
  actualizarLista(state)
})

// agregamos un texto de prueba al estado
// store.dispatch({
//   type: 'AGREGAR',
//   payload: {
//     text: 'texto de prueba al final del index.js'
//   }
// })

// una prueba de guardar en el local storage

const actions = JSON.parse(localStorage.getItem('actions') || '[]' )

actions.forEach((action, i) => {
  setTimeout(() => {
    store.dispatch(action)
  }, i * 1000)
});

console.log(actions)