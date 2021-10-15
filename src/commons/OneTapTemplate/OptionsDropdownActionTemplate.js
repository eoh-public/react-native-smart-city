import React, { memo, useState, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import { useTranslations } from '../../hooks/Common/useTranslations';
import { RadioCircle } from '..';
import styles from './OptionsDropdownActionTemplateStyles';
import { Colors } from '../../configs';
import SelectActionCard from '../SelectActionCard';
import Text from '../Text';
import { TESTID } from '../../configs/Constants';

const OptionsDropdownActionTemplate = memo(({ data, onSelectAction }) => {
  const t = useTranslations();
  const [visible, setVisible] = useState(false);
  const [actionName, setActionName] = useState(null);
  const [activeAction, setActiveAction] = useState();
  const onClose = () => setVisible(false);
  const onPress = () => setVisible(true);
  const { title, configuration, template } = data;
  const { options, action } = configuration;

  const handleOnPressItem = useCallback(
    (item, index) => {
      setActiveAction(index);
      setActionName(item.text);
    },
    [setActiveAction]
  );

  const onPressDone = useCallback(() => {
    onSelectAction &&
      onSelectAction({
        action,
        data: {
          airFlow: {
            windStrength: options[activeAction]?.value_text,
          },
        },
        template,
      });
    setVisible(false);
  }, [onSelectAction, setVisible, activeAction, action, template, options]);

  return (
    <View>
      <SelectActionCard
        onPress={onPress}
        action={actionName}
        title={title ? title : t('options')}
      />

      <Modal
        isVisible={visible}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
      >
        <View style={styles.popoverStyle}>
          <View>
            <Text type="H4" bold style={styles.textwithline}>
              {title ? title : t('options')}
            </Text>
            <View style={styles.wrapContent}>
              {options.map((item, index) => (
                <View style={styles.lineBottom} key={index}>
                  <TouchableOpacity
                    style={styles.flexRow}
                    onPress={() => handleOnPressItem(item, index)}
                    testID={TESTID.OPTIONS_DROPDOWN_ACTION_CHOOSING_ITEM}
                  >
                    <RadioCircle active={index === activeAction} />
                    <Text type="H4" style={styles.textContent}>
                      {item.text}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
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
                testID={TESTID.OPTIONS_DROPDOWN_ACTION_DONE}
                disabled={activeAction ? false : true}
              >
                <Text
                  type="H4"
                  bold
                  color={activeAction ? Colors.Primary : Colors.Disabled}
                  style={styles.textButton}
                >
                  {t('done')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
});

export default OptionsDropdownActionTemplate;
