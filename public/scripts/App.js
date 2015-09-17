import React, { Component } from 'react'
import css from '../css/app.css'
import FastClick from 'fastclick';

window.addEventListener('load', () => {
  FastClick.attach(document.body);
});

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {data: []}
    }
    componentDidMount() {
        this.loadFoodsFromServer()
        setInterval((e) => this.loadFoodsFromServer, this.props.pollInterval)
    }
    loadFoodsFromServer() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: (data) => {
                this.setState({data: data})
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString())
            }
        })
    }
    render() {
        return (
            <div className="App">
                <FoodList data={this.state.data} />
            </div>
        )
    }
}

class FoodList extends Component {
    sortByKey (array, key) {
        return array.sort((a, b) => {
            let x = a[key],
                y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0))
        })
    }
    render () {
        let sortedArray = this.sortByKey(this.props.data, "name")
        let foodNodes = sortedArray.map((food, index) => {
            return (
                <Food key={index} name={food.name} type={food.type} hue={food.hue}>
                    {food.text}
                </Food>
            )
        })
        return (
            <div className="FoodList">
                {foodNodes}
            </div>
        )
    }
}

class Food extends Component {
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
            $el             = $(React.findDOMNode(this)),
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

export class FoodCart extends Component {
    render() {
        return (
            <App url="foods.json" pollInterval={2000} />
        )
    }
}
