import React, {Component} from 'react'
import FoodFilterForm from '../FoodFilterForm/FoodFilterForm'

export default class NavPrimary extends Component {
    constructor(props, context) {
        super(props)
    }
    render() {
        return (
            <div className="NavPrimary">
                <span className="AppTitle">Foodbase</span>
                <FoodFilterForm ref="foodFilterForm" {...this.props}/>
            </div>
        )
    }
}
