import React, { Component } from 'react'
import Food from '../Food/Food'
import sortByKey from '../Helpers/sortByKey'

export default class FoodList extends Component {
    constructor(props) {
        super(props)
        this.state = { foodNodes: '' }
    }
    componentWillReceiveProps(nextProps) {
        let foodNodes = nextProps.data.map( (food, i) => {
            return (
                <Food id={food.id} key={i} name={food.name} type={food.type} hue={food.hue}>
                    {food.text}
                </Food>
            )
        })
        this.setState({foodNodes: foodNodes})
    }
    render() {
        console.log("foodlist state:", this.state)
        return (
            <div className="FoodList">
                {this.state.foodNodes}
            </div>

        )
    }
}
