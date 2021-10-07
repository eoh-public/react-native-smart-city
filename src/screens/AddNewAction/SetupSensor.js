import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from './Styles/SetupSensorStyles';
import WrapHeaderScrollable from '../../commons/Sharing/WrapHeaderScrollable';
import { Colors, Images } from '../../configs';
import { useTranslations } from '../../hooks/Common/useTranslations';
import { ModalCustom } from '../../commons/Modal';
import Text from '../../commons/Text';
import BottomButtonView from '../../commons/BottomButtonView';
import { HorizontalPicker } from '../../commons';
import { popAction } from '../../navigations/utils';
import { useStatusBarPreview } from '../../hooks/Common/useStatusBar';

const CONDITION_TYPES = {
  IS: 'IS',
  IS_BELOW: 'IS_BELOW',
  IS_ABOVE: 'IS_ABOVE',
};

const SetUpSensor = () => {
  const t = useTranslations();
  const modalData = useMemo(
    () => [
      {
        title: `${t('is_below')} (<)`,
        type: CONDITION_TYPES.IS_BELOW,
        conditionValue: '<',
      },
      {
        title: `${t('is')} (=)`,
        type: CONDITION_TYPES.IS,
        conditionValue: '=',
      },
      {
        title: `${t('is_above')} (>)`,
        type: CONDITION_TYPES.IS_ABOVE,
        conditionValue: '>',
      },
    ],
    [t]
  );

  const { goBack, dispatch } = useNavigation();
  const { params = {} } = useRoute();
  const { item, sensorData, setSensorData, isAutomateTab } = params;
  const isHasLimit = useMemo(() => !!item?.range_max, [item]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [itemActiveModal, setItemActiveModal] = useState(modalData[0]);
  const [value, setValue] = useState(parseFloat(item?.value || 0));
  const [minimum] = useState(isHasLimit ? parseInt(item?.range_min) : 0);
  const [maximum, setMaximum] = useState(
    value === 0
      ? 100
      : isHasLimit
      ? (parseInt(item?.range_max) - minimum) * 10 + minimum
      : (parseInt(item?.value) + 20 - minimum) * 10 + minimum
  );

  const onOpenModal = useCallback(() => {
    setIsShowModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setIsShowModal(false);
  }, []);

  const onChooseCondition = (item) => () => {
    setItemActiveModal(item);
    onCloseModal();
  };

  const handleClose = useCallback(() => {
    dispatch(popAction(4));
    isAutomateTab && goBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeValue = useCallback(
    (value) => {
      setValue(
        (parseFloat(value / 128) + parseFloat(minimum)).toFixed(
          item?.decimal_behind || 1
        )
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value]
  );

  const onSave = useCallback(() => {
    const dataTemp = [...sensorData];
    const index = dataTemp.findIndex((i) => i?.id === item?.id);
    dataTemp.splice(index, 1, { ...item, ...itemActiveModal, value });
    setSensorData(dataTemp);
    goBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemActiveModal, value, item, sensorData]);

  const rightComponent = useMemo(
    () => (
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Icon name={'close'} size={24} color={Colors.Black} />
      </TouchableOpacity>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const renderScroll = useMemo(() => {
    return (
      <HorizontalPicker
        minimum={minimum}
        maximum={maximum}
        segmentSpacing={8}
        segmentWidth={8}
        step={10}
        normalHeight={4}
        normalWidth={4}
        stepHeight={12}
        stepWidth={12}
        stepColor={Colors.Gray6}
        normalColor={Colors.Gray6}
        onChangeValue={onChangeValue}
        value={value - minimum}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minimum, maximum, value]);

  useEffect(() => {
    if (!isHasLimit && maximum - 150 <= value * 10) {
      setMaximum(maximum + 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (item?.title) {
      const itemTemp = modalData.find((i) => i.title === item.title);
      itemTemp && setItemActiveModal(itemTemp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useStatusBarPreview(
      isShowModal ? Colors.BlackTransparent4 : Colors.TextTransparent
    );
  }, [isShowModal]);

  return (
    <View style={styles.wrap}>
      <WrapHeaderScrollable
        title={t('set_up {name}', { name: item?.name })}
        headerAniStyle={styles.headerAniStyle}
        rightComponent={rightComponent}
      >
        <TouchableOpacity
          onPress={onOpenModal}
          style={[styles.itemCondition, styles.shadowView]}
        >
          <Text type="Body" color={Colors.Gray7}>
            {t('condition')}
          </Text>
          <Text
            type="H4"
            semibold
            style={styles.desciption}
          >{`${item?.name} ${itemActiveModal.title}`}</Text>
          <Image source={Images.arrowBack} style={styles.arrowRight} />
        </TouchableOpacity>
        <Text type="Body" color={Colors.Gray7} style={styles.setANumber}>
          {t('set_a_number')}
        </Text>
        <View style={[styles.flexRow, styles.center]}>
          <View>
            <Text style={styles.value}>{value}</Text>
            <View style={styles.underline} />
          </View>
          <Text type="H2" style={styles.unit}>
            {item?.unit}
          </Text>
        </View>
        {renderScroll}
      </WrapHeaderScrollable>
      <BottomButtonView
        style={styles.bottomButtonView}
        mainTitle={t('save')}
        onPressMain={onSave}
        typeMain={'primary'}
      />
      <ModalCustom
        onBackdropPress={onCloseModal}
        isVisible={isShowModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          {modalData.map((i, index) => (
            <>
              <TouchableOpacity
                onPress={onChooseCondition(i)}
                key={index}
                style={styles.itemModal}
              >
                <Text type="H4">{`${item?.name} ${i.title}`}</Text>
              </TouchableOpacity>
              {index !== modalData.length - 1 && (
                <View style={styles.separated} />
              )}
            </>
          ))}
        </View>
      </ModalCustom>
    </View>
  );
};

export default SetUpSensor;
