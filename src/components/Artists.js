import React from 'react';
import fetchJsonp from "fetch-jsonp";
import {Col, Button, Row, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Modal, ModalBody, ModalHeader } from 'reactstrap';


class Artists extends React.Component {
  constructor() {
    super();
    this.state = {
      artists: [],
    };


  }

  componentWillMount() {
    fetchJsonp('https://api.deezer.com/chart&output=jsonp')
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {

      this.setState( {artists: data.artists.data} );
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });

  }

  render() {
    console.log(this.state.artists);
    const list = this.state.artists.map( (u, i) => {
      return <Artist key={i} image={u.picture_medium} artist={u.name} position={u.position} />;
    });
    return (
          <div>
            <h1 className="topTen">Top 10 Artists</h1>
            <Row>
              {list}
            </Row>
            <div className="footer"></div>
          </div>
    );
  }
}

  class Artist extends React.Component {
    render(){
      return (
          <div className="wrapper">
            <Col>
              <Card>
                <CardImg className="image-fluid albumImage" src={this.props.image} />
                <CardBody className="cardBody">
                  <CardTitle className="cTitle">{this.props.artist}</CardTitle>
                </CardBody>
              </Card>
            </Col>
          </div>
        );
      }
    }

    export default Artists;
