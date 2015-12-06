import React, { Component } from 'react'
import FoodCreateForm from '../FoodCreateForm/FoodCreateForm'

export default class Admin extends Component {
    constructor(props) {
        super(props)
    }
    save() {

    }
    render() {
        return (
          <div>
            <FoodCreateForm />
          </div>
        )
      }
}
