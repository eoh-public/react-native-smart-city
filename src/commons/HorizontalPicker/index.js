import React, { useEffect, useMemo, useRef, useState, memo } from 'react';
import { View, Animated } from 'react-native';
import { Constants, Colors } from '../../configs';
import Text from '../Text';
import styles from './styles';

let isCanChangeValue = false;

const HorizontalPicker = ({
  width = Constants.width,
  onChangeValue,
  minimum = 0,
  maximum = 100,
  segmentSpacing = 20,
  step = 10,
  stepColor = Colors.Gray7,
  stepHeight = 40,
  stepWidth = 2,
  normalColor = Colors.Gray7,
  normalHeight = 20,
  normalWidth = 2,
  style,
  value = 0,
}) => {
  const scrollViewRef = useRef();
  const [scrollX] = useState(new Animated.Value(0));

  const spacerWidth = (width - stepWidth) / 2;
  let time = useMemo(() => minimum, [minimum]);

  const renderTime = useMemo(() => {
    const data = [...Array(maximum - minimum + 1).keys()].map(
      (i) => i + minimum
    );
    return (
      <View style={[styles.wrap]}>
        <View
          style={{
            width: spacerWidth,
          }}
        />
        {data.map((i, index) => {
          const isStep = i % step === 0;
          return (
            <View key={index}>
              <View
                key={i}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  backgroundColor: isStep ? stepColor : normalColor,
                  height: isStep ? stepHeight : normalHeight,
                  width: isStep ? stepWidth : normalWidth,
                  borderRadius: isStep ? stepWidth / 2 : normalWidth / 2,
                  marginRight: i === maximum ? 0 : segmentSpacing,
                }}
              />
              {isStep && (
                <Text
                  color={Colors.Gray7}
                  style={[styles.time, time < 10 && styles.time2]}
                >
                  {time++}
                </Text>
              )}
            </View>
          );
        })}
        <View
          style={{
            width: (width - stepWidth) / 2,
          }}
        />
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maximum, minimum, time]);

  useEffect(() => {
    const scrollListener = scrollX.addListener(({ value }) => {
      isCanChangeValue && onChangeValue && onChangeValue(value);
    });
    return () => scrollX.removeListener(scrollListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isCanChangeValue && scrollViewRef && scrollViewRef.current) {
      const to1 = setTimeout(() => {
        scrollViewRef.current.scrollTo({ x: value * 128 });
        clearTimeout(to1);
      }, 300);
      const to2 = setTimeout(() => {
        isCanChangeValue = true;
        clearTimeout(to2);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, isCanChangeValue, scrollViewRef]);

  useEffect(() => {
    return () => (isCanChangeValue = false);
  }, []);

  return (
    <View style={[styles.container, style]}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        contentContainerStyle={styles.contentContainerStyle}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { x: scrollX },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {renderTime}
      </Animated.ScrollView>

      <View style={[styles.indicator]} pointerEvents="none">
        <View style={styles.childIndicator} />
      </View>
    </View>
  );
};

export default memo(HorizontalPicker);
