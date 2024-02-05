import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../utils/formatting'
import Button from './UI/Button'
import UserProgressContext from '../store/UserProgressContext'
import CartItem from './CartItem'

const Cart = () => {
    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)
    const cartTotal = cartCtx.items.reduce((totalPrice,item)=>{
        return totalPrice+item.price*item.quantity
    },0)

    function handleClose(){
        userProgressCtx.hideCart();
    }
    function handleAddItem(item){
        //console.log("in add item");
        //console.log(item);
        cartCtx.addItem(item)
    }
    function handleRemoveItem (id){
        cartCtx.removeItem(id)
        
    }
    function handleGoToCheckOut (){
        userProgressCtx.showCheckOut();
    }
  return (
    
    <Modal 
    className='cart' 
    open={userProgressCtx.progress === 'cart'} 
    onClose={ userProgressCtx.progress === 'cart' ? handleClose : null}>
        
        <h2>your cart</h2>
        <ul>
            {
                cartCtx.items.map((item)=> (
                <CartItem key={item.id} 
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onIncrease={()=>handleAddItem(item)}
                onDecrease={()=>handleRemoveItem(item.id)}
                />))
            }
        </ul>
        <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
        <p className='modal-actions'>
            <Button onClick={handleClose} textOnly>Close</Button>
            {cartCtx.items.length> 0 && <Button onClick={handleGoToCheckOut}>Go to checkout</Button>}
        </p>
    </Modal>
  )
}

export default Cart