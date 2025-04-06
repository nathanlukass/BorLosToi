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
  Dimensions,
  BackHandler,
} from 'react-native';
import {
  Padding,
  Border,
  Color,
  FontFamily,
  FontSize,
} from '../../../../../GlobalStyles';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/core';
import {Gap, DatePickerr, RealTimeClock} from '../../../../components';
import moment from 'moment';

const {width, height} = Dimensions.get('window');
const dynamicFontSize = size => (width / 375) * size; // 375 adalah lebar referensi
const dynamicPadding = padding => (height / 667) * padding; // 667 adalah tinggi referensi

const EditMujairB = ({route}) => {
  const {user} = route.params || {};
  const {username, role, ruangan, user_id, nama} = user || {};
  const navigation = useNavigation<StackNavigationProp<any>>();
  const titleRuangan = 'Mujair B';

  // --- STATE ---
  const [selectedDate, setSelectedDate] = useState('');
  const [jumlahTempatTidur, setJumlahTempatTidur] = useState('');
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
  const [isInput, setIsInput] = useState(false);
  const [userId, setUserId] = useState(user_id);

  useEffect(() => {
    fetchJumlahBed();
  }, []);

  // Fungsi untuk ambil jumlah bed dari server
  const fetchJumlahBed = async () => {
    try {
      const response = await fetch(
        'https://moraya.online/moraya/public/nurse/get_bed_quantity',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: new URLSearchParams({
            ruangan: titleRuangan,
          }).toString(),
        },
      );

      const rawText = await response.text();
      console.log('Response raw text:', rawText);

      const result = JSON.parse(rawText);

      if (
        result.status === 'success' &&
        result['jumlah bed Mujair B'] !== undefined
      ) {
        setJumlahTempatTidur(result['jumlah bed Mujair B'].toString());
      } else {
        Alert.alert('Error', 'Data jumlah tempat tidur tidak ditemukan.');
      }
    } catch (error) {
      console.error('Fetch error:', error.message);
      Alert.alert('Error', 'Terjadi kesalahan: ' + error.message);
    }
  };

  // Fungsi untuk update jumlah bed
  const updateJumlahBed = async () => {
    if (
      jumlahTempatTidur.trim() === '' ||
      isNaN(jumlahTempatTidur) ||
      parseInt(jumlahTempatTidur, 10) < 0
    ) {
      Alert.alert(
        'Error',
        'Jumlah tempat tidur harus berupa angka yang valid dan tidak negatif.',
      );
      return;
    }

    try {
      const response = await fetch(
        'https://moraya.online/moraya/public/admin/update_bed_count',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            ruangan: titleRuangan,
            jumlah_bed: parseInt(jumlahTempatTidur.trim(), 10).toString(),
          }).toString(),
        },
      );

      const rawText = await response.text();
      console.log('Response raw text:', rawText);

      if (response.headers.get('content-type')?.includes('application/json')) {
        const result = JSON.parse(rawText);
        if (result.status === 'success') {
          Alert.alert('Sukses', 'Jumlah tempat tidur berhasil diperbarui.');
        } else {
          Alert.alert(
            'Gagal',
            result.message || 'Terjadi kesalahan saat update.',
          );
        }
      } else {
        throw new Error('Respon bukan JSON');
      }
    } catch (error) {
      console.error('Update error:', error.message);
      Alert.alert('Error', 'Terjadi kesalahan: ' + error.message);
    }
  };

  // --- EFFECTS ---
  useEffect(() => {
    setIsInput(true);
  }, [pasienAwal, pasienMasuk]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => backHandler.remove();
  }, [isInput]);

  // --- HANDLERS ---
  const handleBackPress = () => {
    if (isInput) {
      Alert.alert(
        'Peringatan!',
        'Jika anda kembali maka semua perubahan akan dihapus',
        [
          {text: 'Batal', style: 'cancel'},
          {
            text: 'OK',
            onPress: () => navigation.navigate('HomeScreenAdmin', {user}),
          },
        ],
        {cancelable: false},
      );
      return true;
    }
    return false;
  };

  const increment = setter => () =>
    setter(prev => (parseInt(prev, 10) + 1).toString());

  const decrement = setter => () =>
    setter(prev => {
      const newValue = parseInt(prev, 10) - 1;
      return newValue >= 0 ? newValue.toString() : '0';
    });

  const handleDateChange = async date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setSelectedDate(formattedDate);

    console.log('Tanggal terpilih:', formattedDate);
    console.log('Ruangan terpilih:', titleRuangan);

    if (!titleRuangan || !formattedDate) {
      Alert.alert('Error', 'Tanggal dan Ruangan harus diisi.');
      return;
    }

    try {
      console.log('Mengirim request ke API...');
      const response = await fetch(
        'https://moraya.online/moraya/public/admin/get_input_by_admin',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: new URLSearchParams({
            tanggal: formattedDate,
            ruangan: titleRuangan,
          }).toString(),
        },
      );

      console.log('Menunggu respon...');
      const result = await response.json();
      console.log('Respon API Admin:', result);

      if (
        result.status === 'success' &&
        result.data &&
        result.data.length > 0
      ) {
        const data = result.data[0]; // Ambil elemen pertama dari array
        console.log('Data ditemukan:', data);

        setUserId((data.user_id ?? '').toString());
        setPasienAwal((data.pasien_awal ?? '0').toString());
        setPasienMasuk((data.pasien_masuk ?? '0').toString());
        setPasienPindahan((data.pasien_pindahan ?? '0').toString());
        setPasienDipindahkan((data.pasien_dipindahkan ?? '0').toString());
        setPasienHidup((data.pasien_hidup ?? '0').toString());
        setPasienRujuk((data.pasien_rujuk ?? '0').toString());
        setPasienAps((data.pasien_aps ?? '0').toString());
        setPasienLainLain((data.pasien_lain_lain ?? '0').toString());
        setPasienKurangDari48Jam(
          (data.pasien_kurang_dari_48jam ?? '0').toString(),
        );
        setPasienLebihDari48Jam(
          (data.pasien_lebih_dari_48jam ?? '0').toString(),
        );
        setPasienMasihDirawat((data.pasien_masih_dirawat ?? '0').toString());
        setPasienLamaDirawat((data.pasien_lama_dirawat ?? '0').toString());
        setBanyakPasien((data.banyak_pasien ?? '0').toString());
        setJumlahHari((data.jumlah_hari_perawatan ?? '0').toString());
        setKelas1((data.kelas_1 ?? '0').toString());
        setKelas2((data.kelas_2 ?? '0').toString());
        setKelas3((data.kelas_3 ?? '0').toString());

        console.log('Berhasil set semua field.');
      } else {
        console.log('Data tidak ditemukan untuk kombinasi tersebut.');
        Alert.alert(
          'Tidak Ada Data',
          'Data tidak ditemukan untuk tanggal dan ruangan tersebut.',
        );
      }
    } catch (error) {
      console.error('Terjadi error saat fetch:', error);
      Alert.alert('Kesalahan', 'Gagal mengambil data: ' + error.message);
    }
  };

  const handleSubmitButton2 = async () => {
    console.log('Mengirim data ke API...');
    console.log('Ruangan:', namaruangan);
    console.log('Data yang akan dikirim:');
    console.log('Pasien Awal:', pasienAwal);
    console.log('Pasien Masuk:', pasienMasuk);
    console.log('Pasien Pindahan:', pasienPindahan);
    console.log('Pasien Dipindahkan:', pasienDipindahkan);
    console.log('Pasien Hidup:', pasienHidup);
    console.log('Pasien Rujuk:', pasienRujuk);
    console.log('Pasien APS:', pasienAps);
    console.log('Pasien Lain-lain:', pasienLainLain);
    console.log('Pasien Meninggal <48 Jam:', pasienKurangDari48Jam);
    console.log('Pasien Meninggal >48 Jam:', pasienLebihDari48Jam);
    console.log('Pasien Lama Dirawat:', pasienLamaDirawat);
    console.log('Pasien Keluar-Masuk Hari Sama:', pasienMasihDirawat);
    console.log('Kelas 1:', kelas1);
    console.log('Kelas 2:', kelas2);
    console.log('Kelas 3:', kelas3);
    console.log('🟢 handleSubmitButton2 DIPANGGIL!');
    Alert.alert('Tes', 'handleSubmitButton2 dipanggil');

    const tanggal = selectedDate || new Date().toISOString().split('T')[0]; // contoh: 2025-04-06
    const userId = user?.user_id?.toString() || '';

    try {
      const bodyData = new URLSearchParams({
        ruangan: namaruangan,
        tanggal, // tambahkan tanggal
        user_id: userId, // tambahkan user ID
        pasien_awal: pasienAwal || '0',
        pasien_masuk: pasienMasuk || '0',
        pasien_pindahan: pasienPindahan || '0',
        pasien_dipindahkan: pasienDipindahkan || '0',
        pasien_hidup: pasienHidup || '0',
        pasien_rujuk: pasienRujuk || '0',
        pasien_aps: pasienAps || '0',
        pasien_lain_lain: pasienLainLain || '0',
        pasien_meninggal_kurang_dari_48_jam: pasienKurangDari48Jam || '0',
        pasien_meninggal_lebih_dari_48_jam: pasienLebihDari48Jam || '0',
        pasien_lama_dirawat: pasienLamaDirawat || '0',
        pasien_keluar_masuk_hari_sama: pasienMasihDirawat || '0',
        kelas_1: kelas1 || '0',
        kelas_2: kelas2 || '0',
        kelas_3: kelas3 || '0',
      }).toString();

      console.log('Body yang dikirim:', bodyData);

      const response = await fetch(
        'https://moraya.online/moraya/public/admin/update_admin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: bodyData,
        },
      );

      console.log('Response status:', response.status);

      const responseText = await response.text();
      console.log('Raw response body:', responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.warn('Gagal parsing JSON:', e);
        result = {status: 'error', message: responseText};
      }

      console.log(
        'Hasil lengkap dari server:\n',
        JSON.stringify(result, null, 2),
      );

      if (result.status === 'success') {
        console.log('✅ Data berhasil di-update:');
        Alert.alert('Sukses', 'Data berhasil diubah', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('HomeScreenAdmin', {user}),
          },
        ]);
      } else {
        Alert.alert(
          'Gagal',
          `Gagal update data: ${result.message || 'Unknown error'}`,
        );
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat mengirim data:', error);
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

  return (
    <View style={styles.container}>
      <View style={styles.barAtas}>
        <Pressable
          style={styles.backButton}
          onPress={() => {
            Alert.alert(
              'Peringatan',
              'Jika anda kembali maka semua perubahan akan dihapus',
              [
                {
                  text: 'Batal',
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('HomeScreenAdmin', {user}),
                },
              ],
            );
          }}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require('../../../../../assets/-icon-arrow-back.png')}
          />
        </Pressable>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Edit {titleRuangan}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.timeInfoContainer}>
          <RealTimeClock />
        </View>
        <View style={{marginVertical: 4, marginBottom: 20}}>
          <DatePickerr
            style={{flex: 1, height: 50}}
            onDateChange={handleDateChange}
          />
        </View>
        {/* Fields with increment/decrement buttons */}
        <View style={styles.sectionJumlahBed}>
          <Text style={styles.label}>Jumlah tempat tidur:</Text>
          <TextInput
            style={styles.jumlahBedInput}
            value={jumlahTempatTidur}
            keyboardType="numeric"
            editable={true}
            onChangeText={text => {
              const cleaned = text.replace(/[^0-9]/g, '');
              setJumlahTempatTidur(cleaned);
            }}
          />
          <TouchableOpacity
            style={styles.updateButton}
            onPress={updateJumlahBed}>
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
        {/* Existing sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pasien Awal</Text>
          {renderInputField('Pasien awal', pasienAwal, setPasienAwal)}
        </View>

        {/* Existing sections */}
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
    backgroundColor: '#1E9DEC',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    elevation: 2,
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: dynamicFontSize(14),
    fontFamily: FontFamily.poppinsSemiBold,
    textAlign: 'center',
  },
  jumlahBedInput: {
    fontSize: dynamicFontSize(15),
    fontFamily: FontFamily.poppinsRegular,
    color: Color.notSoBlack,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 5,
    width: '14%',
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
  timeInfoContainer: {
    backgroundColor: '#1E9DEC',
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
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  jumlahBed: {
    fontSize: dynamicFontSize(16),
    fontFamily: FontFamily.poppinsRegular,
    color: Color.notSoBlack,
    marginLeft: 155,
  },
  sectionTitle: {
    fontSize: dynamicFontSize(16),
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    marginBottom: 10,
    marginTop: 10,
  },
  label: {
    fontSize: dynamicFontSize(15),
    fontFamily: FontFamily.poppinsRegular,
    color: Color.notSoBlack,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 'auto',
  },
  button: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 0,
  },
  decrementButton: {
    backgroundColor: '#D3D3D3',
  },
  incrementButton: {
    backgroundColor: '#1E9DEC',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: FontFamily.poppinsBold,
  },
  input: {
    width: 32,
    height: 31,
    textAlign: 'center',
    fontSize: dynamicFontSize(15),
    fontFamily: FontFamily.poppinsRegular,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginHorizontal: 5,
    paddingVertical: 0,
  },
  submitButton: {
    backgroundColor: '#21B557',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: dynamicFontSize(16),
    fontFamily: FontFamily.poppinsSemiBold,
  },
  barAtas: {
    position: 'absolute',
    top: 0,
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
  icon: {
    width: 45,
    height: 25,
  },
  backButton: {
    position: 'absolute',
    width: 45,
    height: 45,
    justifyContent: 'center',
    zIndex: 20,
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
    fontSize: dynamicFontSize(16),
    textAlign: 'center',
  },
});

export default EditMujairB;
