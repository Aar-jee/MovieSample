import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Movies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movieCast: {}
    }
  }

  componentDidMount() {
    const movie = this.props.location.state.movie;

    if (this.props.location.state.movieType == 'trending') {
      // Get Cast for Trending movie
      let slugMovieId = movie.movie.ids.slug;
      let url = 'https://api.trakt.tv/movies/' + slugMovieId + '/people';

      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": 2,
          "trakt-api-key": "e51e26eee57ea109e331c7e3b83f2cb1ef1b23b3f779b5c13e27650c58986ba5"
        }
      })
        .then(response => response.json())
        .then((response) => {
          this.setState({
            movieCast: response
          });
        })
    } else if (this.props.location.state.movieType == 'popular') {
      // Get Cast for Popular movie
      let slugMovieId = movie.ids.slug;
      let url = 'https://api.trakt.tv/movies/' + slugMovieId + '/people';

      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": 2,
          "trakt-api-key": "e51e26eee57ea109e331c7e3b83f2cb1ef1b23b3f779b5c13e27650c58986ba5"
        }
      })
        .then(response => response.json())
        .then((response) => {
          this.setState({
            movieCast: response
          });
        })
    } else {
      let slugMovieId = movie.movie.ids.slug;
      let url = 'https://api.trakt.tv/movies/' + slugMovieId + '/people';

      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": 2,
          "trakt-api-key": "e51e26eee57ea109e331c7e3b83f2cb1ef1b23b3f779b5c13e27650c58986ba5"
        }
      })
        .then(response => response.json())
        .then((response) => {
          this.setState({
            movieCast: response
          });
        })
    }
  }

  render() {
    const movie = this.props.location.state.movie;

    if (this.state.movieCast.hasOwnProperty('cast')) {
      const castInMovielistItems = this.state.movieCast.cast.map((castInMovieObj) =>
        <div className="card" key={castInMovieObj.person.ids.slug}>
          <Link className="header" to={{ pathname: '/cast', state: { castInfo: castInMovieObj } }}>
            <div>{castInMovieObj.person.name}</div>
          </Link>
        </div>
      )

      return (
        <div>
          <div>
            <span> TITLE </span>
            <span> {this.props.location.state.movieType == 'popular' ? movie.title : movie.movie.title} </span>
          </div>
          <div>
            <span> RELEASE YEAR </span>
            <span> {this.props.location.state.movieType == 'popular' ? movie.year : movie.movie.year} </span>
          </div>
          <div>
            <div> CAST </div>
            <div className="ui eight stackable cards">
              {castInMovielistItems}
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
export default Movies;
