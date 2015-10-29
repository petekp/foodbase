import React, { Component } from 'react'

export default class Food extends Component {
    componentWillMount () {

    }
    componentDidMount () {
        this.setState({isSelected: false})
    }
    zoom () {
        let deltaX          = 0,
            deltaY          = 0,
            scale           = 4,
            $windowCenterX  = $(window).outerWidth() / 2,
            $windowCenterY  = $(window).outerHeight() / 2,
            $el             = $(ReactDOM.findDOMNode(this)),
            $elOffset       = $el.offset(),
            $elCenterX      = $elOffset.left + $el.outerWidth()/2,
            $elCenterY      = $elOffset.top + $el.outerHeight()/2,
            $elParent       = $el.parent(),
            $elParentOffset = $elParent.offset()

        deltaX = $elParentOffset.left + (($windowCenterX * scale) - ($elCenterX * scale))
        deltaY = $elParentOffset.top + ($windowCenterY - ($elCenterY * scale))

        if(this.state.isSelected){
            $elParent.css('transform', `translate(0px,0px) scale(1)`)
        } else{
            $elParent.css(`transform`, `translate(${deltaX}px,${deltaY}px) scale(${scale})`)
        }
    }
    handleClick (e) {
        this.setState({isSelected:!this.state.isSelected})
        this.zoom()
    }
    render () {
        var bgImageURL = `url(images/foods/` + this.props.name.toLowerCase() + `@2x.jpg)`;

        return (
            <div className="Food" onClick={(e) => this.handleClick(e)} data-type={this.props.type} style={{backgroundColor: this.props.hue}}>
                <div className="foodPhoto" style={{backgroundImage: bgImageURL}}></div>
                <span className="foodName">
                    {this.props.name}
                </span>
            </div>
        )
    }
}
