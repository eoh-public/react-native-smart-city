import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
  memo,
} from 'react';
import { View, TouchableOpacity, Image, BackHandler } from 'react-native';
import { IconFill, IconOutline } from '@ant-design/icons-react-native';
import { Icon } from '@ant-design/react-native';

import { useTranslations } from '../../hooks/Common/useTranslations';
import styles from './Styles/indexStyles';
import Text from '../../commons/Text';
import AlertAction from '../../commons/AlertAction';
import _TextInput from '../../commons/Form/TextInput';
import WrapHeaderScrollable from '../../commons/Sharing/WrapHeaderScrollable';
import { API, Colors, Images } from '../../configs';
import { usePopover } from '../../hooks/Common';
import { useStateAlertAction } from './hooks';
import MenuActionMore from '../../commons/MenuActionMore';
import Add from '../../../assets/images/Add.svg';
import { useNavigation } from '@react-navigation/native';
import {
  axiosGet,
  axiosPost,
  axiosDelete,
  axiosPatch,
} from '../../utils/Apis/axios';
import FImage from '../../commons/FImage';
import Routes from '../../utils/Route';
import { ToastBottomHelper } from '../../utils/Utils';
import ItemAutomate from '../../commons/Automate/ItemAutomate';
import withPreventDoubleClick from '../../commons/WithPreventDoubleClick';
import { AUTOMATE_SELECT, AUTOMATE_TYPE } from '../../configs/Constants';
import { popAction } from '../../navigations/utils';
import { TESTID } from '../../configs/Constants';

const PreventDoubleTouch = withPreventDoubleClick(TouchableOpacity);

