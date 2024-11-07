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
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/core';
import {FontFamily, Color} from '../../../GlobalStyles';
import {Gap, DatePickerr} from '../../components';
import RealTimeClock from '../../components/atoms/Time';

const InputButton = ({label}: {label: string}) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [value, setValue] = useState<number>(1);

  const handleChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, ''); // Ensure only numeric input
    setValue(Number(numericValue));
  };
};
const NurseInputPage = ({route}) => {
  const {user} = route.params; // Access user details from route parameters
  const {username, role, ruangan, id_user, nama} = user; // Destructure user object

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [jumlahTempatTidur, setJumlahTempatTidur] = useState<string>('22'); // State untuk input tempat tidur

  const handleSubmitButton = () => {
    alert('Data berhasil diinput!');
    navigation.navigate('HomeScreenNurse', {user});
  };

  const datePickerStyle1 = {
    top: -7,
    width: 370,
    left: -30,
  };

  // const {user} = route.params;
  const [jumlahBed, setjumlahBed] = useState('');
  const [pasienAwal, setPasienAwal] = useState('0');
  const [pasienMasuk, setPasienMasuk] = useState('0');
  const [pasienPindahan, setPasienPindahan] = useState('');
  const [pasienDipindahkan, setPasienDipindahkan] = useState('');
  const [pasienHidup, setPasienHidup] = useState('');
  const [pasienRujuk, setPasienRujuk] = useState('');
  const [pasienAps, setPasienAps] = useState('');
  const [pasienLainLain, setPasienLainLain] = useState('');

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
            // Tambahkan data lainnya sesuai kebutuhan
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

  const increment1 = () => {
    setPasienAwal(prev => (parseInt(prev, 10) + 1).toString());
  };

  const decrement1 = () => {
    setPasienAwal(prev => {
      const newValue = parseInt(prev, 10) - 1;
      return newValue > 0 ? newValue.toString() : '0';
    });
  };
  const increment2 = () => {
    setPasienMasuk(prev => (parseInt(prev, 10) + 1).toString());
  };

  const decrement2 = () => {
    setPasienMasuk(prev => {
      const newValue = parseInt(prev, 10) - 1;
      return newValue > 0 ? newValue.toString() : '0';
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with title and time */}
        <View style={styles.header}>
          <Pressable
            style={styles.iconArrowBack}
            onPress={() => navigation.navigate('HomeScreenNurse', {user})}>
            <Image
              style={styles.icon}
              resizeMode="cover"
              source={require('../../../assets/-icon-arrow-back.png')}
            />
          </Pressable>
          <Text style={styles.headerTitle}>Input Harian</Text>
        </View>

        <View style={styles.timeContainer}>
          {/* Menggunakan komponen RealTimeClock */}
          <RealTimeClock />
        </View>

        <DatePickerr style={datePickerStyle1} />

        <View style={styles.section}>
          <View style={styles.bedInputContainer}>
            <Text style={styles.label}>Jumlah tempat tidur:</Text>
            <Text style={styles.jumlahBed}>20</Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.label}>Pasien Awal:</Text>
            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={[styles.button, styles.decrementButton]}
                onPress={decrement1}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                value={String(pasienAwal)}
                keyboardType="numeric"
                onChangeText={value => setPasienAwal(Number(value))}
              />
              <TouchableOpacity
                style={[styles.button, styles.incrementButton]}
                onPress={increment1}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pasien masuk ruangan</Text>
            <InputButton label="Pasien masuk :" />
            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={[styles.button, styles.decrementButton]}
                onPress={decrement2}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                value={String(pasienMasuk)}
                keyboardType="numeric"
                onChangeText={value => setPasienMasuk(Number(value))}
              />
              <TouchableOpacity
                style={[styles.button, styles.incrementButton]}
                onPress={increment2}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
            <InputButton label="Pasien pindahan :" />
            <Text style={styles.totalLabel}>Jumlah : 1</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pasien dipindahkan</Text>
            <InputButton label="Pasien dipindahkan :" />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pasien keluar ruangan</Text>
            <InputButton label="Hidup" />
            <InputButton label="Rujuk" />
            <InputButton label="APS" />
            <InputButton label="Lain-lain" />
            <Text style={styles.totalLabel}>Jumlah : 1</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pasien keluar Meninggal</Text>
            <InputButton label="≤ 48 jam" />
            <InputButton label="≥ 48 jam" />
            <Text style={styles.totalLabel}>Jumlah : 1</Text>
            <Text style={styles.totalLabel}>Total : 1</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {'Pasien yang masih dirawat'}
            </Text>
            <InputButton label={'Pasien yang masih\ndirawat :'} />
            <Gap height={20} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Lama perawatan</Text>
            <InputButton label="Lama di rawat :" />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Pasien masuk/keluar pada hari yang sama
            </Text>
            <InputButton label="Banyak pasien :" />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Jumlah hari perawatan</Text>
            <InputButton label="Jumlah hari" />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Total hari perawatan per pasien
            </Text>
            <InputButton label="Kelas I" />
            <InputButton label="Kelas II" />
            <InputButton label="Kelas III" />
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmitButton2}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  decrementButton: {
    backgroundColor: '#D3D3D3', // Warna abu-abu muda untuk tombol "-"
  },
  incrementButton: {
    backgroundColor: '#007AFF', // Warna biru untuk tombol "+"
  },
  jumlahBed: {
    left: 35,
    margin: 'auto',
    top: 8,
    fontSize: 16,
    fontFamily: FontFamily.poppinsRegular,
    marginBottom: 10,
    color: Color.notSoBlack,
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
  bedInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 30,
    height: 32,
    backgroundColor: '#007AFF', // Warna biru seperti di gambar
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
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
    fontSize: 16,
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    marginStart: 'auto',
    marginEnd: 'auto',
    left: -10,
  },
  timeContainer: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: FontFamily.poppinsBold,
  },
  label: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.notSoBlack,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  input: {
    width: 40,
    height: 35,
    textAlign: 'center',
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginHorizontal: 10,
    borderRadius: 7,
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

export default NurseInputPage;
