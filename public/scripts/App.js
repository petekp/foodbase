import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {data: []};

    }
    componentDidMount() {
        this.loadFoodsFromServer();
        setInterval(this.loadFoodsFromServer.bind(this), this.props.pollInterval)
    }
    loadFoodsFromServer() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: (data) => {
                this.setState({data: data});
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }
    render() {
        return (
            <div className="App">
                <FoodList data={this.state.data} />
            </div>
        );
    }
}


class Food extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount () {
        this.setState({isSelected: false})
    }
    handleClick (e) {
        this.setState({isSelected:!this.state.isSelected})

        let deltaX = 0;
        let deltaY = 0;
        let scale = 4;

        let windowCenterX = $(window).outerWidth() / 2;
        let windowCenterY = $(window).outerHeight() / 2;

        let element = React.findDOMNode(this);
        let $element = $(element);
        let $parent = $element.parent();

        let parentOffset = $parent.offset();
        let elOffset = $element.offset();
        let elementCenterX = elOffset.left + $element.outerWidth()/2;
        let elementCenterY = elOffset.top + $element.outerHeight()/2;

        deltaX = parentOffset.left + ((windowCenterX * scale) - (elementCenterX * scale));
        deltaY = parentOffset.top + (windowCenterY - (elementCenterY * scale));

        if(this.state.isSelected){
            $parent.css('transform', 'translate(' + 0 + 'px,' + 0 + 'px)' + ' scale(' + 1 + ')');
        } else{
            $parent.css('transform', 'translate(' + deltaX + 'px,' + deltaY + 'px)' + ' scale(' + scale + ')');
        }
    }

    render () {
        return (
            <div className="Food" onClick={this.handleClick.bind(this)} data-type={this.props.type} style={{backgroundColor: this.props.hue}}>
                <span className="foodName">
                    {this.props.name}
                </span>
            </div>
        );
    }
}


class FoodList extends Component {
    constructor(props) {
        super(props);
    }

    sortByKey (array, key) {
        return array.sort((a, b) => {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
    render () {
        let sortedArray = this.sortByKey(this.props.data, "name");
        let foodNodes = sortedArray.map((food, index) => {
            return (
                <Food key={index} name={food.name} type={food.type} hue={food.hue}>
                    {food.text}
                </Food>
            );
        });

        return (
            <div className="FoodList">
                {foodNodes}
            </div>
        );
    }
}


export class FoodCart extends Component {
    render() {
        return (
            <App url="foods.json" pollInterval={2000} />
        );
    }
}
