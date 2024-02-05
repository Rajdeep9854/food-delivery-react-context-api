import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext'
import { currencyFormatter } from '../utils/formatting';
import Input from './UI/Input';
import Button from './UI/Button'

const CheckOut = () => {
  console.log("i am here");
    const cartCtx = useContext(CartContext);
    const userProgessCtx = useContext(UserProgressContext)

     const cartTotal = cartCtx.items.reduce((totalPrice,item)=>{
        return totalPrice+item.price*item.quantity
    },0)
    function handleSubmit(event){
      event.preventDefault();

      const fd = new FormData(event.target)
      const customerData = Object.fromEntries(fd.entries());
      
      fetch('http://localhost:3000/orders',{
        method:'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
          order: {
            item: cartCtx.items,
            customer: customerData
          }
        })
      })

    }
  return (
    <Modal open={userProgessCtx.progress === 'checkOut'}>
        <form onSubmit={handleSubmit}>
            <h2>Check out</h2>
            <p>Total Ammount : {currencyFormatter.format(cartTotal)}</p>
            
            <Input label="Full name" type="text" id="name"  />
            <Input label="Email address"  type="email" id="email"/>
            <Input label="street"  type="text" id="street"/>
            <div className="control-row">
              <Input  label="postal code" type="text" id="postal-code" />
              <Input   label="city" type ="text" id="city" />
            </div>
            <p className='modal-actions'>
              <Button type="button" onClick={()=>userProgessCtx.hideCheckOut()} textOnly>Close</Button>
              <Button type="submit"  textOnly>Submit</Button>
            </p>
        </form>
    </Modal>
  )
}

export default CheckOut