import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Animated } from 'react-native';
import { Constants, Colors } from '../../configs';
import Text from '../../commons/Text';
import styles from './Styles/TimerStyles';

let time = -1;

const Timer = ({
  width = Constants.width,
  onChangeValue,
  minimum = 0,
  maximum = 100,
  segmentWidth = 2,
  segmentSpacing = 20,
  indicatorColor = Colors.Red,
  indicatorWidth = 100,
  indicatorHeight = 80,
  indicatorBottom = 20,
  step = 10,
  stepColor = Colors.Gray7,
  stepHeight = 40,
  normalColor = Colors.Gray7,
  normalHeight = 20,
}) => {
  const scrollViewRef = useRef();
  const [scrollX] = useState(new Animated.Value(0));

  const snapSegment = segmentWidth + segmentSpacing;
  const spacerWidth = (width - segmentWidth) / 2;
  const timerWidth = width - segmentWidth + (maximum - minimum) * snapSegment;

  const renderTime = useMemo(() => {
    const data = [...Array(maximum - minimum + 1).keys()].map(
      (i) => i + minimum
    );
    return (
      <View style={[styles.wrap, { width: timerWidth + segmentWidth }]}>
        <View
          style={{
            width: spacerWidth,
          }}
        />
        {data.map((i) => {
          return (
            <View>
              <View
                key={i}
                style={{
                  backgroundColor: i % step === 0 ? stepColor : normalColor,
                  height: i % step === 0 ? stepHeight : normalHeight,
                  width: segmentWidth,
                  marginRight: segmentSpacing,
                }}
              />
              {i % step === 0 && (
                <Text type="Label" color={Colors.Gray7} style={styles.time}>{`${
                  time < 9 ? '0' + ++time : ++time
                }:00`}</Text>
              )}
            </View>
          );
        })}
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const scrollListener = scrollX.addListener(({ value }) => {
      onChangeValue && onChangeValue(value);
    });
    return () => scrollX.removeListener(scrollListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => (time = -1);
  }, []);

  return (
    <View>
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

      <View
        style={[
          styles.indicator,
          {
            width: indicatorWidth,
            bottom: indicatorBottom,
            left: (width - indicatorWidth) / 2,
          },
        ]}
        pointerEvents="none"
      >
        <View
          style={{
            height: indicatorHeight,
            backgroundColor: indicatorColor,
            width: segmentWidth,
          }}
        />
      </View>
    </View>
  );
};

export default Timer;
