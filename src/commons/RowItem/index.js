import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Colors } from '../../configs';
import Text from '../Text';
import styles from './styles';
import { CircleView } from '../CircleView';

const arrColor = [
  Colors.GeekBlue3,
  Colors.Purple3,
  Colors.Orange3,
  Colors.Volcano3,
  Colors.Blue9,
  Colors.Green3,
  Colors.Cyan2,
];
export const RowItem = memo(
  ({
    index = 0,
    type, //primary | disable | undefined
    leftIcon,
    text,
    subtext,
    subtextColor = Colors.Gray6,
    rightComponent,
    onPress,
  }) => {
    const circleColorTypes = {
      primary: 'primary',
      disable: 'disable',
      noneBG: 'none',
    };
    const circleColor = type
      ? circleColorTypes[type]
      : arrColor[index % arrColor.length];

    return (
      <>
        <View style={styles.wrapItem}>
          <TouchableOpacity onPress={onPress} disabled={type === 'disable'}>
            <View style={styles.Border}>
              <View style={styles.paddingLeft16}>
                <CircleView size={40} backgroundColor={circleColor} center>
                  {leftIcon}
                </CircleView>
              </View>
              <View style={styles.columeFlex}>
                <Text style={styles.titleName}> {text}</Text>
                <Text style={styles.status}> {subtext}</Text>
              </View>
              {!!rightComponent && (
                <View style={styles.endFlex}>{rightComponent}</View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  }
);
