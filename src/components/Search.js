import React from 'react';
import fetchJsonp from "fetch-jsonp";
import { Row } from 'reactstrap';
import LabelledInput from './LabelledInput';
import SortRadioButton from './SortRadioButton';
import ChartCard from './ChartCard';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artists: [],
      sort: 'all',
      searchText: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    //get chart tracks, albums & artists from API and store info in setState
    fetch('https://api.deezer.com/search?q=artist')
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {
      const artists = data.data.map(artist => {
        console.log(data);
        return {name: artist.artist.name, image: artist.artist.picture_medium};
      });
      this.setState({artists: artists});
    })
    .catch(error => {
      console.log(error)
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
    const data = this.state.sort === 'all' ? this.state.artist : [].concat(this.state.artists)
    .sort((a, b) => {
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    });

    /*let artistList = data.map( artist => {
      const nameMatch = artist.name.startsWith(this.state.searchText);
      return (nameMatch) ? (
        <ChartCard name={artist.name} image={artist.image} key={artist.name + artist.image} />
      ) : null;
    });*/

    return (
      <section className="section">
        <SortRadioButton handleChange={this.handleChange} checked={this.state.sort}/>
        <LabelledInput name="searchText" label="Search by name" value={this.state.searchText} handleChange={this.handleChange} placeholder={"e.g. eminem"} />
        {/*<Row>
          {artistList}
        </Row>*/}
      </section>
    );

  }
}

export default Search;
