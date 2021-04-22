// para no pasar un estado vacio al reducer principal

const defaultSTate = [
  {
    nombre: 'ana'
  },
  {
    nombre: 'alex'
  },
]

function reducer(state= defaultSTate, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default reducer
