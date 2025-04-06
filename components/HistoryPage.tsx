import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Alert,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Color, FontFamily} from '../GlobalStyles';
import moment from 'moment';
import {useState, useEffect} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const dynamicFontSize = size => (width / 375) * size;
const dynamicPadding = padding => (height / 667) * padding;

interface HistoryPageProps {
  ruangan: string;
}

interface HistoryData {
  pasien_awal: string;
  pasien_masuk: string;
  pasien_pindahan: string;
  pasien_dipindahkan: string;
  pasien_hidup: string;
  pasien_rujuk: string;
  pasien_aps: string;
  pasien_lain_lain: string;
  pasien_kurang_dari_48jam: string;
  pasien_lebih_dari_48jam: string;
  pasien_masih_dirawat: string;
  pasien_lama_dirawat: string;
  banyak_pasien: string;
  jumlah_hari_perawatan: string;
  kelas_1: string;
  kelas_2: string;
  kelas_3: string;
  tanggal: string;
  updated_at: string;
}

const HistoryPage = () => {
  const route = useRoute();
  const {user} = route.params as {user: any};
  const ruangan = user?.ruangan;

  const [data, setData] = useState<HistoryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const formattedDate = moment().format('YYYY-MM-DD');

  const cleanString = input => {
    return input.normalize('NFKC').replace(/\s+/g, ' ').trim();
  };

  const handleRefreshButton = async () => {
    console.log(route.params);
    await fetchData();
  };

  useEffect(() => {
    console.log('Params dari route:', route.params);
    fetchData();
  }, []);

  const fetchData = async () => {
    const sanitizedRuangan = cleanString(ruangan);
    console.log('🧼 Ruangan setelah sanitasi:', sanitizedRuangan);
    console.log('📅 Tanggal:', formattedDate);
    console.log('👤 User ID:', user?.user_id);

    const validRooms = [
      'Mujair A',
      'Mujair B',
      'Mujair C',
      'Karper',
      'Neonati',
      'Bomboya',
      'Nike',
      'Icu',
      'Payangka',
    ];

    if (!validRooms.includes(sanitizedRuangan)) {
      Alert.alert(
        'Ruangan Tidak Valid',
        'Ruangan yang dipilih tidak tersedia. Silakan pilih ruangan yang valid.',
      );
      return;
    }

    setLoading(true);
    try {
      const body = new URLSearchParams({
        date: formattedDate,
        ruangan: sanitizedRuangan,
        user_id: user.user_id,
      }).toString();

      console.log('📦 Payload yang dikirim ke API:', body);

      const response = await fetch(
        'https://moraya.online/moraya/public/nurse/get_input_data',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body,
        },
      );

      const result = await response.json();
      console.log('📥 Respon dari API:', result);

      if (
        result.status === 'success' &&
        Array.isArray(result.data) &&
        result.data.length > 0
      ) {
        setData(result.data[0]);
      } else {
        console.warn('⚠️ Tidak ada data yang dikembalikan:', result.message);
        Alert.alert(
          'Data Tidak Ditemukan',
          'Belum ada data yang diinputkan untuk hari ini.',
        );
        setData(null);
      }
    } catch (error) {
      console.error('❌ Error saat fetch data:', error);
      Alert.alert('Terjadi kesalahan', 'Gagal mengambil data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.header}>Hari ini</Text>
          {data ? (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>Pasien awal :</Text>
                <Text style={styles.number}>{data.pasien_awal || 0}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Pasien masuk :</Text>
                <Text style={styles.number}>{data.pasien_masuk || 0}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Pasien pindahan :</Text>
                <Text style={styles.number}>{data.pasien_pindahan || 0}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Pasien dipindahkan :</Text>
                <Text style={styles.number}>
                  {data.pasien_dipindahkan || 0}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Pasien hidup :</Text>
                <Text style={styles.number}>{data.pasien_hidup || 0}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Pasien rujuk :</Text>
                <Text style={styles.number}>{data.pasien_rujuk || 0}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Pasien APS :</Text>
                <Text style={styles.number}>{data.pasien_aps || 0}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Pasien lain-lain :</Text>
                <Text style={styles.number}>{data.pasien_lain_lain || 0}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Pasien kurang 48 jam :</Text>
                <Text style={styles.number}>
                  {data.pasien_kurang_dari_48jam || 0}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Pasien lebih 48 jam :</Text>
                <Text style={styles.number}>
                  {data.pasien_lebih_dari_48jam || 0}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Pasien masih dirawat :</Text>
                <Text style={styles.number}>
                  {data.pasien_masih_dirawat || 0}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Pasien lama dirawat :</Text>
                <Text style={styles.number}>
                  {data.pasien_lama_dirawat || 0}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Jumlah pasien :</Text>
                <Text style={styles.number}>{data.banyak_pasien || 0}</Text>
              </View>
              {/* <View style={styles.row}>
           <Text style={styles.label}>Jumlah hari :</Text>
           <Text style={styles.number}>{data.jumlah_hari_perawatan}</Text>
         </View> */}
              <View style={styles.row}>
                <Text style={styles.label}>Kelas 1 :</Text>
                <Text style={styles.number}>{data.kelas_1 || 0}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Kelas 2 :</Text>
                <Text style={styles.number}>{data.kelas_2 || 0}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Kelas 3 :</Text>
                <Text style={styles.number}>{data.kelas_3 || 0}</Text>
              </View>

              <Text style={styles.updatedText}>
                Diperbarui{' '}
                {data?.updated_at
                  ? moment(data.updated_at).format(
                      'ddd, DD MMM YYYY [pukul] HH:mm',
                    )
                  : moment(new Date()).format(
                      'ddd, DD MMM YYYY [pukul] HH:mm',
                    )}{' '}
                WITA
              </Text>
            </>
          ) : (
            <Text style={styles.noDataText}>
              Tidak ada data untuk ruangan ini
            </Text>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleRefreshButton}
              style={styles.button}>
              <Text style={styles.buttonText}>Refresh Data</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 8,
  },
  noDataText: {
    fontSize: dynamicFontSize(14),
    textAlign: 'center',
    color: '#999',
    fontFamily: FontFamily.poppinsRegular,
  },
  container: {
    padding: dynamicPadding(16),
    backgroundColor: Color.schemesOnPrimary,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 1,
    marginHorizontal: dynamicPadding(-5),
    borderRadius: dynamicPadding(8),
    overflow: 'visible',
  },
  header: {
    fontFamily: FontFamily.poppinsMedium,
    fontSize: dynamicFontSize(15),
    color: Color.notSoBlack,
    textAlign: 'center',
    marginTop: dynamicPadding(8),
    marginBottom: dynamicPadding(16),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: dynamicPadding(16),
  },
  label: {
    left: 8,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: dynamicFontSize(14),
    color: Color.notSoBlack,
    flex: 1,
  },
  number: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: dynamicFontSize(14),
    color: Color.notSoBlack,
    textAlign: 'center',
    minWidth: dynamicFontSize(40),
  },
  updatedText: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: dynamicFontSize(12),
    color: 'green',
    textAlign: 'center',
    marginTop: dynamicPadding(8),
    marginBottom: dynamicPadding(8),
  },
  buttonContainer: {
    marginTop: dynamicPadding(16),
  },
  buttonText: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: dynamicFontSize(14),
    color: '#FFF',
    textTransform: 'none',
  },
  button: {
    backgroundColor: '#1E9DEC',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default HistoryPage;
