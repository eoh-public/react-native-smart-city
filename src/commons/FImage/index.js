import React from 'react';
import FastImage from 'react-native-fast-image';

const FImage = (props) => (
  <FastImage resizeMode={FastImage.resizeMode.contain} {...props} />
);

export default FImage;
