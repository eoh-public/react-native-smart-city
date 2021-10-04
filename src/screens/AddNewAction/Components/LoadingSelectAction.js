import React from 'react';
import { View } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Constants } from '../../../configs';

const LoadingSelectAction = ({ style }) => (
  <View style={style}>
    <ContentLoader>
      <Rect x="16" y="40" rx="10" ry="10" width={120} height="20" />
      <Rect
        x="16"
        y="76"
        rx="10"
        ry="10"
        width={Constants.width - 32}
        height="70"
      />
      <Rect x="16" y="178" rx="10" ry="10" width={120} height="20" />
      <Rect
        x="16"
        y="214"
        rx="10"
        ry="10"
        width={Constants.width - 32}
        height="70"
      />
      <Rect x="16" y="316" rx="10" ry="10" width={120} height="20" />
      <Rect
        x="16"
        y="352"
        rx="10"
        ry="10"
        width={Constants.width - 32}
        height="70"
      />
    </ContentLoader>
  </View>
);

export default LoadingSelectAction;
