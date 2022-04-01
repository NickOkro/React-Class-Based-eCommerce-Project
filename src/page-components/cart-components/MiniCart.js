import React, { Component } from 'react'
import './MiniCart.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import CartItem from './CartItem'
import { UserConsumer } from '../../context'
export default class MiniCart extends Component {

  constructor(props){
    super(props)

    this.ref = React.createRef()
    this.state ={
      boxShown: false,
      totalAmount: 0,
    }

  }

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = (event) => {
    if (this.ref.current && !this.ref.current.contains(event.target)) {
      this.setState({
        boxShown: !this.state.boxShown
      })
      this.props.toggleBoxShown(this.state.boxShown,'cart')
    }
  }

  render() {
    return(
      <UserConsumer>
      {value=>{
        return (
          <div className='mini-cart' ref={this.ref}>
            <h2 className='bold cart-title'>My Bag,<span>{value.cartProducts.length} item</span></h2>
            <div className='mini-cart-items'>
              {value.cartProducts.map(product=>{
                return <CartItem key={product.id + product.attributes.map(attr=> attr.selected)} product={product}/>
              })}
            </div>
            <div className='total-amount'>
              <p>Total:</p>
              <p className='price'>{value.currentCurrencySymbol}{value.totalAmount}</p>
            </div>
            <div className='buttons'>
              <Link onClick={() => this.props.toggleBoxShown(false, 'cart')} className="btn" to="/cart"><button>View Bag</button></Link>
              <Link className="btn btn-green" to="/check-out"><button>check out</button></Link>
            </div>
          </div>
        )
      }}
      </UserConsumer>
    )
  }
}
