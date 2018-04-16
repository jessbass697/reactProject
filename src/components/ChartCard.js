import React from 'react';
import {Button, Card, CardImg, CardBody, CardSubtitle, CardText, Modal, ModalBody, ModalHeader } from 'reactstrap';


class ChartCard extends React.Component {
  render() {
    return (
        <Card>
          <CardImg className="image-fluid albumImage" src={this.props.image} />
          <CardBody className="cardBody">
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
      );
    }
  }



export default ChartCard;
