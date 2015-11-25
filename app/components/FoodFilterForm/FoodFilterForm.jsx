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
        this.state = {type: null, time:null, location: null}
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
          seasonality: new Parse.Query('FLM')
        }
    }
    showSeasonalFoods () {
        let flmQuery = new Parse.Query("FLM")
        let seasonality = this.data.seasonality
        let inSeasonFoods = seasonality.filter(el =>
            el.month.name == "May"
        )
        inSeasonFoods.forEach(i => {
            // console.log(i.food.name)
        })
    }
    typeChange(event) {
        this.state.type = event.target.value
        console.log(this.state.type)
    }
    timeChange(event) {
        this.state.time = event.target.value
        console.log(this.state.time)
    }
    locationChange(event) {
        this.state.location = event.target.value
        console.log(this.state.location)
    }
    render() {
        return (
            <div className="FoodFilterForm">
                Show me
                <select onChange={this.typeChange}>
                    <option value="All Foods">All Foods</option>
                        {this.data.types.map(function(type) {
                          return <option id="{type.id}">{type.name}</option>
                        })}
                </select>
                in season
                <select onChange={this.timeChange}>
                    {this.data.months.map(function(month) {
                      return <option id="{month.id}">{month.name}</option>
                    })}
                </select>
                within
                <select onChange={this.locationChange}>
                    {this.data.locations.map(function(location) {
                      return <option id="{location.id}">{location.name}</option>
                    })}
                </select>
                <select>
                    <option>{this.showSeasonalFoods()}</option>
                </select>
            </div>
        )
    }
}
