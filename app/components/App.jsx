import React, { Component } from 'react'
import $ from 'jQuery'

export default class App extends Component{
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="App">
                {this.props.children}
            </div>
        )
    }
}
