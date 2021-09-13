import MenuActionAddnew from '../../commons/MenuActionAddnew';
import React, { memo, useCallback, useMemo } from 'react';
import { useTranslations } from '../../hooks/Common/useTranslations';
import Routes from '../../utils/Route';
import AddSubUnitIcon from '../../../assets/images/Popover/Dashboard/AddSubUnit.svg';
import AddDeviceIcon from '../../../assets/images/Popover/Dashboard/AddDevice.svg';
import AddMemberIcon from '../../../assets/images/Popover/Dashboard/AddMember.svg';
import { useNavigation } from '@react-navigation/native';

const AddMenu = memo(({ unit, afterItemClick, showAdd, setHideAdd }) => {
  const t = useTranslations();
  const navigation = useNavigation();

  const onItemClick = useCallback(
    ({ route: routeName, data }) => {
      setHideAdd(true);
      afterItemClick();
      routeName && navigation.navigate(routeName, data);
    },
    [setHideAdd, afterItemClick, navigation]
  );

  const listItem = useMemo(() => {
    return [
      {
        id: 1,
        route: Routes.AddSubUnitStack,
        text: t('sub_unit'),
        image: <AddSubUnitIcon width={43} height={43} />,
        data: { screen: Routes.AddSubUnit, params: { unit } },
      },
      {
        id: 2,
        route: Routes.AddDeviceStack,
        text: t('device'),
        image: <AddDeviceIcon width={43} height={43} />,
        data: { screen: Routes.AddNewDevice, params: { unit_id: unit.id } },
      },
      {
        id: 3,
        route: Routes.AddMemberStack,
        text: t('member'),
        image: <AddMemberIcon width={43} height={43} />,
        data: { screen: Routes.SharingSelectPermission, params: { unit } },
      },
      {
        id: 4,
        route: Routes.AddGatewayStack,
        text: t('gateway'),
        image: <AddDeviceIcon width={43} height={43} />, // TODO change icon
        data: { screen: Routes.SetupGatewayWifi, params: { unit_id: unit.id } },
      },
    ];
  }, [t, unit]);

  const hideAddModal = useCallback(() => {
    setHideAdd(false);
  }, [setHideAdd]);

  return (
    <MenuActionAddnew
      visible={showAdd}
      hideModal={hideAddModal}
      dataActions={listItem}
      onItemClick={onItemClick}
    />
  );
});

export default AddMenu;
