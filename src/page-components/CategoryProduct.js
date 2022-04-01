import React, { Component } from 'react'
import { UserConsumer } from '../context';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import defaultImage from '../images/no-image.png'
import addToCartSvg from '../images/add-to-cart.svg'

export default class CategoryProduct extends Component {
    constructor(props) {
      super(props)


      this.state={
        hovering: false
      }

      this.hoverHandler = this.hoverHandler.bind(this)
    }

    hoverHandler(isHovering){
      isHovering
      ?
      this.setState({
        hovering: true
      })
      :
      this.setState({
        hovering: false
      })
    }

  render() {
    const {id,name, gallery, inStock, prices} = this.props.product;

    return (
      <UserConsumer>
        {value=>{
          const symbol = prices.find(currency=> currency.currency.label === value.currentCurrency).currency.symbol
          const amount = prices.find(currency=> currency.currency.label === value.currentCurrency).amount
          return(
            <div className='product-card' onMouseEnter={()=>this.hoverHandler(true)} onMouseLeave={()=>this.hoverHandler(false)}>
              <Link className='link' to={`/product/${id}`}>
                {inStock || <div className='out-of-stock'><h2>out of stock</h2></div>}
                  <div className='img-holder'>
                    <img className="product-img" src={gallery[0] || defaultImage} alt={name}/>
                  </div>
                  <h2 className="product-name">
                    {name}
                  </h2>
                  <p className="product-price">
                    {`${symbol} ${amount}`}
                  </p>
              </Link>
              {inStock && this.state.hovering && <img onClick={()=>{
                let productAttributes = []
                let productWithOptions = this.props.product;
                productWithOptions = {...productWithOptions, amount: 1}
                productWithOptions.attributes && productWithOptions.attributes.map(attr => {
                    attr = {...attr, selected: attr.items[0].id}
                    productAttributes = [...productAttributes, attr]
                    return productAttributes
                })
                
                productWithOptions.attributes = productAttributes
                console.log(productWithOptions)
                value.addProductToCart(productWithOptions)
                }} className='plp-cart-icon' src={addToCartSvg} alt={'add-to-cart'}/>}
            </div>
          )
        }
      }
      </UserConsumer>
    )
  }
}
