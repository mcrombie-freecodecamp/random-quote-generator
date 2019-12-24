import React from 'react';
import logo from './logo.svg';
import './App.css';

//REDUX

//action type
const CHANGEQUOTE = "CHANGEQUOTE";

//action creator
const changeQuote = () => {
  return{
    type:CHANGEQUOTE
  }
};

//reducer
const quoteReducer = (state = "normal", action) => {
  switch(action.type){
    case CHANGEQUOTE:
      return "change quote";
    default:
      return state;
  }
}

//create the store
const store = Redux.createStore(quoteReducer);


class QuoteBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      quote: "Give me six hours to chop down a tree, and I will spend the first four sharpening the axe.",
      attribution:"Abraham Lincoln"
    }
    this.quotes = [
      {quote:"My life is my message.", attribution:"Mahatma Gandhi"}, 
      {quote: "A man should look for what is, and not forr what he thinks should be.", attribution: "Albert Einstein"},
      {quote: "Obstacles are those things you see when you take your eyes off the goal.", attribution: "Hannah More"},
      {quote: "Everything that irritates us about others can lead us to an understanding about ourselves.", attribution: "Carl Jung"},
      {quote: "Every man's life lies within the present; for the past is spent and doen with, and the future is uncertain.", attribution: "Marcus Aurelius"},
      {quote: "If you think you can, you can. And if you think you can't, you're right.", attribution: "Henry Ford"},
      {quote: "Victory belongs to the most persevering.", attribution: "Napoleon Bonaparte"},
      {quote: "We cannot hold a torch to light another's path without brightening our own.", attribution: "Ben Sweetland"},
      {quote: "If you do not change direction, you may end up where you are heading.", attribution: "Lao Tzu"}
                  ]
    this.handleChangeQuote = this.handleChangeQuote.bind(this)
  }
  handleChangeQuote(){
      //randomly select quote
     let new_quote = this.quotes[Math.floor((Math.random() * this.quotes.length))];
    //if we random previous quote, redo
    while(this.state.quote == new_quote.quote){
      new_quote = this.quotes[Math.floor((Math.random() * this.quotes.length))];
    }
    //update the state
    this.setState({
      quote:new_quote.quote,
      attribution:new_quote.attribution
    })
  }
  render(){
    return(
      <div class="container-fluid">
        <div class="well" id="quote-box">
          <h2 id="text" class="text-center">"{this.state.quote}"</h2>
          <h3 id="author" style={{fontSize:20,textAlign:"center"}}>- {this.state.attribution}</h3>
          <button id="new-quote" onClick={this.handleChangeQuote}>New Quote</button>
          <a href="twitter.com/intent/tweet" id="tweet-quote">Tweet Quote</a>
        </div>
        
        
      </div>
    )
  }
};

//mapping the state to props
//HOW DO THIS?
//WHY DO THIS?
const mapStateToProps = (state) => {
  return {
    quote: state.quote,
    attribution: state.attribution
  }
}

//WHY DO I NEED THIS???
const mapDispatchToProps = (dispatch) => {
  return{
    changeQuote: () => {
      dispatch(changeQuote());
    }
  }
}

//create provider
const Provider = ReactRedux.Provider;
//create connect
const connect = ReactRedux.connect;
//create container
const Container = connect(mapStateToProps,mapDispatchToProps)(QuoteBox);

class AppWrapper extends React.Component {
  //render the Provider here
  render(){
    return(
      <Provider store={store}>
        <Container/>
      </Provider>
    )
  }
}


// ReactDOM.render(<AppWrapper/>,document.getElementById("app"))
export default AppWrapper;
