import React, { Component } from 'react'
import NavPrimary from '../NavPrimary/NavPrimary'
import FoodList from '../FoodList/FoodList'
import $ from 'jQuery'
// import SpringText from '../Helpers/SpringText'

export default class Index extends Component {
    componentWillMount() {
        this.loadFoodsFromServer()
        setInterval((e) => this.loadFoodsFromServer, 2000)
    }
    loadFoodsFromServer() {
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
        return(
            <div>
                <NavPrimary />
                <FoodList data={this.state.data} />
            </div>
        )
    }
}
