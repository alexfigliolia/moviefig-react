import React, { Component } from 'react';
import Header from './components/header/Header.js';
import Search from './components/header/Search.js';
import Banner from './components/page/Banner.js';
import Movies from './components/page/Movies.js';
import Showtimes from './components/page/Showtimes.js';
import Back from './components/page/Backtoresults.js';
import axios from 'axios';

class App extends Component {
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

  searchToggle(){
    if(this.state.headerToggle === true && this.state.searchZipToggle === true) {
      this.setState({
        "headerClasses" : "header header-hide",
        "headerToggle" : false,
        "searchZipClasses" : "search-zip search-zip-show",
        "searchZipToggle" : false
      });
    }
  }

  goHome() {
    this.setState({
      "bannerClasses" : "banner",
      "bannerToggle" : true,
      "movieClasses" : 'sResults',
      "moviesToggle" : true
    });
  }

  goBack() {
    if(this.state.headerToggle === false && this.state.searchZipToggle === false) {
      this.setState({
        "headerClasses" : "header",
        "headerToggle" : true,
        "searchZipClasses" : "search-zip",
        "searchZipToggle" : true
      });
    }
  }

  zipChanged(zip){
    this.setState({
      "zip": zip
    });
  }

  empty(){
      var node = document.getElementById('movies');
      while (node.hasChildNodes()) {
          node.removeChild(node.lastChild);
      }
  }

  search() {
    var self = this;
    self.setState({
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
    var  d = new Date();
    var today = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
    var zip = self.state.zip;
    var num = self.state.num;
    var index = self.state.index;
    var mT = [];
    var mD = [];
    axios.get('https://data.tmsapi.com/v1.1/movies/showings?startDate='+ today +'&zip='+ zip +'&radius=10&units=mi&imageSize=Md&api_key=szar7dgf7235f947ujf7dugd')
      .then(function (response) {
        document.getElementById('error').style.display = "none";
        // console.log(response);
        if(num > response.data.length - 1) {
          var thisNum = response.data.length - 1;
        } else {
          thisNum = num;
        }
        for (var i = index; i < thisNum; i++){
          mT.push(response.data[i].title);
          mD.push(response.data[i].longDescription);
        }
        self.setState({
          "movieTitles" : mT,
          "movieDescs" : mD,
          "isLoading" : "loader-hide"
        });
      })
      .catch(function (error) {
        document.getElementById('error').style.display = "flex";
        console.log(error);
      });
  }

  loadMore() {
      var self = this;
      var  d = new Date();
      var today = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
      var zip = self.state.zip;
      var numLoad = this.state.numLoad;
      var index = self.state.index;
      var mT = [];
      var mD = [];
      axios.get('https://data.tmsapi.com/v1.1/movies/showings?startDate='+ today +'&zip='+ zip +'&radius=10&units=mi&imageSize=Md&api_key=szar7dgf7235f947ujf7dugd')
        .then(function (response) {
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
          self.setState({
            "movieTitles" : mT,
            "movieDescs" : mD,
            "numLoad" : numLoad + 12
          });
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  openMovie(e){
    if( e.target.tagName === 'IMG' || e.target.className === 'movie-title' || e.target.className === 'movie movie-show' ) {   
      var i = e.target.parentNode.dataset.index;
      var self = this;
      var  d = new Date();
      var today = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
      var zip = self.state.zip;
      var hours = d.getHours();
      console.log(hours);
      self.setState({
        "titleClicked" : self.state.movieTitles[i],
        "descClicked" : self.state.movieDescs[i],
        "showtimeClasses" : "showtimes showtimes-show",
        "backClasses" : "backtoresults backtoresults-show"
      });
      axios.get('https://data.tmsapi.com/v1.1/movies/showings?startDate='+ today +'&zip='+ zip +'&radius=10&units=mi&imageSize=Md&api_key=szar7dgf7235f947ujf7dugd')
        .then(function (response) {
          var showtimes = [];
          // console.log(response.data[i].showtimes);
          var t = [];
          for (var j = 0; j < response.data[i].showtimes.length; j++){
            t.push(response.data[i].showtimes[j].theatre.name)
            // console.log(t);
          }
          var theaters = t.filter(function(elem, index, self) {
              return index === self.indexOf(elem);
          });
          theaters.forEach(function(currentValue, index, array) {
            var st = [currentValue];
              for (var z = 0; z < response.data[i].showtimes.length; z++) {
                if(currentValue === response.data[i].showtimes[z].theatre.name) {
                  var show = response.data[i].showtimes[z].dateTime;
                  var t = show.substring(11);
                  var h = t.substring(2, 0);
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

  backToResults(){
    var self = this;
    self.setState({
      "showtimeClasses" : "showtimes",
      "backClasses" : "backtoresults"
    });
    setTimeout(function(){
      self.setState({
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
            searchToggle={this.searchToggle.bind(this)} 
            goHome={this.goHome.bind(this)} />

          <Search 
            cNames={this.state.searchZipClasses} 
            goBack={this.goBack.bind(this)} 
            zip={this.state.zip} 
            stateVal={this.state.zip} 
            onZipChange={this.zipChanged.bind(this)} 
            searchZip={this.search.bind(this)} />

          <Banner 
            cNames={this.state.bannerClasses}
            searchToggle={this.searchToggle.bind(this)} />

          <Movies 
            cNames={this.state.movieClasses} 
            titles={this.state.movieTitles}
            descriptions={this.state.movieDescs} 
            number={this.state.num}
            index={this.state.index} 
            loadMore={this.loadMore.bind(this)} 
            isLoading={this.state.isLoading}
            movieClicked={this.openMovie.bind(this)} 
            goHome={this.goHome.bind(this)} />

          <Showtimes 
            cNames={this.state.showtimeClasses}
            title={this.state.titleClicked}
            description={this.state.descClicked} 
            theaters={this.state.theatersForItem}
            showtimes={this.state.showtimes} />

          <Back 
            cNames={this.state.backClasses} 
            back={this.backToResults.bind(this)} />
      </div>
    );
  }
}


export default App;

function formatDate(date) {
  var t = date.substring(11);
  var h = t.substring(2, 0);
  var m = date.substring(14);
  var ampm = h >=12 ? "pm" : "am";
  h = h > 12 ? h - 12 : h;
  var time = h+':'+m+ampm;
  return time;
};
