import React, {Component} from 'react'
import NavPrimary from '../NavPrimary/NavPrimary'
import FoodList from '../FoodList/FoodList'
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
            type: "Fruits",
            food: [],
            location: [],
            months: [],
            selectedMonths: [],
            seasonalFoods: []
        }
    }
    observe() {
        return {
          months: new Parse.Query('Months'),
          foods: new Parse.Query('Foods'),
          locations: new Parse.Query('Locations'),
          types: new Parse.Query('Types'),
          FLM: new Parse.Query('FLM')
        }
    }
    getRelations = (targetValue, key, relation) => {
        let FLM = this.data.FLM

        let relations = FLM.filter(obj =>
            obj[key].name == targetValue
        ).map((obj) => {
            return obj[relation].name
        })
        return getUniqueArray(relations)
    }
    getSeasonalFoods() {
        let FLM = this.props.data.FLM
        let seasonalFoods = FLM.filter(el =>
            el.month.name == this.state.months
        )
        this.setState({seasonalFoods : seasonalFoods})
    }
    render() {
        return (
            <div>
                {/* <NavPrimary/> */}
                <FoodList data={this.data}/>
            </div>
        )
    }
}
