import React, { Component } from 'react';

class FetchFromAPIButton extends Component {

    constructor(props) {
        super(props);
        
        // This binding is necessary to make `this` work in the callback
        this.fetchCards = this.fetchCards.bind(this);
    }
    
    async fetchCards() {
        fetch('https://api.scryfall.com/cards/search?q=is%20usd%3C%3D0.79')
            .then(response => response.json())
            .then(data => console.log(data.data[0]));
    }

    render() {
        return 
    }
}

export default FetchFromAPIButton;