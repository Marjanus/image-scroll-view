import React from 'react';
import PropTypes from 'prop-types';

const Image = (props) => {
  return (
    <li>
      <div>{props.title}</div>
      <div><img src={props.src} alt={props.title} /></div>
    </li>
  );
};

Image.propTypes = {
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default Image;
