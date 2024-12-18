import * as React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {
  FontFamily,
  FontSize,
  Border,
  Color,
  Padding,
} from '../../../GlobalStyles';

const ProfileScreenAdmin = ({navigation, route}) => {
  const {user} = route.params; // Access user details from route parameters
  const {username, role, ruangan, id_user, nama} = user; // Destructure user object

  const handleLogoutPress = () => {
    if (route.params && route.params.resetLoginFields) {
      route.params.resetLoginFields();
    }
    navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen', params: {loggedOut: true}}],
    });

    alert("You've been logged out");
  };
  // const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const pilihfoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  return (
    <View style={styles.profileScreenNurse}>
      {/* Latar Belakang Tosca */}
      <View style={styles.headerBackground}>
        <TouchableOpacity onPress={pilihfoto}>
          <Image
            style={styles.memojiIcon}
            resizeMode="cover"
            source={require('../../../assets/memoji.png')}
          />
        </TouchableOpacity>
        <Text style={styles.profileText}>Profile</Text>
        <Text style={styles.nameText}>{nama}</Text>
        <Text style={styles.roleText}>Nurse</Text>
      </View>

      {/* Centered Buttons */}
      <View style={styles.centeredContainer}>
        <Pressable
          onPress={() => {
            const {user = {}} = route.params || {}; // Tambahkan nilai default {} untuk user
            const source = user?.role === 'Admin' ? 'admin' : 'nurse'; // Tentukan source berdasarkan role
            navigation.navigate('ChangePassword', {
              user,
              source, // Kirim source dinamis
            });
          }}>
          <View style={styles.optionBox}>
            <Image
              style={styles.icon}
              resizeMode="cover"
              source={require('../../../assets/settings1.png')}
            />
            <Text style={styles.optionText}>Change Password</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => {
            const {user = {}} = route.params || {}; // Tambahkan nilai default {} untuk user
            const source = user?.role === 'Admin' ? 'admin' : 'nurse';
            navigation.navigate('AboutApp', {
              user,
              source, // Kirim source dinamis
            });
          }}>
          <View style={styles.optionBox}>
            <Image
              style={styles.abouticon}
              resizeMode="cover"
              source={require('../../../assets/-icon-info-empty.png')}
            />
            <Text style={styles.optionText}>About App</Text>
          </View>
        </Pressable>
      </View>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <Pressable style={styles.logoutButton} onPress={handleLogoutPress}>
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <Pressable
          style={styles.navItem}
          onPress={() => navigation.navigate('HomeScreenAdmin', {user})}>
          <Image
            style={styles.navIcon}
            resizeMode="cover"
            source={require('../../../assets/home.png')}
          />
          <Text style={styles.navText}>Home</Text>
        </Pressable>
        <Pressable
          style={styles.navItem}
          onPress={() => navigation.navigate('EditScreenAdmin', {user})}>
          <Image
            style={styles.navIcon}
            resizeMode="cover"
            source={require('../../../assets/assignment.png')}
          />
          <Text style={styles.navText}>Input</Text>
        </Pressable>
        <View style={styles.navItem}>
          <Image
            style={styles.navIcon}
            resizeMode="cover"
            source={require('../../../assets/account-circle.png')}
          />
          <Text style={styles.navTextActive}>Profile</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileScreenNurse: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
  },
  headerBackground: {
    backgroundColor: Color.colorMediumaquamarine,
    width: '80%',
    height: 275,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 75,
    borderBottomRightRadius: 75,
    elevation: 4,
  },
  memojiIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 10,
    backgroundColor: Color.colorMediumaquamarine,
  },
  profileText: {
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.poppinsBold,
    color: Color.schemesOnPrimary,
    marginTop: 10,
  },
  nameText: {
    fontSize: FontSize.m3BodyLarge_size,
    fontFamily: FontFamily.poppinsBold,
    color: Color.schemesOnPrimary,
    marginTop: 5,
  },
  roleText: {
    fontSize: FontSize.m3LabelLarge_size,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.schemesOnPrimary,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '90%',
  },
  optionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: Border.br_xs,
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  abouticon: {
    marginRight: 15,
  },
  icon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: FontSize.m3LabelLarge_size,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.notSoBlack,
  },
  logoutContainer: {
    marginBottom: 100,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF5A5F',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: Border.br_xs,
    elevation: 4,
  },
  logoutText: {
    color: '#FFF',
    fontSize: FontSize.m3LabelLarge_size,
    fontFamily: FontFamily.poppinsBold,
    textAlign: 'center',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 50,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    elevation: 8,
    borderTopWidth: 1,
    borderTopColor: '#EDEDED',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  navText: {
    marginTop: 5,
    fontSize: FontSize.iconText_size,
    color: Color.colorSilver_100,
    fontFamily: FontFamily.iconText,
  },
  navTextActive: {
    marginTop: 5,
    fontSize: FontSize.iconText_size,
    color: Color.colorMediumaquamarine,
    fontFamily: FontFamily.iconText,
    fontWeight: '600',
  },
});

export default ProfileScreenAdmin;
