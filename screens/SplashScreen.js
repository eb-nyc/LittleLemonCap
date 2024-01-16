import {View, Image, ActivityIndicator} from 'react-native';
import styles from '../styles/styles';

export default function SplashScreen({navigation}) {

  // Splash Screen 
  return (
    <View style={styles.splashContainer}>
      <Image
        style={styles.splashLogo}
        source={require('../assets/logo_stacked.png')}
        resizeMode="contain"
        accessible={true}
        accessibilityLabel={'Little Lemon logo'}
      />
      <ActivityIndicator size="large" />
   </View>
  );
}
