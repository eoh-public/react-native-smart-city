import React from 'react';
import { act, create } from 'react-test-renderer';
import { TESTID } from '../../../configs/Constants';
import HeaderUnit from '../HeaderUnit/index';

const mockedGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      goBack: mockedGoBack,
    }),
  };
});

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  memo: (x) => x,
}));

describe('Test HeaderUnit', () => {
  afterEach(() => {
    mockedGoBack.mockClear();
  });
  let tree;
  const mockedFunc = jest.fn();
  const mockedOnBack = jest.fn();
  test('HeaderUnit onPress', async () => {
    let title = 'title';
    let style = {
      height: '100%',
      paddingHorizontal: 8,
      justifyContent: 'center',
      alignItems: 'center',
    };
    await act(async () => {
      tree = await create(
        <HeaderUnit
          title={title}
          onBack={mockedOnBack}
          onAdd={mockedFunc}
          onMore={mockedFunc}
        />
      );
    });
    const instance = tree.root;
    const item = instance.find(
      (el) => el.props.testID === TESTID.HEADER_UNIT_BUTTON_BACK
    );
    expect(item.props.style).toEqual(style);
    await act(async () => {
      item.props.onPress();
    });
    expect(mockedOnBack).toHaveBeenCalled();
  });

  test('HeaderUnit onPress goBack', async () => {
    await act(async () => {
      tree = await create(
        <HeaderUnit
          title="title"
          onBack={false}
          onAdd={mockedFunc}
          onMore={mockedFunc}
        />
      );
    });
    const instance = tree.root;
    const item = instance.find(
      (el) => el.props.testID === TESTID.HEADER_UNIT_BUTTON_BACK
    );
    await act(async () => {
      item.props.onPress();
    });
    expect(mockedGoBack).toHaveBeenCalled();
  });

  test('HeaderUnit onPressAdd onPressMore', async () => {
    await act(async () => {
      tree = await create(
        <HeaderUnit
          title="title"
          onBack={false}
          hideRight={false}
          hideRightPlus={false}
          onAdd={mockedFunc}
          onMore={mockedFunc}
        />
      );
    });
    const instance = tree.root;
    const buttonAdd = instance.find(
      (el) => el.props.testID === TESTID.HEADER_UNIT_BUTTON_ADD
    );
    const buttonMore = instance.find(
      (el) => el.props.testID === TESTID.HEADER_UNIT_BUTTON_MORE
    );
    await act(async () => {
      buttonAdd.props.onPress();
      buttonMore.props.onPress();
    });
    expect(mockedFunc).toHaveBeenCalled();
  });
});
