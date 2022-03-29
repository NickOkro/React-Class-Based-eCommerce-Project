import React, { Component } from 'react'
import MiniCart from './cart-components/MiniCart'
import './Header.css'
import logoSvg from '../images/header-logo.svg'
import emptyCartSvg from '../images/Empty Cart.svg'
import arrowSvg from '../images/arrow.svg'
import {Link} from 'react-router-dom'
import CurrencySwitcher from './CurrencySwitcher'
import { UserConsumer } from '../context'

export default class Header extends Component {
  constructor(props){
    super(props)

    this.state = {
      cartShown: false,
    }

    this.toggleBoxShown = this.toggleBoxShown.bind(this)
  }

    toggleBoxShown(boxShown, boxName){
      boxName === 'cart'
      ?
      this.setState({
        cartShown: boxShown
      })
      :
      this.setState({

      })
    }

  render() {
    return (
      <UserConsumer>
        {value => {
          return(
          <div>
            <header className='header'>
                <div className='container'>
                  <div className='header-content'>
                      <ul>
                        {this.props.selectedCategory && value.categoriesList.map(category=>{
                          return this.props.selectedCategory === category.name 
                          ?
                          <Link key={category.name} className='link' to="/"><li className='selected-category'>{category.name}</li></Link> 
                          :
                          <Link key={category.name} className='link' to="/" onClick={() => 
                            {this.props.setCategory ? 
                              this.props.setCategory(category.name) : 
                              this.props.selectedCategory = category.name}}>
                            <li >{category.name}</li></Link>
                        })}
                      </ul>
                      <Link to="/">
                        <img src={logoSvg} className='header-icon' alt="logo" />
                      </Link>
                      <ul>
                          <li onClick={() => value.toggleCurrencySwitch()}>
                            {value.currencies && value.currencies.find(currency=>currency.label === value.currentCurrency).symbol}
                            <img src={arrowSvg} />
                          </li>
                          <li onClick={() => this.setState({cartShown: !this.state.cartShown})}>
                            <img src={emptyCartSvg} alt="empty cart" />
                            {value.cartProducts.length > 0 && <p className='item-amount'>{value.cartProducts.length}</p>}
                          </li>
                      </ul>
                  </div>

                    {this.state.cartShown && <MiniCart 
                      toggleBoxShown={this.toggleBoxShown} 
                      totalAmount={value.totalAmount} 
                      currentCurrency={value.currentCurrency} 
                      cartProducts={value.cartProducts}
                    />}
                    {value.currencySwitcherShown && <CurrencySwitcher 
                      toggleBoxShown={value.toggleCurrencySwitch} 
                      currencies={value.currencies}
                    />}

                </div>
            </header>
            
            
          </div>
          )
        }
      }
    </UserConsumer>
    )
  }
}