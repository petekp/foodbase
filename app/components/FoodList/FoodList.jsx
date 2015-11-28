import React, { Component } from 'react'
import Food from '../Food/Food'
import sortByKey from '../Helpers/sortByKey'

export default class FoodList extends Component {
    constructor(props) {
        super(props)
        this.state = {food: null}
    }
    render() {
        let foodNodes = sortByKey(this.props.foods, "name").map((food, index) => {
            return (
                <Food id={food.id} key={index} name={food.name} type={food.type} hue={food.hue}>
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
