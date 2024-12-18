import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import * as FileSystem from 'expo-file-system'; // For file handling
import { Border, Color, FontFamily, FontSize } from '../../../GlobalStyles';
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

  const API_URL = 'https://samratindikator.online/borlostoi/public/insert/export_table';

  const handleDownload = async () => {
    if (selectedRoom === 'Pilih Ruangan' || selectedMonth === 'Pilih Bulan') {
      Alert.alert('Error', 'Silakan pilih ruangan dan bulan terlebih dahulu.');
      return;
    }
  
    // Mapping month names to numbers
    const monthMap = {
      Januari: 1, Februari: 2, Maret: 3, April: 4,
      Mei: 5, Juni: 6, Juli: 7, Agustus: 8,
      September: 9, Oktober: 10, November: 11, Desember: 12,
    };
  
    const monthNumber = monthMap[selectedMonth];
  
    try {
      // Prepare API parameters
      const formData = new URLSearchParams();
      formData.append('ruangan', selectedRoom);
      formData.append('month', monthNumber.toString());
  
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });
  
      if (!response.ok) throw new Error('Gagal mengambil data dari server.');
  
      // Get text data and save as HTML file
      const responseText = await response.text();
      const fileName = `report_${selectedRoom}_${selectedMonth}.html`;
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;
  
      // Write file to local storage
      await FileSystem.writeAsStringAsync(fileUri, responseText, {
        encoding: FileSystem.EncodingType.UTF8,
      });
  
      Alert.alert('Sukses', `File berhasil diunduh!\nLokasi: ${fileUri}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Gagal mengunduh file. Silakan coba lagi.');
    }
  };
  
  

  const renderItem = ({ item, onSelect }) => (
    <TouchableOpacity onPress={() => onSelect(item)} style={styles.item}>
      <Text style={styles.dropdownText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image resizeMode="cover" source={require('../../../assets/-icon-arrow-back.png')} />
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
              renderItem={({ item }) =>
                renderItem({
                  item,
                  onSelect: (value) => {
                    setSelectedMonth(value);
                    setMonthModalVisible(false);
                  },
                })
              }
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
              renderItem={({ item }) =>
                renderItem({
                  item,
                  onSelect: (value) => {
                    setSelectedRoom(value);
                    setRoomModalVisible(false);
                  },
                })
              }
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Tombol Download */}
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
    justifyContent: 'center',
    paddingVertical: 10,
    marginBottom: 50,
  },
  backButton: {
    position: 'absolute',
    left: 1,
  },
  headerTitle: {
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    textAlign: 'center',
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
