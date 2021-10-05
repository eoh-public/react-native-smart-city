import { act, renderHook } from '@testing-library/react-hooks';
import useActivityLog from '../';
import axios from 'axios';
import { API } from '../../../../configs';
import moment from 'moment';

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
    Date.now = jest.fn(() => new Date('2021-09-09T10:00:00.000Z'));
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
    params.append('date_from', moment().add(-7, 'days').format('YYYY-MM-DD'));
    params.append('date_to', moment().format('YYYY-MM-DD'));

    expect(axios.get).toHaveBeenCalled();
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
    params.append('date_from', moment().add(-7, 'days').format('YYYY-MM-DD'));
    params.append('date_to', moment().format('YYYY-MM-DD'));
    expect(axios.get).toHaveBeenCalled();
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
    params.append('date_from', moment().add(-7, 'days').format('YYYY-MM-DD'));
    params.append('date_to', moment().format('YYYY-MM-DD'));
    expect(axios.get).toHaveBeenCalled();

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
    params.append('date_from', moment().add(-7, 'days').format('YYYY-MM-DD'));
    params.append('date_to', moment().format('YYYY-MM-DD'));
    params.append('page', 1);
    expect(axios.get).toHaveBeenCalled();
  });
});
