import React, { Component } from 'react';

class Card extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <h2>{this.props.cardObject.name}</h2>
                <img src={this.props.cardObject.image_uri} className="Card-image" alt="image" />
                <h3>Price: {this.props.cardObject.price}</h3>
                <a href={this.props.cardObject.purchase_uri}>Buy Card</a>
            </div>
        )
    }
}

export default Card;