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
        let locationInstances = []
        let monthInstances = []

        FLM.map(food => {
          locationInstances.push(food.location.name)
          monthInstances.push(food.month.name)
        })
        let locations = getUniqueArray(locationInstances)
        let months = getUniqueArray(monthInstances)
        console.log(locations, months)
        return (
            <div ref="FoodFilterForm" className="FoodFilterForm">
                Show seasonal
                <select value={this.props.filters.typeFilter} ref="type" onChange={this.onFilterChange.bind(this, 'type')}>
                    {FLM.map(obj => {
                        return <option value={obj.food.type.name} key={obj.objectId}>{obj.food.type.name}</option>
                    })}
                </select>
                in
                <select value={this.props.filters.locationFilter} onChange={this.onFilterChange.bind(this, 'location')}>
                    {locations.map(location => {
                        return <option value={location} key={location.id}>{location}</option>
                    })}
                </select>
                around
                <select value={this.props.filters.monthFilter} onChange={this.onFilterChange.bind(this, 'month')}>
                    {months.map(month => {
                        return <option value={month} key={month.id}>{month}</option>
                    })}
                </select>

            </div>
        )
    }
}
2
