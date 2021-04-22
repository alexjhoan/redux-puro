// para no pasar un estado vacio al reducer principal

const defaultSTate = [
  {
    total: '100'
  },
  {
    total: '200'
  },
]

function reducer(state= defaultSTate, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default reducer
