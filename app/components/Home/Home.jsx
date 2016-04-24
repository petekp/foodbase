import React, {Component} from 'react'
import NavPrimary from '../NavPrimary/NavPrimary'
import FoodList from '../FoodList/FoodListSimple'
import Parse from 'parse'
import ParseReact from 'parse-react'
var ParseComponent = ParseReact.Component(React)

Parse.initialize('agvA5VJCcRs9KrikUD0bcrS4D2WaqiKaO35ZlDhq', 'chYL0LjbqMKCwe4lPeayTt7gTyAP4iXnS7rpND8x')

export default class Home extends ParseComponent {
    mixins : [ParseReact.Mixin]
    constructor(props) {
        super(props)
        this.state = {
            typeFilter: 'Fruits',
            monthFilter: 'January',
            locationFilter: 'California'
        }
    }
    observe(nextProps, nextState) {
        return {
            FLM: new Parse.Query('FLM').include(['food', 'food.type', 'location', 'month'])
        }
    }
    handleFilterChange(filterState) {
        if (!filterState) {
            return
        } else {
            let newState = {
                typeFilter: filterState.typeFilter,
                monthFilter: filterState.monthFilter,
                locationFilter: filterState.locationFilter
            }
            this.setState({})
            this.setState(newState)
        }
    }
    render() {
        let foodData = this.data.FLM

        let filteredFoods = foodData.filter(el => el.food.type.name == this.state.typeFilter && el.month.name == this.state.monthFilter && el.location.name == this.state.locationFilter)
        return (
            <div>
                <NavPrimary foods={foodData} filters={this.state} handleFilterChange={this.handleFilterChange.bind(this)}/>
                <FoodList foods={filteredFoods}/>
            </div>
        )
    }
}
