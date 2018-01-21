import React from 'react';
import PropTypes from 'prop-types';

const Image = (props) => {
  return (
    <li className="image">
      <div className="image-title"><h4>{props.title || 'Flickr Image'}</h4></div>
      <div className="image-thumbnail">
        <a href={props.original} target="_blank">
          <img src={props.src} alt={props.title} />
        </a>
      </div>
    </li>
  );
};

Image.propTypes = {
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  original: PropTypes.string.isRequired,
};

export default Image;
