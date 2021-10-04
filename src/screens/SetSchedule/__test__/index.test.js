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
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe('Test SetSchedule', () => {
  let tree;
  let route = {
    params: {
      type: 'schedule',
      unit: { id: 1 },
    },
  };

  beforeEach(() => {
    mockNavigate.mockClear();
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
    });
  });
});
