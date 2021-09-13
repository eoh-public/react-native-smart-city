import React, { memo } from 'react';
import { View, TextInput } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { useTranslations } from '../../../../hooks/Common/useTranslations';

import { Colors } from '../../../../configs';
import styles from './SearchBarLocationStyles';

const SearchBarLocation = memo(({ input, onTextInput }) => {
  const t = useTranslations();
  return (
    <View style={styles.container}>
      <IconOutline
        name="search"
        size={24}
        color={Colors.Gray6}
        accessibilityLabel="icon-search"
        style={styles.icon}
      />
      <TextInput
        style={styles.textInput}
        value={input}
        onChangeText={onTextInput}
        placeholder={t('choose_location')}
        placeholderTextColor={Colors.Gray6}
        underlineColorAndroid={null}
      />
    </View>
  );
});

export default SearchBarLocation;
