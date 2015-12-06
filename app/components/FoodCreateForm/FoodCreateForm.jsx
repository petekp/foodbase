import React, { Component } from 'react'
import Parse from 'parse'
import ParseReact from 'parse-react'
import getUniqueArray from '../Helpers/getUniqueArray'
import './FoodCreateForm.css'

var ParseComponent = ParseReact.Component(React)
Parse.initialize('agvA5VJCcRs9KrikUD0bcrS4D2WaqiKaO35ZlDhq', 'chYL0LjbqMKCwe4lPeayTt7gTyAP4iXnS7rpND8x')

export default class FoodCreateForm extends ParseComponent {
    mixins: [ParseReact.Mixin]
    constructor(props) {
        super(props)
        this.state = {
            type: "Veggies",
            location: [],
            months: [],
            food: "Apples",
            seasonalFoods: []
        }
    }
    observe(props, state) {
        return {
            types: new Parse.Query('Types'),
            locations: new Parse.Query('Locations'),
            months: new Parse.Query('Months'),
            foods: new Parse.Query('Foods').include('type'),
            FLM: new Parse.Query('FLM')
        }
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
    changedFood = (e) => {
        this.getSeasonalFoods()

        let foods = this.data.foods
        let thisFood = foods.filter(food =>
            food.name == this.state.food
        )

        let FLM = this.data.FLM
        let locations = FLM.filter(obj =>
            obj.food.name == e.target.value
        ).map((obj) => {
            return obj.location.name
        })
        let uniqueLocations = getUniqueArray(locations);
        this.setState({food : e.target.value, location : uniqueLocations, type : thisFood[0].type.name})
        console.log(uniqueLocations)
    }
    changedType = (e) => {
        this.setState({type : e.target.value})
    }


    addNewRow = () => {
        let foods = this.data.foods
        let selectedFood = foods.filter(food =>
            food.name == this.state.food
        )
        let foodId = selectedFood[0].objectId

        let locations = this.data.locations
        let selectedLocation = locations.filter(location =>
            location.name == this.state.location
        )
        let locationId = selectedLocation[0].objectId

        let months = this.data.months
        let selectedMonth = months.filter(month =>
            month.name == this.state.months
        )
        let monthId = selectedMonth[0].objectId

        ParseReact.Mutation.Create('FLM', {
            food: {
                __type: "Pointer",
                className: "Foods",
                objectId: foodId
            },
            location: {
                __type: "Pointer",
                className: "Locations",
                objectId: locationId
            },
            month: {
                __type: "Pointer",
                className: "Months",
                objectId: monthId
            }
        }).dispatch()
    }


    changedLocation = (e) => {
        let FLM = this.data.FLM
        let months = FLM.filter(obj =>
            obj.location.name == e.target.value
        ).map((obj) => {
            return obj.month.name
        })
        let uniqueMonths = getUniqueArray(months);
        this.setState({location : e.target.value, months : uniqueMonths})
    }
    changedMonth = (e) => {
        this.setState({months : e.target.value})
    }
    getSeasonalFoods() {
        let FLM = this.data.FLM
        let seasonalFoods = FLM.filter(el =>
            el.month.name == this.state.months
        )
        this.setState({seasonalFoods : seasonalFoods})
    }
    render() {
        var food = this.state.food,
            type = this.state.type,
            location = this.state.location,
            months = this.state.months

        return (
            <div className="FoodCreateForm">
                <section>
                    <div className="actions">
                        <input ref="newFoodInput" type="text" defaultValue="" placeholder="Food" />
                        <button onClick={this.addFood} type="button">Add</button>
                        <button className="button--warning" onClick={this.removeFood} type="button">Remove</button>
                        <button className="button--right" onClick={this.addNewRow} type="button">[+]  Store Relationship</button>
                    </div>
                </section>
                <section>
                    <div className="selections">
                        ↳ [ {this.state.food}, {this.state.location},  {this.state.months} ]
                    </div>
                </section>
                <section>
                    <div className="types column">
                        <h2>Types</h2>
                        <select value={type} onChange={this.changedType} size={this.data.types.length + 1}>
                            {this.data.types.map(function(type) {
                              return <option key={type.objectId} >{type.name}</option>
                            })}
                        </select>
                    </div>

                    <div className="foods column">
                        <h2>Foods</h2>
                        <select value={food} onChange={this.changedFood} size={this.data.foods.length + 1}>
                            {this.data.foods.map(function(food) {
                              return <option key={food.objectId}>{food.name}</option>
                            })}
                        </select>
                    </div>

                    <div className="locations column">
                        <h2>Locations</h2>
                        <select value={location} onChange={this.changedLocation} multiple={true} size={this.data.locations.length + 1}>
                            {this.data.locations.map(function(location) {
                              return <option key={location.objectId} >{location.name}</option>
                            })}
                        </select>
                    </div>

                    <div className="months column">
                        <h2>Months</h2>
                        <select value={months} multiple={true} onChange={this.changedMonth} size={this.data.months.length + 1}>
                            {this.data.months.map(function(month) {
                              return <option key={month.objectId} >{month.name}</option>
                            })}
                        </select>
                    </div>


                </section>
            </div>
        )
    }
}
