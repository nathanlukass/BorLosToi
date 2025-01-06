import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Pressable,
} from 'react-native';
import {DatePickerr} from '../../../components';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {FontFamily, Color} from '../../../../GlobalStyles';
import moment from 'moment';
import {Alert} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import BottomSheetRuangan from '../../../../components/BottomSheetRuangan';
import BottomSheetIndikator from '../../../../components/BottomSheetIndikator';

const {width, height} = Dimensions.get('window');
const dynamicFontSize = size => (width / 375) * size; // 375 adalah lebar referensi
const dynamicPadding = padding => (height / 667) * padding; // 667 adalah tinggi referensi

const ScreenGuest = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bor, setNilaiBor] = useState('');
  const [avlos, setNilaiAvlos] = useState('');
  const [toi, setNilaiToi] = useState('');
  const [gdr, setNilaiGdr] = useState('');
  const [ndr, setNilaiNdr] = useState('');
  const [bto, setNilaiBto] = useState('');

  const [selectedMonth, setSelectedMonth] = useState('1'); // Default bulan adalah Januari
  const [isBottomSheetRuanganVisible, setIsBottomSheetRuanganVisible] =
    useState(false);
  const [isBottomSheetIndikatorVisible, setIsBottomSheetIndikatorVisible] =
    useState(false);

  const toggleBottomSheetRuangan = () => {
    setIsBottomSheetRuanganVisible(!isBottomSheetRuanganVisible);
  };

  const toggleBottomSheetIndikator = () => {
    setIsBottomSheetIndikatorVisible(!isBottomSheetIndikatorVisible);
  };
  // State untuk tanggal mulai dan tanggal akhir
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const handleDateChange = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    console.log('Selected Date: ', formattedDate);
    setSelectedDate(formattedDate);
    fetchStatsData(formattedDate);
  };

  const fetchStatsData = async date => {
    if (!date) {
      console.error('Tanggal belum dipilih');
      return;
    }

    setLoading(true);
    console.log('Mengirim request dengan data:', {
      tanggal: date,
    });

    try {
      const response = await fetch(
        'https://samratindikator.online/borlostoi/public/insert/get_stats_data_rs',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            tanggal: date, // hanya mengirim tanggal
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

        // Jika status sukses dan ada data, tampilkan data
        if (result.status === 'success' && result.data) {
          const data = result.data; // Mengambil data pertama jika ada
          setNilaiBor(data.BOR || '0');
          setNilaiAvlos(data.AVLOS || '0');
          setNilaiToi(data.TOI || '0');
          setNilaiGdr(data.GDR || '0');
          setNilaiBto(data.BTO || '0');
          setNilaiNdr(data.NDR || '0');
        } else {
          // Jika tidak ada data, set nilai default 0
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
      setLoading(false); // Jangan lupa set loading false setelah request selesai
    }
  };

  const handleMonthChange = value => {
    if (value) {
      const formattedMonth = value.toString().padStart(2, '0'); // Format jadi dua digit
      setSelectedMonth(formattedMonth);
      console.log('Bulan yang dipilih:', formattedMonth);
      fetchStatsDataByMonth(formattedMonth);
    }
  };

  const fetchStatsDataByMonth = async month => {
    try {
      const response = await fetch(
        'https://samratindikator.online/borlostoi/public/insert/get_stats_data_rs_monthly',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({month: month}).toString(),
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
          setNilaiBor(data.bor || '0');
          setNilaiAvlos(data.avlos || '0');
          setNilaiToi(data.toi || '0');
          setNilaiGdr(data.gdr || '0');
          setNilaiBto(data.bto || '0');
          setNilaiNdr(data.ndr || '0');
        } else {
          // Jika tidak ada data, set nilai default 0
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
      setLoading(false); // Jangan lupa set loading false setelah request selesai
    }

    const handleStartDateChange = date => {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      setStartDate(formattedDate);
      console.log('Start Date: ', formattedDate);
      if (endDate) {
        fetchStatsDataByRange(formattedDate, endDate); // Call API if both dates are selected
      }
    };

    const handleEndDateChange = date => {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      setEndDate(formattedDate);
      console.log('End Date: ', formattedDate);
      if (startDate) {
        fetchStatsDataByRange(startDate, formattedDate); // Call API if both dates are selected
      }
    };

    const fetchStatsDataByRange = async (startDate, endDate) => {
      if (!startDate || !endDate) {
        console.error('Tanggal awal dan akhir belum dipilih');
        Alert.alert('Error', 'Tanggal awal dan akhir harus dipilih.');
        return;
      }

      setLoading(true);
      console.log('Mengirim request dengan data:', {
        start_date: startDate,
        end_date: endDate,
      });

      try {
        const response = await fetch(
          'https://samratindikator.online/borlostoi/public/insert/get_stats_rs_range',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              start_date: startDate,
              end_date: endDate,
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

          // Jika status sukses dan ada data, tampilkan data
          if (result.status === 'success' && result.data) {
            const data = result.data; // Data range
            setNilaiBor(data.BOR || '0');
            setNilaiAvlos(data.AVLOS || '0');
            setNilaiToi(data.TOI || '0');
            setNilaiGdr(data.GDR || '0');
            setNilaiBto(data.BTO || '0');
            setNilaiNdr(data.NDR || '0');
          } else {
            // Jika tidak ada data, set nilai default 0
            setNilaiBor('0');
            setNilaiAvlos('0');
            setNilaiToi('0');
            setNilaiGdr('0');
            setNilaiBto('0');
            setNilaiNdr('0');
            Alert.alert('No Data', 'Tidak ada data untuk rentang tanggal ini.');
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
  };

  const handleStartDateChange = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setStartDate(formattedDate);
    console.log('Start Date: ', formattedDate);
    if (endDate) {
      fetchStatsDataByRange(formattedDate, endDate); // Call API if both dates are selected
    }
  };

  const handleEndDateChange = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setEndDate(formattedDate);
    console.log('End Date: ', formattedDate);
    if (startDate) {
      fetchStatsDataByRange(startDate, formattedDate); // Call API if both dates are selected
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
        'https://samratindikator.online/borlostoi/public/insert/get_stats_rs_range',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            start_date: startDate,
            end_date: endDate,
          }).toString(),
        },
      );

      const responseText = await response.text();
      console.log('Raw Response:', responseText);

      const jsonParts = responseText
        .split('}')
        .filter(part => part.trim() !== '')
        .map(part => `${part}}`);

      let dataFound = false; // Menandai apakah ada data yang ditemukan

      for (const jsonPart of jsonParts) {
        try {
          const result = JSON.parse(jsonPart.trim());
          console.log('Parsed JSON:', result);

          if (result.status === 'success') {
            dataFound = true; // Tandai bahwa data ditemukan
            setNilaiBor(result.BOR || '0');
            setNilaiAvlos(result.AVLOS || '0');
            setNilaiToi(result.TOI || '0');
            setNilaiGdr(result.GDR || '0');
            setNilaiBto(result.BTO || '0');
            setNilaiNdr(result.NDR || '0');
          } else if (!result.status && result.TotalPatientDays) {
            dataFound = true; // Tandai bahwa data ditemukan
            setStatsData(result); // Simpan statistik utama
          }
        } catch (error) {
          console.error('JSON Parsing Error:', error.message);
        }
      }

      // Jika tidak ada data yang ditemukan, tampilkan pesan
      if (!dataFound) {
        Alert.alert(
          'No Data',
          'Tidak ada data pada rentang tanggal yang dipilih.',
        );
        setNilaiBor('0');
        setNilaiAvlos('0');
        setNilaiToi('0');
        setNilaiGdr('0');
        setNilaiBto('0');
        setNilaiNdr('0');
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

  const [showDatePickers, setShowDatePickers] = useState(false);

  return (
    <View style={{flex: 1}}>
      <View style={styles.barAtas}>
        <View style={styles.textContainer}>
          <Text style={styles.textt}>Back to login</Text>
        </View>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Image
            style={styles.icon1}
            resizeMode="cover"
            source={require('../../../../assets/-icon-arrow-back.png')}
          />
        </Pressable>
      </View>
      <ImageBackground
        source={require('../../../../assets/rs-picture1.jpg')}
        style={styles.bg}
        resizeMode="cover">
        {/* Kontainer utama */}
        <View style={styles.overlay}>
          <Text style={styles.title}>Selamat Datang</Text>
          <Text
            style={{
              fontFamily: FontFamily.poppinsRegular,
              color: 'white',
              fontSize: dynamicFontSize(12),
              paddingHorizontal: dynamicPadding(10),
              //marginBottom:dynamicPadding(16),
              textAlign: 'center',
            }}>
            Dapatkan informasi terkini tentang BOR, LOS, TOI di setiap ruangan
            dan rumah sakit.
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.cardContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          scrollEnabled={
            !isBottomSheetRuanganVisible && !isBottomSheetIndikatorVisible
          }>
          {/* Konten scrollable */}
          <Text style={[styles.text1, {marginTop: dynamicPadding(8)}]}>
            Filter Kategori
          </Text>
          <View style={[styles.buttonGrid, {marginBottom: dynamicPadding(40)}]}>
            <TouchableOpacity
              style={[styles.cardBtn, {marginBottom: 8}]}
              onPress={toggleBottomSheetRuangan}>
              <Image
                source={require('../../../../assets/room.png')}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.text2,
                  {marginTop: dynamicPadding(4)},
                  {textAlign: 'center'},
                ]}>
                Filter Ruangan
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.cardBtn]}
              onPress={toggleBottomSheetIndikator}>
              <Image
                source={require('../../../../assets/indicator.png')} // Pastikan path ke ikon benar
                style={styles.icon}
              />
              <Text
                style={[
                  styles.text2,
                  {marginTop: dynamicPadding(4)},
                  {textAlign: 'center'},
                ]}>
                Filter Indikator
              </Text>
            </TouchableOpacity>

            {/* <Text style={styles.text}>Konten lainnya di sini</Text> */}
          </View>
          <View>
            <Text style={[styles.text1, {marginTop: dynamicPadding(-30)}]}>
              Indikator Rumah Sakit{' '}
            </Text>
            <Text style={[styles.text2, {marginTop: dynamicPadding(-12)}]}>
              Pilih tanggal{' '}
            </Text>
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
              Tentukan periode waktu untuk menampilkan Indikator Rumah Sakit{' '}
            </Text>
          </View>

          <View
            style={{
              marginTop: dynamicPadding(4),
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
                <DatePickerr onDateChange={handleStartDateChange} />
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
                <DatePickerr onDateChange={handleEndDateChange} />
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
                style={{
                  inputAndroid: {
                    alignItems: 'center',
                    color: Color.notSoBlack,
                  },
                  inputIOS: {
                    alignItems: 'center',
                    color: 'white',
                  },
                }}
                value={selectedMonth}
                placeholder={{
                  label: 'Select a month...',
                  value: null,
                  color: Color.notSoBlack,
                }}
              />
            </View>
          </View>

          <View style={styles.container2}>
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
                          ? require('../../../../assets/tdk-memenuhi.png') // Path to red icon
                          : require('../../../../assets/memenuhi.png') // Path to green icon
                      }
                    />
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
      <BottomSheetRuangan
        isVisible={isBottomSheetRuanganVisible}
        onClose={() => setIsBottomSheetRuanganVisible(false)}
      />
      <BottomSheetIndikator
        isVisible={isBottomSheetIndikatorVisible}
        onClose={() => setIsBottomSheetIndikatorVisible(false)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    width: 45,
    height: 45,
    justifyContent: 'center',
    zIndex: 20,
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
  bg: {
    flex: 1,
    justifyContent: 'center',
    height: '80%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: dynamicFontSize(24),
    color: 'white',
    marginTop: dynamicPadding(-150),
    fontFamily: FontFamily.poppinsMedium,
  },
  scrollContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Color.schemesOnPrimary,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    elevation: 4,
    marginTop: dynamicPadding(-200),
    flex: 1,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-evenly',
    width: '90%',
    alignSelf: 'center',
    gap: dynamicPadding(24),
  },
  cardBtn: {
    padding: dynamicPadding(12),
    backgroundColor: Color.schemesOnPrimary,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 1,
    borderRadius: dynamicPadding(4),
    overflow: 'visible',
    width: '45%',
    height: dynamicPadding(100),
  },
  text2: {
    fontSize: dynamicFontSize(14),
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsMedium,
  },
  text1: {
    fontSize: dynamicFontSize(16),
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsMedium,
    marginBottom: dynamicPadding(16),
    marginTop: dynamicPadding(16),
  },
  filterButton: {
    backgroundColor: Color.colorMediumaquamarine,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 2,
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
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
    marginRight: dynamicPadding(14),
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'center',
    fontSize: dynamicFontSize(13),
  },
  rowStandard: {
    flex: 1,
    fontSize: dynamicFontSize(14),
    color: Color.notSoBlack,
    textAlign: 'center',
    fontFamily: FontFamily.poppinsRegular,
  },
  rowIcon: {
    width: 55,
    height: 26,
  },
  text: {
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    fontSize: dynamicFontSize(16),
    textAlign: 'center',
  },
  icon: {
    width: 35,
    height: 35,
    marginVertical: dynamicPadding(8),
    alignSelf: 'center',
  },
  icon1: {
    width: 45,
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
  textt: {
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    fontSize: dynamicFontSize(18),
    textAlign: 'center',
  },
});

export default ScreenGuest;
