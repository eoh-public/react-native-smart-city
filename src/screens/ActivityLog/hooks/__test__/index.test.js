import { act, renderHook } from '@testing-library/react-hooks';
import useActivityLog from '../';
import axios from 'axios';
import { API } from '../../../../configs';

jest.mock('axios');

describe('Test useActivityLog', () => {
  let props;
  let actionLogData = [
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
  ];
  let automateLogData = [
    {
      id: 2,
      content_code: 'AUTO_ACTIVATED',
      params: {},
      created_at: '2021-07-01T15:48:24.917932Z',
    },
    {
      id: 1,
      content_code: 'ACTIVATED_BY',
      params: { username: 'name' },
      created_at: '2021-07-01T15:48:24.917932Z',
    },
  ];

  beforeEach(() => {
    axios.get.mockClear();
    props = {
      id: 1,
      type: 'action',
    };
  });

  it('Test init', () => {
    const { result } = renderHook(() => useActivityLog(props));
    expect(result.current.data).toEqual([]);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isRefreshing).toBeTruthy();
  });

  it('Test onRefresh activity log of sensor', async () => {
    const { result } = renderHook(() => useActivityLog(props));
    axios.get.mockImplementation(() => ({
      status: 200,
      data: {
        results: actionLogData,
        count: 21,
      },
    }));
    await act(async () => {
      await result.current.onRefresh();
    });
    const params = new URLSearchParams();
    params.append('id', 1);
    params.append('page', 1);
    expect(axios.get).toHaveBeenCalledWith(API.SENSOR.ACTIVITY_LOG(), {
      params: params,
    });
  });

  it('Test onRefresh activity log of automate', async () => {
    props.type = 'automate';
    const { result } = renderHook(() => useActivityLog(props));
    axios.get.mockImplementation(() => ({
      status: 200,
      data: {
        results: automateLogData,
        count: 2,
      },
    }));
    await act(async () => {
      await result.current.onRefresh();
    });
    const params = new URLSearchParams();
    params.append('page', 1);
    expect(axios.get).toHaveBeenCalledWith(API.AUTOMATE.ACTIVITY_LOG(1), {
      params: params,
    });
  });

  it('Test onLoadMore', async () => {
    const { result } = renderHook(() => useActivityLog(props));
    axios.get.mockImplementation(() => ({
      status: 200,
      data: {
        results: actionLogData,
        count: 1,
      },
    }));
    await act(async () => {
      await result.current.onLoadMore();
    });
    const params = new URLSearchParams();
    params.append('id', 1);
    params.append('page', 2);
    expect(axios.get).toHaveBeenCalledWith(API.SENSOR.ACTIVITY_LOG(), {
      params: params,
    });

    axios.get.mockClear();

    await act(async () => {
      await result.current.onLoadMore();
    });
    expect(axios.get).toHaveBeenCalledTimes(0);
  });

  it('Test fetchMembers', async () => {
    props.type = 'automate';
    props.share = { id: 2 };
    const { result } = renderHook(() => useActivityLog(props));
    axios.get.mockImplementation(() => ({
      status: 200,
      data: [
        {
          id: 1,
          name: 'user 1',
        },
        {
          id: 2,
          name: 'user 2',
        },
      ],
    }));
    await act(async () => {
      await result.current.fetchMembers();
    });
    const params = new URLSearchParams();
    params.append('page', 1);
    expect(axios.get).toHaveBeenCalledWith(API.SHARE.UNITS_MEMBERS(2), {});
  });

  it('Test filter by users', async () => {
    props.type = 'automate';
    const { result } = renderHook(() => useActivityLog(props));

    const userIds = [1, 2];
    await act(async () => {
      await result.current.setFilters({
        users: userIds,
      });
    });
    axios.get.mockImplementation(() => ({
      status: 200,
      data: {
        results: automateLogData,
        count: 2,
      },
    }));
    await act(async () => {
      await result.current.onRefresh();
    });
    const params = new URLSearchParams();
    userIds.map((id) => {
      params.append('users', id);
    });
    params.append('page', 1);
    expect(axios.get).toHaveBeenCalledWith(API.AUTOMATE.ACTIVITY_LOG(1), {
      params: params,
    });
  });
});
