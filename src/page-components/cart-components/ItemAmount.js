import React, { Component } from 'react'
import { UserConsumer } from '../../context'

export default class ItemAmount extends Component {

  render() {
    return (
        <UserConsumer>
            {value=>{
                return(
                    <div className='amount-changer'>
                        <button onClick={()=>value.changeProductAmount(this.props.product, true)} className='amount-btn'>+</button>
                        <p className='amount'>{this.props.product.amount}</p>
                        <button onClick={()=>value.changeProductAmount(this.props.product, false)} className='amount-btn'>-</button>
                    </div>
                )
            }}
        </UserConsumer>
    )
  }
}
