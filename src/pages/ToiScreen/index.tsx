import React, {useState} from 'react';
import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
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

const TOI = () => {
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

  const [selectedMonth, setSelectedMonth] = useState('1'); // Default bulan adalah Januari

  const datePickerStyle1 = {
    top: '35%',
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
            indicator: 'TOI',
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
            indicator: 'TOI', // Parameter ruangan
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

  return (
    <View style={styles.screenGuest}>
      {/* First DatePicker */}
      <DatePickerr style={datePickerStyle1} onDateChange={handleDateChange} />

      {/* Filter Checkbox */}

      {/* Lihat Button */}
      {/* <Pressable
        style={[styles.okButton, styles.filterShadowBox]}
        onPress={() => console.log('OK Button Pressed')}>
        <Text style={[styles.okButtonText, styles.filterTypo]}>Lihat</Text>
      </Pressable> */}

      <Image
        style={[styles.vectorIcon, styles.vectorIconPosition]}
        resizeMode="cover"
        source={require('../../../assets/vector.png')}
      />

      {/* Conditionally render second DatePicker based on checkbox */}
      {/* Navigation Bar */}
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
        <Text style={[styles.backToLogin, styles.vectorIconPosition]}>TOI</Text>
      </View>
      <View style={styles.container1}>
        <Text style={styles.label}>Pilih Bulan : </Text>
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
              borderRadius: 8, // Tambahkan border radius di sini
              paddingVertical: 10, // Untuk memberikan jarak vertikal dalam
              paddingHorizontal: 12, // Untuk jarak horizontal
            },
          }}
          value={selectedMonth}
          placeholder={{
            label: 'Select a month...',
            value: null,
            color: 'red',
          }}
        />
      </View>

      <View style={styles.container}>
        {/* Header Section */}
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

        {/* Main Table */}
        <View style={styles.tableContainer}>
          {/* Rows */}
          {[
            {
              label: 'MUJAIR A :',
              value: mujairA,
              standard: ' 1-3 Hari',
              icon: 'green',
              symbol: ' Hari',
            },
            {
              label: 'MUJAIR B :',
              value: mujairB,
              standard: ' 1-3 Hari',
              icon: 'green',
              symbol: ' Hari',
            },
            {
              label: 'MUJAIR C :',
              value: mujairC,
              standard: ' 1-3 Hari',
              icon: 'red',
              symbol: ' Hari',
            },
            {
              label: 'NIKE :',
              value: nike,
              standard: ' 1-3 Hari',
              icon: 'green',
              symbol: ' Hari',
            },
            {
              label: 'PAYANGKA :',
              value: payangka,
              standard: ' 1-3 Hari',
              icon: 'red',
              symbol: ' Hari',
            },
            {
              label: 'NEONATI :',
              value: neonati,
              standard: ' 1-3 Hari',
              icon: 'red',
              symbol: ' Hari',
            },
            {
              label: 'BOMBOYA :',
              value: bomboya,
              standard: ' 1-3 Hari',
              icon: 'green',
              symbol: ' Hari',
            },
            {
              label: 'KARPER :',
              value: karper,
              standard: ' 1-3 Hari',
              icon: 'red',
              symbol: ' Hari',
            },
            {
              label: 'ICU :',
              value: icu,
              standard: ' 1-3 Hari',
              icon: 'red',
              symbol: ' Hari',
            },
          ].map((row, index) => {
            // Logic to check if the value is within the standard range (60-85%)
            let icon = 'green'; // Default to green
            const min = 60;
            const max = 85;

            if (parseFloat(row.value) < min || parseFloat(row.value) > max) {
              icon = 'red'; // Out of range
            }

            return (
              <View key={index} style={styles.row}>
                <Text style={styles.rowLabel}>{row.label}</Text>
                <Text style={styles.rowStandard}>{row.standard}</Text>
                <Text
                  style={[
                    styles.rowValue,
                    {color: icon === 'red' ? 'red' : 'green'},
                  ]}>
                  {row.value}
                  {row.symbol}
                </Text>
                <Image
                  style={styles.rowIcon}
                  source={
                    icon === 'red'
                      ? require('../../../assets/red.png') // Path to red icon
                      : require('../../../assets/green.png') // Path to green icon
                  }
                />
              </View>
            );
          })}
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
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  legendContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'right',
    marginTop: 0,
    left: -15, // Jarak dari tabel
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16, // Jarak antar item
  },
  legendIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginRight: 5, // Jarak ikon ke teks
  },
  legendText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
  },
  datePickerStyle: {
    top: 20,
  },
  filterTypo: {
    fontSize: FontSize.m3BodyLarge_size,
    color: '#ffffff',
  },
  filterShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
  },
  vectorIconPosition: {
    zIndex: 1,
    left: '58%',
    position: 'absolute',
    alignSelf: 'center',
  },
  groupIcon: {
    width: 20,
    height: 20,
  },
  groupParent: {
    top: 190,
    left: 31,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
  },
  filter1: {
    top: 8,
    left: 20,
    fontWeight: '500',
    fontFamily: FontFamily.poppinsMedium,
    color: Color.schemesOnPrimary,
    zIndex: 1000,
    position: 'absolute',
  },
  filter1Ruangan: {
    top: 8,
    left: 22,
    fontWeight: '500',
    fontFamily: FontFamily.poppinsMedium,
    color: Color.schemesOnPrimary,
    zIndex: 1000,
    position: 'absolute',
  },
  vectorIcon: {
    marginLeft: 19.5,
    top: 10,
    width: 15,
    height: 15,
  },
  filter: {
    top: 620,
    left: 207,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowRadius: 7,
    elevation: 7,
    borderRadius: 20,
    backgroundColor: Color.colorMediumaquamarine,
    width: 180,
    height: 40,
    justifyContent: 'flex-end',
    paddingLeft: Padding.p_xl,
    paddingTop: Padding.p_3xs,
    paddingRight: Padding.p_3xs,
    paddingBottom: Padding.p_3xs,
  },
  filterRuangan: {
    top: 670,
    left: 207,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowRadius: 7,
    elevation: 7,
    borderRadius: 20,
    backgroundColor: Color.colorMediumaquamarine,
    width: 180,
    height: 40,
    justifyContent: 'flex-end',
    paddingLeft: Padding.p_xl,
    paddingTop: Padding.p_3xs,
    paddingRight: Padding.p_3xs,
    paddingBottom: Padding.p_3xs,
  },

  // New OK button styles
  okButton: {
    top: 250, // Position it above the other buttons
    left: 282,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowRadius: 7,
    elevation: 7,
    borderRadius: 20,
    backgroundColor: Color.colorMediumaquamarine,
    width: 100,
    height: 40,
    justifyContent: 'flex-end',
    paddingLeft: Padding.p_xl,
    paddingTop: Padding.p_3xs,
    paddingRight: Padding.p_3xs,
    paddingBottom: Padding.p_3xs,
  },
  okButtonText: {
    top: 8,
    left: 30,
    fontWeight: '500',
    fontFamily: FontFamily.poppinsMedium,
    color: Color.schemesOnPrimary,
    zIndex: 1000,
    position: 'absolute',
  },

  icon: {
    height: '100%',
    width: '100%',
  },
  backButton: {
    width: 42,
    height: 25,
    zIndex: 0,
  },
  backToLogin: {
    marginTop: -11.5,
    marginLeft: -72,
    top: '50%',
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    textAlign: 'center',
    fontSize: 16,
    zIndex: 1,
    left: '70%',
    alignSelf: 'center',
  },
  barAtas: {
    shadowRadius: 4,
    elevation: 4,
    borderRadius: Border.br_8xs,
    width: 410,
    height: 60,
    justifyContent: 'space-between',
    backgroundColor: Color.schemesOnPrimary,
    alignSelf: 'center',
  },
  screenGuest: {
    flex: 1,
    height: 900,
    backgroundColor: Color.schemesOnPrimary,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    bottom: 350,
  },
  // Header Section
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  buttonHasil: {
    backgroundColor: '#2E7D32',
    paddingVertical: 8,
    paddingHorizontal: 11,
    borderRadius: 8,
    left: 93,
  },
  buttonStandar: {
    backgroundColor: '#2E7D32',
    paddingVertical: 8,
    paddingHorizontal: 11,
    borderRadius: 8,
    left: 55,
  },
  buttonKet: {
    backgroundColor: '#2E7D32',
    paddingVertical: 8,
    paddingHorizontal: 11,
    borderRadius: 8,
    left: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Table Section
  tableContainer: {
    marginTop: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  rowLabel: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
    left: 5,
  },
  rowStandard: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    left: 75,
  },
  rowValue: {
    flex: 1,
    fontSize: 16,
    color: 'black', // Warna hijau gelap untuk nilai
    textAlign: 'center',
    fontWeight: 'bold',
    left: -139,
  },
  rowIcon: {
    flex: 0.2,
    width: 20,
    height: 20,
    resizeMode: 'contain',
    left: -28,
  },
  container1: {
    flex: 1,
    padding: 106,
    backgroundColor: 'white',
    top: -60,
  },
  label: {
    fontSize: 21,
    fontWeight: 'bold',
    top: -100,
    alignSelf: 'center',
  },
  ketShadowBox: {
    padding: Padding.p_base,
    justifyContent: 'center',
    elevation: 8,
    shadowRadius: 8,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  standarBor: {
    alignSelf: 'stretch',
    fontSize: 15,
    textAlign: 'center',
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: '700',
    height: 200,
    top: 93,
  },
  standarbor: {
    marginLeft: -163,
    top: -105,
    borderRadius: Border.br_3xs,
    width: 326,
    height: 44,
    padding: Padding.p_base,
    justifyContent: 'center',
    elevation: 8,
    shadowRadius: 8,
    left: '50%',
    backgroundColor: Color.schemesOnPrimary,
  },
  // inputAndroid: {
  //   fontSize: 1,
  //   paddingVertical: 12,
  //   paddingHorizontal: 10,
  //   borderWidth: 1,
  //   borderColor: 'gray',
  //   borderRadius: 20,
  //   color: 'yellow',
  //   paddingRight: 30, // untuk ikon dropdown
  // },
});

export default TOI;
