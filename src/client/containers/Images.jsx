import React, { Component } from 'react';
import axios from 'axios';

import Image from '../components/Image';

export default class Images extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };

    this.renderImages = this.renderImages.bind(this);
  }

  componentWillMount() {
    axios.get('http://localhost:3000')
      .then((response) => {
        this.setState({ images: this.state.images.concat(response.data) });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderImages() {
    return this.state.images.map((image) => {
      return (
        <Image
          key={image.id}
          title={image.title}
          src={image.src}
        />);
    });
  }

  render() {
    return (
      <div>
        <h1>Image Scroll View</h1>
        <ul>{this.state.images && this.renderImages()}</ul>
      </div>
    );
  }
}
