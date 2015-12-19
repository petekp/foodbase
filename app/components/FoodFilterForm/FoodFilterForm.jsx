import React, { Component } from 'react'
import Parse from 'parse'
import ParseReact from 'parse-react'
import './FoodFilterForm.css'

var ParseComponent = ParseReact.Component(React)
Parse.initialize('agvA5VJCcRs9KrikUD0bcrS4D2WaqiKaO35ZlDhq', 'chYL0LjbqMKCwe4lPeayTt7gTyAP4iXnS7rpND8x')

export default class FoodFilterForm extends ParseComponent {
    mixins: [ParseReact.Mixin]

    constructor(props) {
        super(props)
        this.state = {
            type: null,
            time:null,
            location: null
        }
        this.typeChange = this.typeChange.bind(this)
        this.locationChange = this.locationChange.bind(this)
        this.timeChange = this.timeChange.bind(this)
    }
    observe() {
        return {
          months: new Parse.Query('Months'),
          foods: new Parse.Query('Foods'),
          locations: new Parse.Query('Locations'),
          types: new Parse.Query('Types'),
        }
    }
    typeChange(e) {
        this.state.type = e.target.value
        console.log(this.state.type)
    }
    timeChange(e) {
        this.state.time = e.target.value
        console.log(this.state.time)
    }
    locationChange(e) {
        this.state.location = e.target.value
        console.log(this.state.location)
    }
    render() {
        return (
            <div className="FoodFilterForm">
                Show me
                <select onChange={this.typeChange}>
                    {this.data.types.map(function(type) {
                      return <option key={type.objectId}>{type.name}</option>
                    })}
                </select>
                in season
                <select onChange={this.timeChange}>
                    {this.data.months.map(function(month) {
                      return <option key={month.objectId}>{month.name}</option>
                    })}
                </select>
                within
                <select onChange={this.locationChange}>
                    {this.data.locations.map(function(location) {
                      return <option key={location.objectId}>{location.name}</option>
                    })}
                </select>
            </div>
        )
    }
}
