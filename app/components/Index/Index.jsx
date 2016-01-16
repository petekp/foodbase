import React, { Component } from 'react'
import NavPrimary from '../NavPrimary/NavPrimary'
import FoodList from '../FoodList/FoodList'
import $ from 'jQuery'

export default class Index extends Component {
    constructor(props){
        super(props)
        this.state = { data: [] }
    }
    componentDidMount() {
        $.ajax({
            url: 'foods.json',
            dataType: 'json',
            cache: false,
            success: (data) => {
                this.setState({data: data})
            },
            error: (xhr, status, err) => {
                console.error('foods.json', status, err.toString())
            }
        })
    }
    render() {
        console.log("index state:", this.state)
        return(
            <div>
                <NavPrimary />
                <FoodList data={this.state.data} />
            </div>
        )
    }
}
