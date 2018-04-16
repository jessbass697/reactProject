import React from 'react';
import fetchJsonp from "fetch-jsonp";
import SortRadioButton from './SortRadioButton';
import {Col, Row, Button, Modal, ModalBody, ModalHeader, Card, CardImg, CardBody, CardText, CardSubtitle } from 'reactstrap';


class Albums extends React.Component {
  constructor(props) {
    super(props);
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

      this.setState( {tracks: data.albums.data} );
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
    .map( (u, i) => {
      return <Album key={i} image={u.cover_medium} name={u.title} artist={u.artist.name} largeImage={u.cover_big} position={u.position} lyrics={u.explicit_lyrics} />;
    });


    return (
      <section className="section">
        <SortRadioButton handleChange={this.handleChange} checked={this.state.sort} />

        <h1 className="topTen">Top 10 Albums</h1>
        <Row>
          {list}
        </Row>
        <div className="footer"></div>
        </section>
    );
  }
}

class Album extends React.Component {
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
                <CardSubtitle className="cardSub">{this.props.artist}</CardSubtitle>
                <CardText className="explicit">
                  { this.props.lyrics === true ? 'Explicit' : 'Clean'}
                </CardText>
                <Button color="danger" className="buttonClass" onClick={this.toggle}>More Info!</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="modalClass">
                  <ModalHeader className="modalHead" toggle={this.toggle}> Album Information</ModalHeader>
                  <ModalBody>
                    <img className="image-fluid largeImage" src={this.props.largeImage} />
                    <p className="titleModal">{this.props.name}</p>
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





export default Albums;
