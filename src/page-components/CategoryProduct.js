import React, { Component } from 'react'
import { UserConsumer } from '../context';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import defaultImage from '../images/no-image.png'
import addToCartSvg from '../images/add-to-cart.svg'

export default class CategoryProduct extends Component {
    constructor(props) {
      super(props)

    }

  render() {
    const {id,name, attributes, gallery, inStock, prices} = this.props.product;
    return (
      <UserConsumer>
        {value=>{
          let productWithOptions = this.props.product
          productWithOptions = {...productWithOptions, options:{}, amount:1}
          const symbol = prices.find(currency=> currency.currency.label === value.currentCurrency).currency.symbol
          const amount = prices.find(currency=> currency.currency.label === value.currentCurrency).amount
          return(
            <>
              <Link to={`/product/${id}`} className='product-card'>
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
              {inStock && attributes.length === 0 && <img onClick={()=>value.addProductToCart(productWithOptions)} className='plp-cart-icon' src={addToCartSvg}/>}
            </>
          )
        }
      }
      </UserConsumer>
    )
  }
}
