import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity, Platform } from 'react-native';
import axios from 'axios';

import AddCommonSelectUnit from '../SelectUnit';
import Text from '../../../commons/Text';
import { TESTID } from '../../../configs/Constants';

jest.mock('axios');

const mockedGoBack = jest.fn();
const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
      goBack: mockedGoBack,
    }),
  };
});

describe('Test SelectUnit container', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
    mockedGoBack.mockClear();
  });
  let tree;
  const list_type = ['AddSubUnit', 'AddDevice', 'AddMember', 'AddLGDevice', ''];
  const result = [
    'Thêm khu vực',
    'Thêm thiết bị',
    'Chọn một địa điểm',
    'Chọn một địa điểm',
    'Thêm khu vực',
  ];
  list_type.forEach(function (type, i) {
    test(`create SelectUnit ${type} container`, () => {
      const route = { params: { addType: type } };
      act(() => {
        tree = renderer.create(<AddCommonSelectUnit route={route} />);
      });
      const instance = tree.root;
      const button = instance.findAllByType(TouchableOpacity);
      expect(button.length).toBe(2);
      const button1 = instance.findAllByType(Text);
      expect(button1[0].props.children).toEqual(result[i]);
    });
    test(`press next to navigate ${type}`, async () => {
      let route;
      if (type === 'AddLGDevice') {
        route = {
          params: {
            addType: type,
            code: 'CODE',
            backend_url: 'https%3A%2F%2Fdoamin.com%2F',
          },
        };
      } else {
        route = {
          params: { addType: type },
        };
      }
      const response = {
        status: 200,
        success: true,
        data: [
          { id: 1, name: 'Unit 1' },
          { id: 2, name: 'Unit 2' },
        ],
      };

      axios.get.mockImplementation(async () => {
        return response;
      });

      await act(async () => {
        tree = renderer.create(<AddCommonSelectUnit route={route} />);
      });

      const instance = tree.root;
      const selectUnit = instance.findAll(
        (item) => item.props.testID === TESTID.SELECT_UNIT_SELECT
      );
      await act(async () => {
        selectUnit[0].props.onPress();
      });

      const next = instance.find(
        (item) =>
          item.props.testID ===
          `${TESTID.PREFIX.SELECT_UNIT}${TESTID.VIEW_BUTTON_BOTTOM_RIGHT_BUTTON}`
      );

      await act(async () => {
        next.props.onPress();
      });

      switch (type) {
        case 'AddSubUnit':
          expect(mockedNavigate).toBeCalledWith('AddSubUnit', {
            unit: { id: 1, name: 'Unit 1' },
          });
          break;
        case 'AddDevice':
          expect(mockedNavigate).toBeCalledWith('AddNewDevice', { unit_id: 1 });
          break;
        case 'AddMember':
          expect(mockedNavigate).toBeCalledWith('SharingSelectPermission', {
            unit: { id: 1, name: 'Unit 1' },
          });
          break;
        case 'AddLGDevice':
          expect(mockedNavigate).toBeCalledWith('AddLGDevice', {
            code: 'CODE',
            backend_url: 'https://doamin.com/',
            unit_id: 1,
          });
          break;
        default:
          break;
      }
    });
  });
});

describe('test single SelectUnit', () => {
  let tree;

  beforeEach(() => {
    axios.get.mockClear();
  });

  test('fetch Unit success', async () => {
    Platform.OS = 'android';
    const route = { params: { addType: 'AddSubUnit' } };
    const response = {
      status: 200,
      success: true,
      data: [
        { id: 1, name: 'Unit 1' },
        { id: 2, name: 'Unit 2' },
      ],
    };

    axios.get.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = renderer.create(<AddCommonSelectUnit route={route} />);
    });

    const instance = tree.root;
    const unitName = instance.findAll(
      (item) =>
        item.props.testID === TESTID.SELECT_UNIT_NAME && item.type === Text
    );
    const radioButton = instance.findAll(
      (item) => item.props.testID === TESTID.SELECT_UNIT_RADIO_BUTTON
    );

    expect(unitName[0].props.children).toBe('Unit 1');
    expect(unitName[1].props.children).toBe('Unit 2');
    expect(radioButton[0].props.active).toBeFalsy();
    expect(radioButton[1].props.active).toBeFalsy();

    const selectUnit = instance.findAll(
      (item) => item.props.testID === TESTID.SELECT_UNIT_SELECT
    );

    await act(async () => {
      selectUnit[0].props.onPress();
    });

    expect(radioButton[0].props.active).toBeTruthy();
  });

  test('fetch Unit not success', async () => {
    Platform.OS = 'ios';
    const route = { params: { addType: 'AddSubUnit' } };
    const response = {
      status: 500,
      success: false,
    };

    axios.get.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = renderer.create(<AddCommonSelectUnit route={route} />);
    });

    const instance = tree.root;
    const unitName = instance.findAll(
      (item) =>
        item.props.testID === TESTID.SELECT_UNIT_NAME && item.type === Text
    );
    const radioButton = instance.findAll(
      (item) => item.props.testID === TESTID.SELECT_UNIT_RADIO_BUTTON
    );

    expect(unitName).toHaveLength(0);
    expect(radioButton).toHaveLength(0);
  });

  test('click goBack', async () => {
    const route = { params: { addType: 'AddSubUnit' } };
    await act(async () => {
      tree = renderer.create(<AddCommonSelectUnit route={route} />);
    });

    const instance = tree.root;
    const goBack = instance.find(
      (item) =>
        item.props.testID ===
        `${TESTID.PREFIX.SELECT_UNIT}${TESTID.VIEW_BUTTON_BOTTOM_LEFT_BUTTON}`
    );

    await act(async () => {
      goBack.props.onPress();
    });
    expect(mockedGoBack).toBeCalled();
  });
});
