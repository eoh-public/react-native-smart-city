import React, { memo, useState, useCallback, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';

import { useTranslations } from '../../hooks/Common/useTranslations';
import styles from './NumberUpDownActionTemplateStyles';
import { Colors } from '../../configs';
import SelectActionCard from '../SelectActionCard';
import Text from '../Text';
import { useConfigGlobalState } from '../../iot/states';
import { TESTID } from '../../configs/Constants';
import { ModalCustom } from '../Modal';

const NumberUpDownActionTemplate = memo(({ data, onSelectAction }) => {
  const t = useTranslations();
  const [visible, setVisible] = useState(false);
  const onClose = () => setVisible(false);
  const onPress = () => setVisible(true);
  const { configuration, template, title } = data;
  const { config, text_format, min_value, max_value, action } = configuration;
  const [configValues] = useConfigGlobalState('configValues');
  const [value, setValue] = useState((config && configValues[config]) || 28);
  const [actionName, setActionName] = useState(null);

  useEffect(() => {
    if (!config) {
      return;
    }
    const configValue = configValues[config];
    if (configValue !== null && configValue !== undefined) {
      setValue(configValue);
    }
  }, [configValues, config]);

  const onPressDown = useCallback(() => {
    if (value > min_value) {
      setValue(value - 1);
    }
  }, [value, min_value]);

  const onPressUp = useCallback(() => {
    if (value < max_value) {
      setValue(value + 1);
    }
  }, [value, max_value]);

  const onPressDone = useCallback(() => {
    setActionName(text_format.replace('{number}', value));
    onSelectAction &&
      onSelectAction({
        action,
        data: {
          temperature: {
            targetTemperature: value,
            unit: 'C',
            locationName: 'FREEZER',
          },
        },
        template,
      });
    onClose();
  }, [text_format, value, action, template, onSelectAction]);

  return (
    <>
      <SelectActionCard
        onPress={onPress}
        action={actionName}
        title={title ? title : t('temperature')}
      />

      <ModalCustom
        isVisible={visible}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
      >
        <View style={styles.popoverStyle}>
          <View>
            <Text type="H4" bold style={styles.textwithline}>
              {t('set_temperature')}
            </Text>
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={onPressDown}
                testID={TESTID.NUMBER_UP_DOWN_ACTION_DOWN}
              >
                <IconOutline name="down" size={32} color={Colors.Primary} />
              </TouchableOpacity>
              <Text
                type="H2"
                bold
                style={styles.textTemperature}
                testID={TESTID.NUMBER_UP_DOWN_ACTION_TEXT}
              >
                {text_format.replace('{number}', value)}
              </Text>
              <TouchableOpacity
                onPress={onPressUp}
                testID={TESTID.NUMBER_UP_DOWN_ACTION_UP}
              >
                <IconOutline name="up" size={32} color={Colors.Primary} />
              </TouchableOpacity>
            </View>
            <View style={styles.wrapButton}>
              <TouchableOpacity onPress={onClose}>
                <Text
                  type="H4"
                  bold
                  color={Colors.Primary}
                  style={styles.textButton}
                >
                  {t('cancel')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onPressDone}
                testID={TESTID.NUMBER_UP_DOWN_ACTION_DONE}
              >
                <Text
                  type="H4"
                  bold
                  color={Colors.Primary}
                  style={styles.textButton}
                >
                  {t('done')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ModalCustom>
    </>
  );
});

export default NumberUpDownActionTemplate;
