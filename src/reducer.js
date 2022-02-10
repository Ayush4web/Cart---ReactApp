const reducer = (state, action) => {
  if (action.type === 'CLEAR_CART') {
    const newState = { ...state, cart: [] }
    return newState
  }
  if (action.type === 'CLEAR_ITEM') {
    const newItems = state.cart.filter((item) => item.id !== action.payload)

    return { ...state, cart: newItems }
  }
  if (action.type === 'INCREASE') {
    let newCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount + 1 }
      }

      return item
    })

    return { ...state, cart: newCart }
  }
  if (action.type === 'DECREASE') {
    let newCart = state.cart
      .map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount - 1 }
        }
        return item
      })
      .filter((item) => item.amount >= 1)
    return { ...state, cart: newCart }
  }
  if (action.type === 'GET_TOTAL') {
    const { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        
        cartTotal.total += price * amount
        cartTotal.amount += amount

        return cartTotal
      },
      {
        total: 0,
        amount: 0,
      }
    )
    return { ...state, total, amount }
  }
}

export default reducer
