import React, { Component } from 'react'
import './CartPage.css'
import { UserConsumer } from '../context'
import CartItem from '../page-components/cart-components/CartItem'

export default class CartPage extends Component {
  render() {
    return (
      <UserConsumer>
      {value=>{
      return(
      <>
        <section>
          <div className='container'>
            <h1>Cart</h1>
            <div className="cart-items">
              {value.cartProducts.map(product=>{
                return(
                  <CartItem key={product.id + product.attributes.map(attr=> attr.selected)} product={product}/>
                  )
              })}
            </div>
          </div>
        </section>
      </>
      )}}
      </UserConsumer>
    )
  }
}
