import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  loading: false,
  cart: cartItems,
  amount: 0,
  total: 0,
}
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const clearItem = (id) => {
    dispatch({ type: 'CLEAR_ITEM', payload: id })
  }

  const increase = (id) => {
    dispatch({ type: 'INCREASE', payload: id })
  }
  const decrease = (id) => {
    dispatch({ type: 'DECREASE', payload: id })
  }

  useEffect(()=>{
    dispatch({type:'GET_TOTAL'})
  },[state.cart])
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        clearItem,
        increase,
        decrease,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
