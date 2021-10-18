import React from 'react';
import { TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';
import FilterPopup from '../FilterPopup';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import RadioCircle from '../../../commons/RadioCircle';
import { TESTID } from '../../../configs/Constants';
import BottomButtonView from '../../../commons/BottomButtonView';
import DateTimeRangeChange from '../../../commons/DateTimeRangeChange';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const wrapComponent = (props) => (
  <SCProvider initState={mockSCStore({})}>
    <FilterPopup {...props} />
  </SCProvider>
);

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
  };
});

test('test FilterPopup', async () => {
  Date.now = jest.fn(() => new Date('2021-09-09T10:00:00.000Z'));
  const mockOnHide = jest.fn();
  const mockOnApply = jest.fn();
  let tree;
  let props = {
    isVisible: true,
    members: [
      { id: 0, name: 'all', phone_number: null, email: null },
      { id: 1, name: null, phone_number: '123', email: null },
      { id: 2, name: null, phone_number: null, email: 'email' },
    ],
    filters: {
      users: [],
    },
    onHide: mockOnHide,
    onApply: mockOnApply,
  };

  await act(async () => {
    tree = await create(wrapComponent(props));
  });
  const instance = tree.root;
  const radioCircles = instance.findAllByType(RadioCircle);
  const itemButtons = instance.findAll(
    (el) =>
      el.props.testID === TESTID.ITEM_USER_FILTER &&
      el.type === TouchableOpacity
  );
  const bottomButtonView = instance.findByType(BottomButtonView);

  expect(radioCircles[0].props.active).toBeTruthy();
  expect(radioCircles[1].props.active).toBeFalsy();
  expect(radioCircles[2].props.active).toBeFalsy();

  // click all
  await act(async () => {
    await itemButtons[0].props.onPress();
  });
  expect(radioCircles[0].props.active).toBeTruthy();
  expect(radioCircles[1].props.active).toBeFalsy();
  expect(radioCircles[2].props.active).toBeFalsy();

  // click 1
  await act(async () => {
    await itemButtons[1].props.onPress();
  });
  expect(radioCircles[0].props.active).toBeFalsy();
  expect(radioCircles[1].props.active).toBeTruthy();
  expect(radioCircles[2].props.active).toBeFalsy();

  // click 2
  await act(async () => {
    await itemButtons[2].props.onPress();
  });
  expect(radioCircles[0].props.active).toBeFalsy();
  expect(radioCircles[1].props.active).toBeTruthy();
  expect(radioCircles[2].props.active).toBeTruthy();
  // click 2
  await act(async () => {
    await itemButtons[2].props.onPress();
  });
  expect(radioCircles[0].props.active).toBeFalsy();
  expect(radioCircles[1].props.active).toBeTruthy();
  expect(radioCircles[2].props.active).toBeFalsy();

  // click apply
  await act(async () => {
    await bottomButtonView.props.onPressMain();
  });
  expect(mockOnHide).toBeCalled();
  expect(mockOnApply).toBeCalledWith({
    users: [1],
  });

  // click cancel
  await act(async () => {
    await bottomButtonView.props.onPressSecondary();
  });
  expect(mockOnHide).toBeCalled();
  expect(radioCircles[0].props.active).toBeTruthy();
  expect(radioCircles[1].props.active).toBeFalsy();
  expect(radioCircles[2].props.active).toBeFalsy();
});

test('test date picker pick valid and invalid date', async () => {
  let tree;
  let dateTo = moment('2021-09-09T10:00:00.000Z');
  let dateFrom = moment(dateTo).add(-7, 'days');
  let props = {
    isVisible: true,
    members: [],
    filters: {
      users: [],
      date_from: dateFrom.valueOf(),
      date_to: dateTo.valueOf(),
    },
    onHide: jest.fn(),
    onApply: jest.fn(),
    onShow: jest.fn(),
  };

  await act(async () => {
    tree = await create(wrapComponent(props));
  });
  const instance = tree.root;
  const dateTimeRangeChange = instance.findByType(DateTimeRangeChange);
  const datePicker = instance.findByType(DateTimePickerModal);

  expect(dateTimeRangeChange.props.startTime).toBe(dateFrom.valueOf());
  expect(dateTimeRangeChange.props.endTime).toBe(dateTo.valueOf());

  const _pickDateAndTest = async (timeChange) => {
    await act(async () => {
      if (timeChange === 'start') {
        await dateTimeRangeChange.props.onStart();
        await datePicker.props.onConfirm(moment(dateFrom));
      } else {
        await dateTimeRangeChange.props.onEnd();
        await datePicker.props.onConfirm(moment(dateTo));
      }
    });
    expect(dateTimeRangeChange.props.startTime).toBe(dateFrom.valueOf());
    expect(dateTimeRangeChange.props.endTime).toBe(dateTo.valueOf());
  };

  // pick valid dateFrom
  dateFrom = moment(dateFrom).add(-1, 'days');
  await _pickDateAndTest('start');

  // pick valid dateTo
  dateTo = moment(dateTo).add(1, 'days');
  await _pickDateAndTest('end');

  // pick invalid dateFrom
  dateFrom = moment(dateTo);
  dateTo = moment(dateFrom).add(1, 'days');
  await _pickDateAndTest('start');

  // pick invalid dateTo
  dateTo = moment(dateFrom);
  dateFrom = moment(dateTo).add(-1, 'days');
  await _pickDateAndTest('end');
});
