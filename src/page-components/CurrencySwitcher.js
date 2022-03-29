import React, { Component } from 'react'
import { UserConsumer } from '../context'
import './CurrencySwitcher.css'
export default class CurrencySwitcher extends Component {

    constructor(props){
    super(props)
      this.ref = React.createRef()
    this.state = {
        boxShown: false
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
      this.props.toggleBoxShown(this.state.boxShown)
    }
  }

  render() {
    return (
      <UserConsumer>
        {value => {
          return(
            <div className='currency-switcher' ref={this.ref}>
            {this.props.currencies && this.props.currencies.map(currency=>{
              return (
                <h3 onClick={() => value.updateCurrency(currency.label, currency.symbol)} key={currency.label}>{currency.symbol} {currency.label}</h3>
              )})}
          </div>
          )
        }}
      </UserConsumer>
    )
  }
}
