import React, { Component } from 'react'
import Parse from 'parse'
import ParseReact from 'parse-react'
var ParseComponent = ParseReact.Component(React)
Parse.initialize('agvA5VJCcRs9KrikUD0bcrS4D2WaqiKaO35ZlDhq', 'chYL0LjbqMKCwe4lPeayTt7gTyAP4iXnS7rpND8x')

export default class FoodFilterForm extends ParseComponent {
    mixins: [ParseReact.Mixin]

    observe() {
        return {
          months: new Parse.Query('Months'),
          foods: new Parse.Query('Foods'),
          locations: new Parse.Query('Locations'),
          types: new Parse.Query('Types'),
          seasonality: new Parse.Query('FLM')
        }
    }
    showSeasonalFoods () {
        let flmQuery = new Parse.Query("FLM")
        let seasonality = this.data.seasonality
        let inSeasonFoods = seasonality.filter(el =>
            el.month.name == "May"
        )

        inSeasonFoods.forEach(i => {
            console.log(i.food.name)
        })
    }
    render () {
        return (
            <div className="FoodFilterForm">
                Show me
                <select>
                    <option value="All Foods">All Foods</option>
                        {this.data.types.map(function(type) {
                          return <option id="{type.id}">{type.name}</option>
                        })}
                </select>
                in season
                <select>
                    {this.data.months.map(function(month) {
                      return <option id="{month.id}">{month.name}</option>
                    })}
                </select>
                within
                <select>
                    {this.data.locations.map(function(location) {
                      return <option id="{location.id}">{location.name}</option>
                    })}
                </select>
                <select>
                    <option>{this.showSeasonalFoods()}</option>
                </select>
            </div>
        )
    }
}
