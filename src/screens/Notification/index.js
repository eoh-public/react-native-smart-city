import React, {memo, useMemo} from 'react'
import {View, TouchableOpacity} from 'react-native'
import { Icon } from '@ant-design/react-native';

import styles from './styles/indexStyles'
import { Colors } from '../../configs';
import { useTranslations } from '../../hooks/Common/useTranslations';
import NotificationItem from './components/NotificationItem'
import WrapHeaderScrollable from '../../commons/Sharing/WrapHeaderScrollable';

const Notification = memo(() => {
    const t = useTranslations();
    const rightComponent = useMemo(
        () => (
          <View style={styles.rightComponent}>
            <TouchableOpacity style={styles.iconPlus} onPress={()=>alert(t('feature_under_development'))}>
              <Icon name={'plus'} size={27} color={Colors.Black} />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>alert(t('feature_under_development'))}>
              <Icon name={'search'} size={27} color={Colors.Black} />
            </TouchableOpacity>
          </View>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
      );

    return (
        <View style={styles.wrap}>
          <WrapHeaderScrollable
            title={t('notifications')}
            rightComponent={rightComponent}
          >
             <View>
                <NotificationItem/>
                <NotificationItem/>
                <NotificationItem/>
                <NotificationItem/>
                <NotificationItem/>
                <NotificationItem/>
                <NotificationItem/>
                <NotificationItem/>
                <NotificationItem/>
                <NotificationItem/>
                <NotificationItem/>
                <NotificationItem/>
            </View>
          </WrapHeaderScrollable>
         
        </View>
    )
})

export default Notification
