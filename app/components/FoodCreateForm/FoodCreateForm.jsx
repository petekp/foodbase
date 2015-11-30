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
        this.state = {
            food: null,
            type: null,
            location: null,
            month: null
        }
    }
    observe(props, state) {
        return {
          months: new Parse.Query('Months'),
          foods: new Parse.Query('Foods'),
          locations: new Parse.Query('Locations'),
          types: new Parse.Query('Types'),
          seasonality: new Parse.Query('FLM')
        }
    }
    changeFood = (e) => {
        this.state.food = e.target.value
        let foods = this.data.foods
        let thisFood = foods.filter(food =>
            food.name == this.state.food
        )
        this.state.type = thisFood[0].type.objectId
        console.log(thisFood)

    }
    addFood = () => {
        let types = this.data.types
        let selectedType = types.filter(type =>
            type.name == this.state.type
        )
        let typeId = selectedType[0].objectId

        ParseReact.Mutation.Create('Foods', {
          name: this.refs.newFoodInput.value,
          type: {
              __type: "Pointer",
              className: "Types",
              objectId: typeId
          }
        }).dispatch();

        this.refs.newFoodInput.value = ''
        this.refs.newFoodInput.focus()
    }
    removeFood = (food) => {
        let foods = this.data.foods
        let selectedFoods = foods.filter(food =>
            food.name == this.state.food
        )
        let id = selectedFoods[0]
        ParseReact.Mutation.Destroy(id).dispatch();
    }
    changeType = (e) => {
        this.state.type = e.target.value
    }
    showSeasonalFoods() {
        let seasonality = this.data.seasonality
        let inSeasonFoods = seasonality.filter(el =>
            el.month.name == "May"
        )
    }
    render() {
        return (
            <div className="FoodCreateForm">
                <div className="actions">
                    <input ref="newFoodInput" type="text" defaultValue="" placeholder="Food" />
                    <button onClick={this.addFood} type="button">Add</button>

                    <button className="button--red" onClick={this.removeFood} type="button">Remove</button>
                </div>

                <div className="foods column">
                    <h2>Foods</h2>
                    <select value={this.state.food} size={this.data.foods.length + 1} onChange={this.changeFood}>
                        {this.data.foods.map(function(food) {
                          return <option key={food.objectId}>{food.name}</option>
                        })}
                    </select>
                </div>

                <div className="types column">
                    <h2>Types</h2>
                    <select ref="types" defaultValue={this.state.type} value={this.state.type} onChange={this.changeType} size={this.data.types.length + 1}>
                        {this.data.types.map(function(type) {
                          return <option key={type.objectId} >{type.name}</option>
                        })}
                    </select>
                </div>

                <div className="locations column">
                    <h2>Locations</h2>
                    <select size={this.data.locations.length + 1}>
                        {this.data.locations.map(function(location) {
                          return <option key={location.objectId} >{location.name}</option>
                        })}
                    </select>
                </div>

                <div className="months column">
                    <h2>Months</h2>
                    <select multiple={true} size={this.data.months.length + 1}>
                        {this.data.months.map(function(month) {
                          return <option key={month.objectId} >{month.name}</option>
                        })}
                    </select>
                </div>
            </div>
        )
    }
}
