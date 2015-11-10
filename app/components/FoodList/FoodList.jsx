import React, { Component } from 'react'
import Food from '../Food/Food'

export default class FoodList extends Component {
    sortByKey (array, key) {
        return array.sort((a, b) => {
            let x = a[key],
                y = b[key]
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
