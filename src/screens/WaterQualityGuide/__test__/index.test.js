/* eslint-disable promise/prefer-await-to-callbacks */
import React from 'react';
import { useSelector } from 'react-redux';
import WaterQualityGuide from '../index';
import { create, act } from 'react-test-renderer';
import { TESTID } from '../../../configs/Constants';
import Text from '../../../commons/Text';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.fn(),
}));

const wrapComponent = (route) => (
  <SCProvider initState={mockSCStore({})}>
    <WaterQualityGuide route={route} />
  </SCProvider>
);

describe('Test WaterQualityGuide', () => {
  let route;

  beforeEach(() => {
    const localState = {
      language: 'en',
    };
    useSelector.mockImplementation((cb) => {
      return cb(localState);
    });
    Date.now = jest.fn(() => new Date('2021-01-24T12:00:00.000Z'));
    route = {
      params: {
        waterType: '',
      },
    };
  });

  const getQueryset = (instance) => {
    const textTitle = instance.findAll(
      (el) =>
        el.props.testID === TESTID.WATER_QUALITY_GUIDE_TITLE && el.type === Text
    );
    const textDescription = instance.findAll(
      (el) =>
        el.props.testID === TESTID.WATER_QUALITY_GUIDE_DESCRIPTION &&
        el.type === Text
    );
    const textTitleLevel = instance.findAll(
      (el) =>
        el.props.testID === TESTID.WATER_QUALITY_GUIDE_TITLE_LEVEL &&
        el.type === Text
    );
    const textDescriptionLevel = instance.findAll(
      (el) =>
        el.props.testID === TESTID.WATER_QUALITY_GUIDE_DESCRIPTION_LEVEL &&
        el.type === Text
    );

    const textTitle1 = instance.findAll(
      (el) =>
        el.props.testID === TESTID.WATER_QUALITY_GUIDE_TITLE1 &&
        el.type === Text
    );
    const textDescription1 = instance.findAll(
      (el) =>
        el.props.testID === TESTID.WATER_QUALITY_GUIDE_DESCRIPTION1 &&
        el.type === Text
    );
    const textTitleLevel1 = instance.findAll(
      (el) =>
        el.props.testID === TESTID.WATER_QUALITY_GUIDE_TITLE_LEVEL1 &&
        el.type === Text
    );
    const textDescriptionLevel1 = instance.findAll(
      (el) =>
        el.props.testID === TESTID.WATER_QUALITY_GUIDE_DESCRIPTION_LEVEL1 &&
        el.type === Text
    );
    return {
      textTitle,
      textDescription,
      textTitleLevel,
      textDescriptionLevel,
      textTitle1,
      textDescription1,
      textTitleLevel1,
      textDescriptionLevel1,
    };
  };

  let tree;

  test('render WaterQualityGuide default turbidityGuide', async () => {
    act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;

    const {
      textTitle,
      textDescription,
      textTitleLevel,
      textDescriptionLevel,
      textTitle1,
      textDescription1,
      textTitleLevel1,
      textDescriptionLevel1,
    } = getQueryset(instance);

    expect(textTitle).toHaveLength(2);
    expect(textDescription).toHaveLength(2);
    expect(textTitleLevel).toHaveLength(5);
    expect(textDescriptionLevel).toHaveLength(5);

    expect(textTitle1).toHaveLength(0);
    expect(textDescription1).toHaveLength(0);
    expect(textTitleLevel1).toHaveLength(0);
    expect(textDescriptionLevel1).toHaveLength(0);
  });

  test('render WaterQualityGuide with turbidityGuide', async () => {
    route.params.waterType = 'turbidity';
    act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;

    const {
      textTitle,
      textDescription,
      textTitleLevel,
      textDescriptionLevel,
      textTitle1,
      textDescription1,
      textTitleLevel1,
      textDescriptionLevel1,
    } = getQueryset(instance);

    expect(textTitle).toHaveLength(2);
    expect(textDescription).toHaveLength(2);
    expect(textTitleLevel).toHaveLength(5);
    expect(textDescriptionLevel).toHaveLength(5);

    expect(textTitle1).toHaveLength(0);
    expect(textDescription1).toHaveLength(0);
    expect(textTitleLevel1).toHaveLength(0);
    expect(textDescriptionLevel1).toHaveLength(0);
  });

  test('render WaterQualityGuide with cloGuide', async () => {
    route.params.waterType = 'clo';
    act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;

    const {
      textTitle,
      textDescription,
      textTitleLevel,
      textDescriptionLevel,
      textTitle1,
      textDescription1,
      textTitleLevel1,
      textDescriptionLevel1,
    } = getQueryset(instance);

    expect(textTitle).toHaveLength(2);
    expect(textDescription).toHaveLength(2);
    expect(textTitleLevel).toHaveLength(3);
    expect(textDescriptionLevel).toHaveLength(3);

    expect(textTitle1).toHaveLength(0);
    expect(textDescription1).toHaveLength(0);
    expect(textTitleLevel1).toHaveLength(0);
    expect(textDescriptionLevel1).toHaveLength(0);
  });

  test('render WaterQualityGuide with phGuide', async () => {
    route.params.waterType = 'ph';
    act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;

    const {
      textTitle,
      textDescription,
      textTitleLevel,
      textDescriptionLevel,
      textTitle1,
      textDescription1,
      textTitleLevel1,
      textDescriptionLevel1,
    } = getQueryset(instance);

    expect(textTitle).toHaveLength(2);
    expect(textDescription).toHaveLength(2);
    expect(textTitleLevel).toHaveLength(5);
    expect(textDescriptionLevel).toHaveLength(5);

    expect(textTitle1).toHaveLength(1);
    expect(textDescription1).toHaveLength(1);
    expect(textTitleLevel1).toHaveLength(14);
    expect(textDescriptionLevel1).toHaveLength(14);
  });
});
