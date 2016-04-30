import React, {Component} from 'react'
import Food from '../Food/Food'

export default class FoodList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            foodNodes: ''
        }
    }
    componentWillReceiveProps(nextProps) {
        let foodNodes = nextProps.foods.map((obj, i) => {
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
      if (this.state.foodNodes.length) {
        content = this.state.foodNodes
      } else {
        content = <div className="error no-foods">No foods on file for this month. <br />Are we missing something? <br />Let us know 👍</div>
      }
      return (
          <div className="FoodList">
              {content}
          </div>

      )
    }
}
