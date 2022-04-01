import React, { Component } from 'react'
import { UserConsumer } from '../../context'
import './CartItem.css'
import Slider from './Slider'
import ItemAmount from './ItemAmount'
import CartAttributs from './cartAttributes'


export default class CartItem extends Component {

    constructor(props){
        super(props)

        this.state ={
            options: this.props.product.options,
        }
    }

  render() {
    const {name, brand, attributes, prices, gallery} = this.props.product
    return (
      <UserConsumer>
          {value=>{
            const amount = prices && prices.find(each=> each.currency.label === value.currentCurrency).amount;
            const symbol = prices && prices.find(each=> each.currency.label === value.currentCurrency).currency.symbol;
            return(
                <div className='item'>
                    <div className='item-left'>
                        <h2 className='bold'>{name}</h2>
                        <h2>{brand}</h2>
                        <h3 className='price'>{`${symbol} ${amount}`}</h3>
                        {attributes && attributes.map(attr=>{
                            return(
                            <div className='attr_cart' key={attr.id}>
                                <h4>{attr.name}: </h4>
                                <CartAttributs options={this.props.product.attributes} attr={attr} />
                            </div>
                            )
                        })}
                    </div>
                    <div className='item-right'>
                        <ItemAmount product={this.props.product} options={this.state.options}/>
                        <Slider gallery={gallery}/>
                    </div>
                </div>
            )}}
    </UserConsumer>
    )
  }
}
