import React, { Component } from 'react'
import './FoodFilterForm.css'

export default class FoodFilterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
          type: '',
          month: '',
          location: ''
        }
    }
    componentWillMount() {

    }
    componentDidMount() {
        this.typeChange = this.typeChange.bind(this)
        this.locationChange = this.locationChange.bind(this)
        this.monthChange = this.monthChange.bind(this)
    }
    componentWillReceiveProps(nextProps) {
      this.state = {}
      let newState = {
        type: nextProps.data.types[1].name,
        month: nextProps.data.months[1].name,
        location: nextProps.data.locations[1].name
      }
      this.setState(newState)
    }
    componentWillUpdate(nextProps, nextState) {
      nextProps.changeFilter(nextState)
    }
    typeChange(e) {
        this.setState({
            type: e.target.value
        })
    }
    monthChange(e) {
        this.setState({
            month: e.target.value
        })
    }
    locationChange(e) {
        this.setState({
            location: e.target.value
        })
    }
    render() {
        return (
            <div className="FoodFilterForm">
                Show me
                <select onChange={this.typeChange}>
                    {this.props.data.types.map(function(type) {
                      return <option key={type.objectId}>{type.name}</option>
                    })}
                </select>
                in season
                <select onChange={this.monthChange}>
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
