import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'

export default class DescriptionPop extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mouseOver: false
        }

        this.setMouseOverTrue = this.setMouseOverTrue.bind(this)
    }

    setMouseOverTrue = () => {
        this.setState({
            mouseOver: true
        })
    }
    
    setMouseOverFalse = () => {
        this.setState({
            mouseOver: false
        })
    }
    
    render(){
        return(
            <div className='descriptionPop'>
                <FontAwesomeIcon 
                    icon={faInfo} 
                    onMouseEnter={this.setMouseOverTrue}
                    onMouseLeave={this.setMouseOverFalse}
                />
                {this.state.mouseOver ? 
                <div className='descriptionPop__box'>
                   {this.props.description}
                </div> : null}
            </div>
        )
    }
}