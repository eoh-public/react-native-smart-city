import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import AccountItem from './AccountItem';

const AccountList = ({ accounts }) => {
  return (
    <ScrollView>
      {accounts.map((account) => (
        <AccountItem key={account.id || account.name} account={account} />
      ))}
    </ScrollView>
  );
};

AccountList.defaultPropTypes = {
  accounts: [],
};

export default AccountList;
