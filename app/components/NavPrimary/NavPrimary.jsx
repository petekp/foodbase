import React, {Component} from 'react'
import FoodFilterForm from '../FoodFilterForm/FoodFilterForm'

export default class NavPrimary extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="NavPrimary">
                <span className="AppTitle">Foodbase</span>
                <FoodFilterForm ref="foodFilterForm" updateFilters={this.props.updateFilters} data={this.props.data}/>
            </div>
        )
    }
}
