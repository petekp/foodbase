import React, {Component} from 'react'
import getUniqueArray from '../Helpers/getUniqueArray'
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
        let FLM = this.props.foods
        let typeInstances = []
        let locationInstances = []
        let monthInstances = []

        FLM.map(food => {
          typeInstances.push(food.food.type.name)
          locationInstances.push(food.location.name)
          monthInstances.push(food.month.name)
        })
        let types = getUniqueArray(typeInstances)
        let locations = getUniqueArray(locationInstances)
        let months = getUniqueArray(monthInstances)

        return (
            <div ref="FoodFilterForm" className="FoodFilterForm">
                Seasonal
                <select value={this.props.filters.typeFilter} ref="type" onChange={this.onFilterChange.bind(this, 'type')}>
                    {types.map(type => {
                        return <option value={type} key={type}>{type}</option>
                    })}
                </select>
                in
                <select value={this.props.filters.locationFilter} onChange={this.onFilterChange.bind(this, 'location')}>
                    {locations.map(location => {
                        return <option value={location} key={location}>{location}</option>
                    })}
                </select>
                in
                <select value={this.props.filters.monthFilter} onChange={this.onFilterChange.bind(this, 'month')}>
                    {months.map(month => {
                        return <option value={month} key={month}>{month}</option>
                    })}
                </select>

            </div>
        )
    }
}
2
