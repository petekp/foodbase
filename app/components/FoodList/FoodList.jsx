import React, {Component} from 'react'
import Food from '../Food/Food'
import sortByKey from '../Helpers/sortByKey'

export default class FoodList extends Component {
    constructor(state, props) {
        super(props)

        console.log(this.state)
    }
    componentWillReceiveProps(nextProps) {
        let foodNodes = nextProps.data.FLM.map((obj, i) => {
          let food = obj.food
            return (
                <Food id={food.id} key={i} name={food.name} type={food.type} hue={food.hue}>
                    {food.text}
                </Food>
            )
        })
        this.setState({foodNodes: foodNodes})
    }
    render() {
        return (
            <div className="FoodList">
                {this.state.foodNodes}
            </div>

        )
    }
}
