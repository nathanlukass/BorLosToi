import React from 'react';
import { Platform, Text, StyleSheet, View, TouchableOpacity, Modal, Linking, Dimensions, Image} from 'react-native';
import { Overlay } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {
  Color,
  FontFamily,
} from '../../../../GlobalStyles';
import { NavigationProp, withNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
const dynamicFontSize = (size) => (width / 375) * size; 
const dynamicPadding = (padding) => (height / 667) * padding; 
const dynamicSize = (baseSize) => Math.round((baseSize * width) / 375);

export interface IProps {
  date?: string;
  placeholder?: string;
  style?: React.CSSProperties;
  onDateChange?: (date: Date) => void; 
  checkDataExist?: (tanggal: string, ruangan: string) => Promise<boolean>; 
  ruangan?: string; 
  navigation?: NavigationProp<any>; // Tambahkan ini
}

export interface IState {
  dateString: string;
  date: Date;
  show: boolean;
  isModalVisible: boolean; 
  formattedDate: string; 
}

class DatePickerr extends React.Component<IProps, IState> {
  state: IState = {
    dateString: moment(new Date()).format('dddd, YYYY-MM-DD'),
    date: this.props.date ? new Date(this.props.date) : new Date(),
    show: false,
    isModalVisible: false, 
    formattedDate: '',
  };

  onChange = async (event: any, selectedDate: any) => {
    if (selectedDate) {
      const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
     
     
      if (formattedDate === 'Invalid date') {
        alert('Tanggal tidak valid, silakan pilih tanggal yang benar.');
        return;
      }
      this.setState({
        dateString: moment(selectedDate).format('dddd, YYYY-MM-DD'),
        date: selectedDate,
        show: Platform.OS === 'ios',
        formattedDate: formattedDate,
      });

      if (this.props.onDateChange) {
        this.props.onDateChange(selectedDate);
      }
      const normalizedRuangan = this.props.ruangan
        .replace(/\u00A0/g, ' ')
        .trim()
        .toLowerCase();
      const dataExists = await this.props.checkDataExist(formattedDate, normalizedRuangan);
      console.log("Setting modal visibility to true");
      if (dataExists) {
        this.setState({ isModalVisible: true }, () => {
          console.log('Modal visibility set to:', this.state.isModalVisible);
        });
        return;
      }
    } else {
      this.setState({ show: false });
    }
  };

  showOverlay = () => {
    this.setState({ show: true });
  };
  hideOverlay = () => {
    this.setState({ show: false });
  };
  hideModal = () => {
    console.log("Hiding modal");
    this.setState({ isModalVisible: false }, () => {
      if (this.props.navigation) {
        this.props.navigation.navigate('HomeScreenNurse');
      } else {
  
      }
    });
  };
  handleAdminContact = () => {
    const phoneNumber = '+6285757161739'; 
    const message = `Halo, saya ingin melaporkan kesalahan dalam penginputan data pada tanggal ${this.state.formattedDate}.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(err => console.error('Failed to open WhatsApp', err));
  };

  render() {
    const currentDate = new Date();
    return (
      <View style={{ flex: 1, borderRadius: 50, }}>
        <TouchableOpacity
          onPress={this.showOverlay}
          style={[styles.inputContainerStyle, this.props.style]}>
          {this.state.dateString ? (
            <Text style={styles.textStyle}>{this.state.dateString}</Text>
          ) : (
            <Text style={{fontSize: dynamicFontSize(2)}}>
              {this.props.placeholder}
            </Text>
          )}
        <Image 
          source={require('../../../../assets/icon.png')} 
          style={styles.iconStyle} 
        />
        </TouchableOpacity>

        {Platform.OS === 'ios' ? (
          <Overlay
            isVisible={this.state.show}
            onBackdropPress={this.hideOverlay}
            overlayStyle={styles.overlayStyle}>
            <View style={styles.headerStyle}>
              <TouchableOpacity onPress={this.hideOverlay}>
                <Text style={{ paddingHorizontal: 15 }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.hideOverlay}>
                <Text style={{ paddingHorizontal: 15, color: 'green' }}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
            <DateTimePicker
              value={this.state.date}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={this.onChange}
              maximumDate={currentDate} 
              style={{ backgroundColor: 'white' }}
            />
          </Overlay>
        ) : (
          this.state.show && (
            <DateTimePicker
              value={this.state.date}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={this.onChange}
              maximumDate={currentDate} 
              style={{ backgroundColor: 'white' }}
            />
          )
        )}

        <Modal
          transparent={true}
          animationType="fade"
          visible={this.state.isModalVisible}
          onRequestClose={this.hideModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Data Sudah Tersimpan</Text>
              <Text style={styles.modalMessage}>
                Anda sudah menginput data pada tanggal {this.state.formattedDate}
              </Text>
              <Text style={styles.warningText}>
                <Text style={{ fontSize: 14 }}>⚠️</Text>{' '} 
                <Text style={{ fontStyle: 'italic' }}>
                  Silahkan{' '}
                  <TouchableOpacity onPress={this.handleAdminContact}>
                    <Text style={[styles.contactAdminText, { fontStyle: 'italic'}]}>hubungi admin</Text>
                  </TouchableOpacity>{' '}
                  jika terjadi kesalahan dalam penginputan data.
                </Text>
              </Text>
              <TouchableOpacity onPress={this.hideModal}>
                <Text style={styles.modalButton}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
export default DatePickerr;

const styles = StyleSheet.create({
  inputContainerStyle: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal:dynamicPadding(8),
    paddingVertical: dynamicPadding(5),
    height: '100%',
    width: '100%',
  },
  textStyle: {
    fontFamily: FontFamily.poppinsMedium,
    fontSize: dynamicFontSize(14),
    paddingVertical:dynamicPadding(2)
  },
  iconStyle: {
    width: dynamicSize(20), 
    height: dynamicSize(20),
    resizeMode: 'contain', 
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    height:'40%',
    alignItems: 'center',
    justifyContent:'center'
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: FontFamily.poppinsRegular,
    color: Color.notSoBlack,
  },
  warningText: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'justify',
    lineHeight: 20,
    fontStyle:'italic'
  },
  contactAdminText: {
    fontSize: 14,
    marginBottom: -2.8,
    color: '#1E9DEC',
    textDecorationLine: 'underline',
  },
  modalButton: {
    marginTop:16,
    fontSize: 14,
    color: 'white',
    paddingVertical: 12,
    marginHorizontal: -40,
    textAlign: 'center',
    borderRadius: 8,
    backgroundColor: '#21B557',
  },
});
