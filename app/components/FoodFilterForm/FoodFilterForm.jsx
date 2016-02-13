import React, {Component} from 'react'
import './FoodFilterForm.css'

export default class FoodFilterForm extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.onFilterChange = this.onFilterChange.bind(this)
    }
    onFilterChange(name, e) {
      let filterState = this.props.filters
      filterState[name + 'Filter'] = e.target.value
      this.props.handleFilterChange(filterState)
    }

    render() {
        let foods = this.props.foods
        return (
            <div ref="FoodFilterForm" className="FoodFilterForm">
                Show me
                <select value={this.props.filters.typeFilter} ref="type" onChange={this.onFilterChange.bind(this, 'type')}>
                    {foods.map(function(obj) {
                        return <option value={obj.food.type.name} key={obj.objectId}>{obj.food.type.name}</option>
                    })}
                </select>
                in season
                <select value={this.props.filters.monthFilter} onChange={this.onFilterChange.bind(this, 'month')}>
                    {foods.map(function(food) {
                        return <option value={food.month.name} key={food.objectId}>{food.month.name}</option>
                    })}
                </select>
                within
                <select value={this.props.filters.locationFilter} onChange={this.onFilterChange.bind(this, 'location')}>
                    {foods.map(function(food) {
                        return <option value={food.location.name} key={food.objectId}>{food.location.name}</option>
                    })}
                </select>
            </div>
        )
    }
}
2
