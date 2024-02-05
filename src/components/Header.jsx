import React, { useContext } from 'react'
import logoImg from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext'

const Header = () => {
  const cartCtx = useContext(CartContext);
  const UserProgressCtx = useContext(UserProgressContext)
  
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems,item)=>{
    return totalNumberOfItems+item.quantity
  },0)

  function handleShowCart (){
    UserProgressCtx.showCart();
  }
  
  return (
    <header id='main-header'>
        <div id='title' >
            <img src={logoImg} alt="a restaurant" />
            <h1>Food Panda</h1>
        </div>
        <nav>
            <Button onClick={handleShowCart}
            
            textOnly
            
            >Cart {totalCartItems}</Button>
        </nav>
    </header>
  )
}

export default Header