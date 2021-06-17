import { StyleSheet} from 'react-native';
import { APP_COLORS } from '../../styles/color';
// mon style pour le header
export const style = StyleSheet.create({
  subHeader:{ // le view header
    backgroundColor: APP_COLORS.darkPrimary,
    height: 30,
  },
  header:{ // le view ou ya le text
     backgroundColor: APP_COLORS.primary,
     height: 150,
     flexDirection: 'column',
     justifyContent: 'center',
     alignItems: 'center',
     shadowColor: APP_COLORS.shadow,
     shadowOpacity: 0.8,
     borderRadius: 20,
     marginEnd: 3,
     marginLeft: 3,
     shadowOffset: { height: 10},
  },
  text:{ // le text de header
    color: APP_COLORS.primaryText,
    fontSize: 40,
  }
})