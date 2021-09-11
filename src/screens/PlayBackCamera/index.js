import { Colors } from '../../configs';
import moment from 'moment';
import React, { useState, useCallback, useEffect } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { HeaderCustom } from '../../commons/Header';
import styles from './Styles';
import { useRoute } from '@react-navigation/core';
import MediaPlayerDetail from '../../commons/MediaPlayerDetail';
import { ModalFullVideo, ModalCustom } from '../../commons/Modal';
import Images from '../../configs/Images';
import { t } from 'i18n-js';
import Text from '../../commons/Text';
import Timer from './Timer';
import { useStatusBarPreview } from '../../hooks/Common/useStatusBar';

let dateTemp = moment().format('YYYY-MM-DD');
const arrDayTemp = dateTemp.split('-');

const PlayBackCamera = () => {
  const { params = {} } = useRoute();
  const { item = {}, thumbnail } = params;
  const [selected, setSelected] = useState(dateTemp);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [dataFullScreen, setDataFullScreen] = useState();
  const [isShowDate, setIsShowDate] = useState(false);
  const [hour, setHour] = useState({
    h: '00',
    m: '00',
    s: '00',
  });
  const [uri, setUri] = useState(
    `${(item?.configuration?.playback || '').split('=')[0]}${arrDayTemp[0]}${
      arrDayTemp[1]
    }${arrDayTemp[2]}T000000Z`
  );
  const [paused, setPaused] = useState(true);

  const handleFullScreen = (data) => {
    setIsFullScreen(true);
    setDataFullScreen(data);
  };

  const onClose = useCallback(() => {
    setIsFullScreen(false);
  }, []);

  const onOpenDateModal = useCallback(() => {
    setIsShowDate(true);
  }, []);

  const onPressCancel = useCallback(() => {
    setIsShowDate(false);
    setSelected(dateTemp);
  }, []);

  const onPressOk = useCallback(() => {
    setIsShowDate(false);
    dateTemp = selected;
  }, [selected]);

  const onAddDate = useCallback(() => {
    const date = moment(selected).add(1, 'days').format('YYYY-MM-DD');
    setSelected(date);
    dateTemp = date;
  }, [selected]);

  const onSubtractDate = useCallback(() => {
    const date = moment(selected).subtract(1, 'days').format('YYYY-MM-DD');
    setSelected(date);
    dateTemp = date;
  }, [selected]);

  const onChangeValue = (value) => {
    setPaused(true);
    const t1 = value / 96;
    const t2 = t1.toString().split('.');
    const t3 = parseFloat('0.' + t2[1]) * 60;
    const t4 = t3.toString().split('.');
    const t5 = parseInt(parseFloat('0.' + t4[1]) * 60, 10);
    setHour({
      h: t2[0] < 10 ? '0' + t2[0] : t2[0],
      m: t4[0] < 10 ? '0' + t4[0] : t4[0],
      s: t5 < 10 ? '0' + t5 : t5,
    });
  };

  useEffect(() => {
    const date = selected.split('-');
    const playback = item?.configuration?.playback;
    setUri(
      `${playback}${date[0]}${date[1]}${date[2]}T${hour.h}${hour.m}${hour.s}Z`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hour, selected]);

  useEffect(() => {
    const to = setTimeout(() => {
      setPaused(false);
    }, 300);
    return () => clearTimeout(to);
  }, [uri]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useStatusBarPreview(
      isShowDate ? Colors.BlackTransparent4 : Colors.TextTransparent
    );
  }, [isShowDate]);

  return (
    <View style={styles.wrap}>
      <HeaderCustom title={'Playback Camera'} />
      <View style={styles.wrapCamera}>
        <MediaPlayerDetail
          uri={uri}
          thumbnail={thumbnail}
          style={styles.camera}
          wrapStyles={styles.wrapStyles}
          resizeMode={'cover'}
          cameraName={item?.configuration?.name}
          amount={1}
          isShowFullScreenIcon
          handleFullScreen={handleFullScreen}
          isPaused={paused}
        />
      </View>

      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={onSubtractDate}
            style={styles.commomButton}
          >
            <Image source={Images.arrowLeft} />
          </TouchableOpacity>
          <Text onPress={onOpenDateModal} style={styles.textDate} type="h4">
            {moment(selected).format('DD/MM/YYYY')}
          </Text>
          <TouchableOpacity
            onPress={onOpenDateModal}
            style={styles.commomButton}
          >
            <Image source={Images.file} style={styles.iconDate} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onAddDate} style={styles.commomButton}>
            <Image source={Images.arrowLeft} style={styles.arrowRight} />
          </TouchableOpacity>
        </View>
        <Text
          type="Body"
          color={Colors.Gray8}
        >{`${hour.h}:${hour.m}:${hour.s}`}</Text>
        <View style={styles.timer}>
          <Timer
            minimum={0}
            maximum={144}
            segmentSpacing={14}
            segmentWidth={2}
            step={6}
            normalHeight={8}
            stepHeight={16}
            stepColor={Colors.Gray7}
            normalColor={Colors.Gray7}
            indicatorHeight={40}
            onChangeValue={onChangeValue}
          />
        </View>
      </View>

      <ModalFullVideo
        isVisible={isFullScreen}
        data={dataFullScreen}
        modalStyles={styles.modal}
        onClose={onClose}
      />

      <ModalCustom isVisible={isShowDate} style={styles.modal}>
        <View style={styles.wrapDate}>
          <Calendar
            onDayPress={(day) => {
              setSelected(day.dateString);
            }}
            maxDate={moment().format('YYYY-MM-DD')}
            onMonthChange={(month) => {}}
            onPressArrowLeft={(subtractMonth) => subtractMonth()}
            onPressArrowRight={(addMonth) => addMonth()}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: Colors.Primary,
                selectedTextColor: Colors.White,
              },
            }}
            enableSwipeMonths={true}
            renderArrow={(direction) => {
              if (direction === 'left') {
                return <Image source={Images.arrowLeft} />;
              }
              return (
                <Image source={Images.arrowLeft} style={styles.arrowRight} />
              );
            }}
            headerStyle={styles.headerStyle}
          />
          <View style={styles.viewSeparated} />
          <View style={styles.wrapBottomButton}>
            <TouchableOpacity
              onPress={onPressCancel}
              style={styles.commomButton}
            >
              <Text type="h4" semibold hilight>
                {t('cancel')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressOk} style={styles.commomButton}>
              <Text type="h4" semibold hilight>
                {t('done')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalCustom>
    </View>
  );
};

export default PlayBackCamera;
