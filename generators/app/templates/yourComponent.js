import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class YourComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };
  }

  _handleOnClick = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  render() {
    const { someProp } = this.props;
    const { count } = this.state;

    return (
      <div className="someClass">
        <span> {`${someProp} ${count} times`} </span>
        <button onClick={this._handleOnClick}>Click me!</button>
      </div>
    );
  }
}

YourComponent.propTypes = {
  someProp: PropTypes.string
};

YourComponent.defaultProps = {
  someProp: 'You clicked the button'
};
