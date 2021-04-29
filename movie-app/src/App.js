import './App.css';
import React from 'react';
import Movie from './Movie.js';
import axios from "axios"

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };
  getMovies = async () => {
    const {data: {data: {movies}}} = await axios.get("https://yts-proxy.nomadcoders1.now.sh/list_movies.json?sort_by=rating")
    this.setState({movies, isLoading: false});
    console.log(movies);
  }
  componentDidMount() {
    this.getMovies();
  }
  render() {
    const {isLoading, movies} = this.state;
    return(
      <section className="container">
        {isLoading
        ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        )
        : (
          <div className="movies">
            {
              movies.map(movie => (
                <Movie
                key={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}/>
              ))
            }
          </div>
        )}
      </section>
    );
  }
}

export default App;
