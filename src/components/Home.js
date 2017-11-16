import React from "react";
// import styles from '../../stylesheets/main.css';

const API_KEY = 'dQ1MTfKZIyEiZ0U0biUWidLJKklF223T';
const NEWS_KEY = 'fb1038879176447c9fdb9c08b858cf72';


let channels = ['hacker-news','reddit-r-all','usa-today','abc-news-au','bbc-news','the-huffington-post',"mtv-news",'al-jazeera-english',"bbc-sport","the-new-york-times","breitbart-news"];
let channel = 'reddit-r-all';


const hacker = require('../img/hacker.png');
const reddit = require('../img/reddit.png');
const usa = require('../img/usa.png');
const abc = require('../img/abc.png');
const bbc = require('../img/bbc.png');
const huffington = require('../img/huffington.png');
const mtv = require('../img/mtv.png');
const aljazeera = require('../img/aljazeera.png');
const bbcsport = require('../img/sport.png');
const newyork = require('../img/newyork.png');
const breitbart = require('../img/breitbart.png');


let channelObject = [hacker,reddit,usa,abc,bbc,huffington,mtv,aljazeera,bbcsport,newyork,breitbart]






export class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {searchterm: '',
    gifs: [],headlines: [],words: []
    };

    this.search = this.search.bind(this);
    this.news = this.news.bind(this);
    this.refresh = this.refresh.bind(this);
    this.swap = this.swap.bind(this);
  }




  search(){

    let gifs = [];

    for (let word of this.state.words) {

      let url = `https://api.giphy.com/v1/gifs/search?q=${word}&limit=${1}&api_key=${API_KEY}`;

      fetch(url)
      .then(results => {
        return results.json();
      }).then(data => {

          let gifs = data.data.map((gif) => {

            return (

              <a key={gif.id} className="img-responsive" href="#"><embed  src={gif.embed_url} /></a>
            )

          })
          this.setState({
          gifs: [...this.state.gifs, gifs]
          })

      })
    }

    console.log("state", this.state.gifs)

  }

  news(){

    fetch(`https://newsapi.org/v1/articles?source=${channels[0]}&sortBy=top&apiKey=${NEWS_KEY}`)
    .then(results => {
      return results.json();
    }).then(data => {
      console.log(data);


        let headlines = data.articles.map((headline,i) => {


          return (
            <a href={headline.url} target="_blank"><h4 key={headline.id}>{headline.title}</h4></a>
          )


        })



        this.setState({headlines: headlines});
        console.log('headlines',this.state.headlines);

        this.state.words = data.articles[0].title.split(" ");

        this.search();

    })

  }







  componentDidMount() {
    this.news();
  }

  refresh(){
    this.setState({headlines: []});
    this.setState({gifs: []});
    this.setState({words: []});
    channels.push(channels.shift());
    channelObject.push(channelObject.shift());
    this.news();
  }

  swap(){
    this.setState({headlines: []});
    this.setState({gifs: []});
    this.setState({words: []});
    channels.push(channels.shift());
    channelObject.push(channelObject.shift());
    this.news();
  }






  render() {



    let texts = this.state.words;
    let pics = this.state.gifs;


    return (
      <div>

        <div className="row channel-container">

          <div className ="col-xs-1 col-sm-1 col-md-1">
            <img onClick={this.refresh} className="active img-channel" src={channelObject[0]}/>
          </div>

          <div className ="col-xs-1 col-sm-1 col-md-1">
            <img onClick={this.refresh} className="img-channel" src={channelObject[1]}/>
          </div>

          <div className ="col-xs-1 col-sm-1 col-md-1">
            <img onClick={this.refresh} className="img-channel" src={channelObject[2]}/>
          </div>

          <div className ="col-xs-1 col-sm-1 col-md-1">
            <img onClick={this.refresh} className="img-channel " src={channelObject[3]}/>
          </div>

          <div className ="col-xs-1 col-sm-1 col-md-1">
            <img onClick={this.refresh} className="img-channel " src={channelObject[4]}/>
          </div>

          <div className ="col-xs-1 col-sm-1 col-md-1">
            <img onClick={this.refresh} className="img-channel " src={channelObject[5]}/>
          </div>

          <div className ="col-xs-1 col-sm-1 col-md-1">
            <img onClick={this.refresh} className="img-channel " src={channelObject[6]}/>
          </div>

          <div className ="col-xs-1 col-sm-1 col-md-1">
            <img onClick={this.refresh} className="img-channel " src={channelObject[7]}/>
          </div>

          <div className ="col-xs-1 col-sm-1 col-md-1">
            <img onClick={this.refresh} className="img-channel " src={channelObject[8]}/>
          </div>

          <div className ="col-xs-1 col-sm-1 col-md-1">
            <img onClick={this.refresh} className="img-channel " src={channelObject[9]}/>
          </div>

          <div className ="col-xs-1 col-sm-1 col-md-1">
            <img onClick={this.refresh} className="img-channel " src={channelObject[10]}/>
          </div>

          <div className ="col-xs-1 col-sm-1 col-md-1">
            <button type="button" onClick={this.refresh} className="btn btn-primary btn-next">
              <span class="glyphicon glyphicon-arrow-right"></span>
              </button>
          </div>

        </div>

        <div className="row next-container">

          <button onClick={this.refresh} type="button" className="next btn btn-lg">
            NEXT <span className="glyphicon glyphicon-arrow-right"></span>
          </button>

        </div>



        <span className="row story">
          {this.state.headlines[0]}

              {texts.map(function(text, i){
                return <span className="embed col-xs-12 col-sm-6 col-md-3"><h1>{text}{pics[i]}</h1></span>;
                })}

            </span>
      </div>
    )
  }

}

export default Home;



// Home.propTypes = {
//   name: React.PropTypes.string,
//     age: React.PropTypes.number,
//     user: React.PropTypes.object,
//     children: React.PropTypes.element.isRequired
// };

//
// <h1>{this.state.words[0]}{this.state.gifs[0]}</h1>
// <h1>{this.state.words[1]}{this.state.gifs[1]}</h1>
// <h1>{this.state.words[2]}{this.state.gifs[2]}</h1>
// <h1>{this.state.words[3]}{this.state.gifs[3]}</h1>
// <h1>{this.state.words[4]}{this.state.gifs[4]}</h1>
