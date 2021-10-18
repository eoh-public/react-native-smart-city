import React, { memo, useState, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import styles from './StatesGridActionTemplateStyles';
import SelectActionCard from '../SelectActionCard';
import Text from '../Text';
import { TESTID } from '../../configs/Constants';
import { useTranslations } from '../../hooks/Common/useTranslations';

const StatesGridActionTemplate = memo(({ data, onSelectAction }) => {
  const t = useTranslations();
  const [visible, setVisible] = useState(false);
  const [actionName, setActionName] = useState(null);
  const onClose = () => setVisible(false);
  const onPress = () => setVisible(true);
  const { title, configuration, template } = data;
  const { options } = configuration;

  const hanleSelectAction = useCallback(
    (item) => {
      setActionName(item.text);
      onSelectAction &&
        onSelectAction({
          action: item.action,
          data: null,
          template,
        });
      setVisible(false);
    },
    [setVisible, onSelectAction, template]
  );

  return (
    <View>
      <SelectActionCard
        onPress={onPress}
        action={actionName}
        title={title || t('mode')}
      />

      <Modal
        isVisible={visible}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
      >
        <View style={styles.popoverStyle}>
          <View style={styles.modalContent}>
            {options.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => hanleSelectAction(item)}
                testID={TESTID.STATES_GRID_ACTION_GRID_ITEM}
              >
                <Text type="H4" style={styles.textwithline}>
                  {item.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
});

export default StatesGridActionTemplate;
