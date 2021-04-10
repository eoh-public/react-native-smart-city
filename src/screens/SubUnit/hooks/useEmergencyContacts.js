import { useCallback, useState } from 'react';
import { API } from '../../../configs';
import { axiosGet } from '../../../utils/Apis/axios';

export const useEmeragencyContacts = () => {
  const [listContacts, setListContacts] = useState([]);

  const getListContacts = useCallback(async (group_id) => {
    const { data, success } = await axiosGet(API.EMERGENCY_BUTTON.CONTACTS, {
      params: {
        group: group_id,
      },
    });
    if (success) {
      data && setListContacts(data);
    }
  }, []);

  return {
    listContacts,
    getListContacts,
  };
};
