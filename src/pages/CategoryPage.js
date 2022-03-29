import React, { Component } from 'react'
import Header from '../page-components/Header'
import './CategoryPage.css'
import getProductsByCategory from '../Graphql/GetProductsByCategory'
import { UserConsumer } from '../context'
import CategoryProduct from '../page-components/CategoryProduct'

export default class CategoryPage extends Component {

  constructor(props){
    super(props)

    this.state = {
      categoryProducts: '',
      selectedCategory: 'all',
    }

    this.setCategory = this.setCategory.bind(this)
  }

  async componentDidMount(){
    const result = await getProductsByCategory('all')
      
    this.setState({
     categoryProducts: result.category.products
    });
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
  
  render() {
    return (
      <UserConsumer>
        {value=>{
          return(
          <>
            <Header selectedCategory={this.state.selectedCategory} setCategory={this.setCategory}/>
                <section className='products-section'>
                  <div className='container'>
                    <h1 className='category-name'>
                      {value.selectedCategory}
                    </h1>
                    <div className="products">
                      {this.state.categoryProducts && this.state.categoryProducts.map((product) => {
                        return <CategoryProduct key={product.id} product={product}/>
                      })}
                    </div>
                  </div>
                </section>
          </>
        )}}
      </UserConsumer>
    )}
}
