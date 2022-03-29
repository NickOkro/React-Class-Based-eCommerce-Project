import React, { Component } from 'react'
import AttrOptions from './AttrOptions'
import { UserConsumer } from '../../context'
import Warning from './Warning'

export default class ProductDesc extends Component {

    constructor(props){
        super(props)

        this.state ={
            options: [],
        }

        this.selectOption = this.selectOption.bind(this)
    }

    selectOption(opt, optName){
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
    const {name, brand, attributes, inStock, prices, description} = this.props.product
    let productWithOptions = this.props.product;
    productWithOptions = {...productWithOptions, options:this.state.options, amount:1}
    return (
      <UserConsumer>
          {value=>{
            const amount = prices && prices.find(each=> each.currency.label === value.currentCurrency).amount;
            const symbol = prices && prices.find(each=> each.currency.label === value.currentCurrency).currency.symbol;
            return(
                <div className='product-desc'>
                    <h2 className='bold'>{name}</h2>
                    <h2>{brand}</h2>
                    {attributes && attributes.map(attr=>{
                        return(
                        <div className='attr' key={attr.id}>
                            <h4>{attr.name}</h4>
                            <AttrOptions options={this.state.options} selectOption={this.selectOption} attr={attr}/>
                        </div>
                        )
                    })}
                    <h4>price</h4>
                    <h3 className='price'>{`${symbol} ${amount}`}</h3>
                    {this.props.popupShown && <Warning />}
                    {inStock
                    ?
                    <button onClick={() => {
                      value.addProductToCart(productWithOptions)
                      this.setState({options: []})
                    }} className='add-to-cart-btn'>add to cart</button>
                    :
                    <button className='add-to-cart-btn out-of-stock-btn'>out of stock</button>
                    }
                    <p className='desc' dangerouslySetInnerHTML={{ __html: description }} />
                </div>
            )}}
    </UserConsumer>
    )
  }
}
