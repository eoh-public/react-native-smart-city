/* eslint-disable no-shadow */
import { useCallback, useState } from 'react';
import moment from 'moment';
import { groupBy } from 'lodash';
import { axiosGet } from '../../../utils/Apis/axios';
import API from '../../../configs/API';
import t from '../../../hooks/Common/useTranslations';

const apiMaps = {
  action: {
    url: () => API.SENSOR.ACTIVITY_LOG(),
    params: (id) => ({ id: id }),
  },
  automate: {
    url: (id) => API.AUTOMATE.ACTIVITY_LOG(id),
    params: () => ({}),
    memberUrl: (id) => API.SHARE.UNITS_MEMBERS(id),
  },
};

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

let dataTemp = [];

export default ({ id, type, share }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [isCanLoadMore, setIsCanLoadMore] = useState(true);
  const [members, setMembers] = useState([]);
  const [filters, setFilters] = useState({
    users: [],
  });

  const getDataForList = useCallback((data) => {
    const data1 = data.map((i) => ({
      ...i,
      date: moment(i.created_at).format('DD/MM/YYYY'),
    }));
    const data2 = groupBy(data1, 'date');
    const result = Object.keys(data2).map((key) => ({
      date: key,
      data: data2[key],
    }));
    return result;
  }, []);

  const fetchData = async (filters) => {
    const { page } = filters;
    setPage(page);
    if (page === 1) {
      setIsRefreshing(true);
    } else {
      if (!isCanLoadMore) {
        return;
      }
      setIsLoading(true);
    }
    const api = apiMaps[type];
    const params = new URLSearchParams();
    filters.users.map((id) => {
      params.append('users', id);
    });
    for (const [key, value] of Object.entries(api.params(id))) {
      params.append(key, value);
    }
    params.append('page', page);
    const { success, data } = await axiosGet(api.url(id), {
      params: params,
    });
    if (success && data) {
      const { results = [] } = data;
      if (page === 1) {
        dataTemp = results;
        setData(getDataForList(results));
      } else {
        dataTemp = dataTemp.concat(results);
        setData(getDataForList(dataTemp));
      }
      setIsCanLoadMore(page < Math.ceil(data.count / 20));
    }
    page === 1 ? setIsRefreshing(false) : setIsLoading(false);
  };

  const fetchMembers = async () => {
    const api = apiMaps[type];
    if (!api.memberUrl) {
      return;
    }
    const { success, data } = await axiosGet(api.memberUrl(share.id));
    if (success) {
      data.unshift({ id: 0, name: t('all') });
      setMembers(data);
    }
  };

  const onRefresh = () => fetchData({ ...filters, page: 1 });

  const onLoadMore = () => fetchData({ ...filters, page: page + 1 });

  return {
    data,
    isLoading,
    isRefreshing,
    onRefresh,
    onLoadMore,
    members,
    fetchMembers,
    filters,
    setFilters,
  };
};
