import React, { Component } from 'react'
import { UserConsumer } from '../../context'

export default class AttrOptions extends Component {
    constructor(props){
        super(props)

        this.state = {
            selectedOption: ''
        }
    }

  render() {
    return(
        <UserConsumer>
            {value=>{
                return (
                    <div className='options'>     
                    {this.props.attr.items.map(item=>{
                        return this.props.options && this.props.options.find(opt=>opt.optionName === this.props.attr.name && opt.option === item.id)
                        ? this.props.attr.type === 'swatch' 
                            ? <button className='selected-color' key={item.id} style={{backgroundColor:`${item.id}`}}></button> 
                            : <button className='selected' key={item.id}>{item.id}</button> 
                        : this.props.attr.type === 'swatch' 
                            ? <button onClick={() => {
                                    this.props.selectOption(item.id, this.props.attr.name) 
                                }} key={item.id} style={{backgroundColor:`${item.id}`}}></button> 
                            : <button onClick={() => {
                                    this.props.selectOption(item.id, this.props.attr.name) 
                                }} key={item.id}>{item.id}</button>
                        })}
                    </div>
                )}}
    </UserConsumer>
    )
  }
}
