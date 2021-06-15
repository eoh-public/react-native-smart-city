import React, { memo, useCallback, useMemo } from 'react';
import { t } from 'i18n-js';
import Routes from '../../utils/Route';
import { useNavigation } from '@react-navigation/native';
import MenuActionMore from '../../commons/MenuActionMore';

const MoreMenu = memo(
  ({ unit, isOwner, hidePopover, childRef, showingPopover }) => {
    const navigation = useNavigation();

    const onItemClick = useCallback(
      ({ route: routeName, data }) => {
        hidePopover();
        routeName && navigation.navigate(routeName, data);
      },
      [hidePopover, navigation]
    );

    const listMenuItem = useMemo(() => {
      const RouteManageUnit = {
        route: Routes.ManageUnit,
        text: t('manage_unit'),
        data: { unitId: unit.id, unit },
      };
      const RouteUnitMemberList = {
        route: Routes.UnitMemberList,
        text: t('members'),
        data: { unitId: unit.id, unit },
      };
      return isOwner
        ? [RouteManageUnit, RouteUnitMemberList]
        : [RouteUnitMemberList];
    }, [unit, isOwner]);

    return (
      <MenuActionMore
        isVisible={showingPopover}
        hideMore={hidePopover}
        listMenuItem={listMenuItem}
        childRef={childRef}
        onItemClick={onItemClick}
      />
    );
  }
);

export default MoreMenu;
