import React from 'react';
import axios from 'axios';

export default class Quote extends React.Component {
  state = {
    quote: {}
  }

  componentDidMount() {
    axios.get(`http://quotes.stormconsultancy.co.uk/random.json`)
      .then(res => {
        const quote = res.data;
        this.setState({ quote });
      })
  }

  render() {
    return (
      <>
        { this.state.quote }
      </>
    )
  }
}