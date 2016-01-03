import React, { Component } from 'react'
import Food from '../Food/Food'
import sortByKey from '../Helpers/sortByKey'

export default class FoodList extends Component {

    constructor(props) {
        super(props)
    }
    componentWillMount() {
        this.state = { }
        this.state.foodNodes = sortByKey(this.props.foods, "name").map( (food, i) => {
            return (
                <Food id={food.id} key={i} name={food.name} type={food.type} hue={food.hue}>
                    {food.text}
                </Food>
            )
        })
    }
    render() {
        return (
            <div className="FoodList">
                {this.state.foodNodes}
            </div>

        )
    }
}
