import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  Animated,
  Easing,
  ActivityIndicator,
  BackHandler,
} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {Color, FontFamily, Border} from '../../../../GlobalStyles';
import {Alert} from 'react-native';

import HistoryPage from '../../../../components/HistoryPage';
import LottieView from 'lottie-react-native';

// NEW CODE
import 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');

const dynamicFontSize = size => (width / 375) * size;
const dynamicPadding = padding => (height / 667) * padding;

const HomeScreenNurse = ({route}) => {
  const {user} = route.params;
  const {username, role, ruangan, id_user, nama} = user || {};
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [jumlahTempatTidur, setJumlahTempatTidur] = useState(null);
  const [lihatBORLOSVisible, setLihatBORLOSVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;

  const openLihatBORLOS = useCallback(() => {
    setLihatBORLOSVisible(true);
    fetchJumlahBed();
  }, []);

  const closeLihatBORLOS = useCallback(() => {
    setLihatBORLOSVisible(false);
  }, []);

  const resizeBox = to => {
    if (to === 1) {
      setMenuVisible(true);
    }
    Animated.timing(scale, {
      toValue: to,
      useNativeDriver: true,
      duration: 100,
      easing: Easing.linear,
    }).start(() => to === 0 && setMenuVisible(false));
  };

  const fetchJumlahBed = async () => {
    try {
      const normalizedRuangan = ruangan
        .replace(/\u00A0/g, ' ')
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .trim();

      console.log('Normalized Ruangan:', JSON.stringify(normalizedRuangan));

      const response = await fetch(
        'https://samratindikator.online/borlostoi/public/insert/get_bed_quantity',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: new URLSearchParams({
            ruangan: normalizedRuangan,
          }).toString(),
        },
      );

      const rawText = await response.text();
      console.log('Raw Response:', rawText);

      if (!rawText.startsWith('{')) {
        throw new Error('Invalid response format');
      }

      const result = JSON.parse(rawText);
      console.log('Parsed Response:', result);

      const key = `jumlah bed ${normalizedRuangan}`;
      if (result.status === 'success' && result[key] !== undefined) {
        setJumlahTempatTidur(result[key].toString());
      } else {
        Alert.alert(
          'Error',
          `Data jumlah tempat tidur untuk ${normalizedRuangan} tidak ditemukan.`,
        );
      }
    } catch (error) {
      console.error('Fetch error:', error.message);
      Alert.alert('Error', 'Terjadi kesalahan: ' + error.message);
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const menuOptions = [
    {
      title: 'About App',
      action: () => {
        setMenuVisible(false);
        navigation.navigate('AboutApp', {user});
      },
    },
    {
      title: 'Change Password',
      action: () => {
        setMenuVisible(false);
        navigation.navigate('ChangePassword', {user});
      },
    },
    {
      title: 'Logout',
      action: () => {
        setMenuVisible(false);
        openModal(); // Tampilkan modal

        setTimeout(() => {
          closeModal(); // Tutup modal setelah 3 detik
          navigation.reset({
            index: 0,
            routes: [{name: 'LoginScreen', params: {loggedOut: true}}],
          });
        }, 3000); // Durasi modal ditampilkan
      },
    },
  ];

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Konfirmasi',
        'Apakah Anda yakin ingin keluar dari aplikasi?',
        [
          {
            text: 'Batal',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'Keluar',
            onPress: () => BackHandler.exitApp(),
          },
        ],
      );
      return true; // Mencegah perilaku default tombol back
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Hapus listener ketika komponen unmount
  }, []);

  return (
    <View style={{flex: 1}}>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* LottieView untuk animasi */}
            <LottieView
              source={require('../../../../assets/raw/success.json')}
              autoPlay
              loop={false}
              style={styles.lottieAnimation}
              resizeMode="contain"
              onAnimationFinish={() => {
                console.log('Animation Completed');
                closeModal(); // Tutup modal setelah animasi selesai
              }}
            />

            {/* Teks di bawah animasi */}
            <Text style={styles.modalText}>Logging out...</Text>
          </View>
        </View>
      </Modal>

      <ImageBackground
        source={require('../../../../assets/background.png')}
        style={styles.headerBackground}
        resizeMode="cover">
        <View
          style={[
            styles.textContent,
            {justifyContent: 'flex-start', marginTop: -120},
          ]}>
          <Text style={styles.greetingText}>Selamat Datang di</Text>
          <Text style={styles.welcomeText}>Sensus Harian Pasien</Text>
          <Text style={styles.welcomeText}>Ruangan {ruangan}</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={require('../../../../assets/fotoRuangan.png')}
            style={styles.fotoRuangan}
            resizeMode="cover"
          />
        </View>
        <View style={styles.menuButtonContainer}>
          <TouchableOpacity onPress={() => resizeBox(1)}>
            <Image
              source={require('../../../../assets/menu.png')}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={styles.cardContainer}>
        <ScrollView contentContainerStyle={{paddingBottom: 10}}>
          <Modal transparent visible={menuVisible}>
            <SafeAreaView style={{flex: 1}} pointerEvents="box-none">
              <View
                style={{flex: 1}}
                onTouchStart={() => setMenuVisible(false)}
              />
              <Animated.View
                style={[
                  styles.popup,
                  {
                    opacity: scale.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                    transform: [{scale}],
                  },
                ]}>
                {menuOptions.map((op, i) => (
                  <TouchableOpacity
                    style={styles.option}
                    key={i}
                    onPress={op.action}>
                    <Text style={styles.optionText}>{op.title}</Text>
                  </TouchableOpacity>
                ))}
              </Animated.View>
            </SafeAreaView>
          </Modal>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: 12,
            }}>
            <TouchableOpacity style={styles.menuItem} onPress={openLihatBORLOS}>
              <Modal
                animationType="fade"
                transparent
                visible={lihatBORLOSVisible}>
                <View style={styles.lihatBORLOSOverlay}>
                  <Pressable
                    style={styles.lihatBORLOSBg}
                    onPress={closeLihatBORLOS}
                  />
                  <View style={styles.modalContent}>
                    {jumlahTempatTidur ? (
                      <Text
                        style={{
                          fontSize: dynamicFontSize(16),
                          textAlign: 'center',
                          justifyContent: 'center',
                          fontFamily: FontFamily.poppinsRegular,
                          color: Color.notSoBlack,
                        }}>
                        Jumlah Bed:{'\n\n'}
                        <Text
                          style={{
                            fontSize: dynamicFontSize(30),
                            fontFamily: FontFamily.poppinsBold,
                            justifyContent: 'center',
                          }}>
                          {jumlahTempatTidur}
                        </Text>
                      </Text>
                    ) : (
                      <ActivityIndicator size="large" color="#1E9DEC" />
                    )}
                  </View>
                </View>
              </Modal>
              <Image
                source={require('../../../../assets/bed5.png')}
                style={styles.icon}
              />
              <Text style={styles.cardText}>Jumlah Bed</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('NurseInputPage', {user})}>
              <Image
                source={require('../../../../assets/input-icon.png')}
                style={styles.icon}
              />
              <Text style={styles.cardText}>Input Sensus</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.row}>
            <Image
              source={require('../../../../assets/history.png')}
              style={styles.icon2}
            />
            <Text style={styles.Title2}>Riwayat input sensus</Text>
          </View> */}

          <HistoryPage ruangan={ruangan || null} />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalText: {
    marginTop: 10, // Memberi jarak antara animasi dan teks
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieAnimation: {
    width: 150,
    height: 150,
  },
  textContent: {
    paddingLeft: 24,
    paddingTop: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: dynamicPadding(8),
    marginTop: dynamicPadding(16),
    marginBottom: dynamicPadding(8),
  },
  icon2: {
    right: 8,
    width: 22,
    height: 22,
  },
  welcomeText: {
    marginBottom: -6,
    fontSize: 24,
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsSemiBold,
  },
  greetingText: {
    fontSize: 16,
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsRegular,
  },
  container: {
    flex: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Color.schemesOnPrimary,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    elevation: 4,
    marginTop: dynamicPadding(-130),
    paddingVertical: 20,
    paddingHorizontal: 16,
    flex: 1,
  },
  headerBackground: {
    width: '105%',
    height: '70%',
    justifyContent: 'center',
    position: 'relative',
  },
  Title: {
    fontSize: 16,
    marginBottom: 16,
    marginTop: 60,
    fontFamily: FontFamily.poppinsMedium,
  },
  Title2: {
    fontSize: dynamicFontSize(14),
    fontFamily: FontFamily.poppinsMedium,
  },
  cardText: {
    fontSize: 12,
    fontFamily: FontFamily.poppinsMedium,
    color: Color.colorDimgray,
    textAlign: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  menuItem: {
    alignItems: 'center',
    width: 90,
    marginHorizontal: 8,
  },
  lihatBorlostoiChild: {
    top: 0,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowRadius: 9,
    elevation: 9,
    borderRadius: Border.br_xs,
    height: 46,
    width: 328,
  },
  lihatBORLOSOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)',
  },
  lihatBORLOSBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
  },
  menuButtonContainer: {
    position: 'absolute',
    top: 30,
    right: dynamicPadding(30),
    zIndex: 3,
  },
  fotoRuangan: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    marginStart: 16,
    marginEnd: 38,
    marginTop: 16,
    borderRadius: 15,
    overflow: 'hidden',
    height: 160,
    justifyContent: 'center',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#212121',
  },
  popup: {
    borderRadius: 6,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    position: 'absolute',
    top: 76,
    right: 20,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 2,
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: dynamicPadding(24),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom: dynamicPadding(16),
    paddingTop: dynamicPadding(24),
  },
  modalText: {
    fontSize: dynamicFontSize(14),

    color: '#333',
    textAlign: 'center',
  },
});

export default HomeScreenNurse;
