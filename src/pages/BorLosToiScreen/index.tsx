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
        <View style={styles.headerContainer}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.navigate('ScreenGuest')}>
            <Image
              style={styles.icon}
              resizeMode="cover"
              source={require('../../../assets/-icon-arrow-back.png')}
            />
          </Pressable>
          <Text style={styles.headerTitle}>Filter by Indicator</Text>
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
    paddingVertical: 20,
    paddingHorizontal: 42,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 42,
    height: 25,
    marginRight: 20,
  },
  icon: {
    width: '100%',
    height: '100%',
    marginLeft: -40,
    marginTop: -3,
  },
  headerTitle: {
    fontSize: FontSize.m3BodyLarge_size,
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    textAlign: 'center',
    left: 39,
  },
  buttonGrid: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomButton: {
    width: '45%',
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#fffaf6',
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
