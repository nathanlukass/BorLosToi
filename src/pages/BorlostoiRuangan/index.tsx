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

const BorlostoiRuangan = () => {
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
          <Text style={styles.headerTitle}>Filter by Ruangan</Text>
        </View>

        <View style={styles.buttonGrid}>
          {/* Tombol MUJAIR A */}
          <Pressable
            style={[styles.roomButton, styles.shadowBox]}
            onPress={() => navigation.navigate('StatsMujairA')}>
            <Image
              style={styles.roomIcon}
              resizeMode="cover"
              source={require('../../../assets/mujairA.png')}
            />
          </Pressable>

          {/* Tombol MUJAIR B */}
          <Pressable
            style={[styles.roomButton, styles.shadowBox]}
            onPress={() => navigation.navigate('StatsMujairB')}>
            <Image
              style={styles.roomIcon}
              resizeMode="cover"
              source={require('../../../assets/mujairB.png')}
            />
          </Pressable>

          {/* Tombol MUJAIR C */}
          <Pressable
            style={[styles.roomButton, styles.shadowBox]}
            onPress={() => navigation.navigate('StatsMujairC')}>
            <Image
              style={styles.roomIcon}
              resizeMode="cover"
              source={require('../../../assets/mujairC.png')}
            />
          </Pressable>

          {/* Tombol NIKE */}
          <Pressable
            style={[styles.roomButton, styles.shadowBox]}
            onPress={() => navigation.navigate('StatsNike')}>
            <Image
              style={styles.roomIcon}
              resizeMode="cover"
              source={require('../../../assets/nike.png')}
            />
          </Pressable>

          {/* Tombol PAYANGKA */}
          <Pressable
            style={[styles.roomButton, styles.shadowBox]}
            onPress={() => navigation.navigate('StatsPayangka')}>
            <Image
              style={styles.roomIcon}
              resizeMode="cover"
              source={require('../../../assets/payangka.png')}
            />
          </Pressable>

          {/* Tombol NEONATI */}
          <Pressable
            style={[styles.roomButton, styles.shadowBox]}
            onPress={() => navigation.navigate('StatsNeonati')}>
            <Image
              style={styles.roomIcon}
              resizeMode="cover"
              source={require('../../../assets/neonatii.png')}
            />
          </Pressable>

          {/* Tombol BOMBOYA */}
          <Pressable
            style={[styles.roomButton, styles.shadowBox]}
            onPress={() => navigation.navigate('StatsBomboya')}>
            <Image
              style={styles.roomIcon}
              resizeMode="cover"
              source={require('../../../assets/bomboya.png')}
            />
          </Pressable>

          {/* Tombol KARPER */}
          <Pressable
            style={[styles.roomButton, styles.shadowBox]}
            onPress={() => navigation.navigate('StatsKarper')}>
            <Image
              style={styles.roomIcon}
              resizeMode="cover"
              source={require('../../../assets/karperr.png')}
            />
          </Pressable>
        </View>

        {/* ICU button centered */}
        <View style={styles.centeredButtonContainer}>
          <Pressable
            style={[styles.roomButton, styles.shadowBox, styles.centeredButton]} // Added centeredButton style
            onPress={() => navigation.navigate('StatsICU')}>
            <Image
              style={styles.roomIcon}
              resizeMode="cover"
              source={require('../../../assets/icu.png')}
            />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomButton: {
    width: '45%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Border.br_3xs,
    backgroundColor: Color.schemesOnPrimary,
    marginBottom: 20,
    top: 10,
  },
  roomIcon: {
    width: 130,
    height: 100,
    marginBottom: 0,
  },
  roomText: {
    top: 8,
    fontSize: FontSize.m3BodySmall_size,
    fontFamily: FontFamily.poppinsMedium,
    color: Color.notSoBlack,
    textAlign: 'center',
  },
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

export default BorlostoiRuangan;
