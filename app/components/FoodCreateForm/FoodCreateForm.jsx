import React, {Component} from 'react'
import ParseReact from 'parse-react'
import getUniqueArray from '../Helpers/getUniqueArray'
import getObjectId from '../Helpers/getObjectId'

import './FoodCreateForm.css'

export default class FoodCreateForm extends Component {
  constructor(props, state) {
    super(props)

    this.state = {
      type: 'Fruits',
      location: '',
      month: '',
      foods: []
    }
  }
  addFood = () => {
    let newFoodInputValue = this.refs.newFoodInput.value
    let typeId = getObjectId(this.props.data.types, this.state.type)
    console.log(typeId)

    // note: need to check if food already exists

    if (!newFoodInputValue.length > 0) {
      alert('nothing entered')
    } else {
      ParseReact.Mutation.Create('Foods', {
        name: this.refs.newFoodInput.value,
        type: {
          __type: 'Pointer',
          className: 'Types',
          objectId: typeId
        }
      }).dispatch();

      this.refs.newFoodInput.value = ''
      this.refs.newFoodInput.focus()
    }
  }
  addNewRelations = () => {
    let foodData = this.props.data.FLM,
    currentLocation = this.state.location,
    currentMonth = this.state.month,
    selectedFoods = this.state.foods,
    existingFoods = [],
    removedFoods = [],
    removedFoodObjectIds = [],
    addedFoods = []

    // Store existing foods for this month & location
    foodData.forEach(obj => {
      if (obj.location.name == currentLocation && obj.month.name == currentMonth) {
        existingFoods.push(obj.food.name)
      }
    })

    // Store un-selected foods for removal
    existingFoods.forEach(foodName => {
      if (selectedFoods.includes(foodName)) {
        return
      } else {
        removedFoods.push(foodName)
      }
    })

    foodData.forEach(obj => {
      if (removedFoods.includes(obj.food.name)) {
        removedFoodObjectIds.push(obj.objectId)
      }
    })

    // Store newly selected foods for addition
    selectedFoods.forEach(food => {
      if (existingFoods.includes(food)) {
        return
      } else {
        addedFoods.push(food)
      }
    })

    // Create new relationships
    addedFoods.forEach(food => {
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

    // Create new relationships
    removedFoodObjectIds.forEach(objId => {
      let target = {
        className: 'FLM',
        objectId: objId
      }
      ParseReact.Mutation.Destroy(target).dispatch()
    })
  }

  changedFood = (e) => {
    e.preventDefault()
    let currentFoods = this.state.foods
    let selectedFood = e.target.value

    if (currentFoods.includes(selectedFood)) {
      currentFoods.splice(currentFoods.indexOf(selectedFood), 1)
    } else {
      currentFoods.push(selectedFood)
    }
    let nextState = {
      type: this.state.type,
      location: this.state.location,
      month: this.state.month,
      foods: currentFoods
    }
    this.setState({})
    this.setState(nextState)
  }
  changedLocation = (e) => {
    e.preventDefault()

    let nextState = {
      type: this.state.type,
      location: e.target.value,
      month: this.state.month,
      foods: []
    }
    this.setState({})
    this.setState(nextState)
  }
  changedType = (e) => {
    e.preventDefault()

    let nextState = {
      type: e.target.value,
      location: this.state.location,
      month: this.state.month,
      foods: this.state.foods
    }
    this.setState({})
    this.setState(nextState)
  }
  getSeasonalFoods = (month, location) => {
    let foodData = this.props.data.FLM
    let seasonalFoods = []

    let seasonalFoodObjects = foodData.filter(obj =>
      obj.location.name == location && obj.month.name == month
    )

    seasonalFoodObjects.forEach(obj => {
      seasonalFoods.push(obj.food.name)
    })

    return getUniqueArray(seasonalFoods)
  }
  changedMonth = (e) => {
    e.preventDefault()

    let relatedFoods = this.getSeasonalFoods(e.target.value, this.state.location)

    let nextState = {
      location: this.state.location,
      month: e.target.value,
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
            <select name="type" size="3" id="type" onChange={this.changedType}>
              {this.props.data.types.map(function(type) {
                return <option key={type.objectId}>{type.name}</option>
              })}
            </select>
            <input ref='newFoodInput' type='text' placeholder='Food'/>
            <button onClick={this.addFood} type='button'>👇 Add</button>
            <button className='button--warning' onClick={this.removeFood} type='button'>❌</button>
            <button className='button--right' onClick={this.addNewRelations.bind(this)} type='button'>⚡️ Update Foods</button>
          </div>
        </div>

        <section className="main">
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
