import React, { Component } from 'react'
import Header from '../page-components/Header'
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
      <Header />
        <section>
          <div className='container'>
            <h1>Cart</h1>
            <div className="cart-items">
              {value.cartProducts.map(product=>{
                return(
                  <CartItem key={product.id} product={product}/>
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
