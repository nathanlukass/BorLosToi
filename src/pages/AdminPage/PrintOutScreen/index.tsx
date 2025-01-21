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
  Dimensions,
} from 'react-native';
import {Border, Color, FontFamily, FontSize} from '../../../../GlobalStyles';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/core';
import {useNavigation} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';

const {width, height} = Dimensions.get('window');
const dynamicFontSize = size => (width / 375) * size; // 375 adalah lebar referensi
const dynamicPadding = padding => (height / 667) * padding; // 667 adalah tinggi referensi

const PrintOutScreen = ({route}) => {
  const {user} = route.params;
  const {username, role, ruangan, id_user, nama} = user;
  const navigation = useNavigation();
  const [selectedRoom, setSelectedRoom] = React.useState('Pilih Ruangan');
  const [selectedMonth, setSelectedMonth] = React.useState('Pilih Bulan');
  const [selectedYear, setSelectedYear] = React.useState('Pilih Tahun');
  const [roomModalVisible, setRoomModalVisible] = React.useState(false);
  const [monthModalVisible, setMonthModalVisible] = React.useState(false);
  const [yearModalVisible, setYearModalVisible] = React.useState(false); // New modal for year
  const [isLoading, setIsLoading] = React.useState(false);

  const rooms = [
    'Mujair A',
    'Mujair B',
    'Mujair C',
    'Nike',
    'Payangka',
    'Neonati',
    'Bomboya',
    'Karper',
    'ICU',
  ];

  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  // Get current year and calculate previous and next year
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 1, currentYear, currentYear + 1];

  const FILE_NAME = 'laporan.pdf'; // Nama file saat diunduh
  const API_URL =
    'https://samratindikator.online/borlostoi/public/insert/export_table';

  const renderItem = ({item, onSelect}) => (
    <TouchableOpacity onPress={() => onSelect(item)} style={styles.item}>
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  // Fungsi untuk merender modal secara dinamis
  const renderModal = (isVisible, items, onSelect, setVisible) => (
    <Modal
      transparent
      visible={isVisible}
      onRequestClose={() => setVisible(false)}>
      <TouchableOpacity
        style={styles.modalBackground}
        onPressOut={() => setVisible(false)}>
        <View style={styles.modalContent}>
          <FlatList
            data={items}
            keyExtractor={item => item.toString()}
            renderItem={({item}) =>
              renderItem({
                item,
                onSelect: value => {
                  onSelect(value);
                  setVisible(false);
                },
              })
            }
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const monthMap = {
    Januari: '01',
    Februari: '02',
    Maret: '03',
    April: '04',
    Mei: '05',
    Juni: '06',
    Juli: '07',
    Agustus: '08',
    September: '09',
    Oktober: '10',
    November: '11',
    Desember: '12',
  };

  const handleDownload = async () => {
    try {
      if (
        selectedRoom === 'Pilih Ruangan' ||
        selectedMonth === 'Pilih Bulan' ||
        selectedYear === 'Pilih Tahun'
      ) {
        Alert.alert(
          'Error',
          'Silakan pilih ruangan, bulan, dan tahun terlebih dahulu.',
        );
        return;
      }

      const monthNumber = monthMap[selectedMonth]; // Ubah ke format MM
      if (!monthNumber) {
        throw new Error('Bulan tidak valid. Silakan periksa kembali.');
      }

      const formData = new URLSearchParams();
      formData.append('ruangan', selectedRoom);
      formData.append('month', monthNumber);
      formData.append('year', selectedYear); // Include selected year

      // Fetch data dari server
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: formData.toString(),
      });

      console.log('Response Status:', response.status);
      console.log('Content-Type:', response.headers.get('Content-Type'));

      // Validasi jika respons bukan PDF
      if (response.headers.get('Content-Type') !== 'application/pdf') {
        const responseText = await response.text();
        console.log('Response Text:', responseText);
        throw new Error('Tidak ada data pada bulan dan tahun yang dipilih.');
      }

      // Ambil file PDF
      const arrayBuffer = await response.arrayBuffer();
      const base64Data = Buffer.from(arrayBuffer).toString('base64');
      const filePath = `${RNFS.DownloadDirectoryPath}/report_${selectedRoom}_${selectedMonth}_${selectedYear}.pdf`;

      await RNFS.writeFile(filePath, base64Data, 'base64');
      Alert.alert('Sukses', `File berhasil disimpan di:\n${filePath}`);
    } catch (error) {
      console.error('Error:', error.message);
      Alert.alert('Error', error.message || 'Terjadi kesalahan.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.barAtas]}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('HomeScreenAdmin', {user})}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require('../../../../assets/-icon-arrow-back.png')}
          />
        </Pressable>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Print out</Text>
        </View>
      </View>

      {/* Dropdown Pilih Bulan */}
      <Pressable
        style={styles.dropdown}
        onPress={() => setMonthModalVisible(true)}>
        <Text style={styles.dropdownText}>{selectedMonth}</Text>
      </Pressable>

      {/* Dropdown Pilih Tahun */}
      <Pressable
        style={styles.dropdown}
        onPress={() => setYearModalVisible(true)}>
        <Text style={styles.dropdownText}>{selectedYear}</Text>
      </Pressable>

      {/* Dropdown Pilih Ruangan */}
      <Pressable
        style={styles.dropdown}
        onPress={() => setRoomModalVisible(true)}>
        <Text style={styles.dropdownText}>{selectedRoom}</Text>
      </Pressable>

      {renderModal(
        monthModalVisible,
        months,
        setSelectedMonth,
        setMonthModalVisible,
      )}

      {/* Modal Pilih Tahun */}
      {renderModal(
        yearModalVisible,
        years,
        setSelectedYear,
        setYearModalVisible,
      )}

      {/* Modal Pilih Ruangan */}
      {renderModal(
        roomModalVisible,
        rooms,
        setSelectedRoom,
        setRoomModalVisible,
      )}

      {/* Tombol Print */}
      <Pressable
        style={[styles.downloadButton, isLoading && styles.disabledButton]}
        onPress={isLoading ? null : handleDownload}>
        <Text style={styles.downloadButtonText}>
          {isLoading ? 'Mengunduh...' : 'Unduh Laporan'}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.schemesOnPrimary,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    width: 45,
    height: 45,
    justifyContent: 'center',
    zIndex: 10,
  },
  icon: {
    width: 45,
    height: 25,
  },
  textContainer: {
    flex: 1,
    right: 'auto',
    top: '25%',
    transform: [{translateY: -12}],
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    fontSize: 18,
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
    fontSize: dynamicFontSize(16),
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
    backgroundColor: '#21B557',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  downloadButtonText: {
    fontSize: dynamicFontSize(16),
    fontFamily: FontFamily.poppinsSemiBold,
    color: '#fff',
  },
  barAtas: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
});

export default PrintOutScreen;
