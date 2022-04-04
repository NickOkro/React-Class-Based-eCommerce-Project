import React, { Component } from 'react'
import getProductById from '../Graphql/GetProductById'
import './ProductPage.css'
import ProductDesc from '../page-components/product-components/ProductDesc'
import ProductImages from '../page-components/product-components/ProductImages'
export default class ProductPage extends Component {

  constructor(props){
    super(props)

    this.state = {
      product: '',
    }
  }

  async componentDidMount(){
    const result = await JSON.parse(JSON.stringify((await getProductById(this.props.match.params.id)).product))
      
    this.setState({
     product: result
    });
  }

  render() {
    return (
    <>
      <section className='product-page'>
        <div className='container'>
          <div className='product-content'>
            <ProductImages product={this.state.product}/>
            <ProductDesc product={this.state.product}/>
          </div>
        </div>
      </section>
    </>
  )}
}
