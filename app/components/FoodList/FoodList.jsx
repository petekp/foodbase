import React, {Component} from 'react'
import Food from '../Food/Food'
import sortByKey from '../Helpers/sortByKey'

export default class FoodList extends Component {
    constructor(state, props) {
        super(props)
        this.state = {
            foodNodes: ''
        }
    }
    componentWillReceiveProps(nextProps) {
        let foodNodes = nextProps.data.FLM.map((obj, i) => {
          let food = obj.food
            return (
                <Food id={food.id} key={i} name={food.name} type={food.type} color={food.color}>
                    {food.text}
                </Food>
            )
        })
        this.setState({foodNodes: foodNodes})
    }
    render() {
        var content;
        if (this.state.foodNodes != null) {
          content = this.state.foodNodes
        } else {
          content = "No foods, sorry!"
        }
        return (
            <div className="FoodList">
                what
            </div>

        )
    }
}
