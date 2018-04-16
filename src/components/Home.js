import React from 'react';
import fetchJsonp from "fetch-jsonp";
import {Col, Button, Row, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Modal, ModalBody, ModalHeader } from 'reactstrap';
import SortRadioButton from "./SortRadioButton";
import DropDown from "./DropDown";


class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      artists: [],
      sort: 'all',
      lyricsSelected: 'all'
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

      this.setState( {artists: data.tracks.data} );
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
    console.log(this.state.artists);
    const list = this.state.artists.map( (u, i) => {
      return <User key={i} image={u.album.cover_medium} largeImage={u.album.cover_big} albumTitle={u.album.title} songName={u.title} artist={u.artist.name}
              position={u.position} lyrics={u.explicit_lyrics}/>;
    });
    const data = this.state.sort === 'all' ? this.state.artists : [].concat(this.state.artists)
    .sort(( a , b ) => {
      if(a.artist < b.artist) return -1;
      if(a.artist > b.artist) return 1;
      return 0;
    });


    return (
      <section className="section">
        <SortRadioButton handleChange={this.handleChange} checked={this.state.sort} />
        <DropDown options={['all','explicit','clean']} name="lyricsSelected" handleChange={this.handleChange} label="Filter by Lyric Type" selected={this.state.lyricsSelected} />

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
  constructor(props) {
      super(props);
      this.state = {
        modal: this.props.modal
      };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState((prevState) => ({
      modal: !prevState.modal
    }));
  }
  render(){
    return (
        <div className="wrapper">
          <Col>
            <Card>
              <CardImg className="image-fluid albumImage" src={this.props.image} />
              <CardBody className="cardBody">
                <CardTitle className="cTitle">
                  { this.props.songName > 10 ? this.props.songName.slice(11) : ''}
                </CardTitle>
                <CardSubtitle className="cardSub">{this.props.artist} </CardSubtitle>
                <CardText className="explicit">
                    { this.props.lyrics === true ? 'Explicit' : 'Clean'}
                </CardText>
                <Button color="danger" className="buttonClass" onClick={this.toggle}>More Info!</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="modalClass">
                  <ModalHeader className="modalHead" toggle={this.toggle}> Track Information</ModalHeader>
                  <ModalBody className="mBody">
                    <img className="image-fluid largeImage" src={this.props.largeImage} />
                    <p className="titleModal">{this.props.songName}</p>
                    <p className="artistModal">{this.props.artist}</p>
                    <p className="ranking">Number {this.props.position}</p>
                  </ModalBody>
                </Modal>
              </CardBody>
            </Card>
          </Col>
        </div>
    );
  }
}





export default Home;
