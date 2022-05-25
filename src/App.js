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
      selected_card_purchase_uri: '',
      is_loading: false
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
    var fetchAddress = 'https://api.scryfall.com/cards/search?q=is%3Acommander%20usd%3C%3D0.79%20f%3Acommander';
    
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

  componentDidUpdate(prevProps, prevState) {
    
    // Fetch all results only until there are no more to get
    // if ( prevState.has_more === true && this.state.has_more === true ) {
    //     fetch(this.state.next_page_uri)
    //     .then(response => response.json())
    //     .then(data => this.setState(prevState => ({
    //         next_page_uri: data.next_page,
    //         has_more: data.has_more,
    //         cards: [].concat(prevState.cards, data.data),
    //         has_fetched: true
    //     })))
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // }

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
      selected_card_purchase_uri: this.state.cards[rand].purchase_uris.tcgplayer
    });
  }

  render() {  
    return (
      <div className="App">
        {this.state.is_loading &&
          <div className="App-loading"></div>
        }
        <Card cardObject={this.state}/>
        <button className="App-spin-button" onClick={this.selectCard}><img src={logo} className="App-logo" alt="logo" /></button>
      </div>
    );
  }
}

export default App;
