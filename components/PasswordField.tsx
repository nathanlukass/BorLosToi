import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Padding, Color, FontSize, FontFamily, Border} from '../GlobalStyles';

const PasswordField = () => {
  const [password, setpassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Password</Text>
      <TouchableOpacity
        style={[
          styles.inputContainer,
          {borderColor: isFocused ? Color.colorMediumaquamarine : 'grey'},
        ]}
        activeOpacity={1}
        onPress={() => setIsFocused(true)}>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setpassword}
          placeholder="Enter your password"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={Color.colorDimgray}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerPassword: {
    marginVertical: 10,
    width: '100%',
  },
  labelPassword: {
    fontSize: FontSize.m3LabelLarge_size,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDimgray,
    marginBottom: 5,
    left: 10,
  },
  inputContainerPassword: {
    left: 10,
    height: 45,
    borderRadius: Border.br_8xs,
    borderWidth: 1,
    backgroundColor: Color.schemesOnPrimary,
    paddingHorizontal: Padding.p_3xs,
    justifyContent: 'center',
  },
  inputPassword: {
    fontSize: FontSize.m3LabelLarge_size,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorBlack,
  },
});

export default PasswordField;
