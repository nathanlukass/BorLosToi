import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Dimensions,
} from 'react-native';
import {DatePickerr} from '../../../../components';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {FontFamily, Color} from '../../../../../GlobalStyles';
import moment, {months} from 'moment';
import {Alert} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const {width, height} = Dimensions.get('window');
const dynamicFontSize = size => (width / 375) * size;
const dynamicPadding = padding => (height / 667) * padding;

const BTO = () => {
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
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedFilterDetail, setSelectedFilterDetail] = useState('');

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const handleDateChange = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
    //console.log('Selected Date: ', formattedDate);
    fetchStatsData(formattedDate);
    setSelectedFilter('Filter Harian');
  };

  const fetchStatsData = async date => {
    if (!date) {
      console.error('Tanggal belum dipilih');
      return;
    }
    try {
      const response = await fetch(
        'https://moraya.online/moraya/public/guest/get_stats_by_indicator',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            tanggal: date,
            indicator: 'BTO',
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
          setNilaiMujairA(data['Mujair A']?.toString() || '0');
          setNilaiMujairB(data['Mujair B']?.toString() || '0');
          setNilaiMujairC(data['Mujair C']?.toString() || '0');
          setNilaiNike(data.Nike?.toString() || '0');
          setNilaiPayangka(data.Payangka?.toString() || '0');
          setNilaiNeonati(data.Neonati?.toString() || '0');
          setNilaiBomboya(data.Bomboya?.toString() || '0');
          setNilaiKarper(data.Karper?.toString() || '0');
          setNilaiIcu(data.Icu?.toString() || '0');
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
      setLoading(false);
    }
  };

  const handleMonthChange = value => {
    if (value) {
      setSelectedMonth(value);
      console.log('Bulan yang dipilih: ', value);

      if (!selectedYear) {
        Alert.alert('Pilih Tahun', 'Silakan pilih tahun.');
        return;
      }

      const formattedMonth = value.toString().padStart(2, '0');
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const monthName = monthNames[parseInt(value, 10) - 1];

      setSelectedFilter('Filter Bulanan');
      // setSelectedFilterDetail(`Bulan ${monthName}`);

      fetchStatsDataByMonthAndYear(formattedMonth, selectedYear);
    }
  };

  const handleYearChange = value => {
    if (value) {
      setSelectedYear(value);
      console.log('Tahun yang dipilih: ', value);

      if (!selectedMonth) {
        Alert.alert('Pilih Bulan', 'Silakan pilih bulan terlebih dahulu.');
        return;
      }

      fetchStatsDataByMonthAndYear(selectedMonth, value);
    }
  };

  const fetchStatsDataByMonthAndYear = async (month, year) => {
    setLoading(true);
    console.log('Mengirim request dengan bulan dan tahun:', {month, year});

    try {
      const response = await fetch(
        'https://moraya.online/moraya/public/guest/get_monthly_stats_by_indicator',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            month: month,
            year: year,
            indicator: 'BTO',
          }).toString(),
        },
      );

      const responseText = await response.text();
      console.log('Response dari server:', responseText);

      if (responseText.startsWith('<')) {
        console.error('Response mengandung HTML, ada masalah di server.');
        Alert.alert('Error', 'Server mengirimkan HTML, bukan JSON.');
        return;
      }

      let result;
      try {
        result = JSON.parse(responseText);
        console.log('Parsed JSON:', result);

        if (result.status === 'success' && result.data) {
          const data = result.data;

          // Mengatur nilai dengan validasi
          setNilaiMujairA(
            data['Mujair A'] === 'Tidak ada data'
              ? 'Tidak ada data'
              : data['Mujair A'],
          );
          setNilaiMujairB(
            data['Mujair B'] === 'Tidak ada data'
              ? 'Tidak ada data'
              : data['Mujair B'],
          );
          setNilaiMujairC(
            data['Mujair C'] === 'Tidak ada data'
              ? 'Tidak ada data'
              : data['Mujair C'],
          );
          setNilaiNike(
            data.Nike === 'Tidak ada data' ? 'Tidak ada data' : data.Nike,
          );
          setNilaiPayangka(
            data.Payangka === 'Tidak ada data'
              ? 'Tidak ada data'
              : data.Payangka,
          );
          setNilaiNeonati(
            data.Neonati === 'Tidak ada data' ? 'Tidak ada data' : data.Neonati,
          );
          setNilaiBomboya(
            data.Bomboya === 'Tidak ada data' ? 'Tidak ada data' : data.Bomboya,
          );
          setNilaiKarper(
            data.Karper === 'Tidak ada data' ? 'Tidak ada data' : data.Karper,
          );
          setNilaiIcu(
            data.Icu === 'Tidak ada data' ? 'Tidak ada data' : data.Icu,
          );

          // Log untuk memeriksa data yang diterima
          console.log('Nilai Mujair A:', data['Mujair A']);
        } else {
          console.log('Tidak ada data valid dari server.');
          resetStateToNoData();
          Alert.alert('No Data', 'Tidak ada data untuk bulan dan tahun ini.');
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
      setLoading(false);
    }
  };

  const resetStateToNoData = () => {
    setNilaiMujairA('Tidak ada data');
    setNilaiMujairB('Tidak ada data');
    setNilaiMujairC('Tidak ada data');
    setNilaiNike('Tidak ada data');
    setNilaiPayangka('Tidak ada data');
    setNilaiNeonati('Tidak ada data');
    setNilaiBomboya('Tidak ada data');
    setNilaiKarper('Tidak ada data');
    setNilaiIcu('Tidak ada data');
  };

  const resetStateToDefault = () => {
    setNilaiMujairA('0');
    setNilaiMujairB('0');
    setNilaiMujairC('0');
    setNilaiNike('0');
    setNilaiPayangka('0');
    setNilaiNeonati('0');
    setNilaiBomboya('0');
    setNilaiKarper('0');
    setNilaiIcu('0');
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
        indicator: 'BTO',
      });

      const response = await fetch(
        'https://moraya.online/moraya/public/guest/get_stats_indicator_by_range',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            start_date: startDate,
            end_date: endDate,
            indicator: 'BTO',
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
          const data = result.data || {};

          // Update state dengan data yang diterima
          setNilaiMujairA(data['Mujair A']?.toString() || '0');
          setNilaiMujairB(data['Mujair B']?.toString() || '0');
          setNilaiMujairC(data['Mujair C']?.toString() || '0');
          setNilaiNike(data.Nike?.toString() || '0');
          setNilaiPayangka(data.Payangka?.toString() || '0');
          setNilaiNeonati(data.Neonati?.toString() || '0');
          setNilaiBomboya(data.Bomboya?.toString() || '0');
          setNilaiKarper(data.Karper?.toString() || '0');
          setNilaiIcu(data.Icu?.toString() || '0');
        } else {
          console.log('No data found for the selected range.');
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
  // Handler Perubahan Tanggal
  const handleStartDateChange = date => {
    setSelectedFilter('Filter Rentang Tanggal');
    if (!date) {
      console.error('Tanggal mulai tidak valid:', date);
      return;
    }

    const formattedDate = moment(date).format('YYYY-MM-DD');
    setStartDate(formattedDate);

    console.log('📅 Start Date Selected:', formattedDate);

    if (endDate) {
      console.log('🚀 Memanggil fetchStatsDataByRange dengan:');
      console.log(`- Start Date: ${formattedDate}`);
      console.log(`- End Date  : ${endDate}`);

      fetchStatsDataByRange(formattedDate, endDate);
    }
  };

  const handleEndDateChange = date => {
    setSelectedFilter('Filter Rentang Tanggal');
    if (!date) {
      console.error('❌ Tanggal akhir tidak valid:', date);
      return;
    }

    const formattedDate = moment(date).format('YYYY-MM-DD');
    setEndDate(formattedDate);

    console.log('📅 End Date Selected:', formattedDate);

    if (startDate) {
      console.log('🚀 Memanggil fetchStatsDataByRange dengan:', {
        startDate,
        endDate: formattedDate,
      });
      fetchStatsDataByRange(startDate, formattedDate);
    }
  };

  return (
    <View style={styles.container}>
      {/* Toolbar */}
      <View style={styles.barAtas}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('ScreenGuest')}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require('../../../../../assets/-icon-arrow-back.png')}
          />
        </Pressable>
        <View style={styles.textContainer}>
          <Text style={styles.text}>BTO</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* DATEPICKER STYLE */}
        <View>
          <Text style={styles.text1}>Filter Indikator BTO</Text>
          <Text style={styles.text2}>Pilih tanggal </Text>
        </View>
        <View style={{marginVertical: 8, marginBottom: 8}}>
          <DatePickerr onDateChange={handleDateChange} />
        </View>

        <View>
          <Text style={styles.text2}>Pilih tanggal sendiri </Text>
          <Text
            style={{
              fontFamily: FontFamily.poppinsRegular,
              fontSize: dynamicFontSize(11),
              color: '#1A75AE',
            }}>
            Tentukan periode waktu untuk menampilkan indikator ruangan{' '}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginVertical: dynamicPadding(8),
          }}>
          {/* Kolom untuk Dari Tanggal */}
          <View style={{flex: 1, marginRight: dynamicPadding(8)}}>
            <Text
              style={{
                fontSize: 12,
                color: Color.notSoBlack,
                fontFamily: FontFamily.poppinsRegular,
              }}>
              Dari Tanggal
            </Text>
            <View style={{marginVertical: dynamicPadding(8)}}>
              <DatePickerr
                style={{flex: 1, height: 60}}
                onDateChange={handleStartDateChange}
              />
            </View>
          </View>

          {/* Kolom untuk Sampai Tanggal */}
          <View style={{flex: 1, marginLeft: dynamicPadding(8)}}>
            <Text
              style={{
                fontSize: 12,
                color: Color.notSoBlack,
                fontFamily: FontFamily.poppinsRegular,
              }}>
              Sampai Tanggal
            </Text>
            <View style={{marginVertical: dynamicPadding(8)}}>
              <DatePickerr
                style={{flex: 1, height: 60}}
                onDateChange={handleEndDateChange}
              />
            </View>
          </View>
        </View>
        {/* PILIH BULAN */}
        <Text style={[styles.text2, {marginTop: dynamicPadding(-8)}]}>
          Pilih bulan
        </Text>
        <View>
          <View
            style={{
              alignItems: 'center',
              marginVertical: dynamicPadding(8),
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: dynamicPadding(8),
              marginBottom: dynamicPadding(16),
            }}>
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
              value={selectedMonth}
              placeholder={{
                label: 'Pilih Bulan...',
                value: null,
                color: '#9EA0A4',
              }}
              style={{
                inputAndroid: {color: 'black'},
                inputIOS: {color: 'black'},
              }}
            />

            <RNPickerSelect
              onValueChange={value => handleYearChange(value)}
              items={[
                {
                  label: `${new Date().getFullYear() - 1}`,
                  value: new Date().getFullYear() - 1,
                },
                {
                  label: `${new Date().getFullYear()}`,
                  value: new Date().getFullYear(),
                },
                {
                  label: `${new Date().getFullYear() + 1}`,
                  value: new Date().getFullYear() + 1,
                },
              ]}
              value={selectedYear}
              placeholder={{
                label: 'Pilih Tahun...',
                value: null,
                color: '#9EA0A4',
              }}
              style={{
                inputAndroid: {color: 'black'},
                inputIOS: {color: 'black'},
              }}
            />
          </View>
        </View>

        <View style={styles.container2}>
          <View
            style={{
              padding: 10,
              alignItems: 'center',
              backgroundColor: 'rgba(192, 242, 225, 0.5)',
              borderRadius: 8,
              marginVertical: 8,
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: dynamicFontSize(14),
                fontFamily: FontFamily.poppinsMedium,
                color: '#21B557',
              }}>
              {selectedFilter || ' '}
            </Text>
            {selectedFilterDetail && (
              <Text
                style={{
                  fontSize: dynamicFontSize(12),
                  fontFamily: FontFamily.poppinsRegular,
                  color: '#21B557',
                  marginTop: 0,
                  textAlign: 'center',
                }}>
                {selectedFilterDetail}
              </Text>
            )}
          </View>
          <View style={styles.headerContainer}>
            <View style={styles.buttonHasil}>
              <Text style={styles.buttonText}>HASIL</Text>
            </View>
            <View style={styles.buttonStandar}>
              <Text style={styles.buttonText}>STANDAR</Text>
            </View>
            <View style={styles.Ket}>
              <Text style={styles.buttonText}>KET</Text>
            </View>
          </View>
          {[
            {
              label: 'Mujair A :',
              value: mujairA,
              standard: '40-50 Kali',
              symbol: ' Kali',
            },
            {
              label: 'Mujair B :',
              value: mujairB,
              standard: '40-50 Kali',
              symbol: ' Kali',
            },
            {
              label: 'Mujair C:',
              value: mujairC,
              standard: '40-50 Kali',
              symbol: ' Kali',
            },
            {
              label: 'Nike:',
              value: nike,
              standard: '40-50 Kali',
              symbol: ' Kali',
            },
            {
              label: 'Payangka :',
              value: payangka,
              standard: '40-50 Kali',
              symbol: ' Kali',
            },
            {
              label: 'Neonati:',
              value: neonati,
              standard: '40-50 Kali',
              symbol: ' Kali',
            },
            {
              label: 'Bomboya :',
              value: bomboya,
              standard: '40-50 Kali',
              symbol: ' Kali',
            },
            {
              label: 'Karper :',
              value: karper,
              standard: '40-50 Kali',
              symbol: ' Kali',
            },
            {
              label: 'ICU :',
              value: icu,
              standard: '40-50 Kali',
              symbol: ' Kali',
            },
          ].map((row, index) => {
            const isInRange =
              row.value &&
              !isNaN(parseFloat(row.value)) &&
              parseFloat(row.value) >= 40 &&
              parseFloat(row.value) <= 50;

            return (
              <View style={styles.row} key={index}>
                <Text style={styles.rowLabel}>{row.label}</Text>
                <Text
                  style={[
                    styles.rowValue,
                    {color: isInRange ? '#21B557' : '#ED1F33'},
                  ]}>
                  {row.value === 'Tidak ada data'
                    ? 'Tidak ada data'
                    : `${row.value}${row.symbol}`}
                </Text>
                <Text style={styles.rowStandard}>{row.standard}</Text>
                <Image
                  style={styles.rowIcon}
                  source={
                    isInRange
                      ? require('../../../../../assets/memenuhi.png')
                      : require('../../../../../assets/tdk-memenuhi.png')
                  }
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: dynamicPadding(0),
    paddingTop: dynamicPadding(8 + 32),
  },
  text1: {
    fontSize: dynamicFontSize(16),
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsSemiBold,
    marginTop: dynamicPadding(16),
    marginBottom: dynamicPadding(16),
  },
  text2: {
    fontSize: dynamicFontSize(14),
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsMedium,
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
    zIndex: 10,
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
    marginBottom: -100,
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
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  container2: {
    padding: dynamicPadding(16),
    backgroundColor: Color.schemesOnPrimary,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 1,
    marginHorizontal: dynamicPadding(-1),
    borderRadius: dynamicPadding(8),
    overflow: 'visible',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    marginTop: dynamicPadding(16),
  },
  buttonHasil: {
    backgroundColor: '#21B557',
    paddingVertical: dynamicPadding(5),
    paddingHorizontal: dynamicPadding(8),
    borderRadius: 5,
    left: dynamicPadding(58),
    fontFamily: FontFamily.poppinsBold,
  },
  buttonStandar: {
    backgroundColor: '#21B557',
    paddingVertical: dynamicPadding(5),
    paddingHorizontal: dynamicPadding(8),
    borderRadius: 5,
    left: dynamicPadding(40),
  },
  Ket: {
    backgroundColor: '#21B557',
    paddingVertical: dynamicPadding(5),
    paddingHorizontal: dynamicPadding(16),
    left: dynamicPadding(18),
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: dynamicFontSize(12),
    fontFamily: FontFamily.poppinsMedium,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  rowLabel: {
    flex: 1,
    fontSize: dynamicFontSize(13),
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsMedium,
  },
  rowValue: {
    borderRadius: 5,
    marginRight: dynamicPadding(5),
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'center',
    fontSize: dynamicFontSize(13),
    minWidth: 50,
    maxWidth: 70,
    flex: 2,
    lineHeight: 16,
  },
  rowStandard: {
    flex: 1,
    marginRight: dynamicPadding(14),
    fontSize: dynamicFontSize(14),
    color: Color.notSoBlack,
    textAlign: 'center',
    fontFamily: FontFamily.poppinsRegular,
  },
  rowIcon: {
    width: 56,
    height: 26,
  },
});

export default BTO;
