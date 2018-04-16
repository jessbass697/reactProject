import React from 'react';

class SortRadioButton extends React.Component {
  render() {
    return (
      <div className="field is-horizontal">
        <div className="field-label">
          <label className="artistSort">Sort by</label>
        </div>
        <div className="field-body">
          <div className="field is-narrow">
            <div className="control">
              <label className="radio">
                <input type="radio" name="sort" value="all" checked={this.props.checked === 'all'} onChange={this.props.handleChange} />
                All
              </label>
              <label className="radio">
                <input type="radio" name="sort" value="artist" checked={this.props.checked === 'artist'} onChange={this.props.handleChange} />
                Artist
              </label>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SortRadioButton;
