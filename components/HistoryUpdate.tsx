import * as React from "react";
import { StyleSheet, View, Text, Dimensions, Alert, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import moment from "moment";
import { Color, FontFamily } from "../GlobalStyles";

const { width, height } = Dimensions.get("window");
const dynamicFontSize = (size) => (width / 375) * size; // 375 adalah lebar referensi
const dynamicPadding = (padding) => (height / 667) * padding; // 667 adalah tinggi referensi

interface HistoryUpdateProps {
  updatedRooms: string[]; // List of updated rooms (for example: ["Mujair A", "Mujair B"])
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

const HistoryUpdate = ({ updatedRooms }: HistoryUpdateProps) => {
  const [data, setData] = useState<HistoryData[]>([]); // Array of data for multiple rooms
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (room: string) => {
    const sanitizedRoom = room.trim();
    const validRooms = ["Mujair A", "Mujair B", "Mujair C", "Karper", "Neonati", "Bomboya", "Nike", "Icu", "Payangka"];

    if (!validRooms.includes(sanitizedRoom)) {
      Alert.alert("Ruangan Tidak Valid", "Ruangan yang dipilih tidak tersedia.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://samratindikator.online/borlostoi/public/insert/get_input_data",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            tanggal: moment(new Date()).format("YYYY-MM-DD"),
            ruangan: sanitizedRoom,
          }).toString(),
        }
      );

      const result = await response.json();

      if (result.status === "success" && result.data) {
        setData((prevData) => [...prevData, result.data]); // Add new room data to the existing list
      } else {
        Alert.alert("Data Tidak Ditemukan", "Belum ada data untuk ruangan ini.");
      }
    } catch (error) {
      Alert.alert("Terjadi Kesalahan", "Gagal mengambil data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updatedRooms.forEach((room) => {
      fetchData(room); // Fetch data for each updated room
    });
  }, [updatedRooms]);

  const handleRefreshButton = async () => {
    setData([]); // Reset data before re-fetching
    updatedRooms.forEach((room) => {
      fetchData(room); // Re-fetch data for each updated room
    });
    Alert.alert("Data Diperbarui", "Data terbaru telah dimuat.");
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#1E9DEC" />;
  }

  return (
    <ScrollView style={styles.wrapper}>
      {data.length > 0 ? (
        data.map((roomData, index) => (
          <View key={index} style={styles.container}>
            <Text style={styles.header}>{updatedRooms[index]}</Text>
            <View style={styles.cardContainer}>
              <View style={styles.row}>
                <Text style={styles.label}>Pasien awal:</Text>
                <Text style={styles.number}>{roomData.pasien_awal || 0}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Pasien masuk:</Text>
                <Text style={styles.number}>{roomData.pasien_masuk || 0}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Pasien pindahan:</Text>
                <Text style={styles.number}>{roomData.pasien_pindahan || 0}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Pasien dipindahkan:</Text>
                <Text style={styles.number}>{roomData.pasien_dipindahkan || 0}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Pasien hidup:</Text>
                <Text style={styles.number}>{roomData.pasien_hidup || 0}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Pasien rujuk:</Text>
                <Text style={styles.number}>{roomData.pasien_rujuk || 0}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Pasien APS:</Text>
                <Text style={styles.number}>{roomData.pasien_aps || 0}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Pasien lain-lain:</Text>
                <Text style={styles.number}>{roomData.pasien_lain_lain || 0}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Pasien kurang dari 48 jam:</Text>
                <Text style={styles.number}>{roomData.pasien_kurang_dari_48jam || 0}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Pasien lebih dari 48 jam:</Text>
                <Text style={styles.number}>{roomData.pasien_lebih_dari_48jam || 0}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Pasien masih dirawat:</Text>
                <Text style={styles.number}>{roomData.pasien_masih_dirawat || 0}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Pasien lama dirawat:</Text>
                <Text style={styles.number}>{roomData.pasien_lama_dirawat || 0}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Jumlah pasien:</Text>
                <Text style={styles.number}>{roomData.banyak_pasien || 0}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Jumlah hari:</Text>
                <Text style={styles.number}>{roomData.jumlah_hari_perawatan || 0}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Kelas 1:</Text>
                <Text style={styles.number}>{roomData.kelas_1 || 0}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Kelas 2:</Text>
                <Text style={styles.number}>{roomData.kelas_2 || 0}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Kelas 3:</Text>
                <Text style={styles.number}>{roomData.kelas_3 || 0}</Text>
              </View>
              <Text style={styles.updatedText}>
                Diperbarui{" "}
                {roomData.created_at
                  ? moment(roomData.created_at).format("ddd, DD MMM YYYY [pukul] HH:mm")
                  : moment(new Date()).format("ddd, DD MMM YYYY [pukul] HH:mm")}{" "}
                WITA
              </Text>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>Tidak ada data untuk ruangan ini</Text>
      )}
  
      <View style={{ marginTop: 8 }}>
        <TouchableOpacity onPress={handleRefreshButton} style={styles.button}>
          <Text style={styles.buttonText}>Refresh Data</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
  

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 8,
  },
  noDataText: { fontSize: dynamicFontSize(16), textAlign: "center", color: "#999" },
  container: {
    padding: dynamicPadding(16),
    backgroundColor: Color.schemesOnPrimary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 1,
    marginHorizontal: dynamicPadding(-5),
    borderRadius: dynamicPadding(8),
    overflow: "visible",
    marginBottom: dynamicPadding(16),
  },
  cardContainer: {
    marginBottom: dynamicPadding(16),
  },
  header: {
    fontFamily: FontFamily.poppinsMedium,
    fontSize: dynamicFontSize(15),
    color: Color.notSoBlack,
    textAlign: "center",
    marginTop: dynamicPadding(8),
    marginBottom: dynamicPadding(16),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: dynamicPadding(16),
  },
  label: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: dynamicFontSize(14),
    color: Color.notSoBlack,
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
    marginBottom: dynamicPadding(8),
  },
  button: {
    backgroundColor: "#1E9DEC",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: dynamicFontSize(14),
    color: "#FFF",
  },
});

export default HistoryUpdate;
