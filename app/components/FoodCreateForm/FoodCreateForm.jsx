import React, {Component} from 'react'
import ParseReact from 'parse-react'
import getUniqueArray from '../Helpers/getUniqueArray'
import './FoodCreateForm.css'

export default class FoodCreateForm extends Component {
    constructor(props, state) {
        super(props)

        this.state = {
            locations: '',
            month: '',
            foods: []
        }
    }
    getObjectId = (table, key) => {
        return this.props.data[table].filter(obj => obj.name == key).map((obj) => {
            return obj.objectId
        }).toString()
    }
    addFood = () => {
        let newFoodInputValue = this.refs.newFoodInput.value
        let foodId = this.getObjectId('foods', newFoodInputValue)

        if (!newFoodInputValue.length > 0) {
            alert('nothing entered')
        } else {
            ParseReact.Mutation.Create('Foods', {name: this.refs.newFoodInput.value}).dispatch();

            this.refs.newFoodInput.value = ''
            this.refs.newFoodInput.focus()
        }
    }
    addNewRelation = () => {
        let foodId = this.getObjectId('foods', this.state.food)
        let locationId = this.getObjectId('locations', this.state.locations)
        let monthId = this.getObjectId('months', this.state.months)

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
    }

    getRelations = (targetValue, relation, ...keys) => {
        let FLM = this.props.data.FLM
        let relations = []

        keys.forEach(key => {
          FLM.filter(obj => obj[key].name == targetValue)
          .map(obj => { relations.push( obj[relation].name) })
        })
        console.log(relations)
        return getUniqueArray(relations)
    }
    changedFood = (e) => {
        let foods = this.state.foods
        if (foods.includes(e.target.value)) {
            foods.splice(foods.indexOf(e.target.value), 1)
        } else {
            foods.push(e.target.value)
        }
    }
    changedLocation = (e) => {
        let currentState = this.state
        let currentMonth = this.state.month
        this.setState({})
        currentState.locations = e.target.value

        let nextState = {
            locations: currentState.locations,
            month: currentMonth,
            foods: []
        }
        this.setState(nextState)
        console.log(nextState)
    }
    changedMonth = (e) => {
        let currentState = this.state
        currentState.locations = this.state.locations
        console.log(this.state.locations)
        this.setState({})
        currentState.month = e.target.value

        let relatedFoods = this.getRelations(e.target.value, 'food', 'month', 'location')

        let nextState = {
            locations: currentState.locations,
            month: currentState.month,
            foods: relatedFoods
        }
        this.setState(nextState)
        console.log(nextState)
    }
    render() {
        var foods = this.state.foods,
            location = this.state.locations,
            month = this.state.month,
            data = this.props.data,
            foodAmt = data.foods.length,
            monthAmt = data.months.length,
            locationAmt = data.locations.length

        return (
            <div className='FoodCreateForm'>
                <section>
                    <div className='actions'>
                        <input ref='newFoodInput' type='text' placeholder='Food'/>
                        <button onClick={this.addFood} type='button'>Add</button>
                        <button className='button--warning' onClick={this.removeFood} type='button'>Remove</button>
                        <button className='button--right' onClick={this.addNewRelation} type='button'>⚯ Store Relationship</button>
                    </div>
                </section>

                <section>
                    <div className='selections'>
                        ↳ [
                        {this.state.location},
                        {this.state.months},
                        {this.state.foods}
                        ]
                    </div>
                </section>

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
