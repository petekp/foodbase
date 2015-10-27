import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { IndexRoute, Router, Route, Link } from 'react-router'
import css from '../css/app.css'
import FastClick from 'fastclick'
import About from './About'

import Parse from 'parse'
import ParseReact from 'parse-react'
var ParseComponent = ParseReact.Component(React);
Parse.initialize('agvA5VJCcRs9KrikUD0bcrS4D2WaqiKaO35ZlDhq', 'chYL0LjbqMKCwe4lPeayTt7gTyAP4iXnS7rpND8x');

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
                <NavPrimary />
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

export class NavPrimary extends Component {

    render () {
        return (
            <div className="NavPrimary">
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About</Link></li>
                </ul>
                <span className="AppTitle">Foodbase</span>
                <FoodFilterForm />

            </div>
        )
    }
}

class FoodFilterForm extends ParseComponent {
    mixins: [ParseReact.Mixin]
    observe() {
        return {
          months: new Parse.Query('Months')
        }
    }
    render () {
        return (
            <div className="FoodFilterForm">
                Show me
                <select>
                    <option value="All Foods">All Foods</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Herbs">Herbs</option>
                </select>
                in season
                <select>
                {this.data.months.map(function(c) {
                  return <option id="{c.id}">{c.name}</option>
                })}
                </select>

                within
                <select>
                    <option value="California">California</option>
                    <option value="Arkansas">Arkansas</option>
                    <option value="Colorado">Colorado</option>
                    <option value="Indiana">Indiana</option>
                </select>
            </div>
        )
    }
}


export class Foodbase extends Component {
    render() {
        return (
            <App url="foods.json" pollInterval={2000} />
        )
    }
}
