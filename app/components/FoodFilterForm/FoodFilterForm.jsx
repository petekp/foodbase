import React, { Component } from 'react'
import './FoodFilterForm.css'

export default class FoodFilterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
          type: '',
          month: '',
          location: ''
        }
    }
    componentDidMount() {
        this.typeChange = this.typeChange.bind(this)
        this.locationChange = this.locationChange.bind(this)
        this.monthChange = this.monthChange.bind(this)
    }
    componentWillReceiveProps(nextProps) {
      this.state = {}
      let newState = {
        type: nextProps.data.FLM[1].type.name,
        month: nextProps.data.FLM[1].month.name,
        location: nextProps.data.FLM[1].location.name
      }
      this.setState(newState)
    }
    componentWillUpdate(nextProps, nextState) {
      nextProps.changeFilter(nextState)
    }
    typeChange(e) {
        this.setState({
            type: e.target.value
        })
    }
    monthChange(e) {
        this.setState({
            month: e.target.value
        })
    }
    locationChange(e) {
        this.setState({
            location: e.target.value
        })
    }
    render() {
        return (
            <div className="FoodFilterForm">
                Show me
                <select onChange={this.typeChange}>
                    {this.props.data.FLM.map(function(food) {
                      return <option key={food.objectId}>{food.name}</option>
                    })}
                </select>
                in season
                <select onChange={this.monthChange}>
                    {this.props.data.FLM.map(function(food) {
                      return <option key={food.objectId}>{food.month.name}</option>
                    })}
                </select>
                within
                <select onChange={this.locationChange}>
                    {this.props.data.FLM.map(function(food) {
                      return <option key={food.objectId}>{food.location.name}</option>
                    })}
                </select>
            </div>
        )
    }
}
