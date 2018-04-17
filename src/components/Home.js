import React from 'react';
import fetchJsonp from "fetch-jsonp";
import { Col, Row } from 'reactstrap';
import SortRadioButton from "./SortRadioButton";
import ChartCard from "./ChartCard";
import "../sass/index.css";


class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      tracks: [],
      sort: 'all'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    fetchJsonp('https://api.deezer.com/chart&output=jsonp')
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {

      this.setState( {tracks: data.tracks.data} );
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleClick(event) {
    const name = event.target.name;
    this.setState(prevState => ({
      [name]: !prevState[name]
    }));
  }

  render() {
    console.log("Sort type: " + this.state.sort);
    console.log(this.state.tracks);
    const list = this.state.tracks
    .sort(( a , b ) => {
      if (this.state.sort === 'all') return 0;
      if(a.artist.name < b.artist.name) return -1;
      if(a.artist.name > b.artist.name) return 1;
      return 0;
    })
    .map((u, i) => {
      return <User key={i} image={u.album.cover_medium} largeImage={u.album.cover_big} albumTitle={u.album.title} songName={u.title} artist={u.artist.name}
              position={u.position} lyrics={u.explicit_lyrics}/>;
    });


    return (
      <section className="section">
        <SortRadioButton handleChange={this.handleChange} checked={this.state.sort} />
        <h1 className="topTen">Top 10 Singles</h1>
        <Row>
          {list}
        </Row>
        <div className="footer"></div>
        </section>
    );
  }
}

class User extends React.Component {

  render(){
    return (
        <div className="wrapper">
          <Col>
            <ChartCard image={this.props.image}
              artist={this.props.artist}
              lyrics={this.props.lyrics}
              largeImage={this.props.largeImage}
              songName={this.props.songName}
              position={this.props.position}  />
          </Col>
        </div>
    );
  }
}





export default Home;
