import React, { Component } from 'react'
import AttrOptions from '../product-components/AttrOptions'
import { UserConsumer } from '../../context'
import './CartItem.css'
import Slider from './Slider'
import ItemAmount from './ItemAmount'


export default class CartItem extends Component {

    constructor(props){
        super(props)

        this.state ={
            options: this.props.product.options,
        }

        // this.changeAmount = this.changeAmount.bind(this)
        this.changeOption = this.changeOption.bind(this)
    }

    // changeAmount(operator){
    //     operator
    //     ? this.setState((prevState)=>({
    //         amount: Number(prevState.amount) + 1
    //     }))
    //     : this.setState({
    //         amount: this.state.amount - 1
    //     })
    // }

    changeOption(opt, optName){
        if(this.state.options.find(item => item.optionName===optName)){
          this.state.options.find(item => item.optionName===optName).option = opt
          this.setState({
            options: [...this.state.options]
        })
        } else {
          this.setState({
            options: [...this.state.options, {optionName: optName,option:opt}]
        })
        }
    }

  render() {
    const {id,name, brand, attributes, prices, gallery} = this.props.product
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
                                <AttrOptions options={this.props.product.options} selectOption={this.changeOption} attr={attr} />
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
