import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Cast extends Component {

  constructor(props) {
    super(props);
    this.state = {
      personalDetail: {},
      otherMovies: []
    }
  }

  componentDidMount() {
    const castInfo = this.props.location.state.castInfo;

    let slugCastId = castInfo.person.ids.slug;

    // Personal Details
    fetch('https://api.trakt.tv/people/' + slugCastId + '?extended=full', {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": "e51e26eee57ea109e331c7e3b83f2cb1ef1b23b3f779b5c13e27650c58986ba5"
      }
    })
      .then(response => response.json())
      .then((response) => {
        this.setState({ personalDetail: response });
      })

    // Other Movies
    fetch('https://api.trakt.tv/people/' + slugCastId + '/movies', {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": "e51e26eee57ea109e331c7e3b83f2cb1ef1b23b3f779b5c13e27650c58986ba5"
      }
    })
      .then(response => response.json())
      .then((response) => {
        this.setState({ otherMovies: response });
      })
  }

  render() {
    const castInfo = this.props.location.state.castInfo;

    if (this.state.otherMovies.hasOwnProperty('cast')) {
      const otherMovies = this.state.otherMovies.cast.map((tempAlsoAppeared) =>
        <div className="card" key={tempAlsoAppeared.movie.ids.slug}>
          <Link className="header" to={{ pathname: '/movies', state: { movie: tempAlsoAppeared, movieType: 'all' } }}>
            <div>{tempAlsoAppeared.movie.title}</div>
            <div>{tempAlsoAppeared.movie.year}</div>
          </Link>
        </div>
      )

      return (
        <div className="ui link cards">
          <div className="">
            <div className="header">{this.state.personalDetail.name}</div>
            <div className="meta">
              <div>
                <strong>DOB:</strong> {this.state.personalDetail.birthday}
              </div>
              <div>
                <strong>BIRTHPLACE:</strong> {this.state.personalDetail.birthplace}
              </div>
            </div>
            <div className="meta">
              <strong>DEATH:</strong> {this.state.personalDetail.death ? this.state.personalDetail.death : 'ALIVE'}
            </div>
            <div className="description">
              <strong>BIOGRAPHY:</strong>
              <div></div>
              {this.state.personalDetail.biography}
            </div>
          </div>
          <div className="extra content">
            <span>
              <i className="user icon"></i>
              {this.state.personalDetail.homepage}
            </span>
          </div>
          <div className="ui ten stackable cards">
            {otherMovies}
          </div>
        </div>
      )
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}
export default Cast;
