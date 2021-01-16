import React from 'react';

class App extends React.Component {

  state = {
    searchTerm: '',
    Results:[],
    Nominations:[]
  }

  editSearch = (e) => {
    this.searchMovie(e.target.value)
    this.setState({searchTerm: e.target.value})
  }

  searchMovie = (title) => {
    if (title == ""){
      this.setState({ Results: [] })
      this.setState({ Nominations: [] })
    } else {
        const url = "https://www.omdbapi.com/?apikey=51fc5dae&t="+title;
        fetch(url)
            .then(res => res.json())
            .then((data) => {
              if(data.Response =="True") {
              let newMovie = `${data.Title}(${data.Year})`
              let movies = this.state.Results
              if(!movies.includes(newMovie)) {
                movies.push(newMovie)
              }
              this.setState({ Results: movies })
              }
            })
            .catch(console.log)
      }
  }

  addNomin = (movie) => {
    let movieNomins = this.state.Nominations
    if(!movieNomins.includes(movie)) {
      movieNomins.push(movie)
    }
    this.setState({ Nominations: movieNomins })
  }

  deleteNomin = (nomination) => {
    let movieNomins = this.state.Nominations
    if(movieNomins.includes(nomination)) {
      movieNomins = movieNomins.filter(function(item) {
        return item !== nomination
})
    }
    this.setState({ Nominations: movieNomins })

  }


    render(){
      return (
        <div style = {{textAlign: 'center', paddingTop: '30vh'}}>
          <h2> Search movie </h2>
          <input type= 'text' value = {this.state.searchTerm} onChange = {this.editSearch} placeholder = 'Search for a movie!'/>
          <br></br>
          <h3>Results:</h3>
          {
            this.state.Results.map(movie => {
              return (<div>{movie}<button onClick={() => this.addNomin(movie)}>Nominate!</button></div>);
            })
          }
          <h3>Nominations:</h3>
          {
            this.state.Nominations.map(nomination => {
              return (<div>{nomination}<button onClick={() => this.deleteNomin(nomination)}>Remove</button></div>);
            })
          }

        </div>
      );
    }
}

export default App;
