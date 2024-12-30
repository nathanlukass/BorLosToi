import React, {useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  BackHandler,
  Dimensions
} from 'react-native';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import {
  Padding,
  Border,
  Color,
  FontFamily,
  FontSize,
} from '../../../../GlobalStyles';

const { width, height } = Dimensions.get('window');
const dynamicFontSize = (size) => (width / 375) * size; // 375 adalah lebar referensi
const dynamicPadding = (padding) => (height / 667) * padding; // 667 adalah tinggi referensi

const AboutApp = ({navigation}) => {
  const route = useRoute();
  const sourceScreen = route.params?.source;
  const user = route.params?.user; // Ambil user jika tersedia

  const handleBackPress = useCallback(() => {
    if (user?.role === 'nurse') {
      navigation.navigate('HomeScreenNurse', { user }); // Kembali ke home nurse
    } else if (user?.role === 'admin') {
      navigation.navigate('HomeScreenAdmin', { user }); // Kembali ke home admin
    } else {
      navigation.goBack(); // Fallback jika role tidak terdeteksi
    }
    return true;
  }, [navigation, user]);

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, [handleBackPress]),
  );

  return (
    <View style={styles.container}>
      <View style={styles.barAtas}>
        <Pressable
          style={styles.backButton}
          onPress={handleBackPress}>
          <Image
          style={styles.icon2}
          resizeMode="cover"
          source={require('../../../../assets/-icon-arrow-back.png')}
          />
          </Pressable>
          <View style={styles.textContainer}>
          <Text style={styles.text}>About app</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Image
          source={require('../../../../assets/samrat1.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>
          Samrat InapDikator: Data Akurat, Layanan Hebat
        </Text>
        <Text style={styles.version}>Versi 1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconArrowBack: {
    width: 42,
    height: 25,
  },
  icon: {
    height: '100%',
    width: '100%',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: dynamicFontSize(16),
    fontFamily: FontFamily.poppinsRegular,
    color: Color.notSoBlack,
    textAlign: 'center',
    marginBottom: 10,
  },
  version: {
    fontSize: dynamicFontSize(16),
    fontFamily: FontFamily.poppinsRegular,
    color: Color.notSoBlack,
  },
   icon2: {
      width: 50,
      height: 25,
    },
    backButton: {
      position: 'absolute',
      width: 45,
      height: 45,
      justifyContent: 'center',
      zIndex: 20,
  },
  textContainer: {
    flex:1,
    right: 'auto',
    top: '25%',  
    transform: [{ translateY: -12 }],  
    justifyContent: 'center',
    alignItems:'center'
  },
  text: {
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    fontSize: dynamicFontSize(16),
    textAlign:'center'
  },
  barAtas: {
    position: 'absolute', 
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
});


export default AboutApp;
