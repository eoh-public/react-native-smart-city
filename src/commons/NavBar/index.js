import React, { memo, useRef } from 'react';
import { Icon } from '@ant-design/react-native';
import { View, TouchableOpacity } from 'react-native';

import styles from './NavBarStyles';
import { usePopover } from '../../hooks/Common';
import { Colors } from '../../configs';
import { TESTID } from '../../configs/Constants';
import Station from '../../screens/Unit/Station';
import MenuActionMore from '../MenuActionMore';

const NavBar = memo(
  ({ listMenuItem, listStation, onSnapToItem, indexStation, style }) => {
    const { childRef, showingPopover, showPopoverWithRef, hidePopover } =
      usePopover();
    const refMenuAction = useRef();
    const handleShowMenuAction = () => showPopoverWithRef(refMenuAction);

    return (
      <>
        <View style={[styles.wrap, style]}>
          <View style={styles.wrapTitle}>
            <Station
              listStation={listStation}
              onSnapToItem={onSnapToItem}
              indexStation={indexStation}
            />
          </View>
          <TouchableOpacity
            style={styles.btnBack}
            onPress={handleShowMenuAction}
            ref={refMenuAction}
            testID={TESTID.NAVBAR_ICON_BARS}
          >
            <Icon name={'bars'} size={19} color={Colors.Black} />
          </TouchableOpacity>
        </View>
        <MenuActionMore
          isVisible={showingPopover}
          hideMore={hidePopover}
          listMenuItem={listMenuItem}
          childRef={childRef}
          onItemClick={onSnapToItem}
          isTextCenter={false}
          testID={TESTID.NAVBAR_MENU_ACTION_MORE}
          wrapStyle={styles.wrapStyle}
        />
      </>
    );
  }
);
export default NavBar;
