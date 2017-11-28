import React from "react";
// import styles from '../../stylesheets/main.css';

const API_KEY = 'dQ1MTfKZIyEiZ0U0biUWidLJKklF223T';
const NEWS_KEY = 'fb1038879176447c9fdb9c08b858cf72';


let channels = ['hacker-news','reddit-r-all','usa-today','abc-news-au','bbc-news','the-huffington-post',"mtv-news",'al-jazeera-english',"bbc-sport","the-new-york-times","breitbart-news"];



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

let randomnumber = 0;
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


    for (let word of this.state.words) {

      let url = `https://api.giphy.com/v1/gifs/search?q=${word}&limit=${1}&api_key=${API_KEY}`;

      fetch(url)
      .then(results => {
        return results.json();
      }).then(data => {
          console.log(data);
          let gifs = data.data.map((gif,i) => {

            return (
            <img i={gif.title} className="gify" src={gif.images.downsized.url} />

            )

          })

          this.setState({
          gifs: [...this.state.gifs, gifs]
          })
      })


    }

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

        // this.state.words = data.articles[randomnumber].title.split(" ");
        this.setState({words: data.articles[0].title.split(" ")});

        this.search();

    })

  }

  randomize() {
    randomnumber = Math.floor(Math.random()*10);
  }

  componentDidMount() {
      this.news();
  }


  refresh(){
    channels.push(channels.shift());
    channelObject.push(channelObject.shift());
    this.clear();
  }

  swap = (e) => {
    let x = e.target.id;
    let temp = channels[x];
    channels[x] = channels[0];
    channels[0] = temp;
    temp = channelObject[x];
    channelObject[x] = channelObject[0];
    channelObject[0] = temp;
    this.clear();
  }

  clear(){
    this.setState({headlines: []});
    this.setState({gifs: []});
    this.setState({words: []});
    this.news();
  }

  showgifs(){
    let texts = this.state.words;
    let pics = this.state.gifs;
    if (texts.length !== pics.length){
      return;
    }

    console.log(this.state.words);
    console.log(this.state.gifs);


    return (
      <span className="row">
        {this.state.headlines[randomnumber]}
            {texts.map(function(text, i){
              return (<span className="embed col-xs-12 col-sm-6 col-md-3"><h1>{text}{pics[i]}</h1></span>) ;
              })}
        </span>
    )
  }






  render() {



    return (
      <div>

        <div className="row channel-container">

          <div className ="col-xs-1 col-sm-1 col-md-1">
            <img alt="news-channel" id={0} onClick={this.swap} className="active img-channel" src={channelObject[0]}/>
          </div>

            {channels.map((x, i) => {
              if (i < 10){
                return <div className ="col-xs-1 col-sm-1 col-md-1">
                  <img alt="news-channel" onClick={this.swap} id={i + 1} className="img-channel" src={channelObject[i + 1]}/>
                </div>
               }
              })}

          <div className ="col-xs-1 col-sm-1 col-md-1">
            <button type="button" onClick={this.refresh} className="btn btn-primary btn-next">
              <span className="glyphicon glyphicon-arrow-right"></span>
              </button>
          </div>

        </div>

        <div className="row next-container">

          <button onClick={this.refresh} type="button" className="next btn btn-lg">
            NEXT <span className="glyphicon glyphicon-arrow-right"></span>
          </button>

        </div>

          { this.showgifs() }


      </div>
    )
  }

}

export default Home;



// <embed src={gif.embed_url} />



//
//
// <span className="row story">
//   {this.state.headlines[randomnumber]}
//
//       {texts.map(function(text, i){
//         return (<span className="embed col-xs-12 col-sm-6 col-md-3"><h1>{text}{pics[i]}</h1></span>) ;
//         })}
//   </span>
