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

const EditScreenAdmin = ({route}) => {
  const {user} = route.params; // Access user details from route parameters
  const {username, role, ruangan, id_user, nama} = user; // Destructure user object
  console.log('Route params:', route.params);

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.editScreenAdmin}>
          <Text style={[styles.name, styles.halloAdminTypo]}>{nama}</Text>
          <Text style={[styles.halloAdmin, styles.halloAdminTypo]}>
            Hallo Admin
          </Text>
          <Image
            style={styles.memojiIcon}
            resizeMode="cover"
            source={require('../../../assets/memoji2.png')}
          />
          <Text style={styles.pilihRuangan}>Pilih Ruangan</Text>
          <View style={styles.buttonGrid}>
            {/* Tombol MUJAIR A */}
            <Pressable
              style={[styles.roomButton, styles.shadowBox]}
              onPress={() => navigation.navigate('EditMujairA', {user})}>
              <Image
                style={styles.roomIcon}
                resizeMode="cover"
                source={require('../../../assets/mujairA.jpg')}
              />
            </Pressable>

            {/* Tombol MUJAIR B */}
            <Pressable
              style={[styles.roomButton, styles.shadowBox]}
              onPress={() => navigation.navigate('EditMujairB', {user})}>
              <Image
                style={styles.roomIcon}
                resizeMode="cover"
                source={require('../../../assets/mujairB.jpg')}
              />
            </Pressable>

            {/* Tombol MUJAIR C */}
            <Pressable
              style={[styles.roomButton, styles.shadowBox]}
              onPress={() => navigation.navigate('EditMujairC', {user})}>
              <Image
                style={styles.roomIcon}
                resizeMode="cover"
                source={require('../../../assets/mujairC.jpg')}
              />
            </Pressable>

            {/* Tombol NIKE */}
            <Pressable
              style={[styles.roomButton, styles.shadowBox]}
              onPress={() => navigation.navigate('EditNike', {user})}>
              <Image
                style={styles.roomIcon}
                resizeMode="cover"
                source={require('../../../assets/nike.jpg')}
              />
            </Pressable>

            {/* Tombol PAYANGKA */}
            <Pressable
              style={[styles.roomButton, styles.shadowBox]}
              onPress={() => navigation.navigate('EditPayangka', {user})}>
              <Image
                style={styles.roomIcon}
                resizeMode="cover"
                source={require('../../../assets/payangka.jpg')}
              />
            </Pressable>

            {/* Tombol NEONATI */}
            <Pressable
              style={[styles.roomButton, styles.shadowBox]}
              onPress={() => navigation.navigate('EditNeonati', {user})}>
              <Image
                style={styles.roomIcon}
                resizeMode="cover"
                source={require('../../../assets/neonati.jpg')}
              />
            </Pressable>

            {/* Tombol BOMBOYA */}
            <Pressable
              style={[styles.roomButton, styles.shadowBox]}
              onPress={() => navigation.navigate('EditBomboya', {user})}>
              <Image
                style={styles.roomIcon}
                resizeMode="cover"
                source={require('../../../assets/bomboya.jpg')}
              />
            </Pressable>

            {/* Tombol KARPER */}
            <Pressable
              style={[styles.roomButton, styles.shadowBox]}
              onPress={() => navigation.navigate('EditKarper', {user})}>
              <Image
                style={styles.roomIcon}
                resizeMode="cover"
                source={require('../../../assets/karper.jpg')}
              />
            </Pressable>
          </View>

          {/* ICU button centered */}
          <View style={styles.centeredButtonContainer}>
            <Pressable
              style={[
                styles.roomButton,
                styles.shadowBox,
                styles.centeredButton,
              ]}
              onPress={() => navigation.navigate('EditIcu', {user})}>
              <Image
                style={styles.roomIcon}
                resizeMode="cover"
                source={require('../../../assets/icu.jpg')}
              />
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <Pressable
        style={styles.bottomNavigation}
        onPress={() => navigation.navigate('EditScreenAdmin', {user})}>
        <Pressable
          style={[styles.homeParent, styles.parentFlexBox]}
          onPress={() => navigation.navigate('HomeScreenAdmin', {user})}>
          <Image
            style={styles.homeIcon}
            resizeMode="cover"
            source={require('../../../assets/home.png')}
          />
          <Text style={[styles.home, styles.homeTypo]}>Home</Text>
        </Pressable>
        <Pressable
          style={styles.parentFlexBox}
          onPress={() => navigation.navigate('EditScreenAdmin', {user})}>
          <Image
            style={styles.homeIcon}
            resizeMode="cover"
            source={require('../../../assets/assignment1.png')}
          />
          <Text style={[styles.riwayat, styles.homeTypo]}>Edit</Text>
        </Pressable>
        <Pressable
          style={styles.parentFlexBox}
          onPress={() => navigation.navigate('ProfileScreenAdmin', {user})}>
          <Image
            style={styles.homeIcon}
            resizeMode="cover"
            source={require('../../../assets/account-circle2.png')}
          />
          <Text style={[styles.home, styles.homeTypo]}>Profil</Text>
        </Pressable>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  editScreenAdmin: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 10,
  },
  roomButton: {
    width: '45%',
    height: 120,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  roomIcon: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  centeredButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  centeredButton: {
    width: 150,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  pilihRuangan: {
    fontSize: 16,
    color: '#4a4a4a',
    fontWeight: '600',
    marginTop: 100,
  },
  name: {
    top: 90,
    fontWeight: '800',
    fontFamily: FontFamily.interBold,
    width: 181,
  },
  halloAdmin: {
    top: 65,
    fontFamily: FontFamily.poppinsRegular,
    width: 214,
  },
  halloAdminTypo: {
    textShadowRadius: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    height: 31,
    textAlign: 'left',
    fontSize: FontSize.m3LabelLarge_size,
    left: 88,
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    color: Color.notSoBlack,
    position: 'absolute',
  },
  memojiIcon: {
    top: 59,
    left: 20,
    borderRadius: Border.br_980xl,
    width: 55,
    height: 55,
    position: 'absolute',
    overflow: 'hidden',
  },
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: 'rgba(67, 67, 67, 0.3)',
    shadowRadius: 8,
    elevation: 8,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 70, // Adjusted padding
    paddingVertical: 8, // Adjusted padding
    backgroundColor: '#ffffff',
    zIndex: 1000,
  },
  homeParent: {
    backgroundColor: Color.schemesOnPrimary,
  },
  parentFlexBox: {
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  home: {
    color: Color.colorSilver_200,
  },
  riwayat: {
    color: Color.colorMediumaquamarine,
  },
  bottomNavigationShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    left: 0,
    position: 'absolute',
    backgroundColor: Color.schemesOnPrimary,
  },
  homeIcon: {
    width: 24,
    height: 24,
    overflow: 'hidden',
  },
  homeTypo: {
    textAlign: 'center',
    fontFamily: FontFamily.iconText,
    fontWeight: '500',
    lineHeight: 20,
    fontSize: FontSize.iconText_size,
  },
});

export default EditScreenAdmin;
