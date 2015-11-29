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
    changeFood = (e) => {
        this.state.food = e.target.value
    }
    changeType = (e) => {
        this.state.type = e.target.value
        console.log(this.state.type)
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
    }
    removeFood = (food) => {
        let foods = this.data.foods
        let selectedFoods = foods.filter(food =>
            food.name == this.state.food
        )
        let id = selectedFoods[0]
        ParseReact.Mutation.Destroy(id).dispatch();
        // console.log(selectedFoods[0].objectId)
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
    showSeasonalFoods() {
        let seasonality = this.data.seasonality
        let inSeasonFoods = seasonality.filter(el =>
            el.month.name == "May"
        )
    }
    render() {
        console.log(this.data.foods)
        return (
            <div className="FoodCreateForm">

                <div className="column">
                    <select size={this.data.foods.length + 1} onChange={this.changeFood}>
                        {this.data.foods.map(function(food) {
                          return <option key={food.objectId}>{food.name}</option>
                        })}
                    </select>
                    <p>
                        <button className="button--red" onClick={this.removeFood} type="button">Remove</button>
                    </p>
                    <div className="newFoodForm">
                        <input ref="newFoodInput" type="text" defaultValue="Hello!" />
                        <button onClick={this.addFood} type="button">Add</button>
                    </div>
                </div>

                <div className="column">
                    <select onChange={this.changeType} size={this.data.types.length + 1}>
                        {this.data.types.map(function(type) {
                          return <option key={type.objectId} >{type.name}</option>
                        })}
                    </select>
                </div>

                <div className="column">
                    <select size={this.data.locations.length + 1}>
                        {this.data.locations.map(function(location) {
                          return <option key={location.objectId} >{location.name}</option>
                        })}
                    </select>
                </div>

                <div className="column">
                    <select multiple size={this.data.months.length + 1}>
                        {this.data.months.map(function(month) {
                          return <option key={month.objectId} >{month.name}</option>
                        })}
                    </select>
                </div>
            </div>
        )
    }
}
