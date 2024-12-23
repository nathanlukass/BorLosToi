import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {
  Padding,
  Border,
  Color,
  FontFamily,
  FontSize,
} from '../../../GlobalStyles';

const BorlostoiScreen = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Bar Atas */}
              <View style={[styles.barAtas]}>
                <Pressable
                  style={styles.backButton}
                  onPress={() => navigation.navigate('ScreenGuest')}>
                  <Image
                    resizeMode="cover"
                    source={require('../../../assets/-icon-arrow-back.png')}
                  />
                </Pressable>
                <Text style={styles.backToLogin}>Filter by Indicator</Text>
              </View>

        <View style={styles.buttonGrid}>
          {/* Tombol MUJAIR A */}
          <Pressable
            style={[styles.roomButton, styles.shadowBox]}
            onPress={() => navigation.navigate('BOR')}>
            <Text style={styles.button}>BOR</Text>
          </Pressable>

          {/* Tombol MUJAIR B */}
          <Pressable
            style={[styles.roomButton, styles.shadowBox]}
            onPress={() => navigation.navigate('AVLOS')}>
            <Text style={styles.button}>AVLOS</Text>
          </Pressable>

          {/* Tombol MUJAIR C */}
          <Pressable
            style={[styles.roomButton, styles.shadowBox]}
            onPress={() => navigation.navigate('TOI')}>
            <Text style={styles.button}>TOI</Text>
          </Pressable>

          {/* Tombol NIKE */}
          <Pressable
            style={[styles.roomButton, styles.shadowBox]}
            onPress={() => navigation.navigate('BTO')}>
            <Text style={styles.button}>BTO</Text>
          </Pressable>

          {/* Tombol PAYANGKA */}
          <Pressable
            style={[styles.roomButton, styles.shadowBox]}
            onPress={() => navigation.navigate('GDR')}>
            <Text style={styles.button}>GDR</Text>
          </Pressable>

          {/* Tombol NEONATI */}
          <Pressable
            style={[styles.roomButton, styles.shadowBox]}
            onPress={() => navigation.navigate('NDR')}>
            <Text style={styles.button}>NDR</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  barAtas: {
    elevation: 3,
    width: '100%',
    height: 60,
    backgroundColor: Color.schemesOnPrimary,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: -1,
    top: '50%',
    transform: [{translateY: -12.5}],
  },
  backToLogin: {
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    textAlign: 'center',
    fontSize: 18,
    position: 'absolute',
    top: '40%',
    transform: [{translateY: -8}],
    zIndex: 1,
  },
  button: {
    fontSize: 20, // Ukuran font lebih besar
    fontWeight: 'bold', // Membuat teks lebih tebal
    fontFamily: 'Poppins-Regular', // Gunakan font Poppins
    color: Color.notSoBlack, // Warna teks
    textAlign: 'center', // Teks rata tengah
    lineHeight: 35, // Vertikal rata tengah, sesuaikan dengan font size
    letterSpacing: 1, // Spasi antar huruf agar lebih estetis
    marginVertical: 10, // Jarak vertikal atas dan bawah teks
  },
  container: {
    flex: 1,
  },
  scrollContainer: {

  },
  buttonGrid: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomButton: {
    width: '40%',
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 20,
    top: 20,
  },
  roomIcon: {
    width: 135,
    height: 125,
    alignItems: 'center',
    borderRadius: 30,
  },
  // roomText: {
  //   top: 8,
  //   fontSize: FontSize.m3BodySmall_size,
  //   fontFamily: FontFamily.poppinsMedium,
  //   color: Color.notSoBlack,
  //   textAlign: 'center',
  // },
  shadowBox: {
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  centeredButtonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  centeredButton: {
    width: '45%',
    height: 120,
  },
});

export default BorlostoiScreen;
