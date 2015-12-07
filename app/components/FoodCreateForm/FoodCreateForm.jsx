import React, { Component } from 'react'
import ParseReact from 'parse-react'
import getUniqueArray from '../Helpers/getUniqueArray'
import './FoodCreateForm.css'

export default class FoodCreateForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: "Fruits",
            food: [],
            location: [],
            months: [],
            seasonalFoods: []
        }
    }
    addFood = () => {
        let types = this.props.data.types
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
    changedType = (e) => {
        this.setState({type : e.target.value})
    }


    addNewRow = () => {
        let foods = this.props.data.foods
        let selectedFood = foods.filter(food =>
            food.name == this.state.food
        )
        let foodId = selectedFood[0].objectId

        let locations = this.props.data.locations
        let selectedLocation = locations.filter(location =>
            location.name == this.state.location
        )
        let locationId = selectedLocation[0].objectId

        let months = this.props.data.months
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

    getRelations = (targetValue, key, relation) => {
        let FLM = this.props.data.FLM

        let relations = FLM.filter(obj =>
            obj[key].name == targetValue
        ).map((obj) => {
            return obj[relation].name
        })
        return getUniqueArray(relations)
    }
    changedFood = (e) => {
        let months = this.getRelations(e.target.value, 'food', 'month')
        let locations = this.getRelations(e.target.value, 'food', 'location')

        console.log(locations, months)

        this.setState({food : [e.target.value], months : months, location : locations})
    }
    changedLocation = (e) => {
        let months = this.getRelations(e.target.value, 'location', 'month')
        let foods = this.getRelations(e.target.value, 'location', 'food')

        console.log(foods, months)

        this.setState({location : [e.target.value], months : months, food : foods})
    }
    changedMonth = (e) => {
        let foods = this.getRelations(e.target.value, 'month', 'food')
        let locations = this.getRelations(e.target.value, 'month', 'location')

        this.setState({months : [e.target.value], food : foods, location : locations})
    }
    getSeasonalFoods() {
        let FLM = this.props.data.FLM
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
                        <select value={type} onChange={this.changedType} size={this.props.data.types.length + 1}>
                            {this.props.data.types.map(function(type) {
                              return <option key={type.objectId} >{type.name}</option>
                            })}
                        </select>
                    </div>

                    <div className="foods column">
                        <h2>Foods</h2>
                        <select value={food} onChange={this.changedFood} multiple={true} size={this.props.data.foods.length + 1}>
                            {this.props.data.foods.map(function(food) {
                              return <option key={food.objectId}>{food.name}</option>
                            })}
                        </select>
                    </div>

                    <div className="locations column">
                        <h2>Locations</h2>
                        <select value={location} onChange={this.changedLocation} multiple={true} size={this.props.data.locations.length + 1}>
                            {this.props.data.locations.map(function(location) {
                              return <option key={location.objectId} >{location.name}</option>
                            })}
                        </select>
                    </div>

                    <div className="months column">
                        <h2>Months</h2>
                        <select value={months} multiple={true} onChange={this.changedMonth} size={this.props.data.months.length + 1}>
                            {this.props.data.months.map(function(month) {
                              return <option key={month.objectId} >{month.name}</option>
                            })}
                        </select>
                    </div>


                </section>
            </div>
        )
    }
}
