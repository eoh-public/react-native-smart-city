import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ModalCustom } from '.';
import styles from './Styles/ModalBottomStyles';
import Text from '../Text';
import { useTranslations } from '../../hooks/Common/useTranslations';
import { Colors } from '../../configs';
import { useStatusBarPreview } from '../../hooks/Common/useStatusBar';

const ModalBottom = ({
  isVisible,
  title = '',
  modalStyle,
  wrapStyle,
  children,
  cancelColor = Colors.Primary,
  removeColor = Colors.Primary,
  onClose,
  onRemove,
}) => {
  const t = useTranslations();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useStatusBarPreview(
      isVisible ? Colors.BlackTransparent5 : Colors.TextTransparent
    );
  }, [isVisible]);

  return (
    <ModalCustom isVisible={isVisible} style={[styles.modal, modalStyle]}>
      <View style={[styles.wrap, wrapStyle]}>
        <Text type="H4" semibold color={Colors.Gray9} style={styles.padding16}>
          {title}
        </Text>
        <View style={styles.viewSeparated} />
        {children}
        <View style={styles.viewBottom}>
          <Text onPress={onClose} type="H4" semibold color={cancelColor}>
            {t('cancel')}
          </Text>
          <Text onPress={onRemove} type="H4" semibold color={removeColor}>
            {t('remove')}
          </Text>
        </View>
      </View>
    </ModalCustom>
  );
};

export default ModalBottom;
