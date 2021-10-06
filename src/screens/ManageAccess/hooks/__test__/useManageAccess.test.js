import { act, renderHook } from '@testing-library/react-hooks';
import useManageAccess from '../index';
import axios from 'axios';
import API from '../../../../configs/API';

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
  };
});

jest.mock('axios');

describe('Test Use Manage Access', () => {
  beforeEach(() => {
    axios.get.mockClear();
  });
  afterEach(() => {
    axios.get.mockClear();
  });
  const unit = { id: 1, name: 'unit name' };
  const sensor = {
    id: 1,
    icon: '',
    action: { icon: '', color: '' },
    name: 'sensor name',
    value: '',
  };

  it('Test fetch data', () => {
    const { result } = renderHook(() => useManageAccess(unit, sensor));
    axios.get.mockImplementation(() => ({
      status: 200,
      data: [
        {
          id: 1,
          name: 'jason',
          access_schedule: 'always',
          schedule: 'Always',
        },
        {
          id: 2,
          name: 'mike',
          access_schedule: 'recurring',
          schedule: 'M/T 02:40 - 08:40 AM',
        },
        {
          id: 3,
          name: 'david',
          access_schedule: 'temporary',
          schedule: '02:40 09/08/2020 - 08:40 09/10/2020',
        },
      ],
    }));
    act(() => {
      result.current.onRefresh();
    });
    expect(axios.get).toHaveBeenCalledWith(API.UNIT.MANAGE_ACCESS(unit.id), {
      params: { sensor_id: sensor.id },
    });
  });
});
