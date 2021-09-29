import React from 'react';
import { View } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Constants } from '../../../configs';

const Loading = ({ style }) => (
  <View style={style}>
    <ContentLoader>
      <Rect x="16" y="24" rx="10" ry="10" width={120} height="28" />
      <Rect
        x="16"
        y="68"
        rx="10"
        ry="10"
        width={(Constants.width - 40) / 2}
        height="106"
      />
      <Rect
        x={(Constants.width - 40) / 2 + 24}
        y="68"
        rx="10"
        ry="10"
        width={(Constants.width - 40) / 2}
        height="106"
      />
      <Rect x="16" y="200" rx="10" ry="10" width={120} height="28" />
      <Rect
        x="16"
        y="244"
        rx="10"
        ry="10"
        width={(Constants.width - 40) / 2}
        height="106"
      />
      <Rect
        x={(Constants.width - 40) / 2 + 24}
        y="244"
        rx="10"
        ry="10"
        width={(Constants.width - 40) / 2}
        height="106"
      />
      <Rect x="16" y="374" rx="10" ry="10" width={120} height="28" />
      <Rect
        x="16"
        y="418"
        rx="10"
        ry="10"
        width={(Constants.width - 40) / 2}
        height="106"
      />
      <Rect
        x={(Constants.width - 40) / 2 + 24}
        y="418"
        rx="10"
        ry="10"
        width={(Constants.width - 40) / 2}
        height="106"
      />
    </ContentLoader>
  </View>
);

export default Loading;
