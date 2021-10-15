import React, { memo, useState, useCallback } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

import { useTranslations } from '../../hooks/Common/useTranslations';
import styles from './ActionTemplateStyles';
import OnOffButtonAction from './OnOffButtonAction';
import OneButtonAction from './OneButtonAction';
import ThreeButtonAction from './ThreeButtonAction';
import OnOffSimpleAction from './OnOffSimpleAction';
import SelectActionCard from '../SelectActionCard';

const ActionTemplate = memo(({ data, onSelectAction }) => {
  const t = useTranslations();
  const [visible, setVisible] = useState(false);
  const onClose = () => setVisible(false);
  const onPress = () => setVisible(true);
  const [actionName, setActionName] = useState();

  const onPressSelectAction = useCallback(
    (action) => {
      setVisible(false);
      setActionName(action?.name);
      onSelectAction &&
        onSelectAction({
          action: action?.action,
          data: null,
          template: action?.template,
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
          case 'OnOffSimpleActionTemplate':
            return (
              <OnOffSimpleAction {...item} onPress={onPressSelectAction} />
            );
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
        title={t(data[0]?.title === 'Power' ? 'power' : 'action')}
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
