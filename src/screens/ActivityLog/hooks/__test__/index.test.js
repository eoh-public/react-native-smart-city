import { act, renderHook } from '@testing-library/react-hooks';
import useActivityLog from '../';
import axios from 'axios';
import { API } from '../../../../configs';

jest.mock('axios');

describe('Test useActivityLog', () => {
  afterEach(() => {
    axios.get.mockClear();
  });

  it('Test init', () => {
    const { result } = renderHook(() => useActivityLog({ id: 1 }));
    expect(result.current.data).toEqual([]);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isRefreshing).toBeTruthy();
  });

  it('Test onRefresh', () => {
    const { result } = renderHook(() => useActivityLog({ id: 1 }));
    axios.get.mockImplementation(() => ({
      status: 200,
      data: {
        results: [
          {
            date: '02/07/2021',
            data: [
              {
                id: 2,
                action: 'Gara Up',
                name: 'Kevin Love',
                created_at: '2021-07-01T15:48:24.917932Z',
              },
              {
                id: 1,
                action: 'Gara Down',
                name: 'Stephen Holloway',
                created_at: '2021-07-01T15:48:24.791769Z',
              },
            ],
          },
        ],
        count: 21,
      },
    }));
    act(() => {
      result.current.onRefresh();
    });
    expect(axios.get).toHaveBeenCalledWith(API.SENSOR.ACTIVITY_LOG(), {
      params: { id: 1, page: 1 },
    });
  });

  it('Test onLoadMore', async () => {
    const { result } = renderHook(() => useActivityLog({ id: 1 }));
    axios.get.mockImplementation(() => ({
      status: 200,
      data: {
        results: [
          {
            date: '02/07/2021',
            data: [
              {
                id: 2,
                action: 'Gara Up',
                name: 'Kevin Love',
                created_at: '2021-07-01T15:48:24.917932Z',
              },
              {
                id: 1,
                action: 'Gara Down',
                name: 'Stephen Holloway',
                created_at: '2021-07-01T15:48:24.791769Z',
              },
            ],
          },
        ],
        count: 1,
      },
    }));
    await act(async () => {
      await result.current.onLoadMore();
    });
    expect(axios.get).toHaveBeenCalledWith(API.SENSOR.ACTIVITY_LOG(), {
      params: { id: 1, page: 2 },
    });

    axios.get.mockClear();

    await act(async () => {
      await result.current.onLoadMore();
    });
    expect(axios.get).toHaveBeenCalledTimes(0);
  });
});
