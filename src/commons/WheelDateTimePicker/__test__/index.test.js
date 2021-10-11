import React from 'react';
import { create, act } from 'react-test-renderer';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import WheelDateTimePicker from '..';
import Picker from '../Picker';
import ViewButtonBottom from '../../ViewButtonBottom';
import moment from 'moment';

const wrapComponent = (props) => (
  <SCProvider initState={mockSCStore({})}>
    <WheelDateTimePicker {...props} />
  </SCProvider>
);

describe('Test WheelDateTimePicker', () => {
  let tree;
  let props;
  const mockOnPicked = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    Date.now = jest.fn(() => new Date('2021-09-09T10:00:00.000Z'));
    mockOnPicked.mockClear();
    mockOnCancel.mockClear();
    props = {
      mode: 'time',
      isVisible: true,
      defaultValue: moment(),
      onPicked: mockOnPicked,
      onCancel: mockOnCancel,
    };
  });

  test('test render with mode time', async () => {
    const time = moment().hour(10).minute(30).second(0);
    props.defaultValue = time;
    await act(async () => {
      tree = await create(wrapComponent(props));
    });
    const instance = tree.root;
    const pickers = instance.findAllByType(Picker);
    const viewButtonBottom = instance.findByType(ViewButtonBottom);
    expect(pickers).toHaveLength(2);
    expect(pickers[0].props.selectedIndex).toBe(10);
    expect(pickers[1].props.selectedIndex).toBe(30);

    await act(async () => {
      await pickers[0].props.onValueChange({ value: 9 });
      await pickers[1].props.onValueChange({ value: 27 });
      await viewButtonBottom.props.onRightClick();
    });
    expect(mockOnPicked).toBeCalledWith(time.hour(9).minute(27).valueOf());
  });

  test('test render with mode datetime', async () => {
    const date = moment('2021-09-09T10:00:00.000Z')
      .hour(10)
      .minute(30)
      .second(0);
    props.mode = 'datetime';
    props.defaultValue = date;
    await act(async () => {
      tree = await create(wrapComponent(props));
    });
    const instance = tree.root;
    const pickers = instance.findAllByType(Picker);
    const viewButtonBottom = instance.findByType(ViewButtonBottom);
    expect(pickers).toHaveLength(3);
    expect(pickers[0].props.selectedIndex).toBe(15);
    expect(pickers[1].props.selectedIndex).toBe(10);
    expect(pickers[2].props.selectedIndex).toBe(30);

    const newDate = moment(date).add(1, 'days');
    await act(async () => {
      await pickers[0].props.onValueChange({
        value: newDate,
      });
      await pickers[1].props.onValueChange({ value: 9 });
      await pickers[2].props.onValueChange({ value: 27 });
      await viewButtonBottom.props.onRightClick();
    });
    expect(mockOnPicked).toBeCalledWith(newDate.hour(9).minute(27).valueOf());

    await act(async () => {
      await viewButtonBottom.props.onLeftClick();
    });
    expect(mockOnCancel).toBeCalled();
  });
});
