import React, { memo, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from './StationStyles';

const Station = ({ listStation = [], onSnapToItem, indexStation }) => {
  const [data, setData] = useState();
  const flatListRef = useRef(null);
  const arrRef = useRef([]);
  const offsetX = useRef(0);

  const addToRefs = (el) => {
    arrRef.current.push(el);
  };

  const handleOnSnapToItem = (item, index) => () => {
    onSnapToItem && onSnapToItem(item, index);
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        ref={addToRefs}
        key={index}
        style={styles.wrapTitle}
        onPress={handleOnSnapToItem(item, index)}
      >
        <Text
          style={[styles.title, index === indexStation && styles.titleActive]}
        >
          {item?.text}
        </Text>
        {index !== data.length - 1 && <View style={styles.viewSeparated} />}
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    indexStation >= 0 &&
      arrRef &&
      arrRef.current &&
      arrRef.current.length &&
      arrRef.current[indexStation]?.measure(
        (x, y, width = 0, height, pageX = 0, pageY) => {
          if (pageX && width) {
            flatListRef?.current?.scrollToOffset({
              offset: offsetX.current + pageX - width * 0.6,
            });
          }
        }
      );
  }, [indexStation, arrRef, offsetX]);

  useEffect(() => {
    listStation.length && setData(listStation);
  }, [listStation]);

  const onScroll = (event) => {
    offsetX.current = event.nativeEvent.contentOffset.x;
  };

  return (
    <View style={styles.container}>
      <FlatList
        removeClippedSubviews={false}
        onScroll={onScroll}
        ref={flatListRef}
        keyExtractor={(item) => item.id}
        horizontal
        data={data}
        extraData={data}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default memo(Station);
