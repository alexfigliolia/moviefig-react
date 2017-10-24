import React, { Component } from 'react';
import Header from './components/header/Header.js';
import Search from './components/header/Search.js';
import Banner from './components/page/Banner.js';
import Movies from './components/page/Movies.js';
import Showtimes from './components/page/Showtimes.js';
import Back from './components/page/Backtoresults.js';
import axios from 'axios';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      "zip" : "",
      "bannerClasses" : "banner",
      "bannerToggle" : true,
      "headerClasses" : "header",
      "headerToggle" : true,
      "searchZipClasses" : "search-zip",
      "searchZipToggle" : true,
      "movieClasses" : 'sResults',
      "moviesToggle" : true,
      "index" : 0,
      "num" : 12,
      "numLoad" : 24,
      "movieTitles" : [],
      "movieDescs" : [],
      "isLoading" : "loader-show",
      "titleClicked" : "",
      "descClicked" : "",
      "showtimeClasses" : "showtimes",
      "backClasses" : "backtoresults",
      "theatersForItem" : [],
      "showtimes" : []
    }
  }

  searchToggle = () => {
    if(this.state.headerToggle === true && this.state.searchZipToggle === true) {
      this.setState({
        "headerClasses" : "header header-hide",
        "headerToggle" : false,
        "searchZipClasses" : "search-zip search-zip-show",
        "searchZipToggle" : false
      });
    }
  }

  goHome = () => {
    this.setState({
      "bannerClasses" : "banner",
      "bannerToggle" : true,
      "movieClasses" : 'sResults',
      "moviesToggle" : true
    });
  }

  goBack = () => {
    if(this.state.headerToggle === false && this.state.searchZipToggle === false) {
      this.setState({
        "headerClasses" : "header",
        "headerToggle" : true,
        "searchZipClasses" : "search-zip",
        "searchZipToggle" : true
      });
    }
  }

  zipChanged = (zip) => {
    this.setState({
      "zip": zip
    });
  }

  empty = () => {
      var node = document.getElementById('movies');
      while (node.hasChildNodes()) {
          node.removeChild(node.lastChild);
      }
  }

  search = () => {
    this.setState({
      "bannerClasses" : "banner banner-hide",
      "bannerToggle" : false,
      "movieClasses" : 'sResults results-show',
      "moviesToggle" : false,
      "headerClasses" : "header",
      "headerToggle" : true,
      "searchZipClasses" : "search-zip",
      "searchZipToggle" : true,
      "isLoading" : "loader-show",
      "movieTitles" : [],
      "movieDescs" : []
    });
    const d = new Date();
    const today = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
    const zip = this.state.zip;
    const num = this.state.num;
    const index = this.state.index;
    const mT = [];
    const mD = [];
    axios.get('https://data.tmsapi.com/v1.1/movies/showings?startDate='+ today +'&zip='+ zip +'&radius=10&units=mi&imageSize=Md&api_key=szar7dgf7235f947ujf7dugd')
      .then((response) => {
        document.getElementById('error').style.display = "none";
        // console.log(response);
        let thisNum;
        if(num > response.data.length - 1) {
          thisNum = response.data.length - 1;
        } else {
          thisNum = num;
        }
        for (let i = index; i < thisNum; i++){
          mT.push(response.data[i].title);
          mD.push(response.data[i].longDescription);
        }
        this.setState({
          "movieTitles" : mT,
          "movieDescs" : mD,
          "isLoading" : "loader-hide"
        });
      })
      .catch((error) => {
        document.getElementById('error').style.display = "flex";
        console.log(error);
      });
  }

  loadMore = () => {
      const d = new Date();
      const today = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
      const zip = this.state.zip;
      const numLoad = this.state.numLoad;
      const index = this.state.index;
      const mT = [];
      const mD = [];
      axios.get('https://data.tmsapi.com/v1.1/movies/showings?startDate='+ today +'&zip='+ zip +'&radius=10&units=mi&imageSize=Md&api_key=szar7dgf7235f947ujf7dugd')
        .then((response) => {
          // console.log(response);
          if(numLoad > response.data.length - 1) {
            var thisNum = response.data.length - 1;
          } else {
            thisNum = numLoad;
          }
          for (var i = index; i < thisNum; i++){
            mT.push(response.data[i].title);
            mD.push(response.data[i].longDescription);
          }
          this.setState({
            "movieTitles" : mT,
            "movieDescs" : mD,
            "numLoad" : numLoad + 12
          });
        })
        .catch((error) => {
          console.log(error);
        });
  }

  openMovie = (e) => {
    const self = this;
    if( e.target.tagName === 'IMG' || e.target.className === 'movie-title' || e.target.className === 'movie movie-show' ) {   
      const i = e.target.parentNode.dataset.index;
      const d = new Date();
      const today = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
      const zip = self.state.zip;
      const hours = d.getHours();
      console.log(hours);
      self.setState({
        "titleClicked" : self.state.movieTitles[i],
        "descClicked" : self.state.movieDescs[i],
        "showtimeClasses" : "showtimes showtimes-show",
        "backClasses" : "backtoresults backtoresults-show"
      });
      axios.get('https://data.tmsapi.com/v1.1/movies/showings?startDate='+ today +'&zip='+ zip +'&radius=10&units=mi&imageSize=Md&api_key=szar7dgf7235f947ujf7dugd')
        .then((response) => {
          const showtimes = [];
          const  t = [];
          for (let j = 0; j < response.data[i].showtimes.length; j++){
            t.push(response.data[i].showtimes[j].theatre.name)
            // console.log(t);
          }
          const theaters = t.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
          });
          theaters.forEach(function(currentValue, index, array) {
            const st = [currentValue];
            for (let z = 0; z < response.data[i].showtimes.length; z++) {
              if(currentValue === response.data[i].showtimes[z].theatre.name) {
                const show = response.data[i].showtimes[z].dateTime;
                const t = show.substring(11);
                const h = t.substring(2, 0);
                if(hours < h) {
                  st.push(formatDate(show));
                }
              }
            }
            showtimes.push(st);
          });
          self.setState({
            "theatersForItem" : theaters,
            "showtimes" : showtimes
          });
        })
        .catch(function (error) {
          document.getElementById('error').style.display = "flex";
          console.log(error);
        });
    }
  }

  backToResults = () => {
    this.setState({
      "showtimeClasses" : "showtimes",
      "backClasses" : "backtoresults"
    });
    setTimeout(() => {
      this.setState({
        "titleClicked" : "",
        "descClicked" : "",
        "theatersForItem" : [],
        "showtimes" : []
      });
      document.getElementById('showTimes').scrollTop = 0;
    }, 350);
  }
  
  render() {
    return (
      <div className="App">
        <Header 
          cNames={this.state.headerClasses} 
          searchToggle={this.searchToggle} 
          goHome={this.goHome} />

        <Search 
          cNames={this.state.searchZipClasses} 
          goBack={this.goBack} 
          zip={this.state.zip} 
          stateVal={this.state.zip} 
          onZipChange={this.zipChanged} 
          searchZip={this.search} />

        <Banner 
          cNames={this.state.bannerClasses}
          searchToggle={this.searchToggle} />

        <Movies 
          cNames={this.state.movieClasses} 
          titles={this.state.movieTitles}
          descriptions={this.state.movieDescs} 
          number={this.state.num}
          index={this.state.index} 
          loadMore={this.loadMore} 
          isLoading={this.state.isLoading}
          movieClicked={this.openMovie} 
          goHome={this.goHome} />

        <Showtimes 
          cNames={this.state.showtimeClasses}
          title={this.state.titleClicked}
          description={this.state.descClicked} 
          theaters={this.state.theatersForItem}
          showtimes={this.state.showtimes} />

        <Back 
          cNames={this.state.backClasses} 
          back={this.backToResults} />
      </div>
    );
  }
}

function formatDate(date) {
  var t = date.substring(11);
  var h = t.substring(2, 0);
  var m = date.substring(14);
  var ampm = h >=12 ? "pm" : "am";
  h = h > 12 ? h - 12 : h;
  var time = h+':'+m+ampm;
  return time;
};
