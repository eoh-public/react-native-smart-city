import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { chunk } from 'lodash';
import Carousel from 'react-native-snap-carousel';
import { t } from 'i18n-js';

import { Images, Colors } from '../../configs';
import { useHiddenStatusBar } from '../../hooks/Common/useStatusBar';
import { HeaderCustom } from '../../commons/Header';
import MediaPlayerDetail from '../../commons/MediaPlayerDetail';
import { Constants, normalize } from '../../configs/Constants';
import styles from './Styles/index';
import { ModalFullVideo } from '../../commons/Modal';

const AllCamera = () => {
  const carouselRef = useRef();
  const { params = {} } = useRoute();
  const { arrCameras = [], thumbnail = '' } = params;

  const [amount, setAmount] = useState(1);
  const [data, setData] = useState(arrCameras);
  const [activeCamera, setActiveCamera] = useState(data[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [dataFullScreen, setDataFullScreen] = useState();

  const handleFullScreen = (data) => {
    setIsFullScreen(!isFullScreen);
    setDataFullScreen(data);
  };

  const onPressAmount = (value) => () => {
    setAmount(value);
    value === 1 && setActiveCamera(arrCameras[0]);
    const dataTemp = [...arrCameras];
    setData(value === 1 ? dataTemp : chunk(dataTemp, value));
  };

  const onPressNext = () =>
    currentPage !== data.length && carouselRef?.current?.snapToNext();

  const onPressPrev = () =>
    currentPage !== 1 && carouselRef?.current?.snapToPrev();

  const onSnapToItem = (index) => {
    setActiveCamera(data[index]);
    setCurrentPage(index + 1);
  };

  const onClose = () => {
    setIsFullScreen(false);
  };

  const CameraItem = ({ item }) => {
    return (
      <View style={styles.wrap}>
        {!!item && (
          <MediaPlayerDetail
            uri={item?.configuration?.uri}
            thumbnail={thumbnail}
            key={`camera-device-${item?.id}`}
            style={styles.camera}
            wrapStyles={styles.wrapStyles}
            resizeMode={'cover'}
            cameraName={amount !== 1 && item?.configuration?.name}
            amount={amount}
            handleFullScreen={handleFullScreen}
            isFullScreen={false}
          />
        )}
      </View>
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.wrapItem}>
        {amount === 1 ? (
          <CameraItem key={item?.id} item={item} />
        ) : amount === 4 ? (
          <>
            <View style={styles.row}>
              <CameraItem key={item?.id} item={item[0]} />
              <CameraItem key={item?.id} item={item[1]} />
            </View>
            <View style={styles.row}>
              <CameraItem key={item?.id} item={item[2]} />
              <CameraItem key={item?.id} item={item[3]} />
            </View>
          </>
        ) : (
          <>
            <View style={styles.row}>
              <CameraItem key={item?.id} item={item[0]} />
              <CameraItem key={item?.id} item={item[1]} />
              <CameraItem key={item?.id} item={item[2]} />
            </View>
            <View style={styles.row}>
              <CameraItem key={item?.id} item={item[3]} />
              <CameraItem key={item?.id} item={item[4]} />
              <CameraItem key={item?.id} item={item[5]} />
            </View>
          </>
        )}
      </View>
    );
  };

  const renderCarousel = useMemo(() => {
    return (
      <Carousel
        ref={carouselRef}
        data={data}
        renderItem={renderItem}
        sliderWidth={Constants.width}
        itemWidth={Constants.width}
        inactiveSlideScale={1}
        onSnapToItem={onSnapToItem}
        inactiveSlideOpacity={1}
        extraData={data}
        loop={false}
        isForceIndex={Platform.OS === 'android'}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const renderAmount = useMemo(() => {
    return (
      <View style={styles.wrapAmount}>
        {[1, 4, 6].map((item) => (
          <TouchableOpacity
            onPress={onPressAmount(item)}
            key={item}
            style={[
              styles.buttonAmount,
              item === amount && styles.buttonAmountActive,
            ]}
          >
            <Text
              style={{
                fontSize: normalize(12),
                color: item === amount ? Colors.White : Colors.Gray9,
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  useEffect(() => {
    const to = setTimeout(() => {
      carouselRef?.current?.snapToItem();
    }, 60);
    return () => clearTimeout(to);
  }, [data]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useHiddenStatusBar(isFullScreen);
  }, [isFullScreen]);

  return (
    <>
      <View style={styles.wrap2}>
        <HeaderCustom title={t('all_camera')} />
        <View style={styles.center}>
          <View style={styles.wrapTitle}>
            <TouchableOpacity style={styles.buttonNext} onPress={onPressPrev}>
              <Image source={Images.arrowLeft} />
            </TouchableOpacity>
            <Text numberOfLines={1} style={styles.cameraName}>
              {amount === 1
                ? activeCamera?.configuration?.name
                : `${currentPage}/${data.length}`}
            </Text>
            <TouchableOpacity style={styles.buttonNext} onPress={onPressNext}>
              <Image source={Images.arrowLeft} style={styles.arrowRight} />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapCarousel}>{renderCarousel}</View>
          {renderAmount}
        </View>
      </View>
      <ModalFullVideo
        isVisible={isFullScreen}
        data={dataFullScreen}
        modalStyles={styles.modal}
        onClose={onClose}
      />
    </>
  );
};

export default AllCamera;
