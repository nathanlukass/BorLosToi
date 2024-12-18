import React, {useState} from 'react';
import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
import {DatePickerr, FilterCheckBox} from '../../../components';
import Stats1 from '../../../../components/Stats1';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {
  FontSize,
  FontFamily,
  Color,
  Padding,
  Border,
} from '../../../../GlobalStyles';
import {Gap} from '../../../../src/components';
import moment from 'moment';
import {Alert} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {useEffect} from 'react';

const StatsNeonati = () => {
  const [isFilterChecked, setIsFilterChecked] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bor, setNilaiBor] = useState('');
  const [avlos, setNilaiAvlos] = useState('');
  const [toi, setNilaiToi] = useState('');
  const [gdr, setNilaiGdr] = useState('');
  const [ndr, setNilaiNdr] = useState('');
  const [bto, setNilaiBto] = useState('');

  useEffect(() => {
    console.log('State updated:', {bor, avlos, toi, gdr, bto, ndr});
  }, [bor, avlos, toi, gdr, bto, ndr]);

  const [selectedMonth, setSelectedMonth] = useState('1'); // Default bulan adalah Januari

  // State untuk tanggal mulai dan tanggal akhir
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const datePickerStyle1 = {
    top: '55%',
  };

  const datePickerStyle2 = {
    top: '35%',
    display: isFilterChecked ? 'flex' : 'none', // Show or hide based on checkbox state
  };

  const datePickerStyle3 = {
    top: '-10%',
    display: isFilterChecked ? 'flex' : 'none', // Show or hide based on checkbox state
  };
  // const datePickerStyle3 = {
  //   top: '-17%',
  //   display: isFilterChecked ? 'flex' : 'none',
  // };

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const handleDateChange = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
    console.log('Selected Date: ', formattedDate);
    fetchStatsData(formattedDate);
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
        'https://samratindikator.online/borlostoi/public/insert/get_stats_ruangan_range',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            start_date: startDate,
            end_date: endDate,
            ruangan: 'Neonati',
          }).toString(),
        },
      );

      const responseText = await response.text();
      console.log('Raw Response:', responseText);

      const jsonParts = responseText
        .split('}')
        .filter(part => part.trim() !== '')
        .map(part => `${part}}`);

      let dataFound = false; // Flag untuk cek apakah ada data berhasil diparsing

      for (const jsonPart of jsonParts) {
        try {
          const result = JSON.parse(jsonPart.trim());
          console.log('Parsed JSON:', result);

          // Jika data ditemukan
          if (result.status === 'success') {
            dataFound = true;
            setNilaiBor(result.BOR || '0');
            setNilaiAvlos(result.AVLOS || '0');
            setNilaiToi(result.TOI || '0');
            setNilaiGdr(result.GDR || '0');
            setNilaiBto(result.BTO || '0');
            setNilaiNdr(result.NDR || '0');
          } else if (!result.status && result.TotalPatientDays) {
            dataFound = true;
            setStatsData(result); // Simpan statistik utama
          }
        } catch (error) {
          console.error('JSON Parsing Error:', error.message);
        }
      }

      // Jika tidak ada data ditemukan
      if (!dataFound) {
        setNilaiBor('0');
        setNilaiAvlos('0');
        setNilaiToi('0');
        setNilaiGdr('0');
        setNilaiBto('0');
        setNilaiNdr('0');
        Alert.alert(
          'No Data',
          'Data tidak tersedia untuk rentang tanggal yang dipilih.',
        );
      }
    } catch (error) {
      console.error('Fetch Error:', error.message);
      Alert.alert(
        'Error',
        'Failed to fetch data. Please check your network connection.',
      );
      setNilaiBor('0');
      setNilaiAvlos('0');
      setNilaiToi('0');
      setNilaiGdr('0');
      setNilaiBto('0');
      setNilaiNdr('0');
    } finally {
      setLoading(false);
    }
  };

  const fetchStatsData = async date => {
    if (!date) {
      console.error('Tanggal belum dipilih');
      return;
    }

    setLoading(true);
    console.log('Mengirim request dengan data:', {
      date: date,
      ruangan: 'Neonati',
    });

    try {
      const response = await fetch(
        'https://samratindikator.online/borlostoi/public/insert/get_stats_data',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            tanggal: date,
            ruangan: 'Neonati',
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

        if (result.status === 'success' && result.data) {
          const data = result.data;
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

  useEffect(() => {
    console.log('State nilai:', {bor, avlos, toi, bto, gdr, ndr});
  }, [bor, avlos, toi, bto, gdr, ndr]);

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
        'https://samratindikator.online/borlostoi/public/insert/get_stats_data_monthly',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            month: month, // Parameter bulan
            ruangan: 'Neonati', // Parameter ruangan
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
  };

  return (
    <View style={styles.screenGuest}>
      {/* First DatePicker */}
      <DatePickerr style={datePickerStyle1} onDateChange={handleDateChange} />
      {/* <DatePickerr onDateChange={handleStartDateChange} />
      <DatePickerr
        onDateChange={handleEndDateChange}
        style={styles.datePickerStyle2}
      /> */}
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
        onDateChange={handleStartDateChange}
        placeholder="Pilih Tanggal Mulai"
      />
      <DatePickerr
        style={datePickerStyle3}
        onDateChange={handleEndDateChange}
        placeholder="Pilih Tanggal Akhir"
      />

      {/* Navigation Bar */}
      <View style={[styles.barAtas, styles.filterShadowBox]}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('BorlostoiRuangan')}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require('../../../../assets/-icon-arrow-back.png')}
          />
        </Pressable>
        <Text style={[styles.backToLogin, styles.vectorIconPosition]}>
          Neonati
        </Text>
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
            // Logic to check if the value is within the standard range
            let icon = 'green'; // Default to green
            if (row.standard.includes('-')) {
              const [min, max] = row.standard
                .replace(/[^\d\-\.]/g, '') // Remove non-numeric text
                .split('-')
                .map(item => parseFloat(item));

              if (parseFloat(row.value) < min || parseFloat(row.value) > max) {
                icon = 'red'; // Out of range
              }
            } else if (row.standard.includes('Hari')) {
              const [min, max] = row.standard
                .split('-')
                .map(item => parseFloat(item));
              if (row.value < min || row.value > max) {
                icon = 'red'; // If the value is outside the range, use red
              }
            } else if (
              row.standard.includes('Kali') ||
              row.standard.includes('‰')
            ) {
              const max = parseFloat(row.standard.split(' ')[1]);
              if (row.value > max) {
                icon = 'red'; // If the value exceeds the max standard, use red
              }
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
                      ? require('../../../../assets/red.png') // Path to red icon
                      : require('../../../../assets/green.png') // Path to green icon
                  }
                />
              </View>
            );
          })}
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <Image
                source={require('../../../../assets/green.png')} // Green icon
                style={styles.legendIcon}
              />
              <Text style={styles.legendText}>Memenuhi standar</Text>
            </View>
            <View style={styles.legendItem}>
              <Image
                source={require('../../../../assets/red.png')} // Red icon
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
    marginTop: 20, // Jarak dari tabel
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
    bottom: 300,
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
    left: 70,
  },
  buttonStandar: {
    backgroundColor: '#2E7D32',
    paddingVertical: 8,
    paddingHorizontal: 11,
    borderRadius: 8,
    left: 40,
  },
  buttonKet: {
    backgroundColor: '#2E7D32',
    paddingVertical: 8,
    paddingHorizontal: 11,
    borderRadius: 8,
    left: 10,
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
    left: 20,
  },
  rowStandard: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    left: 60,
  },
  rowValue: {
    flex: 1,
    fontSize: 16,
    color: 'black', // Warna hijau gelap untuk nilai
    textAlign: 'center',
    fontWeight: 'bold',
    left: -160,
  },
  rowIcon: {
    flex: 0.2,
    width: 20,
    height: 20,
    resizeMode: 'contain',
    left: -30,
  },
  container1: {
    flex: 1,
    padding: 106,
    backgroundColor: 'white',
    top: -70,
  },
  label: {
    fontSize: 21,
    fontWeight: 'bold',
    top: -100,
    alignSelf: 'center',
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

export default StatsNeonati;
