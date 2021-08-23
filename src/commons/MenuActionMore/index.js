import React, { memo, useCallback, useEffect } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import Popover from 'react-native-popover-view';

import styles from './MenuActionMoreStyles';
import Text from '../Text';
import { TESTID } from '../../configs/Constants';
import { useStatusBarPreview } from '../../hooks/Common/useStatusBar';
import { Colors } from '../../configs';

const MenuActionMore = memo(
  ({
    isVisible,
    hideMore,
    listMenuItem,
    childRef,
    onItemClick,
    wrapStyle,
    isTextCenter = true,
  }) => {
    const onPress = useCallback(
      (item, index) => {
        hideMore && hideMore();
        onItemClick && onItemClick(item, index);
      },
      [hideMore, onItemClick]
    );

    useEffect(() => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useStatusBarPreview(
        isVisible ? Colors.BlackTransparent5 : Colors.TextTransparent
      );
    }, [isVisible]);

    return (
      <Popover
        popoverStyle={[styles.menuStyle, wrapStyle]}
        placement="bottom"
        from={childRef}
        onRequestClose={hideMore}
        isVisible={isVisible}
        arrowStyle={styles.wrap}
      >
        <ScrollView>
          {listMenuItem.map((item, index) => {
            return (
              <TouchableOpacity
                style={[
                  styles.menuWrapper,
                  isTextCenter ? styles.modalHeaderCenter : styles.modalHeader,
                ]}
                onPress={() => onPress(item, index)}
                key={index}
                testID={TESTID.TOUCHABLE_ACTION_ADD_MORE}
              >
                <Text style={styles.modalHeaderText}>{item.text}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Popover>
    );
  }
);
export default MenuActionMore;
