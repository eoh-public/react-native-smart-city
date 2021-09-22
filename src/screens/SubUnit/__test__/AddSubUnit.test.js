import React from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import { ImagePicker, ViewButtonBottom } from '../../../commons';
import { act, create } from 'react-test-renderer';
import Toast from 'react-native-toast-message';
import Routes from '../../../utils/Route';
import { TESTID } from '../../../configs/Constants';
import _TextInput from '../../../commons/Form/TextInput';
import AddSubUnit from '../AddSubUnit';
import { getTranslate } from '../../../utils/I18n';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = (route) => (
  <SCProvider initState={mockSCStore({})}>
    <AddSubUnit route={route} />
  </SCProvider>
);

const mockedNavigate = jest.fn();
const mockedDispatch = jest.fn();
const mockedGoBack = jest.fn();

jest.mock('axios');
jest.mock('react-native-toast-message');

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockedDispatch,
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
      goBack: mockedGoBack,
    }),
  };
});

describe('Test AddSubUnit', () => {
  let route;

  beforeEach(() => {
    route = {
      params: {
        unit: {
          id: 1,
          name: 'Unit name',
        },
      },
    };
  });

  afterEach(() => {
    mockedDispatch.mockClear();
    mockedNavigate.mockClear();
    Toast.show.mockClear();
    axios.post.mockClear();
  });
  let tree;

  test('onChoosePhoto show image picker', async () => {
    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const buttonChoosePhoto = instance.find(
      (el) =>
        el.props.testID === TESTID.ADD_SUB_UNIT_BUTTON_CHOOSE_PHOTO &&
        el.type === TouchableWithoutFeedback
    );
    const imagePicker = instance.findByType(ImagePicker);
    expect(imagePicker.props.showImagePicker).toEqual(false);
    await act(async () => {
      buttonChoosePhoto.props.onPress();
    });
    expect(imagePicker.props.showImagePicker).toEqual(true);
  });

  test('ImagePicker setImageUrl show wallpaper', async () => {
    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const imagePicker = instance.findByType(ImagePicker);
    let image = instance.findAllByType(Image);
    expect(image).toHaveLength(0);
    await act(async () => {
      await imagePicker.props.setImageUrl('https://picture.io');
    });
    image = instance.findAllByType(Image);
    expect(image).toHaveLength(1);
  });

  const makeValidateData = async (instance) => {
    const textInputRoomName = instance.findByType(_TextInput);
    const viewButtonBottom = instance.findByType(ViewButtonBottom);
    const imagePicker = instance.findByType(ImagePicker);

    expect(viewButtonBottom.props.rightDisabled).toEqual(true);

    await act(async () => {
      await textInputRoomName.props.onChange('Room 1');
    });
    await act(async () => {
      await imagePicker.props.setImageUrl('https://picture.io');
    });

    expect(viewButtonBottom.props.rightDisabled).toEqual(false);
    return viewButtonBottom;
  };

  test('onChangeRoomName and setImageUrl for validateData', async () => {
    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    await makeValidateData(instance);
  });

  test('ViewButtonBottom onLeftClick', async () => {
    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const viewButtonBottom = instance.findByType(ViewButtonBottom);

    await act(async () => {
      await viewButtonBottom.props.onLeftClick();
    });

    expect(mockedGoBack).toHaveBeenCalled();
  });

  test('validateData then send api success', async () => {
    const response = {
      status: 200,
      data: {},
    };

    axios.post.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const viewButtonBottom = await makeValidateData(instance);
    await act(async () => {
      await viewButtonBottom.props.onRightClick();
    });
    expect(axios.post).toHaveBeenCalled();
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.UnitStack, {
      screen: Routes.SubUnitDetail,
      params: {
        unit: route.params.unit,
        station: response.data,
      },
    });
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'success',
      position: 'bottom',
      text1: getTranslate('en', 'text_create_sub_unit_success'),
      visibilityTime: 1000,
    });
  });

  test('validateData then send api fail', async () => {
    const response = {
      data: {},
    };

    axios.post.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const viewButtonBottom = await makeValidateData(instance);
    await act(async () => {
      await viewButtonBottom.props.onRightClick();
    });
    expect(axios.post).toHaveBeenCalled();
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      position: 'bottom',
      text1: getTranslate('en', 'text_create_sub_unit_fail'),
      visibilityTime: 1000,
    });
  });
});
