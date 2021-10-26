import React, { useRef, useCallback, useState, memo } from 'react';
import {
  RefreshControl,
  StyleSheet,
  Animated,
  View,
  SafeAreaView,
  Platform,
} from 'react-native';
import { ActivityIndicator } from '@ant-design/react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';

import { Colors, Theme } from '../../configs';
import HeaderAni, { heightHeader } from '../../commons/HeaderAni';
import Text from '../../commons/Text';

const WrapHeaderScrollable = ({
  children,
  title,
  subTitle,
  rightComponent,
  loading = false,
  onRefresh,
  styleScrollView,
  contentContainerStyle,
  onLoadMore,
  headerAniStyle,
  headerAniCenterStyle,
  onGoBack,
  disableLoadMore = false,
}) => {
  const animatedScrollYValue = useRef(new Animated.Value(0)).current;
  const [loadingMore, setLoadingMore] = useState(false);
  const loadMore = useCallback(() => {
    if (!disableLoadMore) {
      if (onLoadMore) {
        setLoadingMore(true);
        onLoadMore(() => setLoadingMore(false));
      }
    } else {
      setLoadingMore(false);
    }
  }, [onLoadMore, disableLoadMore]);

  const [contentHeight, setContentHeight] = useState(0);

  const onContentSizeChange = useCallback(
    (_, height) => {
      setContentHeight(height);
    },
    [setContentHeight]
  );

  return (
    <SafeAreaView style={[styles.container, headerAniStyle]}>
      <HeaderAni
        scrollY={animatedScrollYValue}
        contentHeight={contentHeight}
        title={title}
        rightComponent={rightComponent}
        headerAniCenterStyle={headerAniCenterStyle}
        headerStyle={headerAniStyle}
        onLeft={onGoBack}
      />
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: animatedScrollYValue } } }],
          {
            useNativeDriver: false,
          }
        )}
        onContentSizeChange={onContentSizeChange}
        style={[styles.scrollView, styleScrollView]}
        contentContainerStyle={[
          styles.contentContainerStyle,
          contentContainerStyle && contentContainerStyle,
        ]}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            progressViewOffset={heightHeader}
          />
        }
        contentInset={{
          top: heightHeader - (isIphoneX() ? 32 : 0),
        }}
        contentOffset={{
          y: -heightHeader,
        }}
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={loadMore}
      >
        {!!subTitle && (
          <Text type={'Body'} color={Colors.Gray8} style={styles.subTitle}>
            {subTitle}
          </Text>
        )}
        {children}
        {loadingMore && (
          <View style={styles.bottomLoading}>
            <ActivityIndicator size="small" color={Colors.Black} />
          </View>
        )}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default memo(WrapHeaderScrollable);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingTop: Platform.select({
      ios: 0,
      android: heightHeader + 16,
    }),
  },
  contentContainerStyle: {
    paddingBottom: heightHeader,
  },
  bottomLoading: {
    height: 32,
    ...Theme.center,
  },
  subTitle: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
});
