import React, {useState} from 'react';
import {Image, StyleSheet, Text, View, Pressable, ScrollView, TouchableOpacity} from 'react-native';
import {DatePickerr, FilterCheckBox} from '../../components';
import Stats1 from '../../../components/Stats1';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {
  FontSize,
  FontFamily,
  Color,
  Padding,
  Border,
} from '../../../GlobalStyles';
import moment from 'moment';
import {Alert} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
const ScreenGuest = () => {
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

  const [selectedMonth, setSelectedMonth] = useState('1'); // Default bulan adalah Januari

  // State untuk tanggal mulai dan tanggal akhir
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const datePickerStyle1 = {
    top: '50%',
  };

  const datePickerStyle2 = {
    top: '21%',
    display: isFilterChecked ? 'flex' : 'none', // Show or hide based on checkbox state
  };

  const datePickerStyle3 = {
    top: '-25%',
    display: isFilterChecked ? 'flex' : 'none', // Show or hide based on checkbox state
  };

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
    <View style={styles.screenGuest}>
      {/* Bar Atas */}
      <View style={[styles.barAtas]}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Image
            resizeMode="cover"
            source={require('../../../assets/-icon-arrow-back.png')}
          />
        </Pressable>
        <Text style={styles.backToLogin}>Back to login page</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <DatePickerr
          style={styles.datePickerStyle1}
          onDateChange={handleDateChange}
        />
        <View style={styles.filterSection}>
          <FilterCheckBox
            isChecked={isFilterChecked}
            onChange={() => {
              setIsFilterChecked(!isFilterChecked);
              setShowDatePickers(!isFilterChecked); // Toggle DatePickers visibility
            }}
          />
        </View>

        {/* Conditional DatePickers */}
        {showDatePickers && (
          <>
            <DatePickerr
              style={styles.datePickerStyle2}
              onDateChange={handleStartDateChange}
              placeholder="Pilih Tanggal Mulai"
            />
            <DatePickerr
              style={styles.datePickerStyle3}
              onDateChange={handleEndDateChange}
              placeholder="Pilih Tanggal Akhir"
            />
          </>
        )}

        {/* Dropdown Pilih Bulan */}
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
            style={pickerStyles}
            value={selectedMonth}
            placeholder={{
              label: 'Select a month...',
              value: null,
              color: 'gray',
            }}
          />
        </View>

        {/* Table with Headers */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>HASIL</Text>
            <Text style={styles.headerText}>STANDAR</Text>
            <Text style={styles.headerText}>KET</Text>
          </View>
          {[ 
            {label: 'BOR :', value: bor, standard: '60-85%', symbol: '%'},
            {label: 'AVLOS :', value: avlos, standard: '6-9 Hari', symbol: ' Hari'},
            {label: 'TOI :', value: toi, standard: '1-3 Hari', symbol: ' Hari'},
            {label: 'BTO :', value: bto, standard: '40-50 Kali', symbol: ' Kali'},
            {label: 'GDR :', value: gdr, standard: '< 20 ‰', symbol: ' ‰'},
            {label: 'NDR :', value: ndr, standard: '< 45 ‰', symbol: ' ‰'},
          ].map((row, index) => {
            const icon = row.value >= 60 ? 'green' : 'red'; // Example logic
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
                      ? require('../../../assets/red.png')
                      : require('../../../assets/green.png')
                  }
                />
              </View>
              
            );
          })}
          {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => navigation.navigate('BORAVLOSTOIBTONDRGDR')}>
            <Text style={styles.filterButtonText}>Filter by Indicator</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => navigation.navigate('BorlostoiRuangan')}>
            <Text style={styles.filterButtonText}>Filter by Ruangan</Text>
          </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  filterButton: {
    backgroundColor: Color.colorMediumaquamarine,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 2,
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  screenGuest: {
    flex: 1,
    backgroundColor: Color.schemesOnPrimary,
  },
  scrollContent: {
    padding: 16,
  },
  filterSection: {
    marginVertical: 75,
    marginBottom: -50,
  },
  container1: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  label: {
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableContainer: {
    marginVertical: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  rowLabel: {
    flex: 1,
    fontWeight: 'bold',
  },
  rowStandard: {
    flex: 1,
    textAlign: 'center',
  },
  rowValue: {
    flex: 1,
  },
  rowIcon: {
    width: 20,
    height: 20,
    marginLeft: 8,
  },
  backButton: {
    position: 'absolute',
    left: -1,
    top: '50%',
    transform: [{translateY: -12.5}],
  },
  barAtas: {
    elevation: 3,
    width: '100%',
    height: 60,
    backgroundColor: Color.schemesOnPrimary,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backToLogin: {
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    textAlign: 'center',
    fontSize: 18,
    position: 'absolute',
    top: '40%',
    transform: [{translateY: -8}],
    zIndex: 1,
  },
});

const pickerStyles = {
  inputAndroid: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
};

export default ScreenGuest;