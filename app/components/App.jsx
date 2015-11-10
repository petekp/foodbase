import React, { Component } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import _ from 'lodash'
import range from 'lodash/utility/range'
import RouteTransition from './RouteTransition'
import $ from 'jQuery'

import Parse from 'parse'
import ParseReact from 'parse-react'

var ParseComponent = ParseReact.Component(React)
Parse.initialize('agvA5VJCcRs9KrikUD0bcrS4D2WaqiKaO35ZlDhq', 'chYL0LjbqMKCwe4lPeayTt7gTyAP4iXnS7rpND8x')

class App extends Component{
    constructor(props) {
        super(props)
        this.state = {data: []}
    }
    render(){
        return <div className="App">
            <RouteTransition pathname={this.props.location.pathname} defaultStyles={{opacity: 0, scale: 0}}>
                {this.props.children}
            </RouteTransition>
        </div>
    }
}

module.exports = App
