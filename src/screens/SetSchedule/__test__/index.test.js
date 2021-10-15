import React from 'react';
import { create, act } from 'react-test-renderer';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import SetSchedule from '..';
import RowItem from '../components/RowItem';
import WheelDateTimePicker from '../../../commons/WheelDateTimePicker';
import RepeatOptionsPopup from '../components/RepeatOptionsPopup';
import Calendar from '../../../commons/Calendar';
import BottomButtonView from '../../../commons/BottomButtonView';
import Routes from '../../../utils/Route';
import { REPEAT_OPTIONS } from '../components/RepeatOptionsPopup';
import SelectWeekday from '../components/SelectWeekday';
import { HeaderCustom } from '../../../commons/Header';
import { popAction } from '../../../navigations/utils';
import moment from 'moment';

const wrapComponent = (route) => (
  <SCProvider initState={mockSCStore({})}>
    <SetSchedule route={route} />
  </SCProvider>
);

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
  };
});

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
const mockDispatch = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
      goBack: mockGoBack,
      dispatch: mockDispatch,
    }),
  };
});

describe('Test SetSchedule', () => {
  let tree;
  let route = {
    params: {
      type: 'schedule',
      unit: { id: 1 },
      isAutomateTab: true,
    },
  };

  beforeEach(() => {
    mockNavigate.mockClear();
    mockGoBack.mockClear();
    mockDispatch.mockClear();
    Date.now = jest.fn(() => new Date('2021-01-24T12:00:00.000Z'));
  });

  test('test render SetSchedule', async () => {
    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const rowItems = instance.findAllByType(RowItem);
    const timePicker = instance.findByType(WheelDateTimePicker);
    const popup = instance.findByType(RepeatOptionsPopup);
    const calendar = instance.findByType(Calendar);
    const header = instance.findByType(HeaderCustom);

    await act(async () => {
      await rowItems[0].props.onPress();
    });
    expect(timePicker.props.isVisible).toBeTruthy();

    await act(async () => {
      await rowItems[1].props.onPress();
    });
    expect(popup.props.isVisible).toBeTruthy();

    await act(async () => {
      await rowItems[2].props.onPress();
    });
    expect(calendar.props.isVisible).toBeTruthy();

    await act(async () => {
      await header.props.onClose();
    });
    expect(mockDispatch).toBeCalledWith(popAction(4));
    expect(mockGoBack).toBeCalled();
  });

  test('test repeat options popup', async () => {
    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const popup = instance.findByType(RepeatOptionsPopup);
    let rowItems = instance.findAllByType(RowItem);
    expect(rowItems).toHaveLength(3);

    await act(async () => {
      await popup.props.onSetRepeat(REPEAT_OPTIONS.EVERYDAY);
    });
    rowItems = instance.findAllByType(RowItem);
    expect(rowItems).toHaveLength(2);

    await act(async () => {
      await popup.props.onSetRepeat(REPEAT_OPTIONS.EVERYWEEK);
    });
    const selectWeekday = instance.findByType(SelectWeekday);
    rowItems = instance.findAllByType(RowItem);
    expect(rowItems).toHaveLength(2);
    expect(selectWeekday).toBeDefined();
  });

  test('test pick date and time', async () => {
    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const timePicker = instance.findByType(WheelDateTimePicker);
    const calendar = instance.findByType(Calendar);
    const rowItems = instance.findAllByType(RowItem);

    const time = moment().hour(0).minute(0);
    const date = moment();
    expect(rowItems[0].props.value).toBe(time.format('HH:mm'));
    expect(rowItems[2].props.value).toBe(date.format('[Today], D MMMM YYYY '));

    time.hour(10).minute(30);
    date.add(1, 'days');
    await act(async () => {
      await timePicker.props.onPicked(time);
      await calendar.props.onConfirm(date);
    });
    expect(rowItems[0].props.value).toBe(time.format('HH:mm'));
    expect(rowItems[2].props.value).toBe(date.format('ddd, D MMMM YYYY'));
  });

  test('test save', async () => {
    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const button = instance.findByType(BottomButtonView);

    await act(async () => {
      await button.props.onPressMain();
    });
    expect(mockNavigate).toHaveBeenCalledWith(Routes.AddNewOneTap, {
      type: route.params.type,
      unit: route.params.unit,
      automateData: {
        repeat: 'once',
        time_repeat: '00:00',
        date_repeat: '2021-01-24',
        weekday_repeat: [],
      },
      isAutomateTab: true,
      isScript: undefined,
      isMultiUnits: undefined,
    });
  });
});
