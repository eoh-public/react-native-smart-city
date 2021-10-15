import React, { memo, useState, useCallback } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

import { useTranslations } from '../../hooks/Common/useTranslations';
import styles from './ActionTemplateStyles';
import OnOffButtonAction from './OnOffButtonAction';
import OneButtonAction from './OneButtonAction';
import ThreeButtonAction from './ThreeButtonAction';
import SelectActionCard from '../SelectActionCard';

const ActionTemplate = memo(({ data, onSelectAction }) => {
  const t = useTranslations();
  const [visible, setVisible] = useState(false);
  const onClose = () => setVisible(false);
  const onPress = () => setVisible(true);
  const [actionName, setActionName] = useState(null);

  const onPressSelectAction = useCallback(
    (action) => {
      setVisible(false);
      setActionName(action.name);
      onSelectAction &&
        onSelectAction({
          action: action.action,
          data: null,
          template: action.template,
        });
    },
    [onSelectAction]
  );

  const renderAction = useCallback(
    (data) => {
      return data.map((item) => {
        switch (item.template) {
          case 'on_off_button_action_template':
            return (
              <OnOffButtonAction {...item} onPress={onPressSelectAction} />
            );
          case 'one_button_action_template':
            return <OneButtonAction {...item} onPress={onPressSelectAction} />;
          case 'three_button_action_template':
            return (
              <ThreeButtonAction {...item} onPress={onPressSelectAction} />
            );
          default:
            break;
        }
      });
    },
    [onPressSelectAction]
  );

  return (
    <>
      <SelectActionCard
        onPress={onPress}
        action={actionName}
        title={data[0].title === 'Power' ? t('power') : t('action')}
      />

      <Modal
        isVisible={visible}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
      >
        <View style={styles.popoverStyle}>
          <View style={styles.modalHeader}>{renderAction(data)}</View>
        </View>
      </Modal>
    </>
  );
});

export default ActionTemplate;
