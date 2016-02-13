import React, {Component, Children} from 'react'
import NavPrimary from '../NavPrimary/NavPrimary'
import FoodList from '../FoodList/FoodListSimple'
import $ from 'jQuery'

import getUniqueArray from '../Helpers/getUniqueArray'

import Parse from 'parse'
import ParseReact from 'parse-react'

var ParseComponent = ParseReact.Component(React)
Parse.initialize('agvA5VJCcRs9KrikUD0bcrS4D2WaqiKaO35ZlDhq', 'chYL0LjbqMKCwe4lPeayTt7gTyAP4iXnS7rpND8x')

export default class Index extends ParseComponent {
    mixins : [ParseReact.Mixin]
    constructor(props) {
        super(props)
        this.state = {
            typeFilter: 'Fruits',
            monthFilter: 'February',
            locationFilter: 'California'
        }
    }
    componentDidMount() {
        this.handleFilterChange = this.handleFilterChange.bind(this)
    }
    observe(nextProps, nextState) {
        return {
          FLM: new Parse.Query('FLM').include(['food','food.type', 'location','month'])
        }
    }
    handleFilterChange(filterState) {
      if(!filterState) {
        return
      } else {
        let newState = {
          typeFilter: filterState.typeFilter,
          monthFilter: filterState.monthFilter,
          locationFilter: filterState.locationFilter
        }
        this.setState(newState)
      }
    }
    render() {
      let foodData = this.data.FLM

      let filteredFoods = foodData.filter(el =>
        el.location.name == this.state.locationFilter && el.month.name == this.state.monthFilter
      )
      console.log(filteredFoods)

      return (
          <div>
              <NavPrimary foods={foodData} filters={this.state} handleFilterChange={this.handleFilterChange}/>
              <FoodList ref="foodList" foods={filteredFoods}/>
          </div>
      )
    }
}
