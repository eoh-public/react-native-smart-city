import React, {memo} from 'react'
import {View} from 'react-native'

import styles from '../styles/NotificationItemStyles'
import Text from '../../../commons/Text';
import { Colors } from '../../../configs';
import IconComponent from '../../../commons/IconComponent';

const NotificationItem = memo(() => {
    return (
        <View style={styles.container}>
           <View style={styles.wrapIcon}>
                <IconComponent
                    icon={'emergency'}
                    iconKit={'https://eoh-gateway-backend.eoh.io/alert.png'}
                    style={styles.iconNotification}
                />
           </View>
     
           <View  style={styles.viewRight}>
                <Text type="Body" color={Colors.Gray9} style={styles}>The Emergency button has been activated unit
                EoH Office: Garage. Please check now!</Text>
                <Text color={Colors.Gray7} type="Label" style={styles.time}>Just now</Text>
           </View>
           
        </View>
    )
})

export default NotificationItem
