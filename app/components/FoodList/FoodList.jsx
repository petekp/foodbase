import React, { Component } from 'react'
import Food from '../Food/Food'
import { sortByKey } from '../Helpers/sortByKey'

export default class FoodList extends Component {
    render() {
        let sortedArray = sortByKey(this.props.data, "name")
        let foodNodes = sortedArray.map((food, index) => {
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
