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
import {Gap, DatePickerr} from '../../../components';
import {ScreenWidth} from 'react-native-elements/dist/helpers';
import RealTimeClock from '../../../components/atoms/Time';

const InputButton = ({label}: {label: string}) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [value, setValue] = useState<number>(1);

  const handleChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, ''); // Ensure only numeric input
    setValue(Number(numericValue));
  };

  return (
    <View style={styles.inputButtonContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.counterContainer}>
        <TouchableOpacity
          style={styles.buttonMinus}
          onPress={() => setValue(Math.max(0, value - 1))}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <TextInput
          value={value.toString()}
          onChangeText={handleChange}
          keyboardType="numeric"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.buttonPlus}
          onPress={() => setValue(value + 1)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const EditNike = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [jumlahTempatTidur, setJumlahTempatTidur] = useState<string>('22'); // State untuk input tempat tidur

  const handleSubmitButton = () => {
    navigation.navigate('EditScreenAdmin', alert('Data berhasil disimpan!'));
  };

  const datePickerStyle1 = {
    top: -7,
    width: 350,
    left: -27,
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with title and time */}
        <View style={styles.header}>
          <Pressable
            style={styles.iconArrowBack}
            onPress={() => navigation.navigate('EditScreenAdmin')}>
            <Image
              style={styles.icon}
              resizeMode="cover"
              source={require('../../../../assets/-icon-arrow-back.png')}
            />
          </Pressable>
          <Text style={styles.headerTitle}>Nike</Text>
        </View>

        <View style={styles.timeContainer}>
          <RealTimeClock />
        </View>

        <DatePickerr style={datePickerStyle1} />

        {/* Jumlah tempat tidur section */}
        <View style={styles.section}>
          <View style={styles.bedInputContainer}>
            <Text style={styles.sectionTitle}>Jumlah tempat tidur:</Text>
            <TextInput
              value={jumlahTempatTidur}
              onChangeText={text => setJumlahTempatTidur(text)}
              keyboardType="numeric"
              style={styles.inputTempatTidur}
            />
          </View>
        </View>

        {/* Sections for input buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pasien awal</Text>
          <InputButton label="Pasien awal :" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pasien masuk ruangan</Text>
          <InputButton label="Pasien masuk :" />
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
          <Text style={styles.sectionTitle}>{'Pasien yang masih dirawat'}</Text>
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

        <Pressable style={styles.submitButton} onPress={handleSubmitButton}>
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>
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
  backButton: {
    // backgroundColor: 'black',
    borderRadius: 5,
    padding: 10,
  },
  backText: {
    color: 'black',
    fontSize: 20,
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
  roomSection: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  roomName: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsMedium,
    marginBottom: 10,
    color: Color.notSoBlack,
  },
  totalLabel: {
    fontSize: 12,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.notSoBlack,
    marginTop: 10,
  },
  inputButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.notSoBlack,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonMinus: {
    backgroundColor: '#C1C9E9',
    paddingVertical: 1,
    paddingHorizontal: 9,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPlus: {
    backgroundColor: '#1E9DEC',
    paddingVertical: 1,
    paddingHorizontal: 8,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  input: {
    width: 40,
    height: 35,
    textAlign: 'center',
    fontSize: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginHorizontal: 10,
    borderRadius: 5,
  },
  inputTempatTidur: {
    width: 55,
    height: 35,
    textAlign: 'center',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginStart: 'auto',
    marginEnd: 25,
    borderRadius: 5,
    padding: 5,
  },
  bedInputContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Untuk memastikan input berada di samping teks
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
  icon: {
    height: '100%',
    width: '100%',
  },
});

export default EditNike;
