import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import {DatePickerr, FilterCheckBox} from '../../components';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {
  FontSize,
  FontFamily,
  Color,
  Padding,
  Border,
} from '../../../GlobalStyles';
import moment, {months} from 'moment';
import {Alert} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const BOR = () => {
  const [isFilterChecked, setIsFilterChecked] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mujairA, setNilaiMujairA] = useState('');
  const [mujairB, setNilaiMujairB] = useState('');
  const [mujairC, setNilaiMujairC] = useState('');
  const [nike, setNilaiNike] = useState('');
  const [payangka, setNilaiPayangka] = useState('');
  const [neonati, setNilaiNeonati] = useState('');
  const [bomboya, setNilaiBomboya] = useState('');
  const [karper, setNilaiKarper] = useState('');
  const [icu, setNilaiIcu] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [selectedMonth, setSelectedMonth] = useState('1'); // Default bulan adalah Januari

  const datePickerStyle1 = {
    top: '-10%',
  };

  const datePickerStyle2 = {
    top: '-90%',
    display: isFilterChecked ? 'flex' : 'none', // Show or hide based on checkbox state
  };

  const datePickerStyle3 = {
    top: '-90%',
    display: isFilterChecked ? 'flex' : 'none', // Show or hide based on checkbox state
  };

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const handleDateChange = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
    console.log('Selected Date: ', formattedDate);
    fetchStatsData(formattedDate);
  };

  const fetchStatsData = async date => {
    if (!date) {
      console.error('Tanggal belum dipilih');
      return;
    }

    // setLoading(true);
    // console.log('Mengirim request dengan data:', {
    //   date: date,
    //   ruangan: 'Mujair A',
    // });

    try {
      const response = await fetch(
        'https://samratindikator.online/borlostoi/public/insert/get_stats_by_indicator',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            tanggal: date,
            indicator: 'AVLOS',
          }).toString(),
        },
      );

      const responseText = await response.text();
      console.log('Response dari server:', responseText);

      // Jika respons adalah HTML, mungkin ada kesalahan pada server
      if (responseText.startsWith('<')) {
        console.error('Response mengandung HTML, ada masalah di server.');
        Alert.alert('Error', 'Server mengirimkan HTML, bukan JSON.');
        return;
      }

      let result;
      try {
        result = JSON.parse(responseText);
        console.log('Parsed JSON:', result);

        // Jika tidak ada data atau status bukan 'success', set semua nilai menjadi 0
        if (result.status === 'success' && result.data) {
          const data = result.data;
          setNilaiMujairA(data.Stats_Mujair_A || '0');
          setNilaiMujairB(data.Stats_Mujair_B || '0');
          setNilaiMujairC(data.Stats_Mujair_C || '0');
          setNilaiNike(data.Stats_Nike || '0');
          setNilaiPayangka(data.Stats_Payangka || '0');
          setNilaiNeonati(data.Stats_Neonati || '0');
          setNilaiBomboya(data.Stats_Bomboya || '0');
          setNilaiKarper(data.Stats_Karper || '0');
          setNilaiIcu(data.Stats_Icu || '0');
        } else {
          // Jika tidak ada data, set nilai default 0
          setNilaiMujairA('0');
          setNilaiMujairB('0');
          setNilaiMujairC('0');
          setNilaiNike('0');
          setNilaiPayangka('0');
          setNilaiNeonati('0');
          setNilaiBomboya('0');
          setNilaiKarper('0');
          setNilaiIcu('0');
          Alert.alert('No Data', 'Tidak ada data untuk tanggal ini.');
        }
      } catch (jsonError) {
        console.error('JSON Parse Error:', jsonError.message);
        Alert.alert('Error', 'Invalid response from server.');
      }
    } catch (error) {
      console.error('Fetch Error:', error.message);
      Alert.alert(
        'Error',
        'Failed to fetch data. Please check your network connection.',
      );
    } finally {
      setLoading(false); // Jangan lupa set loading false setelah request selesai
    }
  };

  const handleMonthChange = value => {
    if (value) {
      setSelectedMonth(value);
      console.log('Bulan yang dipilih: ', value);
      fetchStatsDataByMonth(value);
    }
  };

  const fetchStatsDataByMonth = async month => {
    try {
      const response = await fetch(
        'https://samratindikator.online/borlostoi/public/insert/get_monthly_stats_by_indicator',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            month: month, // Parameter bulan
            indicator: 'BOR', // Parameter ruangan
          }).toString(), // Mengonversi ke format key=value
        },
      );

      const responseText = await response.text();
      console.log('Response dari server:', responseText);

      // Jika respons adalah HTML, mungkin ada kesalahan pada server
      if (responseText.startsWith('<')) {
        console.error('Response mengandung HTML, ada masalah di server.');
        Alert.alert('Error', 'Server mengirimkan HTML, bukan JSON.');
        return;
      }

      let result;
      try {
        result = JSON.parse(responseText);
        console.log('Parsed JSON:', result);

        // Jika status sukses dan ada data, tampilkan data
        if (result.status === 'success' && result.data) {
          const data = result.data; // Mengambil data pertama jika ada
          setNilaiMujairA(data.Mujair_A || '0');
          setNilaiMujairB(data.Mujair_B || '0');
          setNilaiMujairC(data.Mujair_C || '0');
          setNilaiNike(data.Nike || '0');
          setNilaiPayangka(data.Payangka || '0');
          setNilaiNeonati(data.Neonati || '0');
          setNilaiBomboya(data.Bomboya || '0');
          setNilaiKarper(data.Karper || '0');
          setNilaiIcu(data.Icu || '0');
        } else {
          // Jika tidak ada data, set nilai default 0
          setNilaiMujairA('0');
          setNilaiMujairB('0');
          setNilaiMujairC('0');
          setNilaiNike('0');
          setNilaiPayangka('0');
          setNilaiNeonati('0');
          setNilaiBomboya('0');
          setNilaiKarper('0');
          setNilaiIcu('0');
          Alert.alert('No Data', 'Tidak ada data untuk tanggal ini.');
        }
      } catch (jsonError) {
        console.error('JSON Parse Error:', jsonError.message);
        Alert.alert('Error', 'Invalid response from server.');
      }
    } catch (error) {
      console.error('Fetch Error:', error.message);
      Alert.alert(
        'Error',
        'Failed to fetch data. Please check your network connection.',
      );
    } finally {
      setLoading(false); // Jangan lupa set loading false setelah request selesai
    }
  };

  const fetchStatsDataByRange = async (startDate, endDate) => {
    if (!startDate || !endDate) {
      Alert.alert('Error', 'Tanggal mulai dan akhir harus dipilih.');
      return;
    }

    setLoading(true);

    try {
      console.log('Request Params:', {
        start_date: startDate,
        end_date: endDate,
        indicator: 'BOR',
      });

      const response = await fetch(
        'https://samratindikator.online/borlostoi/public/insert/get_stats_indicator_by_range',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            start_date: startDate,
            end_date: endDate,
            indicator: 'AVLOS',
          }).toString(),
        },
      );

      const responseText = await response.text();
      console.log('Raw Response:', responseText);

      // Parse respons JSON
      let result;
      try {
        result = JSON.parse(responseText);
        console.log('Parsed JSON:', result);

        if (result.status === 'success') {
          const data = result.indicator_stats || {};

          // Update state dengan data yang diterima
          setNilaiMujairA(data.Input_Mujair_A || '0');
          setNilaiMujairB(data.Input_Mujair_B || '0');
          setNilaiMujairC(data.Input_Mujair_C || '0');
          setNilaiNike(data.Input_Nike || '0');
          setNilaiPayangka(data.Input_Payangka || '0');
          setNilaiNeonati(data.Input_Neonati || '0');
          setNilaiBomboya(data.Input_Bomboya || '0');
          setNilaiKarper(data.Input_Karper || '0');
          setNilaiIcu(data.Input_Icu || '0');
        } else {
          console.log('No data found for the selected range.');
          resetAllValues(); // Reset jika tidak ada data
          Alert.alert('No Data', 'Tidak ada data untuk rentang tanggal ini.');
        }
      } catch (error) {
        console.error('JSON Parsing Error:', error.message);
        Alert.alert('Error', 'Invalid response from server.');
      }
    } catch (error) {
      console.error('Fetch Error:', error.message);
      Alert.alert(
        'Error',
        'Failed to fetch data. Please check your network connection.',
      );
    } finally {
      setLoading(false);
    }
  };

  // Fungsi Reset Nilai

  // Handler Perubahan Tanggal
  const handleStartDateChange = date => {
    console.log('Start Date:', date);

    if (!date) {
      console.error('Tanggal tidak valid:', date);
      return;
    }

    const formattedDate = moment(date).format('YYYY-MM-DD');
    setStartDate(formattedDate);

    if (endDate) {
      console.log('Memanggil fetchStatsDataByRange dengan:', {
        startDate: formattedDate,
        endDate,
      });
      fetchStatsDataByRange(formattedDate, endDate);
    }
  };

  const handleEndDateChange = date => {
    console.log('End Date:', date);

    if (!date) {
      console.error('Tanggal tidak valid:', date);
      return;
    }

    const formattedDate = moment(date).format('YYYY-MM-DD');
    setEndDate(formattedDate);

    if (startDate) {
      console.log('Memanggil fetchStatsDataByRange dengan:', {
        startDate,
        endDate: formattedDate,
      });
      fetchStatsDataByRange(startDate, formattedDate);
    }
  };

  return (
    <View style={styles.screenGuest}>
      {/* Fixed Header */}
      <View style={[styles.barAtas, styles.filterShadowBox]}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('BORAVLOSTOIBTONDRGDR')}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require('../../../assets/-icon-arrow-back.png')}
          />
        </Pressable>
        <Text style={[styles.backToLogin, styles.vectorIconPosition]}>BOR</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* First DatePicker */}
        <DatePickerr style={datePickerStyle1} onDateChange={handleDateChange} />

        {/* Filter Checkbox */}
        <View style={styles.groupParent}>
          <FilterCheckBox
            isChecked={isFilterChecked}
            onChange={() => setIsFilterChecked(!isFilterChecked)}
          />
        </View>

        {/* Conditionally render second DatePicker based on checkbox */}
        <DatePickerr
          style={datePickerStyle2}
          mode="date"
          date={startDate ? new Date(startDate) : new Date()}
          onDateChange={handleStartDateChange}
        />
        <DatePickerr
          style={datePickerStyle3}
          mode="date"
          date={endDate ? new Date(endDate) : new Date()}
          onDateChange={handleEndDateChange}
        />

        {/* Pilih Bulan */}
        <View style={styles.container1}>
          <Text style={styles.label}>Pilih Bulan :</Text>
          <RNPickerSelect
            onValueChange={value => handleMonthChange(value)}
            items={[
              {label: 'January', value: '1'},
              {label: 'February', value: '2'},
              {label: 'March', value: '3'},
              {label: 'April', value: '4'},
              {label: 'May', value: '5'},
              {label: 'June', value: '6'},
              {label: 'July', value: '7'},
              {label: 'August', value: '8'},
              {label: 'September', value: '9'},
              {label: 'October', value: '10'},
              {label: 'November', value: '11'},
              {label: 'December', value: '12'},
            ]}
            style={{
              inputAndroid: {
                color: 'white',
                backgroundColor: '#1E9DEC',
                top: -80,
                alignItems: 'center',
                borderRadius: 8,
                paddingVertical: 10,
                paddingHorizontal: 15,
              },
            }}
            value={selectedMonth}
            placeholder={{
              label: 'Select a month...',
              value: null,
              color: 'gray',
            }}
          />
        </View>

        {/* Tabel */}
        <View style={styles.tableContainer}>
          <View style={styles.headerContainer}>
            <Pressable style={styles.buttonHasil}>
              <Text style={styles.buttonText}>HASIL</Text>
            </Pressable>
            <Pressable style={styles.buttonStandar}>
              <Text style={styles.buttonText}>STANDAR</Text>
            </Pressable>
            <Pressable style={styles.buttonKet}>
              <Text style={styles.buttonText}>KET</Text>
            </Pressable>
          </View>
          {[
            {
              label: 'MUJAIR A :',
              value: mujairA,
              standard: '60-85%',
              symbol: '%',
            },
            {
              label: 'MUJAIR B :',
              value: mujairB,
              standard: '60-85%',
              symbol: '%',
            },
            {
              label: 'MUJAIR C :',
              value: mujairC,
              standard: '60-85%',
              symbol: '%',
            },
            {
              label: 'NIKE :',
              value: nike,
              standard: '60-85%',
              symbol: '%',
            },
            {
              label: 'PAYANGKA :',
              value: payangka,
              standard: '60-85%',
              symbol: '%',
            },
            {
              label: 'NEONATI :',
              value: neonati,
              standard: '60-85%',
              symbol: '%',
            },
            {
              label: 'BOMBOYA :',
              value: bomboya,
              standard: '60-85%',
              symbol: '%',
            },
            {
              label: 'KARPER :',
              value: karper,
              standard: '60-85%',
              symbol: '%',
            },
            {
              label: 'ICU :',
              value: icu,
              standard: '60-85%',
              symbol: '%',
            },
          ].map((row, index) => (
            <View style={styles.row} key={index}>
              <Text style={styles.rowLabel}>{row.label}</Text>
              <Text
                style={[
                  styles.rowValue,
                  {
                    color:
                      parseFloat(row.value) >= 60 && parseFloat(row.value) <= 85
                        ? 'green'
                        : 'red',
                  },
                ]}>
                {row.value}
                {row.symbol}
              </Text>
              <Text style={styles.rowStandard}>{row.standard}</Text>
              <Image
                style={styles.rowIcon}
                source={
                  parseFloat(row.value) >= 6 && parseFloat(row.value) <= 9
                    ? require('../../../assets/green.png')
                    : require('../../../assets/red.png')
                }
              />
            </View>
          ))}
        </View>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <Image
              source={require('../../../assets/green.png')} // Green icon
              style={styles.legendIcon}
            />
            <Text style={styles.legendText}>Memenuhi standar</Text>
          </View>
          <View style={styles.legendItem}>
            <Image
              source={require('../../../assets/red.png')} // Red icon
              style={styles.legendIcon}
            />
            <Text style={styles.legendText}>Tidak memenuhi standar</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  screenGuest: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: wp('4%'), // Padding 4% dari lebar layar
  },
  container: {
    flex: 1,
    padding: wp('4%'),
  },
  barAtas: {
    height: hp('8%'), // 8% dari tinggi layar
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    backgroundColor: '#FFFFFF',
    elevation: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    width: wp('10%'), // 10% dari lebar layar
    height: hp('5%'), // 5% dari tinggi layar
  },
  icon: {
    width: '110%',
    height: '60%',
    left: hp('-1%'),
    top: hp('1.1'),
  },
  backToLogin: {
    fontSize: wp('6%'), // Ukuran font 4% dari lebar layar
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    flex: 1,
    left: hp('-2.1%'),
  },
  container1: {
    padding: wp('20%'),
    backgroundColor: '#FFFFFF',
    marginBottom: hp('-15%'),
  },
  label: {
    fontSize: wp('5%'), // Ukuran font 5% dari lebar layar
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: hp('10%'),
    marginTop: hp('-15%'),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: hp('2%'),
    backgroundColor: '#F5F5F5',
    padding: wp('2%'),
    borderRadius: wp('2%'),
  },
  buttonHasil: {
    backgroundColor: '#2E7D32',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
    borderRadius: wp('2%'),
    left: wp('25%'),
  },
  buttonStandar: {
    backgroundColor: '#2E7D32',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
    borderRadius: wp('2%'),
    left: wp('16.5%'),
  },
  buttonKet: {
    backgroundColor: '#2E7D32',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
    borderRadius: wp('2%'),
    left: wp('7%'),
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableContainer: {
    marginTop: hp('-1%'),
    marginLeft: wp('-4%'),
  },
  groupParent: {
    marginTop: hp('6.5%'),
    marginLeft: hp('3.7%'),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align elements to the left
    paddingVertical: hp('1%'),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  rowLabel: {
    flex: 2,
    fontSize: wp('4%'),
    color: '#000000',
    fontWeight: 'bold',
    left: wp('5%'),
  },
  rowValue: {
    flex: 1,
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'right', // Align text to the right within its space
    right: wp('16%'),
  },
  rowStandard: {
    flex: 1,
    fontSize: wp('4%'),
    color: '#000000',
    textAlign: 'left', // Align text to the left
    right: wp('5%'),
  },
  rowIcon: {
    flex: 0.5,
    width: wp('5%'),
    height: wp('5%'),
    resizeMode: 'contain',
    right: wp('3%'),
  },

  legendContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: hp('1%'),
    paddingHorizontal: wp('4%'),
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendIcon: {
    width: wp('5%'),
    height: wp('5%'),
    marginRight: wp('2%'),
  },
  legendText: {
    fontSize: wp('3.5%'),
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default BOR;