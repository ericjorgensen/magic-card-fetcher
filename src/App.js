import React, { Component } from 'react';
import './App.css';
import logo from './wheelmaster.png';
import Card from './components/Card';


class App extends Component {

  constructor(props) {
    super(props);
    
    // This binding is necessary to make `this` work in the callback
    this.fetchCards = this.fetchCards.bind(this);
    this.selectCard = this.selectCard.bind(this);
    
    // Tracking state
    this.state = {
      has_fetched: false,
      has_more: true,
      total_cards: 0,
      next_page_uri: '',
      cards: [],
      selected_card_name: 'Test',
      selected_card_image_uri: 'Test',
      selected_card_number: 0,
      selected_card_price: 0,
      selected_card_purchase_uri: ''
    };
  }

  async fetchCards() {
    
    // Max results returned by the API
    const maxResults = 175;

      // Have we done a fetch yet this session?
      if ( !this.state.has_fetched ) {
      
        fetch('https://api.scryfall.com/cards/search?q=is%3Acommander%20usd%3C%3D0.79')
            .then(response => response.json())
            .then(data => this.setState({
                has_fetched: true,
                total_cards: data.total_cards,
                next_page_uri: data.next_page,
                has_more: data.has_more,
                cards: data.data
              }
        ))
      }
  }

  componentDidUpdate(prevProps, prevState) {
    
    // Fetch all results only until there are no more to get
    if ( prevState.has_more === true && this.state.has_more === true ) {
        fetch(this.state.next_page_uri)
        .then(response => response.json())
        .then(data => this.setState(prevState => ({
            next_page_uri: data.next_page,
            has_more: data.has_more,
            cards: [].concat(prevState.cards, data.data)
        })))
        .catch((e) => {
          console.log(e);
        });
    }

    if ( prevState.selected_card_number !== this.state.selected_card_number && this.state.has_more === false ) {
      console.log("New card number ready. It's: " + this.state.selected_card_number);
    }

  }

  selectCard() {
    this.fetchCards();
    
    // Pick a random card
    const min = 0;
    const max = this.state.cards.length - 1;
    const rand = Math.floor(min + (Math.random() * (max-min)));
    
    this.setState({ 
      selected_card_number: rand,
      selected_card_price: this.state.cards[rand].prices.usd,
      selected_card_name: this.state.cards[rand].name,
      selected_card_image_uri: this.state.cards[rand].image_uris.normal,
      selected_card_purchase_uri: this.state.cards[rand].purchase_uris.tcgplayer
    });
    
  }

  render() {  
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <button onClick={this.selectCard}>Give me a card!</button>
        <Card cardObject={this.state}/>
      </div>
    );
  }
}

export default App;
