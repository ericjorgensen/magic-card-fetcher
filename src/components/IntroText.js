import React, { Component } from 'react';

class IntroText extends Component {
    constructor(props){
        super(props);

        this.state = {
            selected_intro_text: '',
        }
    }

    introText = [
        '"Of course it offers you power. Demons always do. But trust me—the jankier the prize, the more ruinous the price. And that price is seventy-nine cents.”<br> — Professor Onyx to you, as you behold the Wheel of Fate',
        'In the marsh’s clearing, you behold an ancient wheel. A voice within the fog beckons you to spin it, "Won’t you bear the mantle of a Janklord? Come now — don’t be afraid; this demon’s price is only seventy-nine cents…"'
    ]

    componentDidMount() {
        var numberOfTextItems = this.introText.length
        const min = 0;
        const max = numberOfTextItems - 1;
        const rand = Math.floor(Math.random() * numberOfTextItems);
        
        this.setState({
            selected_intro_text: this.introText[rand]
        })
    }

    render() {
        return (
            <div className="App-text-container">
                <p className="App-text-container-item">
                    {this.state.selected_intro_text}
                </p>
                <div className="App-text-container-item">
                    <button className="App-spin-button" onClick={this.props.selectCard}><img src={this.props.logo} className="App-logo" alt="logo" /></button>
                </div>  
            </div>
        )
    }
}

export default IntroText;