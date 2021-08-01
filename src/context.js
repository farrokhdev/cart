import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const iniTialStates={
  loading:false,
  cart:cartItems,
  total:0,
  amount:0
}

export const ACTION ={
  CLEARCART: "clear-cart",
  REMOVECART:"remove-cart",
  INCREASE: 'increase',
  DECREASE: 'decrease',
  TOTAL: 'total',
  LOADING:'loading',
  DISPLAY:'display',
  TOGGLE_AMOUNT:'toggle-amount'
}


const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer,iniTialStates)

  const clearCart=()=>{
    dispatch({type:ACTION.CLEARCART})
  }
  const removeCart=(id)=>{
    dispatch({type:ACTION.REMOVECART,payload:id})
  }

  const increaseCart =(id)=>{
    dispatch({type:ACTION.INCREASE,payload:id})
  }
  const decreaseCart =(id)=>{
    dispatch({type:ACTION.DECREASE,payload:id})
  }
  const fetchItems =async()=>{
    dispatch({type:ACTION.LOADING})
    const response = await fetch(url);
    const cart =await response.json();
    dispatch({type:ACTION.DISPLAY,payload:cart})

  }

  const toggleAmount =(id,type)=>{
    dispatch({type:ACTION.TOGGLE_AMOUNT,peyload:{id , type}})
  }

  useEffect(()=>{
    fetchItems();
  },[])
  useEffect(()=>{
    dispatch({type:ACTION.TOTAL})
  },[state.cart])
  

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeCart,
        increaseCart,
        decreaseCart,
        toggleAmount
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
