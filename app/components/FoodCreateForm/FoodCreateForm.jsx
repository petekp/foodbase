import React, { Component } from 'react'
import Parse from 'parse'
import ParseReact from 'parse-react'
import './FoodCreateForm.css'

var ParseComponent = ParseReact.Component(React)
Parse.initialize('agvA5VJCcRs9KrikUD0bcrS4D2WaqiKaO35ZlDhq', 'chYL0LjbqMKCwe4lPeayTt7gTyAP4iXnS7rpND8x')

export default class FoodCreateForm extends ParseComponent {
    mixins: [ParseReact.Mixin]

    constructor(props) {
        super(props)
        this.state = {value: null}
        this.change = this.change.bind(this)
        this.addFood = this.addFood.bind(this)
    }
    change(event){
        this.state.value = event.target.value
        console.log(this.state.value)
    }
    addFood() {
        ParseReact.Mutation.Create('Foods', {
          name: this.refs.newFoodInput.value
        }).dispatch();
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
        let seasonality = this.data.seasonality
        let inSeasonFoods = seasonality.filter(el =>
            el.month.name == "May"
        )

        inSeasonFoods.forEach(i => {
            // console.log(i.food.name)
        })
    }
    render() {
        return (
            <div className="FoodCreateForm">
                <div className="column">
                    <select size={1 + this.data.foods.length} onChange={this.change} value={this.state.value}>
                        {this.data.foods.map(function(type) {
                          return <option id="{type.id}">{type.name}</option>
                        })}
                    </select>
                    <div className="newFoodForm">
                        <input ref="newFoodInput" type="text" defaultValue="Hello!" />
                        <button onClick={this.addFood} type="button">Add</button>
                    </div>
                </div>

                <div className="column"><select size={1 + this.data.types.length}>
                    <option value="All Foods">All Foods</option>
                        {this.data.types.map(function(type) {
                          return <option id="{type.id}">{type.name}</option>
                        })}
                </select></div>
                <div className="column"><select size={1 + this.data.locations.length}>
                    {this.data.locations.map(function(location) {
                      return <option id="{location.id}">{location.name}</option>
                    })}
                </select></div>
            <div className="column"><select multiple size={1 + this.data.months.length}>
                    {this.data.months.map(function(month) {
                      return <option id="{month.id}">{month.name}</option>
                    })}
                </select></div>
            </div>
        )
    }
}
