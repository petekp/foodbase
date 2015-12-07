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
            selectedMonths: [],
            seasonalFoods: []
        }
    }
    getObjectId = (table, key) => {
        return this.props.data[table].filter(obj =>
            obj.name == key
        ).map((obj) => {
            return obj.objectId
        }).toString()
    }
    addFood = () => {
        let foodId = this.getObjectId('foods', this.refs.newFoodInput.value)

        ParseReact.Mutation.Create('Foods', {
          name: this.refs.newFoodInput.value,
          type: {
              __type: "Pointer",
              className: "Types",
              objectId: foodId
          }
        }).dispatch();

        this.refs.newFoodInput.value = ''
        this.refs.newFoodInput.focus()
    }
    changedType = (e) => {
        this.setState({type : e.target.value})
    }
    addNewRelation = () => {
        let foods = this.state.food
        let locations = this.state.location
        let months = this.state.months

        ParseReact.Mutation.Create('FLM', {
            food: {
                __type: "Pointer",
                className: "Foods",
                objectId: foods
            },
            location: {
                __type: "Pointer",
                className: "Locations",
                objectId: location
            },
            month: {
                __type: "Pointer",
                className: "Months",
                objectId: months
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
        let foodId = this.getObjectId('foods', e.target.value)
        console.log(foodId)

        let months = this.getRelations(e.target.value, 'food', 'month')
        let locations = this.getRelations(e.target.value, 'food', 'location')

        this.setState({food : [e.target.value], months : months, location : locations})
    }
    changedLocation = (e) => {
        let months = this.getRelations(e.target.value, 'location', 'month')

        this.setState({location : [e.target.value], months : months})
    }
    changedMonth = (e) => {
        let currentMonths = this.state.months
        let selectedMonths = currentMonths.push(e.target.value)
        this.setState({selectedMonths : selectedMonths})
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
                        <button className="button--right" onClick={this.addNewRelation} type="button">[+]  Store Relationship</button>
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
