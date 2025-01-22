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
  Modal,
  Dimensions,
  BackHandler,
} from 'react-native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/core';
import {FontFamily, Color} from '../../../../GlobalStyles';
import {DatePickerr} from '../../../components';
import RealTimeClock from '../../../components/atoms/Time';
import moment from 'moment';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');
const dynamicFontSize = size => (width / 375) * size; // 375 adalah lebar referensi
const dynamicPadding = padding => (height / 667) * padding; // 667 adalah tinggi referensi

const NurseInputPage = ({route}) => {
  const {user} = route.params || {}; // Pastikan `route.params` selalu diakses dengan aman
  const {username, role, ruangan, id_user, nama} = user || {}; // Access all relevant fields
  console.log('Route params:', route.params);

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
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pasienKurangDari48Jam, setPasienKurangDari48Jam] = useState('0');
  const [pasienLebihDari48Jam, setPasienLebihDari48Jam] = useState('0');
  const [pasienMasihDirawat, setPasienMasihDirawat] = useState('0');
  const [pasienLamaDirawat, setPasienLamaDirawat] = useState('0');
  const [banyakPasien, setBanyakPasien] = useState('0');
  const [jumlahHari, setJumlahHari] = useState('0');
  const [kelas1, setKelas1] = useState('0');
  const [kelas2, setKelas2] = useState('0');
  const [kelas3, setKelas3] = useState('0');
  const [namaruangan, setRuangan] = useState(ruangan);
  const [isLoading, setIsLoading] = useState(false);
  const Stack = createStackNavigator();
  const [isInput, setIsInput] = useState(false);

  useEffect(() => {
    setIsInput(true);
  }, [pasienAwal, pasienMasuk]);

  const increment = setter => () =>
    setter(prev => (parseInt(prev, 10) + 1).toString());
  const decrement = setter => () =>
    setter(prev => {
      const newValue = parseInt(prev, 10) - 1;
      return newValue >= 0 ? newValue.toString() : '0';
    });

  // Function to check if input has been submitted today
  const checkIfAlreadySubmitted = async (selectedDate, ruangan) => {
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');

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
            ruangan: ruangan,
          }).toString(),
        },
      );
      const rawResponse = await response.text();
      const result = JSON.parse(rawResponse);

      if (result.status === 'success' && result.data) {
        setIsSubmitted(true); // Flag as submitted if data exists for the day
      } else {
        setIsSubmitted(false); // If no data exists for the date, allow input
      }
    } catch (error) {
      console.error('Error checking submission:', error);
      Alert.alert('Error', 'Failed to check submission status.');
    }
  };

  const handleDateChange = async date => {
    if (!date || !ruangan) {
      Alert.alert('Error', 'Both date and room must be selected.');
      return;
    }

    setSelectedDate(date);

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
      return true;
    }
  };

  const handleSubmit = async () => {
    setIsModalVisible(true);
  };

  const handleConfirmSubmit = async () => {
    if (!selectedDate) {
      Alert.alert('Error', 'Please select a date!');
      return;
    }

    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    const normalizedRuangan = ruangan
      .replace(/\u00A0/g, ' ')
      .trim()
      .toLowerCase();

    const dataExists = await checkDataExist(formattedDate, normalizedRuangan);
    if (dataExists) {
      return;
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
        Alert.alert('Sukses', 'Data berhasil disimpan');
        navigation.navigate('HomeScreenNurse', {user});
      } else {
        Alert.alert('Error', result.message || 'Gagal menginput data.');
      }
    } catch (error) {
      console.error('Fetch Error:', error.message);
      Alert.alert('Error', 'Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
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
      // Validasi awal untuk variabel `ruangan`
      if (!ruangan || typeof ruangan !== 'string') {
        throw new Error('Ruangan tidak valid atau undefined');
      }

      // Membersihkan ruangan tanpa mengubah case-sensitive
      const normalizedRuangan = ruangan
        .replace(/\u00A0/g, ' ') // Mengganti spasi non-breaking
        .replace(/[^a-zA-Z0-9 ]/g, '') // Hapus karakter khusus
        .trim();

      console.log('Normalized Ruangan:', JSON.stringify(normalizedRuangan));

      // Fetch data dari API
      const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
      const response = await fetch(
        'https://samratindikator.online/borlostoi/public/insert/get_bed_quantity',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: new URLSearchParams({
            ruangan: normalizedRuangan,
            date: today, // Kirim tanggal jika diperlukan
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

  useEffect(() => {
    if (!user || !user.username) {
      console.error('User data is missing!');
    }
  }, [user]);

  return (
    <View style={styles.container}>
      {/* Toolbar */}
      <View style={styles.barAtas}>
        <Pressable
          style={styles.backButton}
          onPress={() => {
            Alert.alert(
              'Peringatan',
              'Jika Anda kembali maka semua perubahan akan dihapus',
              [
                {
                  text: 'Batal',
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('HomeScreenNurse', {user}),
                },
              ],
            );
          }}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require('../../../../assets/-icon-arrow-back.png')}
          />
        </Pressable>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{ruangan}</Text>
        </View>
      </View>
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Subtitle Text */}
        <View style={styles.timeInfoContainer}>
          <RealTimeClock />
        </View>
        <View style={{marginVertical: 4, marginBottom: 20}}>
          <DatePickerr
            style={{flex: 1, height: 50}}
            onDateChange={handleDateChange}
            checkDataExist={checkDataExist}
            ruangan={ruangan}
            navigation={navigation}
          />
        </View>
        {/* Fields with increment/decrement buttons */}
        <View style={styles.sectionJumlahBed}>
          <Text style={styles.label}>Jumlah tempat tidur:</Text>
          <Text style={styles.jumlahBed}>{jumlahTempatTidur}</Text>
        </View>

        {/* Existing sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pasien Awal</Text>
          {renderInputField('Pasien awal ', pasienAwal, setPasienAwal)}
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
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal
          transparent={true}
          animationType="fade"
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}>
          <View style={styles.popupOverlay}>
            <View style={styles.popup}>
              {/* Lottie Animation */}
              <LottieView
                source={require('../../../../assets/raw/alert.json')}
                autoPlay
                loop={false}
                style={styles.lottieAnimation}
                onAnimationFinish={() => console.log('Animation Completed')}
              />

              {/* "Silahkan" Text */}
              <Text style={styles.title}>Konfirmasi</Text>
              <Text style={styles.text1}>
                Pastikan semua data sudah benar sebelum anda melanjutkan
              </Text>

              {/* Buttons for Yes and No */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.noButton}
                  onPress={handleModalCancel}>
                  <Text style={styles.buttonText}>Periksa</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.yesButton}
                  onPress={handleConfirmSubmit}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFFF',
    padding: dynamicPadding(0),
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
    textAlign: 'right',
    flex: 1,
    marginRight: 10,
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
  },
  decrementButton: {
    backgroundColor: '#D3D3D3',
  },
  incrementButton: {
    backgroundColor: '#1E9DEC',
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
    fontSize: 18,
    fontFamily: FontFamily.poppinsSemiBold,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalButtonYes: {
    backgroundColor: '#4CAF50', // Green color for Yes button
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  modalButtonNo: {
    backgroundColor: '#F44336', // Red color for No button
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
  },
  popupOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 300,
  },
  lottieAnimation: {
    width: 150,
    height: 150,
    marginBottom: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
    marginTop: 20,
  },
  yesButton: {
    backgroundColor: '#21B557',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    fontFamily: FontFamily.poppinsBold,
  },
  noButton: {
    backgroundColor: '#1E9DEC',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    marginRight: 10,
    fontFamily: FontFamily.poppinsBold,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: FontFamily.poppinsSemiBold,
  },
  title: {
    fontSize: 20,
    fontFamily: FontFamily.poppinsBold,
    textAlign: 'center',
    marginBottom: 10,
    color: Color.notSoBlack,
  },
  text1: {
    fontFamily: FontFamily.poppinsRegular,
    color: Color.notSoBlack,
    fontSize: dynamicFontSize(14),
    textAlign: 'center',
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
    fontSize: dynamicFontSize(18),
    textAlign: 'center',
  },
});

export default NurseInputPage;
