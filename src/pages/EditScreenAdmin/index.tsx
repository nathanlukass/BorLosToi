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

const EditScreenAdmin = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.editScreenAdmin}>
          <View style={styles.pilihButton}>
            <View style={styles.pilihButtonChild} />
            <Pressable
              style={[styles.mujairA, styles.mujairShadowBox]}
              onPress={() => navigation.navigate('EditMujairA')}>
              <Image
                style={[styles.mujairIcon, styles.mujairIconLayout]}
                resizeMode="cover"
                source={require('../../../assets/mujair.png')}
              />
              <Text style={[styles.mujair, styles.mujairTypo]}>MUJAIR A</Text>
            </Pressable>
            <Pressable
              style={[styles.mujairB, styles.mujairShadowBox]}
              onPress={() => navigation.navigate('EditMujairB')}>
              <Image
                style={[styles.mujairIcon, styles.mujairIconLayout]}
                resizeMode="cover"
                source={require('../../../assets/mujair.png')}
              />
              <Text style={[styles.mujairB1, styles.mujairTypo]}>MUJAIR B</Text>
            </Pressable>
            <Pressable
              style={[styles.nike, styles.nikeShadowBox]}
              onPress={() => navigation.navigate('EditNike')}>
              <Image
                style={styles.vectorIcon}
                resizeMode="cover"
                source={require('../../../assets/vector1.png')}
              />
              <Text style={[styles.nike1, styles.icu1Typo]}>NIKE</Text>
            </Pressable>
            <Pressable
              style={[styles.neonati, styles.mujairShadowBox]}
              onPress={() => navigation.navigate('EditNeonati')}>
              <Image
                style={[styles.neonatiIcon, styles.iconPosition]}
                resizeMode="cover"
                source={require('../../../assets/mujair.png')}
              />
              <Text style={[styles.neonati1, styles.mujairTypo]}>NEONATI</Text>
            </Pressable>
            <Pressable
              style={[styles.obgynginekologi, styles.obgynShadowBox]}
              onPress={() => navigation.navigate('EditBomboya')}>
              <Image
                style={[styles.fishIcon, styles.iconPosition]}
                resizeMode="cover"
                source={require('../../../assets/fish.png')}
              />
              <Text style={[styles.bomboya, styles.mujairTypo]}>BOMBOYA</Text>
            </Pressable>
            <Pressable
              style={[styles.bomboya1, styles.mujairShadowBox]}
              onPress={() => navigation.navigate('EditPayangka')}>
              <Image
                style={styles.groupIcon}
                resizeMode="cover"
                source={require('../../../assets/group1.png')}
              />
              <Text style={[styles.payangka, styles.mujairTypo]}>PAYANGKA</Text>
            </Pressable>

            <Pressable
              style={[styles.obgyn, styles.obgynShadowBox]}
              onPress={() => navigation.navigate('EditKarper')}>
              <Image
                style={styles.karperIcon}
                resizeMode="cover"
                source={require('../../../assets/karper.png')}
              />
              <Text style={[styles.karper, styles.mujairTypo]}>KARPER</Text>
            </Pressable>
            <View style={[styles.pilihButtonInner, styles.icuWrapperLayout]}>
              <View style={[styles.frameWrapper, styles.framePosition]}>
                <View style={[styles.icuWrapper, styles.icuWrapperLayout]}>
                  <View style={[styles.icu, styles.framePosition]}>
                    <View style={[styles.groupParent, styles.groupLayout2]}>
                      <Pressable
                        style={styles.frameParent}
                        onPress={() => navigation.navigate('EditIcu')}>
                        <Image
                          style={styles.groupIconIcu}
                          resizeMode="cover"
                          source={require('../../../assets/group1.png')}
                        />
                      </Pressable>
                      <Text style={[styles.icu1, styles.icu1Typo]}>ICU</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <Pressable
              style={[styles.icu2, styles.nikeShadowBox]}
              onPress={() => navigation.navigate('EditMujairC')}>
              <Image
                style={[styles.mujairIcon, styles.mujairIconLayout]}
                resizeMode="cover"
                source={require('../../../assets/mujair.png')}
              />
              <Text style={[styles.mujair, styles.mujairTypo]}>MUJAIR C</Text>
            </Pressable>
            <Text style={styles.pilihRuangan}>Pilih Ruangan</Text>
            {/* <Image
              style={[styles.mujairIcon, styles.mujairIconLayout]}
              resizeMode="cover"
              source={require('../../../assets/mujair.png')}
            />
            <Image
              style={[styles.mujairIcon1, styles.mujairIconLayout]}
              resizeMode="cover"
              source={require('../../../assets/mujair.png')}
            />
            <Image
              style={styles.mujairIcon2}
              resizeMode="cover"
              source={require('../../../assets/mujair1.png')}
            /> */}
            {/* <Image
              style={[styles.fishIcon, styles.iconPosition]}
              resizeMode="cover"
              source={require('../../../assets/fish.png')}
            /> */}
            {/* <Image
              style={[styles.neonatiIcon, styles.iconPosition]}
              resizeMode="cover"
              source={require('../../../assets/neonati.png')}
            /> */}
            {/* <Image
              style={styles.karperIcon}
              resizeMode="cover"
              source={require('../../../assets/karper.png')}
            /> */}
          </View>
          <Text style={[styles.arilSangari, styles.halloAdminTypo]}>
            Aril Sangari
          </Text>
          <Text style={[styles.halloAdmin, styles.halloAdminTypo]}>
            Hallo Admin
          </Text>
          <Image
            style={styles.memojiIcon}
            resizeMode="cover"
            source={require('../../../assets/memoji2.png')}
          />
        </View>
      </ScrollView>
      <Pressable
        style={styles.bottomNavigation}
        onPress={() => navigation.navigate('EditScreenAdmin')}>
        <Pressable
          style={[styles.homeParent, styles.parentFlexBox]}
          onPress={() => navigation.navigate('HomeScreenAdmin')}>
          <Image
            style={styles.homeIcon}
            resizeMode="cover"
            source={require('../../../assets/home.png')}
          />
          <Text style={[styles.home, styles.homeTypo]}>Home</Text>
        </Pressable>
        <Pressable
          style={styles.parentFlexBox}
          onPress={() => navigation.navigate('EditScreenAdmin')}>
          <Image
            style={styles.homeIcon}
            resizeMode="cover"
            source={require('../../../assets/assignment1.png')}
          />
          <Text style={[styles.riwayat, styles.homeTypo]}>Edit</Text>
        </Pressable>
        <Pressable
          style={styles.parentFlexBox}
          onPress={() => navigation.navigate('ProfileScreenAdmin')}>
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
  },
  mujairShadowBox: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_31xl,
    justifyContent: 'center',
    borderRadius: Border.br_3xs,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 8,
    shadowRadius: 8,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    backgroundColor: Color.schemesOnPrimary,
  },
  mujairTypo: {
    textAlign: 'center',
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
    fontSize: FontSize.m3BodySmall_size,
    zIndex: 0,
    top: 80,
    position: 'absolute',
  },
  nikeShadowBox: {
    bottom: '58.17%',
    top: '26.29%',
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_31xl,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 138,
    borderRadius: Border.br_3xs,
    elevation: 8,
    shadowRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    height: '15.53%',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    position: 'absolute',
    backgroundColor: Color.schemesOnPrimary,
  },
  icu1Typo: {
    zIndex: 1,
    textAlign: 'center',
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
    fontSize: FontSize.m3BodySmall_size,
    position: 'absolute',
  },
  obgynShadowBox: {
    top: 476,
    height: 114,
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_31xl,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 138,
    borderRadius: Border.br_3xs,
    elevation: 8,
    shadowRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    position: 'absolute',
    backgroundColor: Color.schemesOnPrimary,
  },
  icuWrapperLayout: {
    width: 116,
    height: 14,
    position: 'absolute',
  },
  framePosition: {
    top: 0,
    position: 'absolute',
  },
  groupLayout2: {
    height: 58,
    width: 61,
  },
  groupChildLayout2: {
    height: 4,
    borderRadius: Border.br_8xs,
    top: 11,
    backgroundColor: Color.colorMediumaquamarine,
    position: 'absolute',
    overflow: 'hidden',
  },
  groupLayout: {
    height: 5,
    transform: [
      {
        rotate: '-65.4deg',
      },
    ],
    backgroundColor: Color.colorMediumaquamarine,
    borderRadius: Border.br_8xs,
    position: 'absolute',
    overflow: 'hidden',
  },
  groupChildLayout1: {
    width: 5,
    backgroundColor: Color.colorMediumaquamarine,
    borderRadius: Border.br_8xs,
    position: 'absolute',
    overflow: 'hidden',
  },
  groupChildLayout: {
    left: 61,
    width: 5,
    transform: [
      {
        rotate: '-65.4deg',
      },
    ],
    backgroundColor: Color.colorMediumaquamarine,
    borderRadius: Border.br_8xs,
    height: 58,
    position: 'absolute',
    overflow: 'hidden',
  },
  mujairIconLayout: {
    left: '9.35%',
    right: '64.84%',
    width: '300.81%',
    height: '150.26%',
    maxHeight: '100%',
    maxWidth: '100%',
    position: 'absolute',
    overflow: 'hidden',
  },
  iconPosition: {
    height: 60,
    left: '50%',
    position: 'absolute',
    overflow: 'hidden',
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
  parentFlexBox: {
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeTypo: {
    fontFamily: FontFamily.iconText,
    lineHeight: 20,
    fontSize: FontSize.iconText_size,
    textAlign: 'center',
    fontWeight: '500',
  },
  pilihButtonChild: {
    height: '86.65%',
    marginLeft: -166,
    top: '2.86%',
    bottom: '10.49%',
    shadowRadius: 9,
    elevation: 9,
    borderRadius: Border.br_xs,
    width: 328,
    display: 'none',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    left: '50%',
    position: 'absolute',
    backgroundColor: Color.schemesOnPrimary,
  },
  mujair: {
    left: 40,
    zIndex: 0,
  },
  mujairA: {
    marginLeft: -155,
    width: 138,
    paddingHorizontal: Padding.p_31xl,
    justifyContent: 'center',
    borderRadius: Border.br_3xs,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    bottom: '77.52%',
    height: '15.53%',
    top: '6.95%',
    left: '50%',
  },
  mujairB1: {
    left: 41,
    zIndex: 0,
  },
  mujairB: {
    right: 4,
    width: 138,
    paddingHorizontal: Padding.p_31xl,
    justifyContent: 'center',
    borderRadius: Border.br_3xs,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    bottom: '77.52%',
    height: '15.53%',
    top: '6.95%',
  },
  vectorIcon: {
    width: 53,
    height: 27,
    zIndex: 1000,
    bottom: 10,
  },
  nike1: {
    left: 56,
    top: 80,
    zIndex: 1000,
  },
  nike: {
    right: 4,
  },
  neonati1: {
    left: 43,
    zIndex: 0,
  },
  neonati: {
    top: 335,
    height: 114,
    right: 4,
    width: 138,
    paddingHorizontal: Padding.p_31xl,
    justifyContent: 'center',
    borderRadius: Border.br_3xs,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
  },
  bomboya: {
    left: 39,
    zIndex: 0,
  },
  obgynginekologi: {
    right: 169,
  },
  payangka: {
    left: 36,
    zIndex: 0,
  },
  bomboya1: {
    top: 334,
    right: 163,
    width: 147,
    height: 114,
    paddingHorizontal: Padding.p_31xl,
    justifyContent: 'center',
    borderRadius: Border.br_3xs,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
  },
  groupIcon: {
    height: '63.72%',
    width: '115%',
    top: '5%',
    right: '100.77%',
    bottom: '44.01%',
    position: 'absolute',
    marginLeft: 45,
    paddingLeft: 45,
  },
  groupIconIcu: {
    top: -25,
  },
  karper: {
    left: 47,
    zIndex: 0,
  },
  obgyn: {
    right: 0,
  },
  groupChild: {
    width: 14,
    left: 0,
  },
  groupItem: {
    left: 8,
    transform: [
      {
        rotate: '-65.4deg',
      },
    ],
    width: 15,
    height: 5,
    top: 14,
  },
  groupInner: {
    top: 21,
    left: 27,
    width: 23,
    transform: [
      {
        rotate: '-65.4deg',
      },
    ],
  },
  frameView: {
    top: 19,
    left: 24,
    width: 20,
    transform: [
      {
        rotate: '-65.4deg',
      },
    ],
  },
  groupChild1: {
    left: 37,
    width: 12,
    transform: [
      {
        rotate: '-65.4deg',
      },
    ],
  },
  groupChild2: {
    top: 16,
    left: 38,
    transform: [
      {
        rotate: '-65.4deg',
      },
    ],
    width: 15,
    height: 5,
  },
  frameParent: {
    left: 6,
    width: 49,
    height: 11,
    top: 14,
    position: 'absolute',
  },
  groupChild3: {
    left: 3,
    height: 46,
    top: 2,
  },
  groupChild4: {
    height: 45,
    top: 2,
    left: 56,
  },
  groupChild5: {
    top: 2,
  },
  groupChild6: {
    top: 44,
  },
  groupChild7: {
    top: 53,
    left: 59,
    height: 54,
    transform: [
      {
        rotate: '-65.4deg',
      },
    ],
  },
  groupChild8: {
    left: 1,
    borderRadius: 3,
    width: 1,
    height: 2,
    transform: [
      {
        rotate: '-65.4deg',
      },
    ],
    backgroundColor: Color.colorMediumaquamarine,
    top: 0,
    position: 'absolute',
    overflow: 'hidden',
  },
  frameGroup: {
    left: 0,
    top: 0,
    position: 'absolute',
  },
  groupParent: {
    zIndex: 0,
  },
  icu1: {
    top: 61,
    left: 25,
    fontWeight: '300',
  },
  icu: {
    right: -31,
    width: 129,
    height: 114,
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_31xl,
    justifyContent: 'center',
    borderRadius: Border.br_3xs,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 8,
    shadowRadius: 8,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    backgroundColor: Color.schemesOnPrimary,
  },
  icuWrapper: {
    top: 3,
    left: 0,
  },
  frameWrapper: {
    width: 134,
    left: 0,
    height: 14,
  },
  pilihButtonInner: {
    top: 620,
    left: 70,
  },
  icu2: {
    right: 172,
  },
  pilihRuangan: {
    marginLeft: -58,
    top: '0%',
    fontSize: FontSize.m3BodyLarge_size,
    fontWeight: '600',
    fontFamily: FontFamily.poppinsSemiBold,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowRadius: 8,
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textAlign: 'center',
    color: Color.notSoBlack,
    left: '50%',
    position: 'absolute',
  },
  mujairIcon: {
    top: '-5%',
    // left: 100,
    // right: '-100%',
    marginLeft: 15,
    paddingLeft: 100,
    width: 150,
    height: 100,
    // zIndex: 1000,
  },
  mujairIcon1: {
    // bottom: '80.79%',
    // right: '64.84%',
    marginLeft: 15,
    paddingLeft: 100,
    width: 150,
    height: 100,
    top: '-5%',
  },
  mujairIcon2: {
    top: 51,
    left: 197,
    width: 80,
    height: 92,
    position: 'absolute',
    overflow: 'hidden',
  },
  fishIcon: {
    marginLeft: 10,
    top: 18,
    height: 100,
    width: 80,
  },
  neonatiIcon: {
    marginTop: -32,
    marginLeft: 17,
    top: '50%',
    width: 60,
  },
  karperIcon: {
    height: '143.72%',
    width: '285%',
    top: -20,
    right: '35.77%',
    bottom: '44.01%',
    position: 'absolute',
    marginLeft: 45,
    paddingLeft: 45,
  },
  pilihButton: {
    height: '73.11%',
    marginLeft: -150,
    top: '14.24%',
    bottom: '12.65%',
    shadowRadius: 4,
    elevation: 4,
    width: 310,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    left: '50%',
    position: 'absolute',
  },
  arilSangari: {
    top: 90,
    fontWeight: '700',
    fontFamily: FontFamily.interBold,
    width: 181,
  },
  halloAdmin: {
    top: 65,
    fontFamily: FontFamily.poppinsRegular,
    width: 214,
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
  homeIcon: {
    width: 24,
    height: 24,
    overflow: 'hidden',
  },
  home: {
    color: Color.colorSilver_200,
  },
  homeParent: {
    backgroundColor: Color.schemesOnPrimary,
  },
  riwayat: {
    color: Color.colorMediumaquamarine,
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
  editScreenAdmin: {
    // borderRadius: Border.br_xl,
    flex: 1,
    // width: '100%',
    height: 1004,
    // overflow: 'hidden',
    // backgroundColor: Color.schemesOnPrimary,
  },
});

export default EditScreenAdmin;
