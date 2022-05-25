import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className={`Card ${this.props.cardObject.has_fetched ? 'Card-has-fetched' : ''}`}>
                <span className="Card-container">
                    {this.props.cardObject.has_fetched &&
                        <img src={this.props.cardObject.selected_card_image_uri} className="Card-image" alt="image" />
                    }
                </span>
                {this.props.cardObject.has_fetched &&
                    <div>
                        <h3>Price: ${this.props.cardObject.selected_card_price}</h3>
                        <a href={this.props.cardObject.selected_card_purchase_uri} target="blank">Buy Card</a>
                    </div>
                }
            </div>
        )
    }
}

export default Card;