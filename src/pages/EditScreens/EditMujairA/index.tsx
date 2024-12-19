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
import {
  Padding,
  Border,
  Color,
  FontFamily,
  FontSize,
} from '../../../../GlobalStyles';
import {Gap, DatePickerr, RealTimeClock} from '../../../components';
import moment from 'moment';
import {ScreenWidth} from 'react-native-elements/dist/helpers';

const EditMujairA = ({route}) => {
  const {user} = route.params;
  const {ruangan} = user;
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const titleRuangan = 'Mujair A';
  const [jumlahTempatTidur, setJumlahTempatTidur] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [pasienAwal, setPasienAwal] = useState('0');
  const [pasienMasuk, setPasienMasuk] = useState('0');
  const [pasienPindahan, setPasienPindahan] = useState('0');
  const [pasienDipindahkan, setPasienDipindahkan] = useState('0');
  const [pasienHidup, setPasienHidup] = useState('0');
  const [pasienRujuk, setPasienRujuk] = useState('0');
  const [pasienAps, setPasienAps] = useState('0');
  const [pasienLainLain, setPasienLainLain] = useState('0');
  const [pasienKurangDari48Jam, setPasienKurangDari48Jam] = useState('0');
  const [pasienLebihDari48Jam, setPasienLebihDari48Jam] = useState('0');
  const [pasienMasihDirawat, setPasienMasihDirawat] = useState('0');
  const [pasienLamaDirawat, setPasienLamaDirawat] = useState('0');
  const [banyakPasien, setBanyakPasien] = useState('0');
  const [jumlahHari, setJumlahHari] = useState('0');
  const [kelas1, setKelas1] = useState('0');
  const [kelas2, setKelas2] = useState('0');
  const [kelas3, setKelas3] = useState('0');
  const [namaruangan, setRuangan] = useState(titleRuangan);

  const increment = setter => () =>
    setter(prev => (parseInt(prev, 10) + 1).toString());
  const decrement = setter => () =>
    setter(prev => {
      const newValue = parseInt(prev, 10) - 1;
      return newValue >= 0 ? newValue.toString() : '0';
    });

  // Fetch data for the selected date and populate form fields
  const handleDateChange = async date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setSelectedDate(formattedDate);

    console.log('Selected Date:', formattedDate);
    console.log('Ruangan yang dikirim:', titleRuangan);

    if (!titleRuangan || !formattedDate) {
      Alert.alert('Error', 'Tanggal dan Ruangan harus diisi.');
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
            ruangan: titleRuangan,
          }).toString(),
        },
      );

      const result = await response.json();
      console.log('API Response:', result);

      if (result.status === 'success' && result.data) {
        const data = result.data;
        setPasienAwal(data.pasien_awal);
        setPasienMasuk(data.pasien_masuk);
        setPasienPindahan(data.pasien_pindahan);
        setPasienDipindahkan(data.pasien_dipindahkan);
        setPasienHidup(data.pasien_hidup);
        setPasienRujuk(data.pasien_rujuk);
        setPasienAps(data.pasien_aps);
        setPasienLainLain(data.pasien_lain_lain);
        setPasienKurangDari48Jam(data.pasien_kurang_dari_48jam);
        setPasienLebihDari48Jam(data.pasien_lebih_dari_48jam);
        setPasienMasihDirawat(data.pasien_masih_dirawat);
        setPasienLamaDirawat(data.pasien_lama_dirawat);
        setBanyakPasien(data.banyak_pasien);
        setJumlahHari(data.jumlah_hari_perawatan);
        setKelas1(data.kelas_1);
        setKelas2(data.kelas_2);
        setKelas3(data.kelas_3);
      } else {
        Alert.alert(
          'Error',
          'No data found for the selected date. Please try another date.',
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch data: ' + error.message);
    }
  };

  const handleSubmitButton2 = async () => {
    try {
      const response = await fetch(
        'https://samratindikator.online/borlostoi/public/insert/update_nurse',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            tanggal: selectedDate,
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
            pasien_Masih_Dirawat: pasienMasihDirawat,
            pasien_lama_dirawat: pasienLamaDirawat,
            banyak_pasien: banyakPasien,
            jumlah_hari_Perawatan: jumlahHari,
            kelas_1: kelas1,
            kelas_2: kelas2,
            kelas_3: kelas3,
            ruangan: namaruangan,
          }).toString(),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseBody = await response.text();
      let result;
      try {
        result = JSON.parse(responseBody);
      } catch (err) {
        result = {status: 'success', message: responseBody};
      }

      if (result.status === 'success') {
        Alert.alert('Sukses', 'Data berhasil diubah', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('EditScreenAdmin', {user}),
          },
        ]);
      } else {
        Alert.alert(
          'Gagal',
          `Data gagal diinput: ${result.message || 'Tidak diketahui'}`,
        );
      }
    } catch (error) {
      Alert.alert('Error', `Terjadi kesalahan: ${error.message}`);
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
          onChangeText={text => setValue(text.replace(/[^0-9]/g, ''))}
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
      const response = await fetch(
        'https://samratindikator.online/borlostoi/public/insert/get_bed_quantity',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: new URLSearchParams({
            ruangan: titleRuangan,
          }).toString(),
        }
      );
  
      const rawText = await response.text(); 
      console.log('Response raw text:', rawText);
  
      const result = JSON.parse(rawText);
  
      // Akses langsung key "jumlah bed Mujair A"
      if (result.status === 'success' && result['jumlah bed Mujair A'] !== undefined) {
        setJumlahTempatTidur(result['jumlah bed Mujair A'].toString());
      } else {
        Alert.alert('Error', 'Data jumlah tempat tidur tidak ditemukan.');
      }
    } catch (error) {
      console.error('Fetch error:', error.message);
      Alert.alert('Error', 'Terjadi kesalahan: ' + error.message);
    }
  };
  const updateJumlahBed = async () => {
    try {
      const response = await fetch(
        'https://samratindikator.online/borlostoi/public/insert/update_bed_count',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            ruangan: titleRuangan,
            jumlah_bed: jumlahTempatTidur,
          }).toString(),
        }
      );
      const rawText = await response.text();
      console.log('Response raw text:', rawText); 
  
      if (response.headers.get('content-type')?.includes('application/json')) {
        const result = JSON.parse(rawText); // Parse jika JSON
        if (result.status === 'success') {
          Alert.alert('Sukses', 'Jumlah tempat tidur berhasil diperbarui.');
        } 
      } else {
        throw new Error('Response is not JSON');
      }
    } catch (error) {
      console.error('Update error:', error.message);
      Alert.alert('Error', 'Terjadi kesalahan: ' + error.message);
    }
  };
  useEffect(() => {
    fetchJumlahBed();
    updateJumlahBed();
  }, []);
  

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.barAtas]}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.navigate('EditScreenAdmin', {user})}>
            <Image
              style={styles.icon}
              resizeMode="cover"
              source={require('../../../../assets/-icon-arrow-back.png')}
            />
          </Pressable>
          <Text style={[styles.text]}>{titleRuangan}</Text>
        </View>

        {/* <View style={styles.header}>
          <Pressable
            style={styles.iconArrowBack}
            onPress={() => navigation.navigate('EditScreenAdmin', {user})}>
            <Image
              style={styles.icon}
              resizeMode="cover"
              source={require('../../../../assets/-icon-arrow-back.png')}
            />
          </Pressable>
          <Text style={styles.headerTitle}>{titleRuangan}</Text>
        </View> */}

        <View style={styles.timeInfoContainer}>
          <RealTimeClock />
        </View>
        <DatePickerr
          style={{top: -8, width: 370, alignSelf: 'center'}}
          onDateChange={handleDateChange}
        />

      <View style={styles.sectionJumlahBed}>
        <Text style={styles.label}>Jumlah tempat tidur:</Text>
        <TextInput
          style={styles.jumlahBedInput}
          value={jumlahTempatTidur}
          keyboardType="numeric"
          editable={true}
          onChangeText={text => setJumlahTempatTidur(text.replace(/[^0-9]/g, ''))}
        />
        <TouchableOpacity style={styles.updateButton} onPress={updateJumlahBed}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
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
  updateButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    elevation: 2,
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: FontFamily.poppinsBold,
    textAlign: 'center',
  },  
  jumlahBedInput: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.notSoBlack,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 5,
    width: 55,
    textAlign: 'center',
  },  
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
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    textAlign: 'center',
    flex: 1,
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
    backgroundColor: Color.schemesOnPrimary,
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
    backgroundColor: Color.schemesOnPrimary,
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
    backgroundColor: Color.schemesOnPrimary,
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
    zIndex: 0,
    marginStart: -15,
  },
  barAtas: {
    elevation: 3,
    width: '110%',
    height: 60,
    backgroundColor: Color.schemesOnPrimary,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
  },
  backButton: {
    width: 45,
    height: 29,
    position: 'absolute',
    left: -4,
    top: '50%',
    transform: [{translateY: -12.5}],
  },
  text: {
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    textAlign: 'center',
    fontSize: 18,
    position: 'absolute',
    top: '40%',
    transform: [{translateY: -8}],
    zIndex: 1,
  },
});

export default EditMujairA;
