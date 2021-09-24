import React from 'react';
import { TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';
import SubUnitAutomate from '..';
import { TESTID } from '../../../../configs/Constants';
import { SCProvider } from '../../../../context';
import { mockSCStore } from '../../../../context/mockStore';
import Routes from '../../../../utils/Route';

const wrapComponent = (data) => (
  <SCProvider initState={mockSCStore({})}>
    <SubUnitAutomate {...data} />
  </SCProvider>
);

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useSelector: () => 'vi',
  };
});

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

jest.mock('axios');

describe('test Item', () => {
  test('render SubUnitAutomate isOwner', async () => {
    let tree;
    let data = {
      isOwner: true,
      type: 'one_tap',
      automates: [
        {
          id: 1,
          user: 6,
          type: 'one_tap',
          activate_at: '2021-09-17T05:30:00Z',
          script: {
            name: 'Joshua Ray',
            icon: '',
            icon_kit: '',
          },
        },
      ],
    };

    await act(async () => {
      tree = await create(wrapComponent(data));
    });

    const instance = tree.root;
    const item = instance.findAll(
      (el) => el.props.testID === TESTID.PLUS && el.type === TouchableOpacity
    );

    expect(item).toHaveLength(1);
    act(() => {
      item[0].props.onPress();
    });
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.AddNewOneTap, {
      type: 'one_tap',
    });
    mockedNavigate.mockClear();
    const goDetail = instance.findAll(
      (el) =>
        el.props.testID === TESTID.GO_DETAIL && el.type === TouchableOpacity
    );
    expect(goDetail).toHaveLength(1);
    act(() => {
      goDetail[0].props.onPress();
    });
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.ScriptDetail, {
      havePermission: true,
      id: 1,
      name: 'Joshua Ray',
      type: 'one_tap',
    });
  });
});
