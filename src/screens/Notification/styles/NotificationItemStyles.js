import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';

export default StyleSheet.create({
    container:{
        backgroundColor: Colors.Gray2,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    wrapIcon:{
        backgroundColor: Colors.WrapGray,
        width: 48,
        height: 48,
        marginRight: 16,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewRight:{
        flexShrink: 1
    },
    time:{
        marginTop: 12
    },
    textNotification:{
        lineHeight: 26
    },
    iconNotification: {
        width: '46%',
      },
})