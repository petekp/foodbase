import React, {Component} from 'react'
import ReactDOM, {render} from 'react-dom'
import $ from 'jQuery'
import './Food.css'

export default class Food extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.setState({isSelected: false})
    }
    zoom() {
        let deltaX = 0,
            deltaY = 0,
            scale = 4,
            $window = $(window),
            $windowCenterX = $window.width() / 2,
            $windowCenterY = $window.height() / 2 + $window.scrollTop(),
            $el = $(ReactDOM.findDOMNode(this)),
            $elOffset = $el.offset(),
            $elCenterX = $elOffset.left + $el.outerWidth() / 2,
            $elCenterY = $elOffset.top + $el.outerHeight() / 2,
            $elParent = $el.parent(),
            $elParentOffset = $elParent.offset()

        deltaX = $elParentOffset.left + (($windowCenterX * scale) - ($elCenterX * scale))
        deltaY = $elParentOffset.top + ($windowCenterY - ($elCenterY * scale))

        if (this.state.isSelected) {
            $elParent.css('transform', `translate(0,0) scale(1)`)
        } else {
            $elParent.css(`transform`, `translate(${deltaX}px,${deltaY}px) scale(${scale})`)
        }
    }
    componentWillReceiveProps(nextProps, nextState) {
      // console.log('food received props')
    }
    handleClick(e) {
        this.setState({
            isSelected: !this.state.isSelected
        })
        if (!this.state.isSelected) {

        }
        this.zoom()
    }
    render() {
        var bgImageURL = `url(app/images/foods/` + this.props.name.toLowerCase() + `@2x.jpg)`;

        return (
            <div className="Food" onClick={(e) => this.handleClick(e)} data-type={this.props.type} style={{backgroundColor: this.props.color}}>
                <div className="foodPhoto" style={{
                    backgroundImage: bgImageURL
                }}></div>
                <span className="foodName">
                    {this.props.name}
                </span>
            </div>
        )
    }
}
