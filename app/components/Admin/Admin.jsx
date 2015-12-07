import React, { Component } from 'react'
import Parse from 'parse'
import ParseReact from 'parse-react'

var ParseComponent = ParseReact.Component(React)
Parse.initialize('agvA5VJCcRs9KrikUD0bcrS4D2WaqiKaO35ZlDhq', 'chYL0LjbqMKCwe4lPeayTt7gTyAP4iXnS7rpND8x')

import FoodCreateForm from '../FoodCreateForm/FoodCreateForm'

export default class Admin extends ParseComponent {
    mixins: [ParseReact.Mixin]
    constructor(props) {
        super(props)

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
    save() {

    }
    render() {
        return (
          <div>
            <FoodCreateForm data={this.data} />
          </div>
        )
      }
}
