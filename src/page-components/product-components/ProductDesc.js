import React, { Component } from 'react'
import AttrOptions from './AttrOptions'
import { UserConsumer } from '../../context'
import Warning from './Warning'
import {Parser as HtmlToReactParser} from 'html-to-react'

export default class ProductDesc extends Component {

    constructor(props){
        super(props)

        this.state ={
            options: [],
            desc: '',
            warningShown: false,
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
    let productAttributes = []
    let productWithOptions = this.props.product;
    productWithOptions = {...productWithOptions, amount: 1}
    productWithOptions.attributes && productWithOptions.attributes.map(attr=> {
      attr = {...attr, selected: this.state.options.find(opt=> opt.optionName === attr.id) && this.state.options.find(opt=> opt.optionName === attr.id).option}
      productAttributes = [...productAttributes, attr]
      return productAttributes
    })
    productWithOptions.attributes = productAttributes

    //parse
    const htmlToReactParser = new HtmlToReactParser();
    const descElement = htmlToReactParser.parse(description);

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
                    {this.state.warningShown && <div className='warning'>
          * Please select options first
      </div>}
                    {inStock
                    ?
                    <button onClick={() => {
                      let allSelected = true
                      for (let attr of productWithOptions.attributes){
                        if(attr.selected === undefined){
                          allSelected = false
                        }
                      }
                      if(allSelected){
                        value.addProductToCart(productWithOptions)
                        this.setState({
                          options: [],
                          warningShown: false
                        })
                      } else {
                        this.setState({
                          warningShown: true
                        })
                      }
                    }} 
                    className='add-to-cart-btn'>add to cart</button>
                      :
                    <button className='add-to-cart-btn out-of-stock-btn'>out of stock</button>
                  }
                  {descElement}
                </div>
            )}}
    </UserConsumer>
    )
  }
}
