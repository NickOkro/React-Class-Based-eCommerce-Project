import React, { Component } from 'react'
import CategoryPage from './pages/CategoryPage'
import getCategoryNames from './Graphql/GetCategoryNames'
import {UserProvider} from './context'
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import getCurrencies from './Graphql/GetCurrencies'
import Header from './page-components/Header'
import getProductsByCategory from './Graphql/GetProductsByCategory'
import ScrollToTop from './page-components/ScrollToTop';

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
      categoryProducts: '',
    }

    this.updateCurrency = this.updateCurrency.bind(this)
    this.toggleCurrencySwitch = this.toggleCurrencySwitch.bind(this)
    this.addProductToCart = this.addProductToCart.bind(this)
    this.changeProductAmount = this.changeProductAmount.bind(this)
    this.setCategory = this.setCategory.bind(this)
  }

  async setCategory(name){
    await this.setState({
       selectedCategory: name
    })
    const result = await getProductsByCategory(this.state.selectedCategory)
      
    this.setState({
     categoryProducts: result.category.products
    });
  }

  async componentDidMount() {
    const category = await getCategoryNames()
    const currency = await getCurrencies() 
      
    const result = await getProductsByCategory('all')

    this.setState({
     categoriesList: category.categories,
     currencies: currency.currencies,
     categoryProducts: result.category.products,
    });


  }

  componentDidUpdate(prevProps,prevState){
    if(prevState.cartProducts !== this.state.cartProducts || 
      prevState.currentCurrency !== this.state.currentCurrency || 
      prevState.totalProductsAmount !== this.state.totalProductsAmount){
      let totalPrice = 0
      totalPrice = this.state.cartProducts.map(product => 
        product.prices.find(each=> each.currency.label === this.state.currentCurrency).amount * product.amount).map(price=> totalPrice += price)
        if(totalPrice[totalPrice.length -1]){
          this.setState({  
          totalAmount: totalPrice[totalPrice.length -1].toFixed(2),
          popupShown: false
          })
        }
        else {
          this.setState({  
          totalAmount: 0,
          popupShown: false
          })
        }
      
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
    let allSelected = true
    for (let attr of product.attributes){
      if(attr.selected === undefined){
        allSelected = false
      }
    }
    if(allSelected){

      const productID = product.id + product.attributes.map(attr=> attr.selected)
      if(this.state.cartProducts.find(prod=>{
        const prodID = prod.id + prod.attributes.map(attr=> attr.selected)
        return productID === prodID
      })){
        this.changeProductAmount(product, true)
      }
      else {
        this.setState({
          cartProducts: [...this.state.cartProducts, product],
          popupShown: false,
        })
      }
    }
    else
    {
      this.setState({
        popupShown: true
      })
    }
  }

  changeProductAmount(product, op){
    const productID = product.id + product.attributes.map(attr=> attr.selected)
    const changableProduct = this.state.cartProducts.find(prod=>{
      const prodID = prod.id + prod.attributes.map(attr=> attr.selected)
      return productID === prodID
    })
    if(op)
    {
      changableProduct.amount += 1
      this.setState({
        cartProducts: this.state.cartProducts,
        popupShown: false,
        totalProductsAmount: this.state.totalProductsAmount + 1
      }, console.log(this.state.totalProductsAmount))
    }
    else 
    {
      if(changableProduct.amount <= 1)
      {
        this.setState({
          cartProducts: this.state.cartProducts.filter(prod => {
            const prodID = prod.id + prod.attributes.map(attr=> attr.selected)
            return productID !== prodID
          }),
          totalProductsAmount: this.state.totalProductsAmount - 1
        })
      }
      else 
      {
        changableProduct.amount -= 1
        this.setState({
          cartProducts: this.state.cartProducts,
          totalProductsAmount: this.state.totalProductsAmount - 1
        })
      }
    }
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
        <ScrollToTop />
        <Header selectedCategory={this.state.selectedCategory} setCategory={this.setCategory}/>
          <Switch>
            <Route exact path="/cart">
              <CartPage />
            </Route>
            <Route exact path="/:category_name">
              {({match}) => <CategoryPage selectedCategory={this.state.selectedCategory} categoryProducts={this.state.categoryProducts} match={match}/>}
            </Route>
            <Route exact path="/product/:id">
              {({match}) => <ProductPage match={match} popupShown={this.state.popupShown}/>}
            </Route>
            <Route exact path="/">
              {({match}) => <CategoryPage selectedCategory={this.state.selectedCategory} categoryProducts={this.state.categoryProducts} match={match}/>}
            </Route>
          </Switch>
      </BrowserRouter>
        </>
        
      </UserProvider>
    )
  }
}
