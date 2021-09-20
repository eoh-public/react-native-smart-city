import React, { memo, useState, useCallback } from 'react';
import { View } from 'react-native';
import { useTranslations } from '../../hooks/Common/useTranslations';

import Picker from '../WheelDateTimePicker/Picker';
import BottomSheet from '../BottomSheet';
import ViewButtonBottom from '../ViewButtonBottom';

import styles from './styles';
import { range } from '../../utils/Converter/array';

const BottomScrollPicker = ({ isVisible, onPicked, onHide, min, max }) => {
  const t = useTranslations();
  const [number, setNumber] = useState(min);

  const numberData = range(min, max, 1).map((item) => ({
    text: item,
    value: item,
  }));

  const onChangeNumber = useCallback(
    (data, _) => {
      setNumber(data.value);
    },
    [setNumber]
  );

  const onCancel = useCallback(() => {
    onHide && onHide();
  }, [onHide]);

  const onDone = useCallback(() => {
    onPicked && onPicked(number);
    onHide && onHide();
  }, [number, onHide, onPicked]);

  return (
    <BottomSheet isVisible={isVisible} onHide={onCancel} title={t('set_hour')}>
      <View style={styles.container}>
        <Picker
          dataSource={numberData}
          selectedIndex={0}
          onValueChange={onChangeNumber}
          keyPrefix="hour"
          style={styles.picker}
        />
      </View>
      <ViewButtonBottom
        leftTitle={t('cancel')}
        onLeftClick={onCancel}
        rightTitle={t('done')}
        onRightClick={onDone}
      />
    </BottomSheet>
  );
};

export default memo(BottomScrollPicker);
