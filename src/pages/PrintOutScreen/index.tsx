import * as React from "react";
import { StyleSheet, View, Text, Pressable, Modal, FlatList, TouchableOpacity } from "react-native";
import { Border, Color, FontFamily, FontSize } from "../../../GlobalStyles";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, ParamListBase } from '@react-navigation/core';

const PrintOutScreen = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [selectedRoom, setSelectedRoom] = React.useState('Pilih Ruangan');
  const [selectedMonth, setSelectedMonth] = React.useState('Pilih Bulan');
  const [roomModalVisible, setRoomModalVisible] = React.useState(false);
  const [monthModalVisible, setMonthModalVisible] = React.useState(false);

  const rooms = ['Mujair A', 'Mujair B', 'Mujair C', 'Nike', 'Payangka', 'Neonati', 'Bomboya', 'Karper', 'ICU'];
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const renderItem = ({ item, onSelect }) => (
    <TouchableOpacity onPress={() => onSelect(item)} style={styles.item}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const handlePrint = () => {
    if (selectedRoom !== 'Pilih Ruangan' && selectedMonth !== 'Pilih Bulan') {
      alert(`Mencetak laporan untuk ${selectedRoom} bulan ${selectedMonth}`);
    } else {
      alert('Silakan pilih ruangan dan bulan terlebih dahulu.');
    }
  };

  return (
    <View style={styles.homeScreenAdmin}>
      <View style={[styles.barAtas, styles.barAtasPosition]}>
        <Pressable onPress={() => navigation.navigate('HomeScreenAdmin')}>
          <Text style={styles.iconArrowBack}>{"< Back"}</Text>
        </Pressable>
        <Text style={[styles.inputHarian, styles.inputTypo]}>
          Menu Print Out
        </Text>
      </View>

      {/* Dropdown Pilih Bulan */}
      <Pressable style={styles.dropdownn} onPress={() => setMonthModalVisible(true)}>
        <Text style={styles.dropdownText}>{selectedMonth}</Text>
      </Pressable>

      {/* Dropdown Pilih Ruangan */}
      <Pressable style={styles.dropdown} onPress={() => setRoomModalVisible(true)}>
        <Text style={styles.dropdownText}>{selectedRoom}</Text>
      </Pressable>

      {/* Modal Pilih Bulan */}
      <Modal
        transparent={true}
        visible={monthModalVisible}
        onRequestClose={() => setMonthModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPressOut={() => setMonthModalVisible(false)} // Menutup modal ketika klik di luar
        >
          <View style={styles.modalContent}>
            <FlatList
              data={months}
              keyExtractor={(item) => item}
              renderItem={({ item }) => renderItem({ item, onSelect: (value) => {
                setSelectedMonth(value);
                setMonthModalVisible(false);
              } })}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal Pilih Ruangan */}
      <Modal
        transparent={true}
        visible={roomModalVisible}
        onRequestClose={() => setRoomModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPressOut={() => setRoomModalVisible(false)} // Menutup modal ketika klik di luar
        >
          <View style={styles.modalContent}>
            <FlatList
              data={rooms}
              keyExtractor={(item) => item}
              renderItem={({ item }) => renderItem({ item, onSelect: (value) => {
                setSelectedRoom(value);
                setRoomModalVisible(false);
              } })}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Tombol Print */}
      <Pressable style={styles.printButton} onPress={handlePrint}>
        <Text style={styles.printButtonText}>Print</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  iconArrowBack: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputTypo: {
    fontFamily: FontFamily.poppinsBold,
    fontWeight: '700',
  },
  inputHarian: {
    marginTop: -11.5,
    marginLeft: -35,
    fontSize: FontSize.m3BodyLarge_size,
    zIndex: 1,
    position: 'absolute',
    textAlign: 'left',
    top: '50%',
    left: '50%',
    color: Color.notSoBlack,
  },
  barAtasPosition: {
    borderRadius: Border.br_8xs,
    alignSelf: 'center',
    position: 'absolute',
  },
  barAtas: {
    top: 24,
    width: 360,
    height: 45,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.schemesOnPrimary,
  },
  dropdown: {
    height: 40,
    marginTop: 3,
    marginHorizontal: 30,
    marginVertical: 15,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Color.notSoBlack,
    borderRadius: 8,
    backgroundColor: Color.schemesOnPrimary,
  },
  dropdownn: {
    height: 40,
    marginTop: 100,
    marginHorizontal: 30,
    marginVertical: 15,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Color.notSoBlack,
    borderRadius: 8,
    backgroundColor: Color.schemesOnPrimary,
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
    width: 300,
    maxHeight: 400,
    backgroundColor: Color.schemesOnPrimary,
    padding: 20,
    borderRadius: 10,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  homeScreenAdmin: {
    flex: 1,
    backgroundColor: Color.schemesOnPrimary,
  },
  printButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: Color.colorMediumaquamarine,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  printButtonText: {
    fontSize: FontSize.m3BodyLarge_size,
    color: Color.schemesOnPrimary,
  },
});

export default PrintOutScreen;
