import React, { Component } from 'react';
import axios from 'axios';
import { throttle } from 'throttle-debounce';

import Image from '../components/Image';

export default class Images extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      images: [],
    };

    this.renderImages = this.renderImages.bind(this);
    this.handleScroll = throttle(200, false, this.handleScroll.bind(this), false);
    this.fetchImages = this.fetchImages.bind(this);
  }

  componentWillMount() {
    this.fetchImages();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      const newPage = this.state.page + 1;
      this.setState({ page: newPage });
      this.fetchImages();
    }
  }

  fetchImages() {
    axios.get(`http://localhost:3000?page=${this.state.page}`)
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
          key={image.id + image.secret}
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
