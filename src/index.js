import React from 'react';
import ReactDOM from 'react-dom';
import fetchJsonp from "fetch-jsonp";




class MusicArtists extends React.Component {
  constructor() {
    super();
    this.state = {
      artists: []
    };

  }

  componentWillMount() {
    fetchJsonp('https://api.deezer.com/artist/384236/albums&output=jsonp')
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {

      this.setState( {artists: data.data} );
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });

  }

  render() {
    console.log(this.state.artists);
    const list = this.state.artists.map( (u, i) => {
      return <User key={i} image={u.cover} name={u.title} tracks={u.tracklist}/>;
    });
    return (
      <div>
        <h1>Artists:</h1>
        {list}
      </div>
    );
  }
}

class User extends React.Component {
  render(){
    return (
      <div>
        <img src={this.props.image} />
        <p>{this.props.name} </p>
        <p>{this.props.tracks} </p>
      </div>
    );
  }
}





ReactDOM.render(
  <MusicArtists/>,
  document.getElementById('root')
);
