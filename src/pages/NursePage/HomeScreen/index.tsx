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
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {Color, FontFamily, Border} from '../../../../GlobalStyles';
import PopupMenu from '../../../../components/PopupMenu';
import HistoryPage from '../../../../components/HistoryPage';

// NEW CODE
import 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');

const dynamicFontSize = size => (width / 375) * size;
const dynamicPadding = padding => (height / 667) * padding;

const HomeScreenNurse = ({route}) => {
  const {user} = route.params || {};
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
        'https://moraya.online/moraya/public/nurse/get_bed_quantity',
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

  // const menuOptions = [
  //   {
  //     title: 'About App',
  //     action: () => {
  //       setMenuVisible(false);
  //       navigation.navigate('AboutApp', {user});
  //     },
  //   },
  //   {
  //     title: 'Change Password',
  //     action: () => {
  //       setMenuVisible(false);
  //       navigation.navigate('ChangePassword', {user});
  //     },
  //   },
  //   {
  //     title: 'Logout',
  //     action: () => {
  //       setMenuVisible(false);
  //       navigation.reset({
  //         index: 0,

  //         routes: [{name: 'LoginScreen', params: {loggedOut: true}}],
  //       });
  //       alert("You've been logged out");
  //     },
  //   },
  // ];

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../../../assets/background.png')}
        style={styles.headerBackground}
        resizeMode="cover">
        <View
          style={[
            styles.textContent,
            {justifyContent: 'flex-start', marginTop: -180},
          ]}>
          <Text style={styles.greetingText}>Selamat Datang di</Text>
          <Text style={styles.welcomeText}>Sensus Harian Pasien</Text>
          <Text style={styles.welcomeText}>
            Ruangan {ruangan || 'Tidak Diketahui'}
          </Text>
        </View>

        {/* <View style={styles.imageContainer}>
          <Image
            source={require('../../../../assets/fotoRuangan.png')}
            style={styles.fotoRuangan}
            resizeMode="cover"
          />
        </View> */}
        <View style={styles.menuButtonContainer2}>
          <PopupMenu navigation={navigation} user={user} />
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
            </SafeAreaView>
          </Modal>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginHorizontal: dynamicPadding(-10),
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
          <HistoryPage ruangan={ruangan || null} />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    //justifyContent:'space-between',
    alignItems: 'center',
    backgroundColor: Color.schemesOnPrimary,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    elevation: 4,
    marginTop: -250,
    paddingHorizontal: 16,
    flex: 1,
  },
  headerBackground: {
    width: '105%',
    height: '75%',
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
    zIndex: 1,
    marginTop: dynamicPadding(0),
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
  menuButtonContainer2: {
    position: 'absolute',
    top: 20,
    right: 35,
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
