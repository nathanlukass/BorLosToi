import React, {useState, useCallback, useRef} from 'react';
import {Image,
  StyleSheet, 
  View, Text, 
  Pressable, 
  Modal, 
  ScrollView,
  TouchableOpacity, 
  ImageBackground,
  FlatList, 
  Dimensions,
   RefreshControl
} from 'react-native';
import WelcomeBar from '../../../../components/WelcomeBar';
import FrameComponent from '../../../../components/FrameComponent';
import {Gap} from '../../../components';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {
  Color,
  FontFamily,
  FontSize,
  Border,
  Padding,
} from '../../../../GlobalStyles';
import PopupMenu from '../../../../components/PopupMenu';
import BottomSheetEditRuangan from '../../../../components/BottomSheetEditRuangan';
// NEW CODE
import 'react-native-gesture-handler' ;
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { width, height } = Dimensions.get("window");

interface WelcomeHeaderProps {
  name?: string;
  greeting?: string;
  services?: Array<{
    icon: string;
    title: string;
  }>;
}

const HomeScreenAdmin = ({route}) => {
  const {user} = route.params;
  const {username, role, ruangan, id_user, nama} = user; // Access all relevant fields
  console.log('Route params:', route.params);
  const [isBottomSheetRuanganVisible, setIsBottomSheetRuanganVisible] = useState(false);

  const [lihatBORLOSVisible, setLihatBORLOSVisible] = useState(false);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const openLihatBORLOS = useCallback(() => {
    setLihatBORLOSVisible(true);
  }, []);

  const closeLihatBORLOS = useCallback(() => {
    setLihatBORLOSVisible(false);
  }, []);

  const toggleBottomSheetEditRuangan = () => {
    setIsBottomSheetRuanganVisible(!isBottomSheetRuanganVisible);
  };
  const currentUser = {
    username: 'Admin',
    role: 'Admin',
    id_user: 1,
    nama: 'Ka Alam',
  };

  const Stack = createStackNavigator();
  return (
    <View style={styles.container}>
      {/* Gambar Header */}
      <ImageBackground
        source={require('../../../../assets/background.png')}
        style={styles.headerBackground}
          resizeMode="cover"
          >

        <View style={[styles.textContent, { justifyContent: 'flex-start', marginTop: -120 }]}>
        <Text style={styles.greetingText}>Selamat Datang di</Text>
        <Text style={styles.welcomeText}>Sensus Harian Pasien</Text>
        <Text style={styles.welcomeText}>{ruangan}</Text>
        </View>
      
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../../assets/rs-picture1.jpg')}
            style={styles.fotoRuangan}
            resizeMode="cover"
          />
        </View>
      </ImageBackground>

      <View style={styles.menuButtonContainer}>
      
      <PopupMenu navigation={navigation} user={user} />      
      </View>

      <View style={styles.cardContainer}>
        <ScrollView
        contentContainerStyle={styles.cardScrollContent}
        showsVerticalScrollIndicator={false}>

        <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        marginStart:16,
        gap:8,
        marginTop: 40
    }}>
    <TouchableOpacity 
        style={styles.menuItem} 
        onPress={toggleBottomSheetEditRuangan}>
        <Image
            source={require('../../../../assets/edit.png')}
            style={styles.icon}
        />
        <Text style={styles.cardText}>Edit input</Text>
    </TouchableOpacity>

    <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('PrintOutScreen', { user })}>
        <Image
            source={require('../../../../assets/printout.png')}
            style={styles.icon}
        />
        <Text style={styles.cardText}>Printout</Text>
    </TouchableOpacity>
</View>


<Text style={styles.Title2}>History</Text>
{/* <HistoryUpdate ruangan={ruangan || null}/> */}

          </ScrollView>
      </View>
      <BottomSheetEditRuangan
        isVisible={isBottomSheetRuanganVisible}
        onClose={() => setIsBottomSheetRuanganVisible(false)}
        user={currentUser}
      />
    </View>    
  );
};

const styles = StyleSheet.create({
  textContent: {
    paddingLeft: 24,
    paddingTop: 40,
   
  },
  welcomeText: {
    marginBottom:-6,
    fontSize: 24,
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsSemiBold,
  },
  greetingText: {
    fontSize: 16,
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsRegular,
  },
  container :{
    flex: 1,
  },
  cardContainer: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginVertical:16,
    backgroundColor: Color.schemesOnPrimary,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    elevation: 4,
    marginTop: '-38%',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  headerBackground: {
    width: '105%',
    height: '70%', 
    justifyContent:'center',
    position: 'relative', 
  },
  cardScrollContent: {
    paddingBottom: 24,
  },

  Title: {
    fontSize: 16,
    marginBottom: 16,
    marginTop:60,
    fontFamily: FontFamily.poppinsMedium,
  },
  Title2:{
    fontSize: 16,
    marginBottom: 16,
    marginTop:24,
    fontFamily: FontFamily.poppinsMedium,
  },
  cardText: {
    fontSize: 12,
    fontFamily: FontFamily.poppinsMedium,
    color: Color.colorDimgray,
    textAlign: 'center',
  },
  icon: {
    width: 60,
    height: 60,
  },
  menuItem: {
    alignItems: 'center',
    width:90,
    marginHorizontal: 8, 
    marginTop:-24,
  },
  menuButtonContainer: {
    position: 'absolute',
    top: 30,  
    right: 20,
    zIndex: 3,  
  },
  fotoRuangan :{
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    marginStart: 16,
    marginEnd: 38,
    marginTop: 16,
    borderRadius: 15,
    overflow: 'hidden', 
    height: 160, 
    justifyContent:'center',
  },
});
export default HomeScreenAdmin
