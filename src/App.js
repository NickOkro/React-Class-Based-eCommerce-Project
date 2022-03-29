import React, { Component } from 'react'
import CategoryPage from './pages/CategoryPage'
// import GetCategoryNames from './Graphql/GetCategoryNames'
import getCategoryNames from './Graphql/GetCategoryNames'
import {UserProvider} from './context'
import {Route, Switch} from 'react-router'
import { BrowserRouter} from 'react-router-dom';
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import getCurrencies from './Graphql/GetCurrencies'

export default class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      categoriesList:[],
      currentCurrency: "USD",
      currentCurrencySymbol: '$',
      currencySwitcherShown: false,
      selectedCategory: 'all',
      cartProducts: [],
      popupShown: false,
      totalAmount: 0,
      totalProductsAmount: 0,
      currencies: 0,
    }

    this.updateCurrency = this.updateCurrency.bind(this)
    this.toggleCurrencySwitch = this.toggleCurrencySwitch.bind(this)
    this.addProductToCart = this.addProductToCart.bind(this)
    this.changeProductAmount = this.changeProductAmount.bind(this)
  }

  async componentDidMount() {
    const category = await getCategoryNames()
    const currency = await getCurrencies() 
      
    this.setState({
     categoriesList: category.categories,
     currencies: currency.currencies,
    });
  }

  componentDidUpdate(prevProps,prevState){
    if(prevState.cartProducts !== this.state.cartProducts || 
      prevState.currentCurrency !== this.state.currentCurrency || 
      prevState.totalProductsAmount !== this.state.totalProductsAmount){
      let totalPrice = 0
      totalPrice = this.state.cartProducts.map(product => 
        product.prices.find(each=> each.currency.label === this.state.currentCurrency).amount * product.amount).map(price=> totalPrice += price)
      this.setState({  
        totalAmount: totalPrice[totalPrice.length -1] && totalPrice[totalPrice.length -1].toFixed(2)
      })
    }
  }

  updateCurrency(currency, symbol){
    this.setState({
      currentCurrency: currency,
      currentCurrencySymbol: symbol
    })
    this.toggleCurrencySwitch()
  }

  toggleCurrencySwitch(shown){
    shown
    ?
    this.setState({
      currencySwitcherShown: this.state.currencySwitcherShown
    })
    :
    this.setState({
      currencySwitcherShown: !this.state.currencySwitcherShown
    })
  }

  addProductToCart(product){
    if(product.attributes.length === product.options.length || product.attributes.length === 0){
      if(this.state.cartProducts.find(prod => prod.id === product.id)){
        this.changeProductAmount(product, true)
      }
      else {
        this.setState({
          cartProducts: [...this.state.cartProducts, product],
          popupShown: false,
        })
      }
    } 
    else {
      this.setState({
        popupShown: true
      })
    }
    
  }

  changeProductAmount(prod, op){
    if(op){
      this.state.cartProducts.find(product => product.id === prod.id).amount += 1
      this.setState({
        cartProducts: this.state.cartProducts
      })
    }
    else {
      if(this.state.cartProducts.find(product => product.id === prod.id).amount <= 1){
        this.setState({
          cartProducts: this.state.cartProducts.filter(product => product.id !== prod.id)
        })
      } else {
        this.state.cartProducts.find(product => product.id === prod.id).amount -= 1
        this.setState({
          cartProducts: this.state.cartProducts
        })
      }
    }
    this.setState({
      totalProductsAmount: this.state.cartProducts.map(product=> this.state.totalProductsAmount = this.state.totalProductsAmount + product.amount),
    })
  }

  

  render() {
    return (
      <UserProvider value={{
        updateCurrency:this.updateCurrency,
        currentCurrency:this.state.currentCurrency,
        currencySwitcherShown:this.state.currencySwitcherShown,
        toggleCurrencySwitch: this.toggleCurrencySwitch,
        selectedCategory: this.state.selectedCategory,
        categoriesList:this.state.categoriesList,
        addProductToCart: this.addProductToCart,
        cartProducts: this.state.cartProducts,
        totalAmount: this.state.totalAmount,
        changeProductAmount: this.changeProductAmount,
        currentCurrencySymbol: this.state.currentCurrencySymbol,
        currencies: this.state.currencies
      }}>
        <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <CategoryPage />
            </Route>
            <Route path="/product/:id">
              {({match}) => <ProductPage match={match} popupShown={this.state.popupShown}/>}
            </Route>
            <Route exact path="/cart">
              <CartPage />
            </Route>
          </Switch>
      </BrowserRouter>
        </>
        
      </UserProvider>
    )
  }
}
