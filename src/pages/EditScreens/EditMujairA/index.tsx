import * as React from 'react';
import {useState} from 'react';
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
import {
  Padding,
  Border,
  Color,
  FontFamily,
  FontSize,
} from '../../../../GlobalStyles';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/core';
import {Gap, DatePickerr, RealTimeClock} from '../../../components';
import moment from 'moment';

const EditMujairA = ({route}) => {
  const {user} = route.params;
  const {ruangan} = user;
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const titleRuangan = 'Mujair A';
  const [jumlahTempatTidur, setJumlahTempatTidur] = useState('22');
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

    // Log the values to verify
    console.log('Selected Date:', formattedDate);
    console.log('Ruangan yang dikirim:', titleRuangan);

    try {
      // Pastikan parameter yang dikirim ada dan valid
      const response = await fetch(
        'https://samratindikator.online/borlostoi/public/insert/get_input_data',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            date: formattedDate,
            ruangan: titleRuangan, // Pastikan ini terisi dengan benar
          }).toString(),
        },
      );

      const result = await response.json();
      console.log('API Response:', result); // Log the API response

      if (result.status === 'success' && result.data) {
        const data = result.data;
        setPasienAwal(data.Pasien_Awal);
        setPasienMasuk(data.Pasien_Masuk);
        setPasienPindahan(data.Pasien_Pindahan);
        setPasienDipindahkan(data.Pasien_Dipindahkan);
        setPasienHidup(data.Pasien_Hidup);
        setPasienRujuk(data.Pasien_Rujuk);
        setPasienAps(data.Pasien_Aps);
        setPasienLainLain(data.Pasien_lain_lain);
        setPasienKurangDari48Jam(data.Pasien_kurang_dari_48jam);
        setPasienLebihDari48Jam(data.Pasien_lebih_dari_48jam);
        setPasienMasihDirawat(data.Pasien_Masih_Dirawat);
        setPasienLamaDirawat(data.Pasien_Lama_Dirawat);
        setBanyakPasien(data.Banyak_Pasien);
        setJumlahHari(data.Jumlah_Hari_Perawatan);
        setKelas1(data.Kelas_1);
        setKelas2(data.Kelas_2);
        setKelas3(data.Kelas_3);
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
          method: 'PUT', // Ganti menjadi PUT untuk update
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },

          body: new URLSearchParams({
            Tanggal: selectedDate, // Include the selected date to identify the record to update
            Pasien_Awal: pasienAwal,
            Pasien_Masuk: pasienMasuk,
            Pasien_Pindahan: pasienPindahan,
            Pasien_Dipindahkan: pasienDipindahkan,
            Pasien_Hidup: pasienHidup,
            Pasien_Rujuk: pasienRujuk,
            Pasien_Aps: pasienAps,
            Pasien_lain_lain: pasienLainLain,
            Pasien_kurang_dari_48jam: pasienKurangDari48Jam,
            Pasien_lebih_dari_48jam: pasienLebihDari48Jam,
            Pasien_Masih_Dirawat: pasienMasihDirawat,
            Pasien_Lama_Dirawat: pasienLamaDirawat,
            Banyak_Pasien: banyakPasien,
            Jumlah_Hari_Perawatan: jumlahHari,
            Kelas_1: kelas1,
            Kelas_2: kelas2,
            Kelas_3: kelas3,
            Ruangan: namaruangan,
          }).toString(),
        },
      );

      const result = await response.json();
      if (result.status === 'success') {
        Alert.alert('Sukses', 'Data berhasil diubah');
        navigation.navigate('EditScreenAdmin', {user});
      } else {
        Alert.alert('Gagal', 'Data gagal diinput: ' + result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan: ' + error.message);
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
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
        </View>

        <View style={styles.timeInfoContainer}>
          <RealTimeClock />
        </View>
        <DatePickerr
          style={{top: -7, width: 370, left: -30}}
          onDateChange={handleDateChange}
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
    zIndex: 0,
    marginStart: -15,
  },
});

export default EditMujairA;
