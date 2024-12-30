import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Pressable,
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { FontFamily, Color } from '../GlobalStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const dynamicFontSize = (size) => (width / 375) * size;
const dynamicPadding = (padding) => (height / 667) * padding;

const BottomSheetEditRuangan = ({ isVisible, onClose, user }) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [screenWidth, setScreenWidth] = useState(width);
  const [screenHeight, setScreenHeight] = useState(height);

  useEffect(() => {
    const onChange = ({ window }) => {
      setScreenWidth(window.width);
      setScreenHeight(window.height);
    };
    const subscription = Dimensions.addEventListener('change', onChange);

    return () => subscription?.remove();
  }, []);

  if (!isVisible) return null; // Menghindari kesalahan render jika tidak terlihat

  const cardButtons = [
    { label: 'Mujair A', navigateTo: 'EditMujairA' },
    { label: 'Mujair B', navigateTo: 'EditMujairB' },
    { label: 'Mujair C', navigateTo: 'EditMujairC' },
    { label: 'Karper', navigateTo: 'EditKarper' },
    { label: 'Neonati', navigateTo: 'EditNeonati' },
    { label: 'Nike', navigateTo: 'EditNike' },
    { label: 'Bomboya', navigateTo: 'EditBomboya' },
    { label: 'Payangka', navigateTo: 'EditPayangka' },
    { label: 'ICU', navigateTo: 'EditIcu' },
  ];

  const isLandscape = screenWidth > screenHeight;
  const numColumns = isLandscape ? 5 : 2.5;
  const cardSize = screenWidth / (numColumns + 1) - 8;

  return (
    <View style={styles.BottomSheet}>
      <Pressable style={styles.BottomSheetShadowCover} onPress={onClose} />
      <View
        style={[
          styles.BottomSheetMainContainer,
          {
            width: screenWidth,
            height: isLandscape ? screenHeight * 0.9 : screenHeight * 0.5,
          },
        ]}
      >
        <View style={styles.closerBar} />
        <Text style={styles.contentText}>Edit Berdasarkan Ruangan</Text>
        <ScrollView
          contentContainerStyle={styles.cardButtonContainer}
          showsVerticalScrollIndicator={!isLandscape}
        >
          {cardButtons.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.cardButton,
                { width: cardSize, height: cardSize * 0.6 },
              ]}
              onPress={() => navigation.navigate(item.navigateTo, { user })}
            >
              <Text style={styles.cardButtonText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default BottomSheetEditRuangan;

const styles = StyleSheet.create({
  BottomSheet: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 10,
  },
  BottomSheetShadowCover: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  BottomSheetMainContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  closerBar: {
    width: 75,
    height: 6,
    backgroundColor: '#ccc',
    borderRadius: 3,
    marginVertical: 8,
  },
  contentText: {
    fontSize: dynamicFontSize(16),
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsSemiBold,
    textAlign: 'center',
    marginVertical: dynamicPadding(16),
  },
  cardButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: dynamicPadding(8),
    marginHorizontal: dynamicPadding(8),
  },
  cardButton: {
    marginBottom: 16,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    overflow: 'visible',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.schemesOnPrimary,
  },
  cardButtonText: {
    fontSize: dynamicFontSize(13),
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsMedium,
    textAlign: 'center',
  },
});
