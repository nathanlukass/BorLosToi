import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
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

const StatsNike = () => {
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

  const datePickerStyle1 = {
    top: '27%',
  };

  const datePickerStyle2 = {
    top: '-35%',
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

    setLoading(true);
    console.log('Mengirim request dengan data:', {
      date: date,
      ruangan: 'Nike',
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
            ruangan: 'Nike',
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

        if (result.status === 'success' && result.data) {
          const data = result.data;
          setNilaiBor(data.BOR || '0');
          setNilaiAvlos(data.AVLOS || '0');
          setNilaiToi(data.TOI || '0');
          setNilaiGdr(data.GDR || '0');
          setNilaiBto(data.BTO || '0');
          setNilaiNdr(data.NDR || '0');
        } else {
          Alert.alert('Error', result.message || 'No data found.');
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
      <View style={styles.groupParent}>
        <FilterCheckBox
          isChecked={isFilterChecked}
          onChange={() => setIsFilterChecked(!isFilterChecked)}
        />
      </View>

      {/* Lihat Button */}
      <Pressable
        style={[styles.okButton, styles.filterShadowBox]}
        onPress={() => console.log('OK Button Pressed')}>
        <Text style={[styles.okButtonText, styles.filterTypo]}>Lihat</Text>
      </Pressable>

      <Image
        style={[styles.vectorIcon, styles.vectorIconPosition]}
        resizeMode="cover"
        source={require('../../../../assets/vector.png')}
      />

      {/* Conditionally render second DatePicker based on checkbox */}
      <DatePickerr style={datePickerStyle2} onDateChange={handleDateChange} />

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
          Nike
        </Text>
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
            {label: 'BOR :', value: bor, standard: '60-85%', icon: 'green'},
            {
              label: 'AVLOS :',
              value: avlos,
              standard: '6-9 Hari',
              icon: 'green',
            },
            {label: 'TOI :', value: toi, standard: '1-3 Hari', icon: 'red'},
            {label: 'BTO :', value: bto, standard: '40-50 Kali', icon: 'green'},
            {label: 'GDR :', value: gdr, standard: '< 20 ‰', icon: 'red'},
            {label: 'NDR :', value: ndr, standard: '< 45 ‰', icon: 'red'},
          ].map((row, index) => {
            // Logic to check if the value is within the standard range
            let icon = 'green'; // Default to green
            if (row.standard.includes('%')) {
              const [min, max] = row.standard
                .split('-')
                .map(item => parseFloat(item));
              if (row.value < min || row.value > max) {
                icon = 'red'; // If the value is outside the range, use red
              }
            } else if (row.standard.includes('Hari')) {
              const [min, max] = row.standard
                .split('-')
                .map(item => parseFloat(item));
              if (row.value < min || row.value > max) {
                icon = 'red'; // If the value is outside the range, use red
              }
            }
            if (row.standard.includes('-')) {
              const [min, max] = row.standard
                .split('-')
                .map(item => parseFloat(item));
              if (row.value < min || row.value > max) {
                icon = 'red'; // Set ke merah jika di luar rentang
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
                <Text style={styles.rowValue}>{row.value}</Text>
                <Image
                  style={styles.rowIcon}
                  source={
                    icon === 'red'
                      ? require('../../../../assets/red.png') // Path ke ikon merah
                      : require('../../../../assets/green.png') // Path ke ikon hijau
                  }
                />
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    bottom: 230,
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
    marginTop: 16,
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
});

export default StatsNike;
