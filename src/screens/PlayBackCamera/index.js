import moment from 'moment';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

import { HeaderCustom } from '../../commons/Header';
import styles from './Styles';
import { useRoute } from '@react-navigation/native';
import { ModalCustom } from '../../commons/Modal';
import { Colors, Images } from '../../configs';
import { useTranslations } from '../../hooks/Common/useTranslations';
import Text from '../../commons/Text';
import Timer from './Timer';
import { useStatusBarPreview } from '../../hooks/Common/useStatusBar';
import MediaPlayerFull from '../../commons/MediaPlayerDetail/MediaPlayerFull';

let dateTemp = moment().format('YYYY-MM-DD');

const PlayBackCamera = () => {
  const now = useMemo(() => moment().format('YYYY-MM-DD'), []);
  const hourTemp = useMemo(() => moment().format('HH:mm:ss'), []);
  const arrHourTemp = useMemo(() => hourTemp.split(':'), [hourTemp]);
  const t = useTranslations();
  const { params = {} } = useRoute();
  const { item = {}, thumbnail } = params;
  const [selected, setSelected] = useState(dateTemp);
  const [isShowDate, setIsShowDate] = useState(false);
  const [hour, setHour] = useState({
    h: arrHourTemp[0],
    m: arrHourTemp[1],
    s: arrHourTemp[2],
  });
  const [uri, setUri] = useState(item?.configuration?.uri);
  const [paused, setPaused] = useState(true);
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
    if (selected !== now) {
      const date = moment(selected).add(1, 'days').format('YYYY-MM-DD');
      setSelected(date);
      dateTemp = date;
    }
  }, [selected, now]);

  const onSubtractDate = useCallback(() => {
    const date = moment(selected).subtract(1, 'days').format('YYYY-MM-DD');
    setSelected(date);
    dateTemp = date;
  }, [selected]);

  const onChangeValue = (value, selected) => {
    const currentTime =
      parseFloat(arrHourTemp[0]) +
      parseFloat(arrHourTemp[1] / 60) +
      parseFloat(arrHourTemp[2] / 3600);
    setPaused(true);
    const t1 = value / 96;
    const t2 = t1.toString().split('.');
    const t3 = parseFloat('0.' + t2[1]) * 60;
    const t4 = t3.toString().split('.');
    const t5 = parseInt(parseFloat('0.' + t4[1]) * 60, 10);
    const h = t2[0] < 10 ? '0' + t2[0] : t2[0];
    const m = t4[0] < 10 ? '0' + t4[0] : t4[0];
    const s = t5 < 10 ? '0' + t5 : t5;
    setHour({ h, m, s });
    if (value + 0.5 > currentTime * 96 && selected === now) {
      setUri(item?.configuration?.uri);
    } else {
      const playback = item?.configuration?.playback || '';
      const date = selected.split('-');
      setUri(
        `${playback.split('=')[0]}=${date[0]}${date[1]}${date[2]}T${h}${m}${s}Z`
      );
    }
    const to = setTimeout(() => {
      setPaused(false);
      clearTimeout(to);
    }, 300);
  };

  useEffect(() => {
    setPaused(true);
    const date = selected.split('-');
    const playback = item?.configuration?.playback || '';
    if (
      selected === now &&
      parseInt(moment().format('HH:mm:ss'), 10) <=
        parseInt(`${hour.h}:${hour.m}:${hour.s}`, 10)
    ) {
      setUri(item?.configuration?.uri);
    } else {
      setUri(
        `${playback.split('=')[0]}=${date[0]}${date[1]}${date[2]}T${hour.h}${
          hour.m
        }${hour.s}Z`
      );
    }
    const to = setTimeout(() => {
      setPaused(false);
      clearTimeout(to);
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useStatusBarPreview(
      isShowDate ? Colors.BlackTransparent4 : Colors.TextTransparent
    );
  }, [isShowDate]);

  useEffect(() => {
    return () => (dateTemp = moment().format('YYYY-MM-DD'));
  }, []);

  return (
    <View style={styles.wrap}>
      <HeaderCustom title={t('video_detail')} />
      <MediaPlayerFull
        uri={uri}
        isPaused={paused}
        thumbnail={thumbnail}
        isShowFullScreenIcon
        cameraName={item?.configuration?.name}
        amount={1}
      />
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
            value={
              (parseFloat(arrHourTemp[0]) +
                parseFloat(arrHourTemp[1] / 60) +
                parseFloat(arrHourTemp[2] / 3600)) *
              96
            }
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
            selected={selected}
          />
        </View>
      </View>

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
