import DeviceAlertStatus from '../DeviceAlertStatus';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TESTID } from '../../../configs/Constants';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import { getTranslate } from '../../../utils/I18n';

const wrapComponent = (data) => (
  <SCProvider initState={mockSCStore({})}>
    <DeviceAlertStatus data={data} />
  </SCProvider>
);

describe('Test Device Alert Status', () => {
  let tree;
  let list_standard = [
    'tank_is_full',
    'insufficient_water_input',
    'exceed_5_filter',
    'check_water_leak',
    'abc',
  ];
  list_standard.forEach(function (standard, i) {
    test('render Device Alert Status', () => {
      const data = [
        {
          standard: standard,
          value: 1,
        },
      ];
      act(() => {
        tree = renderer.create(wrapComponent(data));
      });
      const instance = tree.root;
      const item = instance.find(
        (el) => el.props.testID === TESTID.ALERT_STATUS_MACHINE
      );
      expect(item.props.message).toEqual(getTranslate('en', standard));
    });
  });
  test('render Device Alert Status data value == 0', () => {
    const data = [
      {
        standard: 'tank_is_full',
        value: 0,
      },
    ];
    act(() => {
      tree = renderer.create(wrapComponent(data));
    });
    const instance = tree.root;
    const item = instance.findAll(
      (el) => el.props.testID === TESTID.ALERT_STATUS_MACHINE
    );
    expect(item.length).toEqual(0);
  });
  test('render Device Alert Status data standard null', () => {
    const data = [
      {
        value: 1,
      },
    ];
    act(() => {
      tree = renderer.create(wrapComponent(data));
    });
    const instance = tree.root;
    const item = instance.findAll(
      (el) => el.props.testID === TESTID.ALERT_STATUS_MACHINE
    );
    expect(item.length).toEqual(1);
  });
});
