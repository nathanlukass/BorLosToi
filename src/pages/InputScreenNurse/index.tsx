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

    const formattedDate = moment(date).format('YYYY-MM-DD');
    const previousDay = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
    const normalizedRuangan = ruangan.replace(/\u00A0/g, ' ').trim();

    console.log('Tanggal yang dipilih:', formattedDate);
    console.log('Tanggal sebelumnya:', previousDay);
    console.log('Ruangan:', normalizedRuangan);

    try {
      // Fetch data untuk tanggal sebelumnya
      const previousDayResponse = await fetch(
        'https://samratindikator.online/borlostoi/public/insert/get_pasien_masih_dirawat',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: new URLSearchParams({
            ruangan: normalizedRuangan,
            tanggal: previousDay,
          }).toString(),
        },
      );

      const previousDayRawResponse = await previousDayResponse.text();
      console.log('Raw Response (Previous Day):', previousDayRawResponse);

      const jsonMatchesPrevious =
        previousDayRawResponse.match(/(\{.*?\})(?=\{|\[|$)/g);
      const previousDayFirstJSON = jsonMatchesPrevious
        ? jsonMatchesPrevious[0]
        : '{}';
      const previousDayResult = JSON.parse(previousDayFirstJSON);

      let pasienAwalValue = '0';
      if (
        previousDayResult.status === 'success' &&
        previousDayResult.data?.pasien_masih_dirawat !== undefined
      ) {
        pasienAwalValue =
          previousDayResult.data.pasien_masih_dirawat.toString();
      }

      console.log('Pasien Awal (Dari Hari Sebelumnya):', pasienAwalValue);

      // Fetch data untuk tanggal yang dipilih
      const response = await fetch(
        'https://samratindikator.online/borlostoi/public/insert/get_input_data',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: new URLSearchParams({
            tanggal: formattedDate,
            ruangan: normalizedRuangan,
          }).toString(),
        },
      );

      const rawResponse = await response.text();
      console.log('Raw Response (Selected Date):', rawResponse);

      const jsonMatches = rawResponse.match(/(\{.*?\})(?=\{|\[|$)/g);
      const firstJSON = jsonMatches ? jsonMatches[0] : '{}';
      const result = JSON.parse(firstJSON);

      if (result.status === 'success' && result.data) {
        // Set data jika ada inputan
        setPasienAwal(result.data.pasien_awal?.toString() || pasienAwalValue);
        setPasienMasuk(result.data.pasien_masuk?.toString() || '0');
        setPasienPindahan(result.data.pasien_pindahan?.toString() || '0');
        setPasienDipindahkan(result.data.pasien_dipindahkan?.toString() || '0');
        setPasienHidup(result.data.pasien_hidup?.toString() || '0');
        setPasienRujuk(result.data.pasien_rujuk?.toString() || '0');
        setPasienAps(result.data.pasien_aps?.toString() || '0');
        setPasienLainLain(result.data.pasien_lain_lain?.toString() || '0');
        setPasienKurangDari48Jam(
          result.data.pasien_kurang_dari_48jam?.toString() || '0',
        );
        setPasienLebihDari48Jam(
          result.data.pasien_lebih_dari_48jam?.toString() || '0',
        );
        setPasienLamaDirawat(
          result.data.pasien_lama_dirawat?.toString() || '0',
        );
        setBanyakPasien(result.data.banyak_pasien?.toString() || '0');
        setKelas1(result.data.kelas_1?.toString() || '0');
        setKelas2(result.data.kelas_2?.toString() || '0');
        setKelas3(result.data.kelas_3?.toString() || '0');
      } else {
        // Jika tidak ada inputan pada tanggal yang dipilih
        Alert.alert(
          'Informasi',
          `Pasien awal diambil dari hari sebelumnya (${previousDay}).`,
        );

        setPasienAwal(pasienAwalValue);
        setPasienMasuk('0');
        setPasienPindahan('0');
        setPasienDipindahkan('0');
        setPasienHidup('0');
        setPasienRujuk('0');
        setPasienAps('0');
        setPasienLainLain('0');
        setPasienKurangDari48Jam('0');
        setPasienLebihDari48Jam('0');
        setPasienLamaDirawat('0');
        setBanyakPasien('0');
        setKelas1('0');
        setKelas2('0');
        setKelas3('0');
      }
    } catch (error) {
      console.error('Error:', error.message);
      Alert.alert('Error', 'Terjadi kesalahan saat mengambil data.');
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

      const rawResponse = await response.text(); // Get raw response text
      console.log('Raw Response:', rawResponse);

      // Ensure the response starts with either '{' or '[' to indicate valid JSON
      if (!rawResponse.startsWith('{') && !rawResponse.startsWith('[')) {
        throw new Error('Response is not valid JSON');
      }

      // Now safely parse the JSON response
      const result = JSON.parse(rawResponse);
      console.log('Parsed Response:', result);

      if (result.status === 'success' && result.data.exists) {
        return true; // Data exists
      }
      return false; // Data does not exist
    } catch (error) {
      console.error('Error checking data existence:', error.message);
      Alert.alert(
        'Error',
        'Failed to check data existence or invalid response format.',
      );
      return true; // Block input if there's an error
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

    // Check if the data already exists before input
    const dataExists = await checkDataExist(formattedDate, normalizedRuangan);
    if (dataExists) {
      Alert.alert('Peringatan', 'Data untuk tanggal ini sudah diinput.');
      return; // Stop input process if data already exists
    }

    try {
      const response = await fetch(
        'https://samratindikator.online/borlostoi/public/insert/insert_nurse',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
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

      const rawResponse = await response.text();
      console.log('Raw Response:', rawResponse);

      // Pisahkan objek JSON pertama dari respons bertumpuk
      const jsonMatches = rawResponse.match(/(\{.*?\})(?=\{|\[|$)/g);
      if (!jsonMatches || jsonMatches.length === 0) {
        throw new Error('Invalid JSON response');
      }

      const firstJSON = jsonMatches[0]; // Ambil objek JSON pertama
      console.log('First JSON:', firstJSON);

      const result = JSON.parse(firstJSON);
      console.log('Parsed Response:', result);

      // Cek status respons
      if (result.status === 'success') {
        Alert.alert('Sukses', 'Data berhasil diinput.');
      } else {
        Alert.alert('Error', result.message || 'Gagal menginput data.');
      }
    } catch (error) {
      console.error('Fetch Error:', error.message);
      Alert.alert('Error', 'Terjadi kesalahan. Silakan coba lagi.');
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

  const [isFetching, setIsFetching] = useState(false);

  const fetchPasienAwalHariIni = async () => {
    if (isFetching) {
      return;
    }

    setIsFetching(true);

    // Tentukan tanggal sekarang dan hari sebelumnya
    const currentDate = selectedDate
      ? moment(selectedDate).startOf('day')
      : moment().startOf('day');
    const previousDay = moment(currentDate)
      .subtract(1, 'days')
      .format('YYYY-MM-DD');

    console.log('Tanggal yang dipilih:', currentDate.format('YYYY-MM-DD'));
    console.log(
      'Tanggal yang dikirim ke server (hari sebelumnya):',
      previousDay,
    );

    try {
      const normalizedRuangan = ruangan.replace(/\u00A0/g, ' ').trim();
      console.log('Ruangan dikirim ke server:', normalizedRuangan);

      const response = await fetch(
        'https://samratindikator.online/borlostoi/public/insert/get_pasien_masih_dirawat',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: new URLSearchParams({
            ruangan: normalizedRuangan,
            tanggal: previousDay, // Hari sebelumnya
          }).toString(),
        },
      );

      const rawResponse = await response.text();
      console.log('Raw Response dari server:', rawResponse);

      // Pisahkan JSON jika bertumpuk
      const jsonMatches = rawResponse.match(/(\{.*?\})(?=\{|\[|$)/g);
      const firstJSON = jsonMatches ? jsonMatches[0] : '{}';
      const result = JSON.parse(firstJSON);

      console.log('Parsed Response dari server:', result);

      // Cek properti data
      if (
        result.status === 'success' &&
        result.data?.pasien_masih_dirawat !== undefined
      ) {
        const pasienAwal = result.data.pasien_masih_dirawat.toString();
        setPasienAwal(pasienAwal);
        console.log(
          `Pasien awal dari hari sebelumnya (${previousDay}):`,
          pasienAwal,
        );
      } else {
        setPasienAwal('0');
        console.warn(`Tidak ada data pasien untuk tanggal ${previousDay}.`);
      }
    } catch (error) {
      console.error('Fetch Error:', error.message);
      setPasienAwal('0');
      Alert.alert('Error', 'Gagal mengambil data pasien awal.');
    } finally {
      setIsFetching(false);
    }
  };

  const [prevSelectedDate, setPrevSelectedDate] = useState(null);

  useEffect(() => {
    if (selectedDate && selectedDate !== prevSelectedDate) {
      setPrevSelectedDate(selectedDate);
      fetchPasienAwalHariIni();
    }
  }, [selectedDate, prevSelectedDate]);

  useEffect(() => {
    fetchJumlahBed();
    // Set default ke hari ini saat komponen dimuat
  }, [ruangan]);

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

            // Langsung update data menggunakan tanggal baru
            handleDateChange(date);

            // Perbarui state selectedDate
            setSelectedDate(date);
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
