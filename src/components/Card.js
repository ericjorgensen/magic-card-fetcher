import React, { Component } from 'react';

class Card extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <h2>{this.props.cardObject.selected_card_name}</h2>
                <img src={this.props.cardObject.selected_card_image_uri} className="Card-image" alt="image" />
                <h3>Price: {this.props.cardObject.selected_card_price}</h3>
                <a href={this.props.cardObject.selected_card_purchase_uri} target="blank">Buy Card</a>
            </div>
        )
    }
}

export default Card;