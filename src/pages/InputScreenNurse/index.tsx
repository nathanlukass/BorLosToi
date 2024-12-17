import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/core';
import {FontFamily, Color} from '../../../GlobalStyles';
import {Gap, DatePickerr} from '../../components';
import RealTimeClock from '../../components/atoms/Time';
import moment from 'moment';

const NurseInputPage = ({route}) => {
  const {user} = route.params;
  const {username, role, ruangan, id_user, nama} = user;
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [jumlahTempatTidur, setJumlahTempatTidur] = useState('');
  const [pasienAwal, setPasienAwal] = useState('0');
  const [pasienMasuk, setPasienMasuk] = useState('0');
  const [pasienPindahan, setPasienPindahan] = useState('0');
  const [jumlah, setJumlah] = useState('0');
  const [pasienDipindahkan, setPasienDipindahkan] = useState('0');
  const [pasienHidup, setPasienHidup] = useState('0');
  const [pasienRujuk, setPasienRujuk] = useState('0');
  const [pasienAps, setPasienAps] = useState('0');
  const [pasienLainLain, setPasienLainLain] = useState('0');
  const [jumlah_PKH, setJumlahPKH] = useState('0');
  const [selectedDate, setSelectedDate] = useState(null); // atau new Date() jika ingin nilai default

  // New state variables for additional fields
  const [pasienKurangDari48Jam, setPasienKurangDari48Jam] = useState('0');
  const [pasienLebihDari48Jam, setPasienLebihDari48Jam] = useState('0');
  const [jumlah_PKM, setJumlahPKM] = useState('0');

  const [pasienMasihDirawat, setPasienMasihDirawat] = useState('0');
  const [pasienLamaDirawat, setPasienLamaDirawat] = useState('0');
  const [banyakPasien, setBanyakPasien] = useState('0');
  const [jumlahHari, setJumlahHari] = useState('0');
  const [kelas1, setKelas1] = useState('0');
  const [kelas2, setKelas2] = useState('0');
  const [kelas3, setKelas3] = useState('0');
  const [namaruangan, setRuangan] = useState(ruangan);

  const increment = setter => () =>
    setter(prev => (parseInt(prev, 10) + 1).toString());
  const decrement = setter => () =>
    setter(prev => {
      const newValue = parseInt(prev, 10) - 1;
      return newValue >= 0 ? newValue.toString() : '0';
    });

  const handleDateChange = async date => {
    if (!date || !ruangan) {
      Alert.alert('Error', 'Both date and room must be selected.');
      return;
    }

    const formattedDate = moment(date).format('YYYY-MM-DD'); // Format tanggal
    const normalizedRuangan = ruangan.replace(/\u00A0/g, ' ').trim();

    // Debugging tambahan untuk memeriksa nilai asli dan normalisasi ruangan
    console.log('Original Ruangan:', ruangan);
    console.log('Normalized Ruangan (after trim):', normalizedRuangan);
    console.log('Formatted Date:', formattedDate);

    // Validasi ruangan dengan fallback
    const validRooms = [
      'mujair a',
      'mujair b',
      'mujair c',
      'nike',
      'payangka',
      'neonati',
      'bomboya',
      'karper',
      'icu',
    ];
    if (!validRooms.includes(normalizedRuangan.toLowerCase())) {
      Alert.alert('Error', 'Invalid room selected.');
      return;
    }

    try {
      const response = await fetch(
        'https://samratindikator.online/borlostoi/public/insert/get_input_data',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            tanggal: formattedDate,
            ruangan: normalizedRuangan,
          }).toString(),
        },
      );

      // Cek apakah respons berhasil dan statusnya oke
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const rawResponse = await response.text(); // Ambil respons sebagai teks mentah
      console.log('Raw Response:', rawResponse); // Log respons mentah untuk debugging

      // Cek apakah respons berisi HTML atau data lainnya yang tidak bisa diparsing sebagai JSON
      if (rawResponse.startsWith('<')) {
        console.error('Response contains HTML:', rawResponse);
        Alert.alert(
          'Error',
          'Received HTML instead of JSON. Please check the server.',
        );
        return;
      }

      // Perbaiki jika ada beberapa objek JSON yang digabungkan tanpa pemisah yang benar
      const responseParts = rawResponse.split('}{');
      if (responseParts.length > 1) {
        // Gabungkan objek yang terpisah dengan benar
        responseParts[0] = responseParts[0] + '}'; // Menambahkan penutup kurung
        responseParts[responseParts.length - 1] =
          '{' + responseParts[responseParts.length - 1]; // Menambahkan pembuka kurung
      }

      // Coba parse setiap bagian JSON yang terpisah
      responseParts.forEach(part => {
        let result;
        try {
          result = JSON.parse(part);
          console.log('Parsed JSON:', result);

          if (result.status === 'success' && result.data) {
            const data = result.data;
            // Update state dengan data dari server
            setPasienAwal(data.pasien_awal || '0');
            setPasienMasuk(data.pasien_masuk || '0');
            setPasienPindahan(data.pasien_pindahan || '0');
            setPasienDipindahkan(data.pasien_dipindahkan || '0');
            setPasienHidup(data.pasien_hidup || '0');
            setPasienRujuk(data.pasien_rujuk || '0');
            setPasienAps(data.pasien_aps || '0');
            setPasienLainLain(data.pasien_lain_lain || '0');
            setPasienKurangDari48Jam(data.pasien_kurang_dari_48jam || '0');
            setPasienLebihDari48Jam(data.pasien_lebih_dari_48jam || '0');
            setPasienMasihDirawat(data.pasien_masih_dirawat || '0');
            setPasienLamaDirawat(data.pasien_lama_dirawat || '0');
            setBanyakPasien(data.banyak_pasien || '0');
            setJumlahHari(data.jumlah_hari_perawatan || '0');
            setKelas1(data.kelas_1 || '0');
            setKelas2(data.kelas_2 || '0');
            setKelas3(data.kelas_3 || '0');
          } else {
            Alert.alert('Error', result.message || 'No data found.');
          }
        } catch (jsonError) {
          console.error('JSON Parse Error:', jsonError.message);
          Alert.alert('Error', 'Invalid response from server.');
        }
      });
    } catch (error) {
      console.error('Fetch Error:', error.message);
      Alert.alert(
        'Error',
        'Failed to fetch data. Please check your network connection.',
      );
    }
  };

  const checkDataExist = async (formattedDate, ruangan) => {
    try {
      const response = await fetch(
        'https://samratindikator.online/borlostoi/public/insert/check_data_exist',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            date: formattedDate,
            ruangan: ruangan,
          }).toString(),
        },
      );

      const rawResponse = await response.text(); // Ambil respons sebagai teks mentah
      console.log('Raw Response:', rawResponse); // Log respons untuk debugging

      // Validasi apakah respons adalah JSON
      if (!rawResponse.startsWith('{') && !rawResponse.startsWith('[')) {
        throw new Error('Response is not valid JSON');
      }

      const result = JSON.parse(rawResponse); // Parse ke JSON jika valid
      console.log('Parsed Response:', result);

      if (result.status === 'success' && result.data.exists) {
        return true; // Data sudah ada
      }
      return false; // Data belum ada
    } catch (error) {
      console.error('Error checking data existence:', error.message);
      Alert.alert(
        'Error',
        'Failed to check data existence or invalid response format.',
      );
      return true; // Blok input jika ada error
    }
  };

  const handleSubmitButton2 = async () => {
    if (!selectedDate) {
      Alert.alert('Error', 'Please select a date!');
      return;
    }

    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    const normalizedRuangan = ruangan
      .replace(/\u00A0/g, ' ')
      .trim()
      .toLowerCase();

    // Cek apakah data sudah ada sebelum input
    const dataExists = await checkDataExist(formattedDate, normalizedRuangan);
    if (dataExists) {
      Alert.alert('Peringatan', 'Data untuk tanggal ini sudah diinput.');
      return; // Hentikan proses input
    }

    try {
      const response = await fetch(
        'https://samratindikator.online/borlostoi/public/insert/insert_nurse',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            ruangan: normalizedRuangan,
            tanggal: formattedDate,
            pasien_awal: pasienAwal,
            pasien_masuk: pasienMasuk,
            pasien_pindahan: pasienPindahan,
            pasien_dipindahkan: pasienDipindahkan,
            pasien_hidup: pasienHidup,
            pasien_rujuk: pasienRujuk,
            pasien_aps: pasienAps,
            pasien_lain_lain: pasienLainLain,
            pasien_kurang_dari_48jam: pasienKurangDari48Jam,
            pasien_lebih_dari_48jam: pasienLebihDari48Jam,
            pasien_lama_dirawat: pasienLamaDirawat,
            banyak_pasien: banyakPasien,
            kelas_1: kelas1,
            kelas_2: kelas2,
            kelas_3: kelas3,
          }).toString(),
        },
      );

      const result = await response.json();
      console.log('Insert Response:', result);

      if (result.status === 'success') {
        Alert.alert('Sukses', 'Data berhasil diinput.');
      } else {
        Alert.alert('Error', result.message || 'Gagal menginput data.');
      }
    } catch (error) {
      console.error('Fetch Error:', error.message);
      Alert.alert(
        'Error',
        'Failed to fetch data. Please check your network connection.',
      );
    }
  };

  const renderInputField = (label, value, setValue) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={[styles.button, styles.decrementButton]}
          onPress={decrement(setValue)}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={String(value)}
          keyboardType="numeric"
          onChangeText={text => {
            const numericValue = text.replace(/[^0-9]/g, '');
            setValue(numericValue);
          }}
        />
        <TouchableOpacity
          style={[styles.button, styles.incrementButton]}
          onPress={increment(setValue)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const fetchJumlahBed = async () => {
    try {
      // Membersihkan ruangan tanpa mengubah case-sensitive
      const normalizedRuangan = ruangan
        .replace(/\u00A0/g, ' ') // Mengganti spasi non-breaking
        .replace(/[^a-zA-Z0-9 ]/g, '') // Hapus karakter khusus
        .trim();

      console.log('Normalized Ruangan:', JSON.stringify(normalizedRuangan));

      const response = await fetch(
        'https://samratindikator.online/borlostoi/public/insert/get_bed_quantity',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: new URLSearchParams({
            ruangan: normalizedRuangan, // Kirim ruangan sesuai format database
          }).toString(),
        },
      );

      const rawText = await response.text();
      console.log('Raw Response:', rawText);

      if (!rawText.startsWith('{')) {
        throw new Error('Invalid response format');
      }

      const result = JSON.parse(rawText);
      console.log('Parsed Response:', result);

      const key = `jumlah bed ${normalizedRuangan}`; // Key sesuai dengan format database
      if (result.status === 'success' && result[key] !== undefined) {
        setJumlahTempatTidur(result[key].toString());
      } else {
        Alert.alert(
          'Error',
          `Data jumlah tempat tidur untuk ${normalizedRuangan} tidak ditemukan.`,
        );
      }
    } catch (error) {
      console.error('Fetch error:', error.message);
      Alert.alert('Error', 'Terjadi kesalahan: ' + error.message);
    }
  };

  useEffect(() => {
    fetchJumlahBed(); // Fetch data saat komponen dimuat
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.sectionHeader}>
          <Pressable
            style={styles.iconArrowBack}
            onPress={() => navigation.navigate('HomeScreenNurse', {user})}>
            <Image
              style={styles.icon}
              resizeMode="cover"
              source={require('../../../assets/-icon-arrow-back.png')}
            />
          </Pressable>
          <View>
            <Text style={styles.headerTitle}>{ruangan}</Text>
          </View>
        </View>

        {/* Subtitle Text */}
        <View style={styles.timeInfoContainer}>
          <RealTimeClock />
        </View>
        <DatePickerr
          style={{top: -8, width: 370, alignSelf: 'center'}}
          onDateChange={date => {
            console.log('Selected Date from DatePickerr:', date);
            setSelectedDate(date); // Update selectedDate dengan nilai date yang dipilih
            handleDateChange(date); // Panggil fungsi handleDateChange jika perlu
          }}
        />

        {/* Fields with increment/decrement buttons */}
        <View style={styles.sectionJumlahBed}>
          <Text style={styles.label}>Jumlah tempat tidur:</Text>
          <Text style={styles.jumlahBed}>{jumlahTempatTidur}</Text>
        </View>

        {/* Existing sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pasien Awal</Text>
          {renderInputField('Pasien awal', pasienAwal, setPasienAwal)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pasien Masuk Ruangan</Text>
          {renderInputField('Pasien masuk', pasienMasuk, setPasienMasuk)}
          {renderInputField(
            'Pasien pindahan',
            pasienPindahan,
            setPasienPindahan,
          )}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pasien Keluar Ruangan</Text>
          <View style={styles.row}>
            <Text style={[styles.subsectionTitle, {marginRight: 6}]}>
              Pasien keluar
            </Text>
            <Text style={[styles.subsectionTitle, {color: '#00A676'}]}>
              Hidup
            </Text>
          </View>
          {renderInputField(
            'Pasien dipindahkan',
            pasienDipindahkan,
            setPasienDipindahkan,
          )}
          {renderInputField('Hidup', pasienHidup, setPasienHidup)}
          {renderInputField('Rujuk', pasienRujuk, setPasienRujuk)}
          {renderInputField('APS', pasienAps, setPasienAps)}
          {renderInputField('Lain-lain', pasienLainLain, setPasienLainLain)}

          {/* Pasien keluar Meninggal */}
          <View style={styles.row}>
            <Text style={[styles.subsectionTitle, {marginRight: 6}]}>
              Pasien keluar
            </Text>
            <Text style={[styles.subsectionTitle, {color: '#FF5A5F'}]}>
              Meninggal
            </Text>
          </View>
          {renderInputField(
            'Kurang dari 48 jam',
            pasienKurangDari48Jam,
            setPasienKurangDari48Jam,
          )}
          {renderInputField(
            'Lebih dari 48 jam',
            pasienLebihDari48Jam,
            setPasienLebihDari48Jam,
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pasien yang masih dirawat</Text>
          {/* {renderInputField(
            'Masih dirawat',
            pasienMasihDirawat,
            setPasienMasihDirawat,
          )} */}
          {renderInputField(
            'Lama dirawat',
            pasienLamaDirawat,
            setPasienLamaDirawat,
          )}
          {renderInputField(
            'Pasien keluar/masuk \npada hari yang sama',
            banyakPasien,
            setBanyakPasien,
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kelas Pasien</Text>
          {renderInputField('Kelas 1', kelas1, setKelas1)}
          {renderInputField('Kelas 2', kelas2, setKelas2)}
          {renderInputField('Kelas 3', kelas3, setKelas3)}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitButton2}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFFF',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  row: {
    top: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  subsectionTitle: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    marginTop: 15,
    marginBottom: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginEnd: 75,
    paddingVertical: 5,
  },
  totalLabel: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.notSoBlack,
  },
  totalValue: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    textAlign: 'right',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    textAlign: 'center',
    flex: 1,
    right: 23,
  },
  timeInfoContainer: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 55,
  },
  timeInfoText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: FontFamily.poppinsRegular,
  },
  sectionJumlahBed: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
    width: '120%',
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  jumlahBed: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.notSoBlack,
    marginLeft: 155,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    marginBottom: 10,
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.notSoBlack,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 'auto',
    marginBottom: 5,
  },
  button: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  decrementButton: {
    backgroundColor: '#D3D3D3',
  },
  incrementButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: FontFamily.poppinsBold,
  },
  input: {
    width: 40,
    height: 35,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: FontFamily.poppinsRegular,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginHorizontal: 5,
    paddingBottom: 5,
    paddingVertical: 5,
  },
  submitButton: {
    backgroundColor: '#28A745',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: FontFamily.poppinsBold,
  },
  iconArrowBack: {
    width: 42,
    height: 25,
    left: -140,
  },
});

export default NurseInputPage;
