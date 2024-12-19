import React, {useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  BackHandler,
} from 'react-native';
import {useRoute, useFocusEffect} from '@react-navigation/native';

const AboutApp = ({navigation}) => {
  const route = useRoute();
  const sourceScreen = route.params?.source;
  const user = route.params?.user; // Ambil user jika tersedia

  const handleBackPress = useCallback(() => {
    if (sourceScreen === 'nurse') {
      navigation.navigate('ProfilScreenNurse', {user}); // Kirim user saat kembali
    } else if (sourceScreen === 'admin') {
      navigation.navigate('ProfileScreenAdmin');
    } else {
      navigation.goBack(); // Fallback
    }
    return true;
  }, [navigation, sourceScreen, user]);

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, [handleBackPress]),
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.iconArrowBack} onPress={handleBackPress}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require('../../../assets/-icon-arrow-back.png')}
          />
        </Pressable>
        <Text style={styles.headerTitle}>About App</Text>
      </View>
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/LOGO.jpg')}
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
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  version: {
    fontSize: 14,
    color: '#666',
  },
});

export default AboutApp;
