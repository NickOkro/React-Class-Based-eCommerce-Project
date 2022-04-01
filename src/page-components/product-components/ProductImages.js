import React, { Component } from 'react'

export default class ProductImages extends Component {

    constructor(props){
        super(props)

        this.state ={
            selectedImage: '',
        }
    }

  render() {
    const {gallery} = this.props.product
    return (
        <>
            <ul className='product-images'>
                {gallery && gallery.map((img) => {
                    return <li onClick={() => this.setState({selectedImage: img})} key={img}><img src={img} alt="" /></li>
                })}
            </ul>
            <div className='main-image'>
                <img src={this.state.selectedImage === '' ? gallery && gallery[0] : this.state.selectedImage} alt="product" />
            </div>
        </>
    )}
}