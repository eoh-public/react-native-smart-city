import { act, renderHook } from '@testing-library/react-hooks';
import useManageSubUnit from '../useManageSubUnit';
import axios from 'axios';
import API from '../../../../configs/API';

const mockRoute = jest.fn();

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useRoute: () => mockRoute,
    useNavigation: () => ({
      goBack: jest.fn(),
    }),
    useIsFocused: jest.fn(),
  };
});

jest.mock('axios');

describe('Test Manage Access', () => {
  afterEach(() => {
    axios.get.mockClear();
  });
  const unit = { id: 1, name: 'unit name' };

  it('Test init', () => {
    const { result } = renderHook(() => useManageSubUnit(unit));
    expect(result.current.station).toEqual([]);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isRefreshing).toBeFalsy();
  });

  it('Test onRefresh', () => {
    const { result } = renderHook(() => useManageSubUnit(unit));
    axios.get.mockImplementation(() => ({
      status: 200,
      data: [
        {
          id: 1,
          name: 'unit 1',
          stations: [
            {
              id: 1,
              name: 'station 1',
              sensors: [
                {
                  id: 1,
                  icon: '',
                  action: { icon: '', color: '' },
                  name: 'sensor name',
                  value: '',
                },
              ],
            },
            {
              id: 2,
              name: 'station 2',
              sensors: [
                {
                  id: 1,
                  icon: '',
                  action: { icon: '', color: '' },
                  name: 'sensor name',
                  value: '',
                },
              ],
            },
          ],
        },
      ],
    }));
    act(() => {
      result.current.onRefresh();
    });
    expect(axios.get).toHaveBeenCalledWith(API.UNIT.UNIT_DETAIL(unit?.id), {});
  });
});
