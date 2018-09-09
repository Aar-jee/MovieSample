import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      trendingMovies: [],
      popularMovies: []
    }
  }

  componentDidMount() {

    // Trending Movies
    fetch('https://api.trakt.tv/movies/trending', {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": "e51e26eee57ea109e331c7e3b83f2cb1ef1b23b3f779b5c13e27650c58986ba5"
      }
    })
      .then(response => response.json())
      .then((response) => {
        this.setState({
          trendingMovies: response
        });
      })

    //Popular Movies  
    fetch('https://api.trakt.tv/movies/popular', {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": "e51e26eee57ea109e331c7e3b83f2cb1ef1b23b3f779b5c13e27650c58986ba5"
      }
    })
      .then(response => response.json())
      .then((response) => {
        this.setState({
          popularMovies: response
        });
      })
  }

  render() {
    const trendinglistItems = this.state.trendingMovies.map((trendingMovie) =>
      <div className="card" key={trendingMovie.movie.ids.slug}>
        <Link className="header" to={{ pathname: '/movies', state: { movie: trendingMovie, movieType: 'trending' } }}>
          <div>{trendingMovie.movie.title}</div>
          <div>{trendingMovie.movie.year}</div>
        </Link>
      </div>
    )

    const popularlistItems = this.state.popularMovies.map((popularMovie) =>
      <div className="card" key={popularMovie.ids.slug}>
        <Link className="header" to={{ pathname: '/movies', state: { movie: popularMovie, movieType: 'popular' } }}>
          <div>{popularMovie.title}</div>
          <div>{popularMovie.year}</div>
        </Link>
      </div>
    )

    if (this.state.trendingMovies.length > 0 && this.state.popularMovies.length > 0) {
      return (
        <div>


          <div class="ui search">
            <div class="ui icon input">
              <input class="prompt" type="text" placeholder="Search movies..." />
              <i class="search icon"></i>
            </div>
            <div class="results"></div>
          </div>

          <div> TRENDING
            <div className="ui ten stackable cards">
              {trendinglistItems}
            </div>
          </div>

          <div> POPULAR
            <div className="ui ten stackable cards">
              {popularlistItems}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}
export default Home;
