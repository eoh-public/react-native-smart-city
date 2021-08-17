import React, { memo, useEffect, useMemo, useState } from 'react';
import { View, Text, LayoutAnimation, Platform, UIManager } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { Colors } from '../../../configs';
import styles from './Styles/SensorItemStyles';
import FImage from '../../../commons/FImage';
import { TitleCheckBox } from '.';

const SensorItem = ({
  item = {},
  isRenderSeparated,
  onTickedChild,
  titleGroup,
  activeItemId,
  setActiveItemId,
  idGroup,
}) => {
  const {
    id = '',
    name = '',
    actions = [],
    read_configs = [],
    icon_kit = '',
  } = item;
  const [expanded, setExpanded] = useState(activeItemId === id);
  const [dataConfig, setDataConfig] = useState([
    ...actions,
    ...read_configs.map((i) => ({ ...i, isConfig: true })),
  ]);

  const onPressItem = () => {
    setActiveItemId(id);
    if (activeItemId === id) {
      setExpanded(!expanded);
    } else {
      setExpanded(false);
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const handleOnTickedChild = (idGroup, isChecked, childId) => {
    const dataTemp = [...dataConfig];
    const indexTemp = dataTemp.findIndex((i) => i.id === childId);
    dataTemp.splice(indexTemp, 1, {
      ...dataTemp[indexTemp],
      isChecked,
    });
    setDataConfig(dataTemp);
    onTickedChild &&
      onTickedChild(
        idGroup,
        id,
        childId,
        isChecked,
        Boolean(dataTemp[indexTemp]?.isConfig)
      );
  };

  useEffect(() => {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const renderData = useMemo(() => {
    return dataConfig.map((item) => (
      <TitleCheckBox
        title={item.name}
        wrapCheckBoxStyle={styles.wrapCheckBoxStyle}
        onPress={handleOnTickedChild}
        isChecked={item.isChecked}
        id={item.id}
        titleStyle={styles.titleStyle}
        key={item.id}
        idGroup={idGroup}
      />
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataConfig]);

  return (
    <View style={[styles.wrap, !isRenderSeparated && styles.isRenderSeparated]}>
      <FImage
        source={{ uri: icon_kit }}
        style={styles.viewLeft}
        tintColor={
          dataConfig.some((item) => item.isChecked)
            ? Colors.Primary
            : Colors.Gray
        }
      />
      <View style={styles.wrapRight}>
        <View style={styles.viewRight}>
          <Text numberOfLines={1} style={styles.text} onPress={onPressItem}>
            {name}
          </Text>
          <IconOutline
            onPress={onPressItem}
            name={expanded ? 'up' : 'down'}
            size={20}
            color={Colors.Gray6}
          />
        </View>
        {expanded && <View style={styles.wrapExpand}>{renderData}</View>}
        {isRenderSeparated && <View style={styles.viewSeparated} />}
      </View>
    </View>
  );
};

export default memo(SensorItem);