const ScriptDetail = ({ route }) => {
  const { navigate, goBack, dispatch } = useNavigation();
  const { params = {} } = route;
  const refMenuAction = useRef();
  const {
    childRef,
    showingPopover,
    showPopoverWithRef,
    hidePopover,
    hidingPopoverComplete,
    hidePopoverComplete,
  } = usePopover();
  const t = useTranslations();
  const {
    id,
    name = '',
    type,
    havePermission,
    unit,
    saveAt,
    isCreateScriptSuccess,
    isAutomateTab,
    isCreateNewAction,
    isMultiUnits,
  } = params;
  const [isStar, setIsStar] = useState(false);
  const [scriptName, setScriptName] = useState(name);
  const [inputName, setInputName] = useState(name);
  const [
    stateAlertAction,
    hideAlertAction,
    onShowRename,
    onShowActivityLog,
    onShowDelete,
  ] = useStateAlertAction();
  const [data, setData] = useState([]);

  const renameScript = useCallback(async () => {
    const { success, data: script } = await axiosPatch(
      API.AUTOMATE.SCRIPT(id),
      {
        name: inputName,
      }
    );
    success && setScriptName(script.name);
    hideAlertAction();
  }, [id, inputName, hideAlertAction]);

  const deleteScript = useCallback(async () => {
    hideAlertAction();
    const { success } = await axiosDelete(API.AUTOMATE.SCRIPT(id));
    success && goBack();
  }, [id, goBack, hideAlertAction]);

  const handleRenameOrDelete = useCallback(async () => {
    if (stateAlertAction.isDelete) {
      deleteScript();
    } else {
      renameScript();
    }
  }, [stateAlertAction.isDelete, deleteScript, renameScript]);

  const listMenuItem = useMemo(
    () => [
      { text: t('rename'), doAction: onShowRename(havePermission) },
      {
        text: t('activity_log'),
        doAction: onShowActivityLog(havePermission, id, type, unit),
      },
      {
        text: t('delete_script'),
        doAction: onShowDelete(scriptName, havePermission),
      },
    ],
    [
      t,
      onShowRename,
      havePermission,
      onShowActivityLog,
      id,
      type,
      unit,
      onShowDelete,
      scriptName,
    ]
  );

  const starScript = useCallback(async () => {
    const { success } = await axiosPost(API.AUTOMATE.STAR_SCRIPT(id));
    success && setIsStar(true);
  }, [id]);

  const unstarScript = useCallback(async () => {
    const { success } = await axiosPost(API.AUTOMATE.UNSTAR_SCRIPT(id));
    success && setIsStar(false);
  }, [id]);

  const onPressStar = useCallback(() => {
    if (isStar) {
      unstarScript();
    } else {
      starScript();
    }
  }, [isStar, starScript, unstarScript]);

  const handleShowMenuAction = useCallback(
    () => showPopoverWithRef(refMenuAction),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onItemClick = useCallback((item) => {
    item.doAction();
  }, []);

  const getScriptDetail = useCallback(async () => {
    const { success, data } = await axiosGet(API.AUTOMATE.SCRIPT(id));
    success && setData(data?.script_actions || []);
    success && setIsStar(data?.is_star);
  }, [id]);

  const onPressEdit = useCallback(() => {
    navigate(Routes.EditActionsList, { data, id, setData, unit });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onPressAddAction = useCallback(() => {
    const params = {
      unit,
      scriptName,
      automateId: id,
      type,
      isCreateNewAction: true,
      title: AUTOMATE_SELECT.SELECT_DEVICES,
    };
    navigate(
      isMultiUnits ? Routes.SelectUnit : Routes.SelectSensorDevices,
      params
    );
  }, [unit, scriptName, id, type, navigate, isMultiUnits]);

  const handleScriptAction = useCallback(async () => {
    const { success } = await axiosPost(API.AUTOMATE.ACTION_ONE_TAP(id));
    if (success) {
      ToastBottomHelper.success(t('Activated successfully.'));
    } else {
      ToastBottomHelper.error(t('Activation failed.'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleUpdateAutomate = useCallback(async () => {
    navigate(Routes.AddNewAutoSmart, {
      type: AUTOMATE_TYPE.AUTOMATE,
      automateId: id,
      unit,
      isAutomateTab,
      isMultiUnits,
      scriptName: name,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const onGoBack = useCallback(() => {
    if (isCreateScriptSuccess || isCreateNewAction) {
      dispatch(popAction(5));
      isAutomateTab && goBack();
    } else {
      goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateScriptSuccess]);

  const Item = useCallback(({ item, index }) => {
    return (
      <View style={styles.wrapItem}>
        <View style={styles.leftItem}>
          <Text color={Colors.Gray9} type="H4" semibold>
            {index + 1 < 10 ? '0' + (index + 1) : index + 1}
          </Text>
        </View>
        <View style={styles.rightItem}>
          <FImage
            source={{ uri: item?.sensor_icon_kit }}
            style={styles.iconItem}
          />
          <View style={styles.contentItem}>
            <View style={styles.titleItem}>
              <Text
                numberOfLines={1}
                semibold
                type="Label"
                color={Colors.Gray7}
                style={styles.paddingRight4}
              >
                {item?.unit_name}
              </Text>
              <Text numberOfLines={1} type="Label" color={Colors.Gray7}>
                {item?.station_name}
              </Text>
            </View>
            <Text numberOfLines={1} type="H4" color={Colors.Gray9} semibold>
              {item?.sensor_name}
            </Text>
            <Text numberOfLines={1} type="H4" color={Colors.Gray9}>
              {item?.action_name}
            </Text>
          </View>
        </View>
      </View>
    );
  }, []);

  const ItemAdd = useCallback(
    ({ item, index }) => {
      return (
        <View style={styles.wrapItem}>
          <View style={styles.leftItemAdd}>
            <Text style={styles.number} type="H4" semibold color={Colors.Gray7}>
              {index + 1 < 10 ? '0' + (index + 1) : index + 1}
            </Text>
          </View>
          <TouchableOpacity
            onPress={onPressAddAction}
            style={[styles.rightItemAdd]}
            testID={TESTID.BUTTON_ADD_SCRIPT_ACTION}
          >
            <Add />
            <Text type="H4" color={Colors.Gray8} style={styles.addAction}>
              {t('add_action')}
            </Text>
          </TouchableOpacity>
        </View>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scriptName]
  );

  const renderButtonStar = useMemo(() => {
    return (
      <PreventDoubleTouch
        style={[styles.buttonStar, styles.headerButton]}
        onPress={onPressStar}
        testID={TESTID.HEADER_DEVICE_BUTTON_STAR}
      >
        {isStar ? (
          <IconFill name="star" size={25} color={Colors.Yellow6} />
        ) : (
          <IconOutline name="star" size={25} />
        )}
      </PreventDoubleTouch>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStar]);

  const rightComponent = useMemo(
    () => (
      <View style={styles.rightComponent}>
        {renderButtonStar}
        <TouchableOpacity
          onPress={handleShowMenuAction}
          ref={refMenuAction}
          style={[styles.headerButton, styles.moreButton]}
        >
          <Icon name={'more'} size={27} color={Colors.Black} />
        </TouchableOpacity>
      </View>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isStar]
  );

  useEffect(() => {
    setScriptName(name);
  }, [name]);

  useEffect(() => {
    getScriptDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, saveAt]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => isCreateScriptSuccess
    );
    return () => backHandler.remove();
  }, [isCreateScriptSuccess]);
  const isHaveScriptActions = data?.length > 0;
  return (
    <View style={styles.wrap}>
      <WrapHeaderScrollable
        title={scriptName}
        headerAniStyle={styles.headerAniStyle}
        rightComponent={rightComponent}
        onGoBack={onGoBack}
      >
        <View style={styles.wrapContent}>
          <Text type="H3" semibold>
            {t('how_to_start')}
          </Text>
          <ItemAutomate
            type={type}
            onPress={handleUpdateAutomate}
            disabledOnPress={!havePermission}
          />
          {type === AUTOMATE_TYPE.ONE_TAP && (
            <TouchableOpacity
              onPress={handleScriptAction}
              style={styles.activeButton}
              testID={TESTID.BUTTON_ACTIVATE_ONE_TAP}
            >
              <Image source={Images.activeButton} />
            </TouchableOpacity>
          )}

          <View style={styles.row}>
            <Text type="H3" color={Colors.Gray9} semibold>
              {t('active_list')}
            </Text>
            {havePermission && isHaveScriptActions && (
              <TouchableOpacity
                onPress={onPressEdit}
                style={styles.editButton}
                testID={TESTID.BUTTON_EDIT_SCRIPT_ACTION}
              >
                <Text type="Label" hilight>
                  {t('edit')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {data.map((item, index) => (
            <Item key={item?.id} item={item} index={index} />
          ))}
          {havePermission && <ItemAdd index={data.length} />}
        </View>
      </WrapHeaderScrollable>
      <MenuActionMore
        isVisible={showingPopover}
        hideMore={hidePopover}
        hideComplete={hidePopoverComplete}
        listMenuItem={listMenuItem}
        childRef={childRef}
        onItemClick={onItemClick}
        isTextCenter={false}
        wrapStyle={styles.wrapStyle}
      />
      <AlertAction
        visible={stateAlertAction.visible && hidingPopoverComplete}
        hideModal={hideAlertAction}
        title={stateAlertAction.title}
        message={stateAlertAction.message}
        leftButtonTitle={stateAlertAction.leftButton}
        leftButtonClick={hideAlertAction}
        rightButtonTitle={stateAlertAction.rightButton}
        rightButtonClick={handleRenameOrDelete}
        rightButtonStyle={{ color: stateAlertAction.rightColor }}
      >
        {!stateAlertAction.isDelete && havePermission && (
          <_TextInput
            onChange={(text) => setInputName(text)}
            defaultValue={scriptName}
            textInputStyle={styles.textInput}
          />
        )}
      </AlertAction>
    </View>
  );
};

export default memo(ScriptDetail);
