import React, {Component} from 'react'
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
    constructor(props, context) {
        super(props)
        this.state = {
            type: "Veggies",
            food: [],
            location: [],
            filteredFoods: []
        }
    }
    componentDidMount() {
        this.changeFilter = this.changeFilter.bind(this)
    }
    observe() {
        return {
          FLM: new Parse.Query('FLM').include(['food', 'location','month'])
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
    // getSeasonalFoods() {
    //     let FLM = this.props.data.FLM
    //     let seasonalFoods = FLM.filter(el =>
    //         el.type.name == this.state.type
    //     )
    //     console.log('hello')
    //     this.setState({seasonalFoods : seasonalFoods})
    // }
    componentDidUpdate() {
      console.log('index update')
    }
    changeFilter(filterState) {
      // console.log(filterState)
    }
    render() {
      console.log(this.data.FLM)
        return (
            <div>
                {/*<NavPrimary data={this.data} changeFilter={this.changeFilter}/> */}
                <FoodList foods={this.data.FLM}/>
            </div>
        )
    }
}
