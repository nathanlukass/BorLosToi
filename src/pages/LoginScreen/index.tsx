import * as React from 'react';
import {Text, StyleSheet, View, Image, Pressable} from 'react-native';
import {Button} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import SelectUserNurse from '../../../components/SelectUserNurse';
import UsernameField from '../../../components/UsernameField';
import PasswordField from '../../../components/PasswordField';
import {
  FontFamily,
  Color,
  Padding,
  Border,
  FontSize,
} from '../../../GlobalStyles';

const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.loginScreenAdmin}>
      <View style={[styles.loginToContinueWrapper, styles.lineParentLayout]}>
        <Text style={[styles.loginToContinue, styles.orTypo]}>
          S Login to continue
        </Text>
      </View>
      <View
        style={[
          styles.pleaseSelectWhoYouAreWrapper,
          styles.loginFieldPosition,
        ]}>
        <Text style={[styles.pleaseSelectWho, styles.orTypo]}>
          Please select who you are
        </Text>
      </View>
      <View style={[styles.loginField, styles.loginFieldPosition]}>
        {/* Tambahkan komponen UsernameField di sini */}
        <UsernameField />
        {/* Tambahkan PasswordField di sini */}
        <PasswordField />
      </View>
      <View style={styles.loginButton}>
        <View style={[styles.lineParent, styles.lineParentLayout]}>
          <View style={[styles.groupChild, styles.groupLayout1]} />
          <View style={[styles.groupItem, styles.groupLayout1]} />
          <Text style={[styles.or, styles.orTypo]}>or</Text>
        </View>
        <Pressable
          style={[styles.groupParent, styles.groupLayout]}
          onPress={() => navigation.navigate('ScreenGuest')}>
          <View style={[styles.rectangleWrapper, styles.groupLayout]}>
            <View style={[styles.groupInner, styles.groupLayout]} />
          </View>
          <Text style={[styles.asAGuest, styles.loginPosition]}>
            As a guest
          </Text>
        </Pressable>
        <View style={[styles.groupContainer, styles.groupLayout]}>
          <Button
            style={styles.groupButton}
            mode="outlined"
            onPress={() => navigation.navigate('HomeScreenNurse')}
            contentStyle={styles.groupButtonBtn}>
            <Text style={[styles.login, styles.loginPosition]}>Login</Text>
          </Button>
        </View>
      </View>
      <Image
        style={styles.samratIcon}
        resizeMode="cover"
        source={require('../../../assets/samrat1.png')}
      />
      <View
        style={[
          styles.welcomeToSamratIndikatorWrapper,
          styles.welcomePosition,
        ]}>
        <Text style={[styles.welcomeToSamratContainer, styles.welcomePosition]}>
          <Text style={styles.welcomeTo}>Welcome to</Text>
          <Text style={styles.text}>{' \n'}</Text>
          <Text style={styles.samrat}>Samrat</Text>
          <Text style={styles.text1}> </Text>
          <Text style={styles.indikator}>Indikator</Text>
          <Text style={styles.text}> </Text>
        </Text>
      </View>
      <SelectUserNurse
        selectUserNursePosition="absolute"
        selectUserNurseTop={368}
        selectUserNurseLeft={27}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  groupButtonBtn: {
    height: 45,
    width: 320,
  },
  lineParentLayout: {
    height: 24,
    position: 'absolute',
  },
  orTypo: {
    textAlign: 'center',
    fontFamily: FontFamily.poppinsRegular,
    color: Color.notSoBlack,
    top: 0,
    position: 'absolute',
  },
  loginFieldPosition: {
    left: 21,
    position: 'absolute',
  },
  fieldFlexBox: {
    padding: Padding.p_3xs,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 30,
    width: 317,
    borderStyle: 'solid',
    borderRadius: Border.br_8xs,
    position: 'absolute',
  },
  groupLayout1: {
    height: 1,
    width: 142,
    borderTopWidth: 1,
    borderColor: Color.colorLightgray,
    top: 15,
    borderStyle: 'solid',
    position: 'absolute',
  },
  groupLayout: {
    width: 320,
    height: 45,
    position: 'absolute',
  },
  loginPosition: {
    color: Color.schemesOnPrimary,
    top: '50%',
    marginTop: -11.5,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    left: '50%',
    textAlign: 'center',
    lineHeight: 24,
    fontSize: FontSize.m3BodyLarge_size,
    position: 'absolute',
  },
  welcomePosition: {
    width: 241,
    left: '50%',
    position: 'absolute',
  },
  loginToContinue: {
    lineHeight: 24,
    fontSize: FontSize.m3BodyLarge_size,
    fontFamily: FontFamily.poppinsRegular,
    alignSelf: 'center',
  },
  loginToContinueWrapper: {
    top: 284,
    alignSelf: 'center',
    width: 138,
  },
  pleaseSelectWho: {
    fontSize: FontSize.m3LabelLarge_size,
    left: 10,
  },
  pleaseSelectWhoYouAreWrapper: {
    top: 341,
    width: 181,
    height: 21,
  },
  passwordField: {
    top: 93,
    left: 13,
  },
  loginField: {
    top: 420,
    width: 319,
    height: 138,
  },
  groupChild: {
    left: 0,
  },
  groupItem: {
    left: 180,
  },
  or: {
    alignSelf: 'center',
    lineHeight: 24,
    fontSize: FontSize.m3BodyLarge_size,
    fontFamily: FontFamily.poppinsRegular,
  },
  lineParent: {
    top: 53,
    width: 321,
    left: 1,
  },
  groupInner: {
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 9,
    elevation: 9,
    shadowOpacity: 1,
    backgroundColor: Color.colorCornflowerblue_100,
    borderRadius: Border.br_8xs,
    width: 320,
    left: 0,
    top: 0,
  },
  rectangleWrapper: {
    left: 2,
    top: 0,
  },
  asAGuest: {
    marginLeft: -39,
  },
  groupParent: {
    top: 85,
    left: 0,
  },
  groupButton: {
    left: 0,
    top: 2,
    position: 'absolute',
    backgroundColor: '#21b557',
  },
  login: {
    marginLeft: 22,
  },
  groupContainer: {
    left: 1,
    top: 0,
  },
  loginButton: {
    top: 620,
    left: 30,
    width: 322,
    height: 130,
    position: 'absolute',
  },
  samratIcon: {
    alignSelf: 'center',
    top: 129,
    width: 133,
    height: 142,
    position: 'absolute',
  },
  welcomeTo: {
    color: Color.notSoBlack,
  },
  text: {
    color: Color.colorBlack,
  },
  samrat: {
    color: Color.colorCrimson,
  },
  text1: {
    color: Color.colorMediumaquamarine,
  },
  indikator: {
    color: Color.colorCornflowerblue_200,
  },
  welcomeToSamratContainer: {
    marginLeft: -120.5,
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    width: 241,
    textAlign: 'center',
    top: 0,
  },
  welcomeToSamratIndikatorWrapper: {
    marginLeft: -123,
    top: 56,
    height: 72,
  },
  loginScreenAdmin: {
    borderRadius: Border.br_xl,
    alignSelf: 'center',
    width: 385,
    height: 800,
    overflow: 'hidden',
  },
});

export default LoginScreen;
