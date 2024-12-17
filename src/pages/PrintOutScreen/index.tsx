import * as React from "react";
import { StyleSheet, View, Text, Pressable, Modal, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import * as FileSystem from 'expo-file-system'; // Untuk mengunduh file
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
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  const FILE_URL = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"; // URL file untuk diunduh
  const FILE_NAME = "laporan.pdf"; // Nama file saat diunduh

  const renderItem = ({ item, onSelect }) => (
    <TouchableOpacity onPress={() => onSelect(item)} style={styles.item}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const handleDownload = async () => {
    if (selectedRoom === 'Pilih Ruangan' || selectedMonth === 'Pilih Bulan') {
      Alert.alert("Error", "Silakan pilih ruangan dan bulan terlebih dahulu.");
      return;
    }

    try {
      const downloadResumable = FileSystem.createDownloadResumable(
        FILE_URL,
        FileSystem.documentDirectory + FILE_NAME,
      );

      const { uri } = await downloadResumable.downloadAsync();
      Alert.alert("Sukses", `File berhasil diunduh!\nLokasi: ${uri}`);
    } catch (error) {
      console.error(error);
      Alert.alert("Gagal", "Gagal mengunduh file. Silakan coba lagi.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('HomeScreenAdmin')}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require('../../../assets/-icon-arrow-back.png')}
          />
        </Pressable>
        <Text style={styles.headerTitle}>Menu Print Out</Text>
      </View>

      {/* Dropdown Pilih Bulan */}
      <Pressable style={styles.dropdown} onPress={() => setMonthModalVisible(true)}>
        <Text style={styles.dropdownText}>{selectedMonth}</Text>
      </Pressable>

      {/* Dropdown Pilih Ruangan */}
      <Pressable style={styles.dropdown} onPress={() => setRoomModalVisible(true)}>
        <Text style={styles.dropdownText}>{selectedRoom}</Text>
      </Pressable>

      {/* Modal Pilih Bulan */}
      <Modal transparent visible={monthModalVisible} onRequestClose={() => setMonthModalVisible(false)}>
        <TouchableOpacity style={styles.modalBackground} onPressOut={() => setMonthModalVisible(false)}>
          <View style={styles.modalContent}>
            <FlatList
              data={months}
              keyExtractor={(item) => item}
              renderItem={({ item }) => renderItem({ item, onSelect: (value) => { setSelectedMonth(value); setMonthModalVisible(false); } })}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal Pilih Ruangan */}
      <Modal transparent visible={roomModalVisible} onRequestClose={() => setRoomModalVisible(false)}>
        <TouchableOpacity style={styles.modalBackground} onPressOut={() => setRoomModalVisible(false)}>
          <View style={styles.modalContent}>
            <FlatList
              data={rooms}
              keyExtractor={(item) => item}
              renderItem={({ item }) => renderItem({ item, onSelect: (value) => { setSelectedRoom(value); setRoomModalVisible(false); } })}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Tombol Print */}
      <Pressable style={styles.downloadButton} onPress={handleDownload}>
        <Text style={styles.downloadButtonText}>Unduh Laporan</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.schemesOnPrimary,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: FontSize.m3BodyLarge_size,
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    marginLeft: 10,
  },
  dropdown: {
    height: 50,
    justifyContent: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
  },
  dropdownText: {
    fontSize: FontSize.m3BodyLarge_size,
    fontFamily: FontFamily.poppinsRegular,
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
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  downloadButton: {
    backgroundColor: Color.colorMediumaquamarine,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  downloadButtonText: {
    fontSize: FontSize.m3BodyLarge_size,
    fontFamily: FontFamily.poppinsBold,
    color: '#fff',
  },
});

export default PrintOutScreen;
