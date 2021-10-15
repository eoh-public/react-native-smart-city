import React, { memo, useCallback } from 'react';
import { Icon } from '@ant-design/react-native';
import { TouchableOpacity, StyleSheet, Animated, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import Text from '../../commons/Text';
import { Colors, Constants } from '../../configs';

const screenHeight = Constants.height;
const default_height = 44;
const paddingIos = getStatusBarHeight() + 10;
export const title_height = 44;
export const heightHeader = default_height + title_height + paddingIos;

const HeaderAni = memo(
  ({
    scrollY,
    contentHeight,
    onLeft,
    title,
    rightComponent,
    headerStyle,
    headerAniCenterStyle,
  }) => {
    const { goBack } = useNavigation();
    const onPressLeft = useCallback(() => {
      if (onLeft) {
        onLeft && onLeft();
      } else {
        goBack();
      }
    }, [goBack, onLeft]);

    const endOffset =
      contentHeight >= screenHeight + 2 * title_height
        ? 2 * title_height
        : contentHeight >= screenHeight + title_height
        ? contentHeight - screenHeight
        : 0;
    const headerX = headerAniCenterStyle ? 75 : 16;

    const titleTransformX = scrollY.interpolate({
      inputRange: [0, endOffset],
      outputRange: [0, headerX],
      extrapolate: 'clamp',
    });
    const titleScale = scrollY.interpolate({
      inputRange: [0, endOffset],
      outputRange: [1, 0.9],
      extrapolate: 'clamp',
    });
    const titleWidth = scrollY.interpolate({
      inputRange: [0, 2 * title_height],
      outputRange: ['90%', '70%'],
      extrapolate: 'clamp',
    });
    const wrapHeaderTransformY = scrollY.interpolate({
      inputRange: [0, endOffset],
      outputRange: [0, -title_height],
      extrapolate: 'clamp',
    });
    const headerTransformY = scrollY.interpolate({
      inputRange: [0, endOffset],
      outputRange: [0, title_height],
      extrapolate: 'clamp',
    });

    const titleMarginRight = rightComponent ? 80 : 0;
    const checkHeaderAniCenterStyle = headerAniCenterStyle
      ? styles.containerNoneBorder
      : styles.container;

    return (
      <Animated.View
        style={[
          checkHeaderAniCenterStyle,
          headerStyle,
          endOffset !== 0 && {
            transform: [{ translateY: wrapHeaderTransformY }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.header,
            endOffset !== 0 && {
              transform: [{ translateY: headerTransformY }],
            },
          ]}
        >
          <TouchableOpacity style={styles.btnBack} onPress={onPressLeft}>
            <Icon name={'left'} size={27} color={Colors.Gray9} />
          </TouchableOpacity>
          <View styles={styles.wrapRightComponent}>{rightComponent}</View>
        </Animated.View>

        <Animated.View
          style={[
            endOffset !== 0 && {
              transform: [
                { translateX: titleTransformX },
                { scale: titleScale },
              ],
            },
            { ...styles.boxText, marginRight: titleMarginRight },
            rightComponent && { width: titleWidth },
          ]}
        >
          <Text
            type={'H2'}
            semibold
            style={styles.textHeader}
            numberOfLines={1}
          >
            {title}
          </Text>
        </Animated.View>
      </Animated.View>
    );
  }
);

export default HeaderAni;

const styles = StyleSheet.create({
  textHeader: {
    color: Colors.Gray9,
    marginLeft: 16,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  btnBack: {
    height: default_height,
    width: default_height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapRightComponent: {
    height: default_height,
    width: default_height,
  },
  container: {
    backgroundColor: Colors.White,
    width: '100%',
    borderBottomWidth: 0.3,
    borderColor: Colors.Border,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: heightHeader,
    zIndex: 3,
    paddingTop: paddingIos,
  },
  containerNoneBorder: {
    backgroundColor: Colors.White,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: heightHeader,
    zIndex: 3,
    paddingTop: paddingIos,
  },
  boxText: {
    height: title_height,
    justifyContent: 'center',
    backgroundColor: Colors.TextTransparent,
  },
});
