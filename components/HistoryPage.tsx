import * as React from "react";
import { StyleSheet, View, Text, Dimensions, Alert, ActivityIndicator, RefreshControl, ScrollView, TouchableOpacity} from "react-native";
import { Color, FontFamily, } from "../GlobalStyles";
import moment from "moment";
import { useState, useEffect } from "react";

const { width, height } = Dimensions.get("window");
const dynamicFontSize = (size) => (width / 375) * size; // 375 adalah lebar referensi
const dynamicPadding = (padding) => (height / 667) * padding; // 667 adalah tinggi referensi

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
  created_at: string;
}

const HistoryPage = ({ ruangan }: HistoryPageProps) => {
  const [data, setData] = useState<HistoryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const cleanString = (input) => {
    return input
      .normalize("NFKC") // Normalisasi Unicode
      .replace(/\s+/g, " ") // Ganti semua spasi (termasuk non-breaking space) dengan spasi tunggal
      .trim();
  };
  
  const fetchData = async () => {
    const sanitizedRuangan = cleanString(ruangan);
    console.log("Ruangan setelah sanitasi:", sanitizedRuangan); // Debug log
    
    const validRooms = ["Mujair A", "Mujair B", "Mujair C", "Karper", "Neonati", "Bomboya", "Nike", "Icu", "Payangka"];
    console.log("Ruangan yang valid:", validRooms);
    if (!validRooms.includes(sanitizedRuangan)) {
      Alert.alert(
        "Ruangan Tidak Valid",
        "Ruangan yang dipilih tidak tersedia. Silakan pilih ruangan yang valid."
      );
      return;
    }
    console.log("Ruangan yang dikirim ke API:", sanitizedRuangan); // Debug log
  
    setLoading(true);
    try {
      const response = await fetch(
        "https://samratindikator.online/borlostoi/public/insert/get_input_data",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            tanggal: moment(new Date()).format("YYYY-MM-DD"),
            ruangan: sanitizedRuangan,
            
          }).toString(),
        }
      );
  
      const result = await response.json();
    console.log("API Response:", result); // Debug log

    if (result.status === "success" && result.data) {
      console.log("Data berhasil di-set:", result.data);
      setData(result.data); // Set data ke state
    } else {
      Alert.alert("Data Tidak Ditemukan", "Belum ada data yang diinputkan untuk hari ini.");
      setData(null);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    Alert.alert("Terjadi kesalahan", "Gagal mengambil data.");
  } finally {
    setLoading(false);
  }
};
  

  useEffect(() => {
    if (ruangan) {
      fetchData();
    }
  }, [ruangan]);

  const handleRefreshButton = async () => {
    await fetchData(); 
   
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#1E9DEC" />;
  }

  return (
    <ScrollView
    >
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
           <Text style={styles.number}>{data.pasien_dipindahkan || 0}</Text>
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
         <Text style={styles.number}>{data.pasien_kurang_dari_48jam || 0}</Text>
         </View>
         <View style={styles.row}>
           <Text style={styles.label}>Pasien lebih 48 jam :</Text>
           <Text style={styles.number}>{data.pasien_lebih_dari_48jam || 0}</Text>
         </View>
         <View style={styles.row}>
           <Text style={styles.label}>Pasien masih dirawat :</Text>
           <Text style={styles.number}>{data.pasien_masih_dirawat || 0}</Text>
         </View>
         <View style={styles.row}>
           <Text style={styles.label}>Pasien lama dirawat :</Text>
           <Text style={styles.number}>{data.pasien_lama_dirawat || 0}</Text>
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
          Diperbarui{" "}
          {data?.created_at
            ? moment(data.created_at).format("ddd, DD MMM YYYY [pukul] HH:mm")
            : moment(new Date()).format("ddd, DD MMM YYYY [pukul] HH:mm")}{" "}
          WITA
        </Text>
            </>
          ) : (
            <Text style={styles.noDataText}>Tidak ada data untuk ruangan ini</Text>
          )}
          <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleRefreshButton} style={styles.button}>
            <Text style={styles.buttonText}>Refresh Data</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
wrapper :{
  flex: 1,
  padding: 8,
},
noDataText: { fontSize: dynamicFontSize(16), textAlign: "center", color: "#999" },
container: {
  padding: dynamicPadding(16),
  backgroundColor: Color.schemesOnPrimary,
  shadowColor: '#000', 
  shadowOffset: { width: 0, height: -2 }, 
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
    textAlign: "center",
    marginTop:dynamicPadding(8),
    marginBottom: dynamicPadding(16),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: dynamicPadding(16),
  },
  label: {
    left:8,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: dynamicFontSize(14),
    color: Color.notSoBlack,
    flex: 1,
    },
    number: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: dynamicFontSize(14),
    color: Color.notSoBlack,
    textAlign: "center",
    minWidth: dynamicFontSize(40),
    },
    updatedText: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: dynamicFontSize(12),
    color: "green",
    textAlign: "center",
    marginTop: dynamicPadding(8),
    marginBottom: dynamicPadding(8)
    },
    buttonContainer: {
      marginTop: 8,
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
})

export default HistoryPage;
