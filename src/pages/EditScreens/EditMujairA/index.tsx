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
import {ScreenWidth} from 'react-native-elements/dist/helpers';
import moment from 'moment';

const EditMujairA = ({route}) => {
  const {user} = route.params; // Access user details from route parameters
  const {username, role, ruangan, id_user, nama} = user; // Destructure user objec
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [jumlahTempatTidur, setJumlahTempatTidur] = useState('22');
  const [pasienAwal, setPasienAwal] = useState('0');
  const [pasienMasuk, setPasienMasuk] = useState('0');
  const [pasienPindahan, setPasienPindahan] = useState('0');
  const [pasienDipindahkan, setPasienDipindahkan] = useState('0');
  const [pasienHidup, setPasienHidup] = useState('0');
  const [pasienRujuk, setPasienRujuk] = useState('0');
  const [pasienAps, setPasienAps] = useState('0');
  const [pasienLainLain, setPasienLainLain] = useState('0');

  // New state variables for additional fields
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

  const increment = setter => () =>
    setter(prev => (parseInt(prev, 10) + 1).toString());
  const decrement = setter => () =>
    setter(prev => {
      const newValue = parseInt(prev, 10) - 1;
      return newValue >= 0 ? newValue.toString() : '0';
    });

  const handleSubmitButton2 = async () => {
    try {
      const response = await fetch(
        'https://samratindikator.online/borlostoi/public/insert/insert_nurse',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
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
            Jumlah_Hari: jumlahHari,
            Kelas_1: kelas1,
            Kelas_2: kelas2,
            Kelas_3: kelas3,
            Ruangan: namaruangan,
          }).toString(),
        },
      );

      const result = await response.json();
      if (result.status === 'success') {
        Alert.alert('Sukses', 'Data berhasil diinput');
        navigation.navigate('HomeScreenNurse', {user});
      } else {
        Alert.alert('Gagal', 'Data gagal diinput: ' + result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan: ' + error.message);
    }
  };
  const handleDateChange = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD'); // "2024-11-30"
    console.log(formattedDate);
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
        {/* Header with title and time */}
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
          <Text style={styles.headerTitle}>{'Mujair A'}</Text>
        </View>

        {/* Subtitle Text */}
        <View style={styles.timeInfoContainer}>
          <RealTimeClock />
        </View>
        <DatePickerr
          style={{top: -7, width: 370, left: -30}}
          onDateChange={handleDateChange}
        />

        {/* Fields with increment/decrement buttons */}
        <View style={styles.section}>
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
          <Text style={styles.sectionTitle}>Pasien Dipindahkan</Text>
          {renderInputField(
            'Pasien dipindahkan',
            pasienDipindahkan,
            setPasienDipindahkan,
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pasien Keluar Ruangan</Text>
          {renderInputField('Hidup', pasienHidup, setPasienHidup)}
          {renderInputField('Rujuk', pasienRujuk, setPasienRujuk)}
          {renderInputField('APS', pasienAps, setPasienAps)}
          {renderInputField('Lain-lain', pasienLainLain, setPasienLainLain)}
        </View>

        {/* New sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Patient Info</Text>
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
          {renderInputField(
            'Masih dirawat',
            pasienMasihDirawat,
            setPasienMasihDirawat,
          )}
          {renderInputField(
            'Lama dirawat',
            pasienLamaDirawat,
            setPasienLamaDirawat,
          )}
          {renderInputField('Banyak pasien', banyakPasien, setBanyakPasien)}
          {renderInputField('Jumlah hari', jumlahHari, setJumlahHari)}
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
    backgroundColor: '#F7F7F7',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    marginStart: 'auto',
    marginEnd: 'auto',
    left: -10,
  },
  timeInfoContainer: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  timeInfoText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: FontFamily.poppinsRegular,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 8,
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
    fontSize: 15,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.notSoBlack,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Color.notSoBlack,
    marginBottom: 10,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 'auto',
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: 40,
    height: 40,
    textAlign: 'center',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  submitButton: {
    backgroundColor: '#28A745',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 15,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
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
