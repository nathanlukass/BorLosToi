import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  ScrollView,
} from 'react-native';
import {DatePickerr} from '../../../../components';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {FontFamily, Color} from '../../../../../GlobalStyles';
import moment, {months} from 'moment';
import {Alert} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {useEffect} from 'react';
import {StatsICU} from '..';

const {width, height} = Dimensions.get('window');
const dynamicFontSize = size => (width / 375) * size;
const dynamicPadding = padding => (height / 667) * padding;

const StatsIcu = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bor, setNilaiBor] = useState('');
  const [avlos, setNilaiAvlos] = useState('');
  const [toi, setNilaiToi] = useState('');
  const [gdr, setNilaiGdr] = useState('');
  const [ndr, setNilaiNdr] = useState('');
  const [bto, setNilaiBto] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedFilterDetail, setSelectedFilterDetail] = useState('');

  useEffect(() => {
    console.log('State updated:', {bor, avlos, toi, gdr, bto, ndr});
  }, [bor, avlos, toi, gdr, bto, ndr]);

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const handleDateChange = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
    console.log('Selected Date: ', formattedDate);
    fetchStatsData(formattedDate);
    setSelectedFilter('Filter Harian');
    //setSelectedFilterDetail(`Tanggal ${moment(date).format('YYYY-MM-DD')}`);
  };
  const fetchStatsData = async date => {
    if (!date) {
      console.error('Tanggal belum dipilih');
      return;
    }

    setLoading(true);
    console.log('Mengirim request dengan data:', {
      date: date,
      ruangan: 'Icu',
    });

    try {
      const response = await fetch(
        'https://moraya.online/moraya/public/guest/get_daily_indicators_ruangan',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            tanggal: date,
            ruangan: 'Icu',
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
        // Cari posisi JSON dalam respons
        const jsonStart = responseText.indexOf('{');
        const jsonEnd = responseText.lastIndexOf('}');

        // Ekstrak hanya bagian JSON
        const jsonString = responseText.substring(jsonStart, jsonEnd + 1);
        result = JSON.parse(jsonString);

        console.log('Parsed JSON:', result);

        if (result.status === 'success' && result.indicators.data) {
          const data = result.indicators.data;
          setNilaiBor(data.BOR || '0');
          setNilaiAvlos(data.AVLOS || '0');
          setNilaiToi(data.TOI || '0');
          setNilaiGdr(data.GDR || '0');
          setNilaiBto(data.BTO || '0');
          setNilaiNdr(data.NDR || '0');
        } else {
          setNilaiBor('0');
          setNilaiAvlos('0');
          setNilaiToi('0');
          setNilaiGdr('0');
          setNilaiBto('0');
          setNilaiNdr('0');
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

  const handleStartDateChange = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setStartDate(formattedDate);
    setSelectedFilter('Filter Range Tanggal');
    //setSelectedFilterDetail(`Periode tanggal ${moment(date).format('YYYY-MM-DD')} sampai ${moment(endDate).format('YYYY-MM-DD')}`);
    console.log('Start Date: ', formattedDate);
    if (endDate) {
      fetchStatsDataByRange(formattedDate, endDate);
    }
  };

  const handleEndDateChange = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setEndDate(formattedDate);
    console.log('End Date: ', formattedDate);
    setSelectedFilter('Filter Rentang Tanggal');
    //setSelectedFilterDetail(` Periode tanggal ${moment(startDate).format('YYYY-MM-DD')} sampai ${moment(date).format('YYYY-MM-DD')}`);
    if (startDate) {
      fetchStatsDataByRange(startDate, formattedDate);
    }
  };

  const fetchStatsDataByRange = async (startDate, endDate) => {
    if (!startDate || !endDate) {
      Alert.alert('Error', 'Tanggal mulai dan akhir harus dipilih.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'https://moraya.online/moraya/public/guest/get_range_indicators_ruangan',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            start_date: startDate,
            end_date: endDate,
            ruangan: 'Icu',
          }).toString(),
        },
      );

      const responseText = await response.text();
      console.log('Raw Response:', responseText);

      // Pisahkan JSON jika server mengirim lebih dari satu objek
      const jsonParts = responseText
        .split('}')
        .filter(part => part.trim() !== '')
        .map(part => `${part}}`);

      let dataFound = false;
      let combinedErrorMessage = '';

      for (const jsonPart of jsonParts) {
        try {
          const result = JSON.parse(jsonPart.trim());
          console.log('Parsed JSON:', result);

          // Jika berhasil ditemukan data
          if (result.status === 'success') {
            dataFound = true;
            setNilaiBor(result.BOR || '0');
            setNilaiAvlos(result.AVLOS || '0');
            setNilaiToi(result.TOI || '0');
            setNilaiGdr(result.GDR || '0');
            setNilaiBto(result.BTO || '0');
            setNilaiNdr(result.NDR || '0');
          }

          // Jika data berupa rekap statistik
          else if (!result.status && result.TotalPatientDays) {
            dataFound = true;
            setStatsData(result);
          }

          // Jika status error
          else if (result.status === 'error') {
            // Tangani error missing_rooms
            if (result.status === 'error') {
              // Tangani error missing_rooms
              if (result.missing_rooms) {
                const roomList = result.missing_rooms
                  .map(room => `• ${room}`)
                  .join('\n');
                combinedErrorMessage += `Data belum tersedia untuk ruangan berikut:\n\n${roomList}\n\n`;
              }

              // Tambahkan pesan error umum dari server jika ada
              if (result.message) {
                const isDateList =
                  result.message.includes(',') && result.message.includes('-');
                if (isDateList) {
                  // Ambil semua tanggal sebagai array
                  const allDates = result.message
                    .replace(/^.*?:/, '') // hapus bagian sebelum dan termasuk tanda ':'
                    .split(',')
                    .map(date => `• ${date.trim()}`)
                    .join('\n');

                  combinedErrorMessage += `Data tidak tersedia untuk tanggal di bawah ini:\n\n${allDates}\n\n`;
                } else {
                  combinedErrorMessage += `${result.message}\n`;
                }
              }
            }
          }
        } catch (error) {
          console.error('JSON Parsing Error:', error.message);
        }
      }

      // Jika tidak ditemukan data yang valid
      if (!dataFound) {
        // Reset nilai ke 0
        setNilaiBor('0');
        setNilaiAvlos('0');
        setNilaiToi('0');
        setNilaiGdr('0');
        setNilaiBto('0');
        setNilaiNdr('0');

        // Tampilkan hanya satu alert dengan semua informasi
        Alert.alert(
          'Informasi',
          combinedErrorMessage.trim() !== ''
            ? combinedErrorMessage.trim()
            : 'Data tidak tersedia untuk rentang tanggal yang dipilih.',
        );
      }
    } catch (error) {
      console.error('Fetch Error:', error.message);

      // Reset nilai ke 0 dan tampilkan alert jaringan
      setNilaiBor('0');
      setNilaiAvlos('0');
      setNilaiToi('0');
      setNilaiGdr('0');
      setNilaiBto('0');
      setNilaiNdr('0');

      Alert.alert(
        'Error',
        'Gagal mengambil data. Periksa koneksi internet Anda.',
      );
    } finally {
      setLoading(false);
    }
  };

  // const resetIndicators = () => {
  //   setNilaiBor('0');
  //   setNilaiAvlos('0');
  //   setNilaiToi('0');
  //   setNilaiGdr('0');
  //   setNilaiBto('0');
  //   setNilaiNdr('0');
  // };

  useEffect(() => {
    console.log('State nilai:', {bor, avlos, toi, bto, gdr, ndr});
  }, [bor, avlos, toi, bto, gdr, ndr]);

  const handleMonthChange = value => {
    if (value) {
      setSelectedMonth(value);
      console.log('Bulan yang dipilih: ', value);

      if (!selectedYear) {
        Alert.alert('Pilih Tahun', 'Silakan pilih tahun terlebih dahulu.');
        return;
      }

      const formattedMonth = value.toString().padStart(2, '0');
      setSelectedFilter('Filter Bulanan');

      fetchStatsDataByMonthAndYear(formattedMonth, selectedYear);
    }
  };

  const handleYearChange = year => {
    setSelectedYear(year);

    if (!selectedMonth) {
      Alert.alert('Pilih Bulan', 'Silakan pilih bulan terlebih dahulu.');
      return;
    }

    // Fetch data hanya jika bulan dan tahun sudah dipilih
    fetchStatsDataByMonthAndYear(selectedMonth, year);
  };

  const fetchStatsDataByMonthAndYear = async (month, year, ruangan = 'Icu') => {
    if (!month || !year) {
      Alert.alert('Error', 'Bulan dan tahun harus dipilih.');
      return;
    }

    setLoading(true);
    console.log('Mengirim request dengan bulan, tahun, dan ruangan:', {
      month,
      year,
      ruangan,
    });

    try {
      const response = await fetch(
        'https://moraya.online/moraya/public/guest/get_monthly_indicators_ruangan',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            month: month,
            year: year,
            ruangan: ruangan,
          }).toString(),
        },
      );

      const responseText = await response.text();
      console.log('Response dari server:', responseText);

      if (responseText.startsWith('<')) {
        console.error('Response mengandung HTML, kemungkinan error server.');
        Alert.alert('Error', 'Server mengirimkan HTML, bukan JSON.');
        return;
      }

      try {
        const result = JSON.parse(responseText);
        console.log('Parsed JSON:', result);

        if (result.status === 'success' && result.indicators) {
          const data = result.indicators;

          setNilaiBor(data.BOR || '0');
          setNilaiAvlos(data.AVLOS || '0');
          setNilaiToi(data.TOI || '0');
          setNilaiGdr(data.GDR || '0');
          setNilaiBto(data.BTO || '0');
          setNilaiNdr(data.NDR || '0');
        } else if (result.status === 'error') {
          resetStatsValues();

          // Cek apakah ada properti `missing_dates`
          if (result.missing_dates && Array.isArray(result.missing_dates)) {
            const tanggalList = result.missing_dates
              .map(t => `• ${t}`)
              .join('\n');
            Alert.alert(
              'Tidak Ada Data',
              `${result.message}\n\nTanggal:\n${tanggalList}`,
            );
          } else {
            Alert.alert(
              'Tidak Ada Data',
              result.message || 'Data tidak ditemukan.',
            );
          }
        } else {
          resetStatsValues();
          Alert.alert(
            'Tidak Ada Data',
            'Data tidak tersedia untuk bulan, tahun, dan ruangan ini.',
          );
        }
      } catch (jsonError) {
        console.error('JSON Parse Error:', jsonError.message);
        Alert.alert('Error', 'Respon server tidak valid.');
      }
    } catch (error) {
      console.error('Fetch Error:', error.message);
      resetStatsValues();
      Alert.alert(
        'Error',
        'Gagal mengambil data. Periksa koneksi internet Anda.',
      );
    } finally {
      setLoading(false);
    }
  };

  // Fungsi pembantu untuk reset nilai
  const resetStatsValues = () => {
    setNilaiBor('0');
    setNilaiAvlos('0');
    setNilaiToi('0');
    setNilaiGdr('0');
    setNilaiBto('0');
    setNilaiNdr('0');
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
          <Text style={styles.text}>ICU</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* DATEPICKER STYLE */}
        <View>
          <Text style={styles.text1}>Filter Tanggal Indikator</Text>
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
            <View>
              {[
                {
                  label: 'BOR :',
                  value: bor,
                  standard: '60-85%',
                  icon: 'green',
                  symbol: '%',
                },
                {
                  label: 'AVLOS :',
                  value: avlos,
                  standard: '6-9 Hari',
                  icon: 'green',
                  symbol: ' Hari',
                },
                {
                  label: 'TOI :',
                  value: toi,
                  standard: '1-3 Hari',
                  icon: 'red',
                  symbol: ' Hari',
                },
                {
                  label: 'BTO :',
                  value: bto,
                  standard: '40-50 Kali',
                  icon: 'green',
                  symbol: ' Kali',
                },
                {
                  label: 'GDR :',
                  value: gdr,
                  standard: '< 20 ‰',
                  icon: 'red',
                  symbol: ' ‰',
                },
                {
                  label: 'NDR :',
                  value: ndr,
                  standard: '< 45 ‰',
                  icon: 'red',
                  symbol: ' ‰',
                },
              ].map((row, index) => {
                let icon = '#21B557';
                if (row.standard.includes('-')) {
                  const [min, max] = row.standard
                    .replace(/[^\d\-\.]/g, '')
                    .split('-')
                    .map(item => parseFloat(item));

                  if (
                    parseFloat(row.value) < min ||
                    parseFloat(row.value) > max
                  ) {
                    icon = '#ED1F33';
                  }
                } else if (row.standard.includes('Hari')) {
                  const [min, max] = row.standard
                    .split('-')
                    .map(item => parseFloat(item));
                  if (row.value < min || row.value > max) {
                    icon = '#ED1F33';
                  }
                } else if (
                  row.standard.includes('Kali') ||
                  row.standard.includes('‰')
                ) {
                  const max = parseFloat(row.standard.split(' ')[1]);
                  if (row.value > max) {
                    icon = '#ED1F33';
                  }
                }

                return (
                  <View key={index} style={styles.row}>
                    <Text style={styles.rowLabel}>{row.label}</Text>
                    <Text
                      style={[
                        styles.rowValue,
                        {color: icon === '#ED1F33' ? '#ED1F33' : '#21B557'},
                      ]}>
                      {row.value}
                      {row.symbol}
                    </Text>
                    <Text style={styles.rowStandard}>{row.standard}</Text>
                    <Image
                      style={styles.rowIcon}
                      source={
                        icon === '#ED1F33'
                          ? require('../../../../../assets/tdk-memenuhi.png')
                          : require('../../../../../assets/memenuhi.png')
                      }
                    />
                  </View>
                );
              })}
            </View>
          </View>
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
    left: 62,
    fontFamily: FontFamily.poppinsBold,
  },
  buttonStandar: {
    backgroundColor: '#21B557',
    paddingVertical: dynamicPadding(5),
    paddingHorizontal: dynamicPadding(8),
    borderRadius: 5,
    left: 42,
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
    justifyContent: 'space-between',
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
    marginRight: dynamicPadding(18),
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'center',
    fontSize: dynamicFontSize(13),
    minWidth: 50, // Tetapkan ukuran minimum
  },
  rowStandard: {
    flex: 1,
    marginRight: dynamicPadding(20),
    fontSize: dynamicFontSize(14),
    color: Color.notSoBlack,
    textAlign: 'center',
    fontFamily: FontFamily.poppinsRegular,
  },
  rowIcon: {
    width: 56,
    height: 25,
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

export default StatsIcu;
