import { ContextData } from './reducer';

export const mockDataStore: ContextData = {
  auth: {
    account: {
      token: 'TOKEN',
      user: {
        avatar: null,
        email: 'test@gmail.com',
        id: 1,
        is_using_social_avatar: false,
        name: 'TEST',
        org: 2,
        phone_number: '012345678',
        social_avatar_hash: '',
      },
    },
  },
  language: 'en',
  listDevice: {
    sentEmail: false,
  },
  statusBar: {
    backgroundColor: '',
    barStyle: '',
  },
  listAction: [],
};

export const mockSCStore = (data: ContextData): ContextData => {
  return {
    auth: {
      account: {
        ...mockDataStore.auth.account,
        ...data.auth?.account,
      },
    },
    language: data.language ? data.language : mockDataStore.language,
    listDevice: {
      ...mockDataStore.listDevice,
      ...data.listDevice,
    },
    statusBar: {
      backgroundColor:
        data?.statusBar?.backgroundColor ||
        mockDataStore?.statusBar?.backgroundColor,
      barStyle: data?.statusBar?.barStyle || mockDataStore?.statusBar?.barStyle,
    },
    listAction: [...mockDataStore.listAction, ...(data?.listAction || [])],
  };
};
