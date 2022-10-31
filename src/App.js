import React, { Component } from 'react';
import './App.css';
import logo from './wheelmaster.png';
import logotype from './logotype.png';
import Card from './components/Card';
import IntroText from './components/IntroText';


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
      selected_card_purchase_uri: '',
      selected_card_is_partner: false,
      is_loading: false,
    };
  }

  isLoading = () => {
    this.setState({
      is_loading: true
    });
  }

  isNotLoading = () => {
    this.setState({
      is_loading: false
    })
  }

  async fetchCards() {
    
    this.isLoading();
    
    // Initial fetch URL
    var fetchAddress = 'https://api.scryfall.com/cards/search?q=-type%3Abackground+legal%3Acommander+is%3Acommander+usd<.79';
    
    // We have more to fetch until we don't
    var hasMore = true;

    // Empty array to hold our card results as we fetch
    var cards = [];

    var fetchNow = () => {

      if ( hasMore === true ) {
          fetch(fetchAddress)
          .then(response => response.json())
          .then(data => {
            hasMore = data.has_more
            fetchAddress = data.next_page
            cards = [].concat(cards, data.data)
          })
          .then(
            () => {
              fetchNow();
            }
          );
      } else {
        this.setState({
          has_fetched: true,
          cards: cards
        },
        this.selectCardFromState
        );
        
        this.isNotLoading();

      }
    }

    fetchNow();
  }

  selectCard() {

    // Have we done a fetch yet this session?
    if ( !this.state.has_fetched ) {
      this.fetchCards();
    } else {
      this.selectCardFromState();
    }
  }

  selectCardFromState() {
    // Pick a random card
    const min = 0;
    const max = this.state.cards.length - 1;
    const rand = Math.floor(min + (Math.random() * (max-min)));
    
    this.setState({ 
      selected_card_number: rand,
      selected_card_price: this.state.cards[rand].prices.usd,
      selected_card_name: this.state.cards[rand].name,
      selected_card_image_uri: this.state.cards[rand].image_uris.normal,
      selected_card_purchase_uri: this.state.cards[rand].purchase_uris.tcgplayer,
      selected_card_is_partner: this.state.cards[rand].oracle_text.includes('partner')
    });
  }

  render() {  
    return (
      <div className="App">
        <img src={logotype} alt="Quest for the Janklord Logo" className="App-logotype" />
        {this.state.is_loading &&
          <div className="App-loading"></div>
        }
        <IntroText data={this.state} logo={logo} selectCard={this.selectCard}/>
        <Card cardObject={this.state}/>
        {this.state.selected_card_is_partner &&
          <div>Partner!</div>
        }
      </div>
    );
  }
}

export default App;
