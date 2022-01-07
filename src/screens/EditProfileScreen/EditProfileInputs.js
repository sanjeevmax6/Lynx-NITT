import React from 'react';
import {TextInput, Text} from 'react-native-paper';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as colors from '../../utils/colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';

const DATE_FORMAT = 'MMMM DD, YYYY';

const TEXT_INPUT = ({
  placeholder,
  label,
  icon,
  onTextChange,
  showCharCount,
  charCount,
  maxLength = 1000,
  keyboardType = 'default',
  multiline = false,
}) => {
  return (
    <TextInput
      underlineColor="transparent"
      label={label}
      maxLength={maxLength}
      style={{
        backgroundColor: colors.GRAY_LIGHT,
        borderTopRightRadius: moderateScale(6),
        borderTopLeftRadius: moderateScale(6),
        marginHorizontal: scale(HorizontalPadding),
        marginTop: verticalScale(3),
      }}
      placeholder={placeholder}
      multiline={multiline}
      keyboardType={keyboardType}
      theme={{
        colors: {
          primary: colors.BLACK,
        },
      }}
      selectionColor={colors.WHITE}
      onChangeText={text => {
        onTextChange(text);
      }}
      left={<TextInput.Icon name={icon} color={colors.Accent} />}
      right={
        showCharCount ? (
          <TextInput.Affix
            text={'/' + charCount}
            textStyle={{
              color: charCount < 0 ? colors.Tertiary : colors.GRAY_DARK,
            }}
          />
        ) : (
          <></>
        )
      }
    />
  );
};

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
      <TEXT_INPUT
        label="First Name"
        placeholder="First Name"
        icon="account"
        showCharCount={true}
        charCount={inputStates.nameLength}
        onTextChange={nName => {
          inputStates.setFirst_Name(nName);
          onChangeNameLength(nName);
        }}
      />
      <TEXT_INPUT
        label="Last Name"
        placeholder="Last Name"
        icon="account"
        showCharCount={true}
        charCount={inputStates.nameLength}
        onTextChange={nName => {
          inputStates.setLast_Name(nName);
          onChangeNameLength(nName);
        }}
      />
      <View style={styles.viewScale}>
        <TouchableOpacity>
          <TextInput
            disabled={true}
            style={{
              backgroundColor: colors.GRAY_LIGHT,
              borderTopLeftRadius: moderateScale(6),
              borderTopRightRadius: moderateScale(6),
              marginHorizontal: HorizontalPadding,
            }}
            theme={{
              colors: {
                primary: 'black',
              },
            }}
            left={
              <TextInput.Icon name="book" size={25} color={colors.Accent} />
            }>
            Department : MME
          </TextInput>
        </TouchableOpacity>
      </View>
      <View style={styles.viewScale}>
        <TouchableOpacity onPress={() => inputStates.setDatePicker(true)}>
          <TextInput
            disabled={true}
            style={{
              backgroundColor: colors.GRAY_LIGHT,
              borderTopLeftRadius: moderateScale(6),
              borderTopRightRadius: moderateScale(6),
              marginHorizontal: HorizontalPadding,
            }}
            theme={{
              colors: {
                primary: 'black',
              },
            }}
            selectionColor={colors.WHITE}
            left={
              <TextInput.Icon name="calendar" size={25} color={colors.Accent} />
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

      <TEXT_INPUT
        label="Aadhar Number"
        placeholder="Aadhar Number"
        showCharCount={false}
        keyboardType="number-pad"
        maxLength={12}
        icon={'card-account-details'}
        onTextChange={nAadharNumber => {
          inputStates.setAadharNumber(nAadharNumber);
        }}
      />
      <TEXT_INPUT
        label="Address"
        placeholder="Address (max 300)"
        showCharCount={true}
        icon={'map-marker'}
        multiline={true}
        charCount={inputStates.addressLength}
        onTextChange={nAddress => {
          inputStates.setAddress(nAddress);
          onChangeAddressLength(nAddress);
        }}
      />
      <TEXT_INPUT
        label="Mobile No."
        placeholder="Mobile No."
        icon="phone"
        showCharCount={false}
        charCount={inputStates.nameLength}
        onTextChange={nName => {
          inputStates.setMobile_No(nName);
          onChangeNameLength(nName);
        }}
      />
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
    marginTop: verticalScale(3),
  },
});

export default EditProfileInputs;