import React, {useState, useEffect} from 'react'

const CartContext = React.createContext();

function ShoppingCartWrapper (props){
    const [cart, setCart]= useState([])

    const addToCart = (product)=>{
        setCart([...cart, { ...product }]);
        const cartCopy = [...cart]
        localStorage.setItem('cart', JSON.stringify(cartCopy))       
    }
    
        return(
            <CartContext.Provider value={{
                cart,
                addToCart,
                }}>
            {props.children}
        </CartContext.Provider>
        )
       
};

export {ShoppingCartWrapper, CartContext};