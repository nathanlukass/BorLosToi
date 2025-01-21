import React, {useState, useRef} from 'react';
import {
  TouchableOpacity,
  View,
  Modal,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import LottieView from 'lottie-react-native'; // Pastikan Anda menginstal lottie-react-native

const {width, height} = Dimensions.get('window');
const dynamicFontSize = size => (width / 375) * size; // 375 adalah lebar referensi
const dynamicPadding = padding => (height / 667) * padding; // 667 adalah tinggi referensi

const PopupMenu = ({navigation, user = {role: 'nurse'}}) => {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;

  const nurseOptions = [
    {
      title: 'About App',
      action: () => {
        console.log('Navigating to About App');
        navigation.navigate('AboutApp', {user});
      },
    },
    {
      title: 'Change Password',
      action: () => {
        console.log('Navigating to Change Password');
        navigation.navigate('ChangePassword', {user});
      },
    },
    {
      title: 'Logout',
      action: () => {
        setVisible(false);
        setModalVisible(true); // Tampilkan modal dengan animasi
        setTimeout(() => {
          setModalVisible(false); // Tutup modal setelah 3 detik
          navigation.reset({
            index: 0,
            routes: [{name: 'LoginScreen', params: {loggedOut: true}}],
          });
        }, 3000);
      },
    },
  ];

  const adminOptions = [
    ...nurseOptions, // Gunakan opsi yang sama untuk admin
  ];

  const options = user.role === 'admin' ? adminOptions : nurseOptions;

  const resizeBox = to => {
    if (to === 1) {
      setVisible(true);
    }
    Animated.timing(scale, {
      toValue: to,
      useNativeDriver: true,
      duration: 100,
      easing: Easing.linear,
    }).start(() => to === 0 && setVisible(false));
  };

  return (
    <>
      <TouchableOpacity onPress={() => resizeBox(1)}>
        <Image source={require('../assets/menu.png')} resizeMode="cover" />
      </TouchableOpacity>
      <Modal transparent visible={visible}>
        <SafeAreaView style={{flex: 1}} pointerEvents="box-none">
          <View style={{flex: 1}} onTouchStart={() => setVisible(false)} />
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
            {options.map((op, i) => (
              <TouchableOpacity
                style={styles.option}
                key={i}
                onPress={() => {
                  setVisible(false);
                  op.action(); // Eksekusi navigasi
                }}>
                <Text style={styles.optionText}>{op.title}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </SafeAreaView>
      </Modal>

      {/* Modal untuk animasi logout */}
      <Modal transparent visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LottieView
              source={require('../assets/raw/success.json')}
              autoPlay
              loop={false}
              style={styles.lottieAnimation}
              resizeMode="contain"
              onAnimationFinish={() => console.log('Animation Completed')}
            />
            <Text style={styles.successText}>Logging Out...</Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  popup: {
    borderRadius: 6,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    position: 'absolute',
    top: 76,
    right: 20,
    width: '48%',
    height: '22%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 2,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieAnimation: {
    width: 180,
    height: 150,
  },
  successText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default PopupMenu;
