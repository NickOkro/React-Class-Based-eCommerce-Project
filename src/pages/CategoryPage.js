import React, { Component } from 'react'
import './CategoryPage.css'
import CategoryProduct from '../page-components/CategoryProduct'

export default class CategoryPage extends Component {

  render() {
          return(
          <>
                <section className='products-section'>
                  <div className='container'>
                    <h1 className='category-name'>
                      {this.props.selectedCategory}
                    </h1>
                    <div className="products">
                      {this.props.categoryProducts && this.props.categoryProducts.map((product) => {
                        return <CategoryProduct key={product.id} product={product}/>
                      })}
                    </div>
                  </div>
                </section>
          </>
    )}
}
