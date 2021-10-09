import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
  memo,
} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
} from 'react-native';
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
import { AUTOMATE_TYPE } from '../../configs/Constants';
import { popAction } from '../../navigations/utils';

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
    dateNow = null,
    isCreateScriptSuccess,
  } = params;
  const [isFavourite, setIsFavourite] = useState(false);
  const [scriptName, setScriptName] = useState(name);
  const [inputName, setInputName] = useState(name);
  const [stateAlertAction, hideAlertAction, onShowRename, onShowDelete] =
    useStateAlertAction();
  const [data, setData] = useState([]);

  const renameScript = useCallback(async () => {
    const { success, data: script } = await axiosPatch(
      API.AUTOMATE.SCRIPT(id),
      {
        name: inputName,
      }
    );
    if (success) {
      setScriptName(script.name);
    }
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

  const goToActivityLog = useCallback(() => {
    navigate(Routes.ActivityLog, {
      id: id,
      type:
        type === AUTOMATE_TYPE.ONE_TAP
          ? `automate.${AUTOMATE_TYPE.ONE_TAP}`
          : 'automate',
      share: unit,
    });
  }, [navigate, id, unit, type]);

  const listMenuItem = useMemo(
    () => [
      { text: t('rename'), doAction: onShowRename },
      { text: t('activity_log'), doAction: goToActivityLog },
      { text: t('delete_script'), doAction: onShowDelete(scriptName) },
    ],
    [t, onShowRename, onShowDelete, goToActivityLog, scriptName]
  );

  const onPressFavourite = useCallback(() => {
    setIsFavourite(!isFavourite);
  }, [isFavourite]);

  const handleShowMenuAction = useCallback(
    () => showPopoverWithRef(refMenuAction),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onItemClick = useCallback((item) => {
    item.doAction();
  }, []);

  const getOneTapDetail = useCallback(async () => {
    const { success, data } = await axiosGet(API.AUTOMATE.SCRIPT(id));
    success && setData(data?.script_actions || []);
  }, [id]);

  const onPressEdit = useCallback(() => {
    navigate(Routes.EditActionsList, { data, id, setData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onPressAddAction = useCallback(() => {
    navigate(Routes.SelectSensorDevices, {
      unit,
      automateId: id,
      scriptName: name,
      isScript: false,
      type: AUTOMATE_TYPE.ONE_TAP,
    });
  }, [navigate, id, name, unit]);

  const handleScriptAction = useCallback(async () => {
    const { success } = await axiosPost(API.AUTOMATE.ACTION_ONE_TAP(id));
    if (success) {
      ToastBottomHelper.success(t('Activated successfully.'));
    } else {
      ToastBottomHelper.error(t('Activation failed.'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onGoBack = useCallback(() => {
    if (isCreateScriptSuccess) {
      dispatch(popAction(5));
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
            <Text numberOfLines={1} type="Label" color={Colors.Gray7}>
              {item?.station_name}
            </Text>
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

  const ItemAdd = useCallback(({ item, index }) => {
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
        >
          <Add />
          <Text type="H4" color={Colors.Gray8} style={styles.addAction}>
            {t('add_action')}
          </Text>
        </TouchableOpacity>
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderButtonStar = useMemo(() => {
    return (
      <TouchableOpacity
        style={[styles.buttonStar, styles.headerButton]}
        onPress={onPressFavourite}
      >
        {isFavourite ? (
          <IconFill name="star" size={25} color={Colors.Yellow6} />
        ) : (
          <IconOutline name="star" size={25} />
        )}
      </TouchableOpacity>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFavourite]);

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
    [isFavourite]
  );

  useEffect(() => {
    getOneTapDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dateNow]); // TODO will remove dateNow later

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => isCreateScriptSuccess
    );
    return () => backHandler.remove();
  }, [isCreateScriptSuccess]);

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
            onPress={() => Alert.alert(t('feature_under_development'))}
            disabledOnPress={!havePermission}
          />
          {type === AUTOMATE_TYPE.ONE_TAP && (
            <TouchableOpacity
              onPress={handleScriptAction}
              style={styles.activeButton}
            >
              <Image source={Images.activeButton} />
            </TouchableOpacity>
          )}

          <View style={styles.row}>
            <Text type="H3" color={Colors.Gray9} semibold>
              {t('active_list')}
            </Text>
            {havePermission && (
              <TouchableOpacity onPress={onPressEdit} style={styles.editButton}>
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
      >
        {!stateAlertAction.isDelete && (
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
