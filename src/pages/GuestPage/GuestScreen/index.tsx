import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  BackHandler,
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
  const [selectedFilter, setSelectedFilter] = useState('');

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

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

  useEffect(() => {
    const backAction = () => {
      if (isBottomSheetRuanganVisible) {
        setIsBottomSheetRuanganVisible(false);
        return true;
      }
      if (isBottomSheetIndikatorVisible) {
        setIsBottomSheetIndikatorVisible(false);
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [isBottomSheetRuanganVisible, isBottomSheetIndikatorVisible]);

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const handleDateChange = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    console.log('Selected Date: ', formattedDate);
    setSelectedDate(formattedDate);
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
      tanggal: date,
    });

    try {
      const response = await fetch(
        'https://moraya.online/moraya/public/guest/get_stats_data_rs_daily',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            tanggal: date,
          }).toString(),
        },
      );

      const responseText = await response.text();
      console.log('Response dari server:', responseText);

      // Pisahkan JSON jika double
      const jsonParts = responseText.split('}{').join('}||{').split('||');
      const firstJSON = jsonParts[0];

      let result;
      try {
        result = JSON.parse(firstJSON);
        console.log('Parsed JSON:', result);

        if (result.status === 'success' && result.data) {
          const data = result.data;

          setNilaiBor(data.BOR || '0');
          setNilaiAvlos(data.AVLOS || '0');
          setNilaiToi(data.TOI || '0');
          setNilaiGdr(data.GDR || '0');
          setNilaiBto(data.BTO || '0');
          setNilaiNdr(data.NDR || '0');
        } else if (result.status === 'error' && result.missing_rooms) {
          const roomList = result.missing_rooms
            .map(room => `• ${room}`)
            .join('\n');

          Alert.alert(
            'Tidak Ada Data',
            `Data tidak tersedia atau belum lengkap untuk ruangan berikut pada tanggal yang dipilih:\n\n${roomList}`,
          );

          setNilaiBor('0');
          setNilaiAvlos('0');
          setNilaiToi('0');
          setNilaiGdr('0');
          setNilaiBto('0');
          setNilaiNdr('0');
        } else {
          setNilaiBor('0');
          setNilaiAvlos('0');
          setNilaiToi('0');
          setNilaiGdr('0');
          setNilaiBto('0');
          setNilaiNdr('0');
          Alert.alert(
            'No Data',
            result.message || 'Tidak ada data untuk tanggal ini.',
          );
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

    fetchStatsDataByMonthAndYear(selectedMonth, year);
  };

  const fetchStatsDataByMonthAndYear = async (month, year) => {
    setLoading(true);
    console.log('Mengirim request dengan bulan dan tahun:', {month, year});

    try {
      const response = await fetch(
        'https://moraya.online/moraya/public/guest/get_stats_data_rs_monthly',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            month: month,
            year: year,
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

      // Tangani jika responseText mengandung dua JSON
      const splitJsons = responseText.split('}{').map((chunk, index, arr) => {
        if (arr.length > 1) {
          if (index === 0) {
            return chunk + '}';
          }
          if (index === arr.length - 1) {
            return '{' + chunk;
          }
          return '{' + chunk + '}';
        }
        return chunk;
      });

      let result = JSON.parse(splitJsons[0]); // Pakai JSON pertama
      console.log('Parsed JSON:', result);

      if (result.status === 'success' && result.data) {
        const data = result.data;

        setNilaiBor(data.bor || '0');
        setNilaiAvlos(data.avlos || '0');
        setNilaiToi(data.toi || '0');
        setNilaiGdr(data.gdr || '0');
        setNilaiBto(data.bto || '0');
        setNilaiNdr(data.ndr || '0');
      } else if (result.status === 'error' && result.missing_data) {
        // Data missing per ruangan
        const missingRooms = Object.keys(result.missing_data);
        const roomList = missingRooms.map(room => `• ${room}`).join('\n');

        Alert.alert(
          'Tidak Ada Data',
          `Data tidak tersedia atau belum lengkap untuk ruangan berikut pada bulan yang dipilih:\n\n${roomList}`,
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
        'Gagal mengambil data. Periksa koneksi internet Anda.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStartDateChange = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setStartDate(formattedDate);
    console.log('Start Date: ', formattedDate);
    setSelectedFilter('Filter Rentang Tanggal');
    //setSelectedFilterDetail(`Periode tanggal ${moment(date).format('YYYY-MM-DD')} sampai ${moment(endDate).format('YYYY-MM-DD')}`);
    if (endDate) {
      //setHeaderText(`Filter range tanggal ${moment(formattedDate).format('DD MMM YYYY')} sampai ${moment(endDate).format('DD MMM YYYY')}`);
      fetchStatsDataByRange(formattedDate, endDate); // Call API if both dates are selected
    }
  };

  const handleEndDateChange = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setEndDate(formattedDate);
    console.log('End Date: ', formattedDate);
    setSelectedFilter('Filter Rentang Tanggal');
    //setSelectedFilterDetail(` Periode tanggal ${moment(startDate).format('YYYY-MM-DD')} sampai ${moment(date).format('YYYY-MM-DD')}`);
    if (startDate) {
      // setHeaderText(`Filter range tanggal ${moment(startDate).format('DD MMM YYYY')} sampai ${moment(formattedDate).format('DD MMM YYYY')}`);
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
        'https://moraya.online/moraya/public/guest/get_stats_data_rs_range',
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

      // Cek apakah respons mengandung HTML (indikasi error dari server)
      if (responseText.trim().startsWith('<')) {
        console.error('Response mengandung HTML, ada masalah di server.');
        Alert.alert('Error', 'Server mengembalikan HTML, bukan data.');
        return;
      }

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (jsonErr) {
        console.error('JSON Parsing Error:', jsonErr.message);
        Alert.alert('Error', 'Gagal membaca data dari server.');
        return;
      }

      console.log('Parsed JSON:', result);

      if (result.status === 'success' && result.BOR !== undefined) {
        setNilaiBor(result.BOR.toString());
        setNilaiAvlos(result.AVLOS.toString());
        setNilaiToi(result.TOI.toString());
        setNilaiGdr(result.GDR.toString());
        setNilaiBto(result.BTO.toString());
        setNilaiNdr(result.NDR.toString());
      } else if (result.status === 'error' && result.message) {
        console.warn('Pesan dari server:', result.message);

        // Ambil nama ruangan dari missing_data jika tersedia
        const missingRooms = result.missing_data
          ? Object.keys(result.missing_data)
          : [];

        const roomList = missingRooms.map(room => `• ${room}`).join('\n');

        const finalMessage =
          missingRooms.length > 0
            ? `Data tidak tersedia atau belum lengkap untuk ruangan berikut pada tanggal yang dipilih:\n\n${roomList}`
            : 'Data tidak tersedia untuk tanggal yang dipilih.';

        Alert.alert('Tidak Ada Data', finalMessage);

        // Reset nilai indikator ke '0'
        setNilaiBor('0');
        setNilaiAvlos('0');
        setNilaiToi('0');
        setNilaiGdr('0');
        setNilaiBto('0');
        setNilaiNdr('0');
      } else {
        Alert.alert('Error', 'Format data dari server tidak sesuai.');
      }
    } catch (error) {
      console.error('Fetch Error:', error.message);
      Alert.alert(
        'Error',
        'Gagal mengambil data. Periksa koneksi internet Anda.',
      );
    } finally {
      setLoading(false);
    }
  };

  //const [showDatePickers, setShowDatePickers] = useState(false);

  return (
    <View style={{flex: 1}}>
      <View style={styles.barAtas}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Image
            style={styles.icon2}
            resizeMode="cover"
            source={require('../../../../assets/-icon-arrow-back.png')}
          />
        </Pressable>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Back to login</Text>
        </View>
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
              marginBottom: dynamicPadding(16),
              textAlign: 'center',
            }}>
            Dapatkan informasi terkini tentang Indikator Rumah Sakit
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
  bg: {
    flex: 1,
    justifyContent: 'center',
    height: '55%',
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
    marginTop: dynamicPadding(-210),
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
    marginTop: dynamicPadding(-240),
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
    left: dynamicPadding(46),
    fontFamily: FontFamily.poppinsBold,
  },
  buttonStandar: {
    backgroundColor: '#21B557',
    paddingVertical: dynamicPadding(5),
    paddingHorizontal: dynamicPadding(8),
    borderRadius: 5,
    left: dynamicPadding(33),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    marginTop: dynamicPadding(16),
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
    marginRight: dynamicPadding(20),
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'center',
    fontSize: dynamicFontSize(13),
    minWidth: 50,
    maxWidth: 60,
    flex: 2,
    lineHeight: 16,
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
  headerText: {
    fontSize: 16, // Ukuran teks
    fontWeight: 'bold',
    color: '#000', // Warna teks
    textAlign: 'center', // Posisi teks
    marginBottom: 10, // Jarak dari elemen berikutnya
  },
  icon2: {
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
});

export default ScreenGuest;
