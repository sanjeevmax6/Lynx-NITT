import React from 'react';
import {TextInput} from 'react-native-paper';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as color from '../../utils/colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';

const DATE_FORMAT = 'MMMM DD, YYYY';

const EditProfileInputs = ({inputStates}) => {
  const onChangeDate = newDate => {
    const currentDate = newDate || inputStates.dob;
    inputStates.setDatePicker(false);
    inputStates.setDob(currentDate);
  };
  const onChangeNameLength = text => {
    inputStates.setNameLength(inputStates.maxNameLength - text.length);
  };
  const onChangeAddressLength = text => {
    inputStates.setAddressLength(inputStates.maxAddressLength - text.length);
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewScale}>
        <TextInput
          underlineColor="transparent"
          label="Name"
          style={{
            backgroundColor: color.GRAY_LIGHT,
            marginHorizontal: HorizontalPadding,
            borderTopLeftRadius: moderateScale(12),
          }}
          placeholder="Name"
          value={inputStates.name}
          multiline={true}
          onChangeText={nName => {
            inputStates.setName(nName);
            onChangeNameLength(nName);
          }}
          left={<TextInput.Icon name="account" color={color.Tertiary} />}
        />
        <Text
          style={[
            styles.wordCount,
            {color: inputStates.nameLength < 0 ? 'red' : 'black'},
          ]}>
          {inputStates.nameLength}
        </Text>
      </View>
      <View style={styles.viewScale}>
        <TouchableOpacity onPress={() => inputStates.setDatePicker(true)}>
          <TextInput
            disabled={true}
            style={{
              backgroundColor: color.GRAY_LIGHT,
              borderTopLeftRadius: moderateScale(6),
              marginHorizontal: HorizontalPadding,
            }}
            left={
              <TextInput.Icon
                name="calendar"
                size={25}
                color={color.Tertiary}
              />
            }>
            Date of Birth: {moment(inputStates.dob).format(DATE_FORMAT)}
          </TextInput>
        </TouchableOpacity>
        {inputStates.showDatePicker && (
          <DateTimePickerModal
            isVisible={inputStates.showDatePicker}
            date={inputStates.dob}
            mode="date"
            onConfirm={onChangeDate}
            onCancel={() => inputStates.setDatePicker(false)}
          />
        )}
      </View>
      <View style={styles.viewScale}>
        <TextInput
          underlineColor="transparent"
          style={{
            backgroundColor: color.GRAY_LIGHT,
            marginHorizontal: HorizontalPadding,
            // borderTopLeftRadius: moderateScale(9),
          }}
          label="Aadhar Number"
          placeholder="Aadhar Number"
          value={inputStates.aadharNumber}
          onChangeText={nAadharNumber => {
            inputStates.setAadharNumber(nAadharNumber);
          }}
          keyboardType="number-pad"
          maxLength={12}
          left={
            <TextInput.Icon
              name={'card-account-details'}
              color={color.Tertiary}
            />
          }
        />
      </View>
      <View style={styles.viewScale}>
        <TextInput
          underlineColor="transparent"
          style={{
            backgroundColor: color.GRAY_LIGHT,
            marginHorizontal: HorizontalPadding,
            // borderTopLeftRadius: moderateScale(9),
          }}
          label="Address"
          placeholder="Address (max 300)"
          multiline={true}
          value={inputStates.address}
          onChangeText={nAddress => {
            inputStates.setAddress(nAddress);
            onChangeAddressLength(nAddress);
          }}
          multiline={true}
          left={<TextInput.Icon name={'map-marker'} color={color.Tertiary} />}
        />
        <Text
          style={[
            styles.wordCount,
            {color: inputStates.addressLength < 0 ? 'red' : 'black'},
          ]}>
          {inputStates.addressLength}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: verticalScale(4),
  },
  viewScale: {
    paddingHorizontal: scale(0),
    paddingVertical: verticalScale(4),
  },
  wordCount: {
    fontSize: scale(10),
    textAlign: 'right',
    paddingHorizontal: HorizontalPadding,
  },
});

export default EditProfileInputs;
