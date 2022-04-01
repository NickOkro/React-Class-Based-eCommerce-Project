import React, { Component } from 'react'
import arrowRight from '../../images/chevron-right.svg'
import arrowLeft from '../../images/chevron-left.svg'

export default class Slider extends Component {

    constructor(props){
        super(props)

        this.state={
            sliderPos: 0,
            imgWidth: 141,
        }
    }

    moveRight(width){
        this.state.sliderPos <= this.props.gallery.length * (-width) + width
        ?
        this.setState({
            sliderPos: 0
        })
        :
        this.setState({
            sliderPos: this.state.sliderPos - width
        })
    }

    moveLeft(width){
        this.state.sliderPos >= 0
        ?
        this.setState({
            sliderPos: this.props.gallery.length * (-width) + width
        })
        :
        this.setState({
            sliderPos: this.state.sliderPos + width
        })
    }

  render() {
    return (
    <div className='slider'>
        <div className='slider-content' style={{left:this.state.sliderPos}}>
            {this.props.gallery && this.props.gallery.map(img=>{
                return <img key={img} src={img} className='slider-img' alt={img}/>
            })}
        </div>
        <div className='arrows'>
                <img onClick={() => this.moveLeft(this.state.imgWidth)} className='arrow' src={arrowLeft} alt='arrow-left'/>
                <img onClick={() => this.moveRight(this.state.imgWidth)} className='arrow' src={arrowRight} alt='arrow-right'/>
        </div>
    </div>
    )
  }
}
