import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.buttonOnclick();
    }

    render() {
        return(
            <button type="button"  onClick= {this.handleClick}>{this.props.btnName}</button>
        );
    }
}

export default Button;