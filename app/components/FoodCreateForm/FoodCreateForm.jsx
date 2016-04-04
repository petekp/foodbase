import React, {Component} from 'react'
import ParseReact from 'parse-react'
import getUniqueArray from '../Helpers/getUniqueArray'
import getObjectId from '../Helpers/getObjectId'

import './FoodCreateForm.css'

export default class FoodCreateForm extends Component {
    constructor(props, state) {
        super(props)

        this.state = {
            location: '',
            month: '',
            foods: []
        }
    }
    addFood = () => {
        let newFoodInputValue = this.refs.newFoodInput.value
        let foodId = getObjectId('foods', newFoodInputValue)

        if (!newFoodInputValue.length > 0) {
            alert('nothing entered')
        } else {
            ParseReact.Mutation.Create('Foods', {name: this.refs.newFoodInput.value}).dispatch();

            this.refs.newFoodInput.value = ''
            this.refs.newFoodInput.focus()
        }
    }
    addNewRelations = () => {
        let foodData = this.props.data.FLM,
            currentLocation = this.state.location,
            currentMonth = this.state.month,
            foods = this.state.foods,
            newRelations = [],
            existingFoods = [],
            newFoods = []

        foodData.forEach(obj => {
            if (obj.location.name == currentLocation && obj.month.name == currentMonth) {
                existingFoods.push(obj.food.name)
            }
        })

        foods.forEach(food => {
          if (existingFoods.includes(food)) {
            return
          } else {
            newFoods.push(food)
          }
        })

        newFoods.forEach(food => {
          let foodId = getObjectId(this.props.data.foods,food),
              locationId = getObjectId(this.props.data.locations,currentLocation),
              monthId = getObjectId(this.props.data.months,currentMonth)

          ParseReact.Mutation.Create('FLM', {
              food: {
                  __type: 'Pointer',
                  className: 'Foods',
                  objectId: foodId
              },
              location: {
                  __type: 'Pointer',
                  className: 'Locations',
                  objectId: locationId
              },
              month: {
                  __type: 'Pointer',
                  className: 'Months',
                  objectId: monthId
              }
          }).dispatch()
        })




    }

    changedFood = (e) => {
        let currentFoods = this.state.foods
        let selectedFood = e.target.value
        let state = this.state
        let currentLocation = state.location
        let currentMonth = state.month

        if (currentFoods.includes(selectedFood)) {
            currentFoods.splice(currentFoods.indexOf(e.target.value), 1)
        } else {
            currentFoods.push(e.target.value)
        }
        let nextState = {
            location: currentLocation,
            month: currentMonth,
            foods: currentFoods
        }
        this.setState({})
        this.setState(nextState)
    }
    changedLocation = (e) => {
        let currentLocation = e.target.value
        let currentState = this.state
        let currentMonth = this.state.month
        let nextState = {
            location: currentLocation,
            month: currentMonth,
            foods: []
        }
        this.setState({})
        this.setState(nextState)
    }
    getSeasonalFoods = (month, location) => {
        let foodData = this.props.data.FLM
        let seasonalFoods = []

        let seasonalFoodObjects = foodData.filter(obj => obj.location.name == location && obj.month.name == month)

        seasonalFoodObjects.forEach(obj => {
            seasonalFoods.push(obj.food.name)
        })

        return getUniqueArray(seasonalFoods)
    }
    changedMonth = (e) => {
        let currentState = this.state
        currentState.location = this.state.location
        currentState.month = e.target.value

        let relatedFoods = this.getSeasonalFoods(e.target.value, this.state.location)

        let nextState = {
            location: currentState.location,
            month: currentState.month,
            foods: relatedFoods
        }
        this.setState({})
        this.setState(nextState)
    }
    render() {

        var foods = this.state.foods,
            location = this.state.location,
            month = this.state.month,
            data = this.props.data,
            foodAmt = data.foods.length,
            monthAmt = data.months.length,
            locationAmt = data.locations.length

        return (
            <div className='FoodCreateForm'>
                <div className="Nav">
                    <div className='actions'>
                        <input ref='newFoodInput' type='text' placeholder='Food'/>
                        <button onClick={this.addFood} type='button'>Add</button>
                        <button className='button--warning' onClick={this.removeFood} type='button'>Remove</button>
                        <button className='button--right' onClick={this.addNewRelations.bind(this)} type='button'>⚯ Store Relationship</button>
                    </div>

                    <div className='selections'>
                        ↳ [ {this.state.location}, {this.state.months}, {this.state.foods}
                        ]
                    </div>
                </div>

                <section>
                    <div className='locations column'>
                        <h2>Locations ({locationAmt})</h2>
                        <select onChange={this.changedLocation} size={this.props.data.locations.length + 1}>
                            {this.props.data.locations.map(function(location) {
                                return <option key={location.objectId}>{location.name}</option>
                            })}
                        </select>
                    </div>

                    <div className='months column'>
                        <h2>Months ({monthAmt})</h2>
                        <select onChange={this.changedMonth} size={this.props.data.months.length + 1}>
                            {this.props.data.months.map(function(month) {
                                return <option key={month.objectId}>{month.name}</option>
                            })}
                        </select>
                    </div>

                    <div className='foods column'>
                        <h2>Foods ({foodAmt})</h2>
                        <select value={foods} onChange={this.changedFood} multiple={true} size={this.props.data.foods.length + 1}>
                            {this.props.data.foods.map(function(food) {
                                return <option key={food.objectId}>{food.name}</option>

                            })}
                        </select>
                    </div>
                </section>
            </div>
        )
    }
}
