import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {DatePickerr, FilterCheckBox} from '../../components';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {FontSize, FontFamily, Color, Border} from '../../../GlobalStyles';

const BORAVLOSTOIBTONDRGDR = () => {
  const [isFilterChecked, setIsFilterChecked] = useState(false); // State to track checkbox status

  const datePickerStyle1 = {
    top: '19%',
  };
  const datePickerStyle2 = {
    top: '-55%',
    display: isFilterChecked ? 'flex' : 'none', // Show or hide based on checkbox state
  };
  const [selectedIndicator, setSelectedIndicator] =
    React.useState('Pilih Indikator');
  const [indicatorModalVisible, setIndicatorModalVisible] =
    React.useState(false);

  const indicators = ['BOR', 'AVLOS', 'TOI', 'BTO', 'NDR', 'GDR'];

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedIndicator(item);
        setIndicatorModalVisible(false);
      }}
      style={styles.item}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const handleViewPress = () => {
    if (selectedIndicator !== 'Pilih Indikator') {
      navigation.navigate(selectedIndicator);
    } else {
      alert('Silakan pilih indikator terlebih dahulu');
    }
  };

  return (
    <View style={styles.screenGuest}>
      <DatePickerr style={datePickerStyle1} />
      <View style={styles.groupParent}>
        <FilterCheckBox
          isChecked={isFilterChecked}
          onChange={() => setIsFilterChecked(!isFilterChecked)}
        />
      </View>
      <DatePickerr style={datePickerStyle2} />
      {/* <DatePickerr style={styles.datePickerStyle1} />
      <View style={styles.groupParent}>
        <FilterCheckBox />
      </View>
      <DatePickerr style={styles.datePickerStyle2} /> */}

      {/* Dropdown Pilih Indikator */}
      <Pressable
        style={styles.dropdown}
        onPress={() => setIndicatorModalVisible(true)}>
        <Text style={styles.dropdownText}>{selectedIndicator}</Text>
      </Pressable>

      {/* Modal Pilih Indikator */}
      <Modal
        transparent={true}
        visible={indicatorModalVisible}
        onRequestClose={() => setIndicatorModalVisible(false)}>
        <TouchableWithoutFeedback
          onPress={() => setIndicatorModalVisible(false)}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <FlatList
                  data={indicators}
                  keyExtractor={item => item}
                  renderItem={renderItem}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Tombol Lihat */}
      <Pressable style={styles.viewButton} onPress={handleViewPress}>
        <Text style={styles.viewButtonText}>Lihat</Text>
      </Pressable>

      <View style={[styles.barAtas, styles.filterShadowBox]}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('ScreenGuest')}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require('../../../assets/-icon-arrow-back.png')}
          />
        </Pressable>
        <Text style={[styles.backToLogin, styles.vectorIconPosition]}>
          Back to login page
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenGuest: {
    flex: 1,
    height: 900,
    backgroundColor: Color.schemesOnPrimary,
  },

  groupParent: {
    top: 190,
    left: 31,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
  },
  dropdown: {
    height: 40,
    width: 354,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Color.notSoBlack,
    borderRadius: 10,
    backgroundColor: Color.schemesOnPrimary,
    alignSelf: 'center',
    bottom: 470,
  },
  dropdownText: {
    fontSize: FontSize.m3LabelLarge_size,
    color: Color.notSoBlack,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 250,
    maxHeight: 300,
    backgroundColor: Color.schemesOnPrimary,
    padding: 20,
    borderRadius: 10,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  viewButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: Color.colorMediumaquamarine,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    bottom: 470,
    left: 135,
  },
  viewButtonText: {
    fontSize: FontSize.m3BodyLarge_size,
    color: Color.schemesOnPrimary,
  },
  filterShadowBox: {
    shadowOpacity: 1,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
  },
  icon: {
    height: '100%',
    width: '100%',
  },
  backButton: {
    width: 42,
    height: 25,
    zIndex: 0,
  },
  backToLogin: {
    marginTop: 1,
    fontWeight: '700',
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    fontSize: FontSize.m3BodyLarge_size,
    zIndex: 1,
    alignSelf: 'center',
    left: -200,
  },
  barAtas: {
    top: 20,
    left: 17,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowRadius: 4,
    elevation: 4,
    borderRadius: Border.br_8xs,
    width: 460,
    height: 45,
    justifyContent: 'space-between',
    backgroundColor: Color.schemesOnPrimary,
    alignSelf: 'center',
  },
});

export default BORAVLOSTOIBTONDRGDR;
