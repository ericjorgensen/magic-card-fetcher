import React, { Component } from 'react';
import './App.css';
import logo from './wheelmaster.png';
import Card from './components/Card';


class App extends Component {

  constructor(props) {
    super(props);
    
    // This binding is necessary to make `this` work in the callback
    this.fetchCards = this.fetchCards.bind(this);
    
    this.state = {
      name: 'Test',
      image_uri: 'Test',
      card_number: 0,
      price: 0,
      purchase_uri: ''
    };
  }

  async fetchCards() {
      const min = 0;
      const max = 174;
      const rand = Math.floor(min + (Math.random() * (max-min)));
      this.setState({ card_number: rand });
      
      fetch('https://api.scryfall.com/cards/search?q=is%20usd%3C%3D0.79')
          .then(response => response.json())
          .then(data => this.setState({ 
              name: data.data[rand].name,
              image_uri: data.data[rand].image_uris.normal,
              price: data.data[rand].prices.usd,
              purchase_uri: data.data[rand].purchase_uris.tcgplayer
            }
          ));
  }

  render() {  
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <button onClick={this.fetchCards}>Give me a card!</button>
        <Card cardObject={this.state}/>
      </div>
    );
  }
}

export default App;
