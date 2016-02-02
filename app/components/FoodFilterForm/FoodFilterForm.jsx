import React, { Component } from 'react'
import './FoodFilterForm.css'

export default class FoodFilterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
          type: null,
          time: null,
          location: null
        }
    }
    componentDidMount() {
        this.typeChange = this.typeChange.bind(this)
        this.locationChange = this.locationChange.bind(this)
        this.timeChange = this.timeChange.bind(this)
    }
    typeChange(e) {
        this.setState({
            type: e.target.value
        })
    }
    timeChange(e) {
        this.setState({
            time: e.target.value
        })
    }
    locationChange(e) {
        this.setState({
            location: e.target.value
        })
    }
    render() {
      console.log(this.props.data)
        return (
            <div className="FoodFilterForm">
                Show me
                <select onChange={this.typeChange}>
                    {this.props.data.types.map(function(type) {
                      return <option key={type.objectId}>{type.name}</option>
                    })}
                </select>
                in season
                <select onChange={this.timeChange}>
                    {this.props.data.months.map(function(month) {
                      return <option key={month.objectId}>{month.name}</option>
                    })}
                </select>
                within
                <select onChange={this.locationChange}>
                    {this.props.data.locations.map(function(location) {
                      return <option key={location.objectId}>{location.name}</option>
                    })}
                </select>
            </div>
        )
    }
}
