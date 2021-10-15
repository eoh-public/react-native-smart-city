import React from 'react';
import { TouchableOpacity } from 'react-native';
import Text from '../Text';
import { useTranslations } from '../../hooks/Common/useTranslations';
import styles from './OnOffSimpleActionStyles';

const OnOffSimpleAction = ({ configuration, onPress, template }) => {
const t = useTranslations();
  const { action_on, action_off } = configuration;
  const onPressActionOn = () => {
    onPress &&
      onPress({
        name: t('text_on'),
        action: action_on,
        template,
      });
  };

  const onPressActionOff = () => {
    onPress &&
      onPress({
        name: t('text_off'),
        action: action_off,
        template,
      });
  };

  return (
    <>
      <TouchableOpacity onPress={onPressActionOn}>
        <Text type="H4" style={styles.textwithline}>
          {t('text_on')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressActionOff}>
        <Text type="H4" style={styles.textwithline}>
            {t('text_off')}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default OnOffSimpleAction;
