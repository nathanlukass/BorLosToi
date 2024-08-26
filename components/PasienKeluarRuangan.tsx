import React, { useMemo } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { FontFamily, FontSize, Border, Color, Padding } from "../GlobalStyles";

export type PasienKeluarRuanganType = {
  /** Style props */
  jumlahTop?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const PasienKeluarRuangan = ({ jumlahTop }: PasienKeluarRuanganType) => {
  const pasienKeluarRuanganStyle = useMemo(() => {
    return {
      ...getStyleValue("top", jumlahTop),
    };
  }, [jumlahTop]);

  return (
    <View style={[styles.pasienKeluarRuangan, pasienKeluarRuanganStyle]}>
      <View style={styles.judul}>
        <Text style={[styles.pasienKeluarRuangan1, styles.pasienTypo]}>
          Pasien keluar ruangan
        </Text>
        <View style={[styles.judulChild, styles.judulChildPosition]} />
      </View>
      <View style={styles.hidup}>
        <Text style={[styles.pasienKeluarHidupContainer, styles.amountTypo]}>
          <Text style={styles.pasienKeluarHidupContainer1}>
            <Text style={styles.pasienKeluar}>{`Pasien keluar `}</Text>
            <Text style={styles.hidup1}>Hidup</Text>
            <Text style={styles.pasienKeluar}> :</Text>
          </Text>
        </Text>
      </View>
      <View style={[styles.subJudul, styles.subLayout]}>
        <View style={[styles.amountSetting, styles.amountPosition]}>
          <View style={[styles.iconMinus, styles.iconPosition]}>
            <View style={[styles.rectangle, styles.rectanglePosition]} />
            <Image
              style={[styles.pathIcon, styles.pathIconLayout]}
              resizeMode="cover"
              source={require("../assets/path.png")}
            />
          </View>
          <View style={[styles.iconPlus, styles.iconPosition]}>
            <View style={[styles.rectangleCopy, styles.rectanglePosition]} />
            <Image
              style={[styles.pathIcon1, styles.pathIconLayout]}
              resizeMode="cover"
              source={require("../assets/path1.png")}
            />
          </View>
          <Text style={[styles.amount, styles.amountTypo]}>1</Text>
        </View>
        <Text style={[styles.hidup2, styles.jamTypo]}>Hidup</Text>
      </View>
      <View style={[styles.subJudul, styles.subLayout]}>
        <View style={[styles.amountSetting, styles.amountPosition]}>
          <View style={[styles.iconMinus, styles.iconPosition]}>
            <View style={[styles.rectangle, styles.rectanglePosition]} />
            <Image
              style={[styles.pathIcon, styles.pathIconLayout]}
              resizeMode="cover"
              source={require("../assets/path.png")}
            />
          </View>
          <View style={[styles.iconPlus, styles.iconPosition]}>
            <View style={[styles.rectangleCopy, styles.rectanglePosition]} />
            <Image
              style={[styles.pathIcon1, styles.pathIconLayout]}
              resizeMode="cover"
              source={require("../assets/path1.png")}
            />
          </View>
          <Text style={[styles.amount, styles.amountTypo]}>1</Text>
        </View>
        <Text style={[styles.hidup2, styles.jamTypo]}>Rujuk :</Text>
      </View>
      <View style={[styles.subJudul, styles.subLayout]}>
        <View style={[styles.amountSetting, styles.amountPosition]}>
          <View style={[styles.iconMinus, styles.iconPosition]}>
            <View style={[styles.rectangle, styles.rectanglePosition]} />
            <Image
              style={[styles.pathIcon, styles.pathIconLayout]}
              resizeMode="cover"
              source={require("../assets/path.png")}
            />
          </View>
          <View style={[styles.iconPlus, styles.iconPosition]}>
            <View style={[styles.rectangleCopy, styles.rectanglePosition]} />
            <Image
              style={[styles.pathIcon1, styles.pathIconLayout]}
              resizeMode="cover"
              source={require("../assets/path1.png")}
            />
          </View>
          <Text style={[styles.amount, styles.amountTypo]}>1</Text>
        </View>
        <Text style={[styles.hidup2, styles.jamTypo]}>APS</Text>
      </View>
      <View style={[styles.subJudul, styles.subLayout]}>
        <View style={[styles.amountSetting, styles.amountPosition]}>
          <View style={[styles.iconMinus, styles.iconPosition]}>
            <View style={[styles.rectangle, styles.rectanglePosition]} />
            <Image
              style={[styles.pathIcon, styles.pathIconLayout]}
              resizeMode="cover"
              source={require("../assets/path.png")}
            />
          </View>
          <View style={[styles.iconPlus, styles.iconPosition]}>
            <View style={[styles.rectangleCopy, styles.rectanglePosition]} />
            <Image
              style={[styles.pathIcon1, styles.pathIconLayout]}
              resizeMode="cover"
              source={require("../assets/path1.png")}
            />
          </View>
          <Text style={[styles.amount, styles.amountTypo]}>1</Text>
        </View>
        <Text style={[styles.hidup2, styles.jamTypo]}>Lain-lain</Text>
      </View>
      <View style={[styles.subJudul, styles.subLayout]}>
        <View style={[styles.amountSetting, styles.amountPosition]}>
          <Text style={[styles.amount, styles.amountTypo]}>1</Text>
        </View>
        <Text style={[styles.hidup2, styles.jamTypo]}>Jumlah</Text>
      </View>
      <View style={styles.hidup}>
        <Text style={[styles.pasienKeluarHidupContainer, styles.amountTypo]}>
          <Text style={styles.pasienKeluarHidupContainer1}>
            <Text style={styles.pasienKeluar}>{`Pasien keluar `}</Text>
            <Text style={styles.meninggal1}>Meninggal</Text>
            <Text style={styles.pasienKeluar}> :</Text>
          </Text>
        </Text>
      </View>
      <View style={[styles.subJudul5, styles.subLayout]}>
        <View style={[styles.amountSetting5, styles.amountPosition]}>
          <View style={[styles.iconMinus, styles.iconPosition]}>
            <View style={[styles.rectangle, styles.rectanglePosition]} />
            <Image
              style={[styles.pathIcon, styles.pathIconLayout]}
              resizeMode="cover"
              source={require("../assets/path.png")}
            />
          </View>
          <View style={[styles.iconPlus, styles.iconPosition]}>
            <View style={[styles.rectangleCopy, styles.rectanglePosition]} />
            <Image
              style={[styles.pathIcon1, styles.pathIconLayout]}
              resizeMode="cover"
              source={require("../assets/path1.png")}
            />
          </View>
          <Text style={[styles.amount, styles.amountTypo]}>1</Text>
        </View>
        <Text style={[styles.v, styles.vTypo]}>V</Text>
        <Text style={[styles.jam, styles.jamTypo]}>_ 48 jam</Text>
      </View>
      <View style={[styles.subJudul5, styles.subLayout]}>
        <View style={[styles.amountSetting5, styles.amountPosition]}>
          <View style={[styles.iconMinus, styles.iconPosition]}>
            <View style={[styles.rectangle, styles.rectanglePosition]} />
            <Image
              style={[styles.pathIcon, styles.pathIconLayout]}
              resizeMode="cover"
              source={require("../assets/path.png")}
            />
          </View>
          <View style={[styles.iconPlus, styles.iconPosition]}>
            <View style={[styles.rectangleCopy, styles.rectanglePosition]} />
            <Image
              style={[styles.pathIcon1, styles.pathIconLayout]}
              resizeMode="cover"
              source={require("../assets/path1.png")}
            />
          </View>
          <Text style={[styles.amount, styles.amountTypo]}>1</Text>
        </View>
        <Text style={[styles.v1, styles.vTypo]}>V</Text>
        <Text style={[styles.jam, styles.jamTypo]}>_ 48 jam</Text>
      </View>
      <View style={[styles.subJudul, styles.subLayout]}>
        <View style={[styles.amountSetting, styles.amountPosition]}>
          <Text style={[styles.amount, styles.amountTypo]}>1</Text>
        </View>
        <Text style={[styles.hidup2, styles.jamTypo]}>Jumlah</Text>
      </View>
      <View style={[styles.subJudul8, styles.subLayout]}>
        <View style={[styles.amountSetting8, styles.amountPosition]}>
          <Text style={[styles.amount, styles.amountTypo]}>1</Text>
        </View>
        <Text style={styles.total}>Total</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pasienTypo: {
    alignItems: "center",
    display: "flex",
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    top: "0%",
  },
  judulChildPosition: {
    left: "50%",
    position: "absolute",
  },
  amountTypo: {
    textAlign: "left",
    fontSize: FontSize.m3BodySmall_size,
    position: "absolute",
  },
  subLayout: {
    height: 22,
    marginTop: 15,
  },
  amountPosition: {
    overflow: "hidden",
    bottom: "0%",
    height: "100%",
    right: "0%",
    top: "0%",
    position: "absolute",
  },
  iconPosition: {
    width: "28.29%",
    bottom: "0%",
    height: "100%",
    top: "0%",
    position: "absolute",
  },
  rectanglePosition: {
    borderRadius: Border.br_5xs,
    bottom: "0%",
    right: "0%",
    height: "100%",
    left: "0%",
    width: "100%",
    top: "0%",
    position: "absolute",
  },
  pathIconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    left: "31.03%",
    right: "30.6%",
    width: "38.36%",
    overflow: "hidden",
    position: "absolute",
  },
  jamTypo: {
    fontFamily: FontFamily.poppinsRegular,
    top: "18.18%",
    textAlign: "left",
    fontSize: FontSize.m3BodySmall_size,
    color: Color.notSoBlack,
    position: "absolute",
  },
  vTypo: {
    transform: [
      {
        rotate: "90deg",
      },
    ],
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
    fontSize: FontSize.m3BodySmall_size,
    color: Color.notSoBlack,
    position: "absolute",
  },
  pasienKeluarRuangan1: {
    height: "71.43%",
    marginLeft: -88.5,
    fontSize: FontSize.m3LabelLarge_size,
    textAlign: "center",
    justifyContent: "center",
    width: 178,
    color: Color.notSoBlack,
    left: "50%",
    position: "absolute",
  },
  judulChild: {
    marginLeft: -133.7,
    top: 28,
    borderStyle: "solid",
    borderColor: Color.notSoBlack,
    borderTopWidth: 0.3,
    height: 0,
    opacity: 0.5,
    width: 267,
  },
  judul: {
    height: 28,
    width: 267,
  },
  pasienKeluar: {
    color: Color.notSoBlack,
  },
  hidup1: {
    color: Color.colorMediumaquamarine,
  },
  pasienKeluarHidupContainer1: {
    width: "100%",
  },
  pasienKeluarHidupContainer: {
    left: "0%",
    width: "100%",
    alignItems: "center",
    display: "flex",
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    top: "0%",
  },
  hidup: {
    height: 18,
    marginTop: 15,
    width: 266,
  },
  rectangle: {
    backgroundColor: Color.colorBlueviolet,
    opacity: 0.1,
  },
  pathIcon: {
    height: "5.45%",
    top: "47.73%",
    bottom: "46.82%",
  },
  iconMinus: {
    right: "71.71%",
    left: "0%",
  },
  rectangleCopy: {
    backgroundColor: Color.colorCornflowerblue_100,
  },
  pathIcon1: {
    height: "38.64%",
    top: "30.91%",
    bottom: "30.45%",
  },
  iconPlus: {
    left: "71.71%",
    right: "0%",
    width: "28.29%",
  },
  amount: {
    marginTop: -11,
    width: "6.46%",
    top: "50%",
    left: "46.34%",
    letterSpacing: 1,
    fontWeight: "500",
    fontFamily: FontFamily.poppinsMedium,
    color: Color.colorGray_100,
    opacity: 0.7,
  },
  amountSetting: {
    width: "33.33%",
    left: "66.67%",
  },
  hidup2: {
    left: "0%",
  },
  subJudul: {
    width: 246,
  },
  meninggal1: {
    color: Color.colorIndianred_200,
  },
  amountSetting5: {
    width: "32.73%",
    left: "67.27%",
  },
  v: {
    top: "38.64%",
    left: "7.19%",
  },
  jam: {
    left: "1.8%",
  },
  subJudul5: {
    width: 251,
  },
  v1: {
    top: "75%",
    left: "0%",
  },
  amountSetting8: {
    width: "30.83%",
    left: "69.17%",
  },
  total: {
    top: "18.18%",
    textAlign: "left",
    fontSize: FontSize.m3BodySmall_size,
    left: "0%",
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    position: "absolute",
  },
  subJudul8: {
    width: 266,
    height: 22,
  },
  pasienKeluarRuangan: {
    top: 612,
    left: 17,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    elevation: 8,
    shadowOpacity: 1,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.schemesOnPrimary,
    width: 326,
    height: 470,
    alignItems: "flex-end",
    paddingHorizontal: Padding.p_10xl,
    paddingVertical: Padding.p_xl,
    position: "absolute",
  },
});

export default PasienKeluarRuangan;
