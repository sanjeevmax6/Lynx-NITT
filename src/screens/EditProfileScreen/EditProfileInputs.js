import React from 'react';
import {TextInput, Text} from 'react-native-paper';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as colors from '../../utils/colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {STUDENT_EDIT_PROFILE_STORE} from '../../mobx/STUDENT_EDIT_PROFILE_STORE';
import {observer} from 'mobx-react';
import {STUDENT_DETAILS_STORE} from '../../mobx/STUDENT_DETAILS_STORE';

const DATE_FORMAT = 'MMMM DD, YYYY';

const TEXT_INPUT = ({
  placeholder,
  label,
  icon,
  onTextChange,
  showCharCount,
  charCount,
  value,
  maxLength = 1000,
  keyboardType = 'default',
  multiline = false,
}) => {
  return (
    <TextInput
      underlineColor="transparent"
      label={label}
      value={value}
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
      selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
      onChangeText={text => {
        onTextChange(text);
      }}
      left={<TextInput.Icon name={icon} color={colors.Accent} />}
      right={
        showCharCount ? (
          <TextInput.Affix
            text={'/' + (maxLength - charCount)}
            textStyle={{
              color:
                maxLength - charCount < 0 ? colors.Tertiary : colors.GRAY_DARK,
            }}
          />
        ) : (
          <></>
        )
      }
    />
  );
};

const EditProfileInputs = observer(() => {
  const onChangeDate = newDate => {
    const currentDate = newDate || STUDENT_EDIT_PROFILE_STORE.getDOB;
    STUDENT_EDIT_PROFILE_STORE.setDatePicker(false);
    STUDENT_EDIT_PROFILE_STORE.setDOB(currentDate);
  };

  return (
    <View style={styles.container}>
      <TEXT_INPUT
        label="First Name"
        placeholder="First Name"
        icon="account"
        value={STUDENT_EDIT_PROFILE_STORE.getFirstName}
        showCharCount={true}
        maxLength={30}
        charCount={STUDENT_EDIT_PROFILE_STORE.getFirstName.length}
        onTextChange={nName => {
          STUDENT_EDIT_PROFILE_STORE.setFirstName(nName);
        }}
      />
      <TEXT_INPUT
        label="Last Name"
        placeholder="Last Name"
        icon="account"
        showCharCount={true}
        value={STUDENT_EDIT_PROFILE_STORE.getLastName}
        maxLength={30}
        charCount={STUDENT_EDIT_PROFILE_STORE.getLastName.length}
        onTextChange={nName => {
          STUDENT_EDIT_PROFILE_STORE.setLastName(nName);
        }}
      />
      <View style={styles.viewScale}>
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
            <TextInput.Icon name="book" size={25} color={colors.GRAY_DARK} />
          }>
          Department : {STUDENT_DETAILS_STORE.getDepartment}
        </TextInput>
      </View>
      <View style={styles.viewScale}>
        <TouchableOpacity
          onPress={() => STUDENT_EDIT_PROFILE_STORE.setDatePicker(true)}>
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
            selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
            left={
              <TextInput.Icon name="calendar" size={25} color={colors.Accent} />
            }>
            Date of Birth:{' '}
            {moment(STUDENT_EDIT_PROFILE_STORE.getDOB).format(DATE_FORMAT)}
          </TextInput>
        </TouchableOpacity>
        {STUDENT_EDIT_PROFILE_STORE.getDatePicker && (
          <DateTimePickerModal
            isVisible={STUDENT_EDIT_PROFILE_STORE.getDatePicker}
            date={STUDENT_EDIT_PROFILE_STORE.getDOB}
            mode="date"
            onConfirm={onChangeDate}
            onCancel={() => STUDENT_EDIT_PROFILE_STORE.setDatePicker(false)}
          />
        )}
      </View>

      <TEXT_INPUT
        label="Aadhar Number"
        placeholder="Aadhar Number"
        showCharCount={false}
        keyboardType="number-pad"
        maxLength={12}
        value={STUDENT_EDIT_PROFILE_STORE.getAadhar.toString()}
        icon={'card-account-details'}
        onTextChange={nAadharNumber => {
          STUDENT_EDIT_PROFILE_STORE.setAadhar(nAadharNumber);
        }}
      />
      <TEXT_INPUT
        label="Address"
        placeholder="Address (max 300)"
        showCharCount={true}
        icon={'map-marker'}
        multiline={true}
        maxLength={300}
        value={STUDENT_EDIT_PROFILE_STORE.getAddress}
        charCount={STUDENT_EDIT_PROFILE_STORE.getAddress.length}
        onTextChange={nAddress => {
          STUDENT_EDIT_PROFILE_STORE.setAddress(nAddress);
        }}
      />
      <TEXT_INPUT
        label="Mobile Number"
        placeholder="Mobile Number"
        icon="phone"
        maxLength={14}
        showCharCount={false}
        value={STUDENT_EDIT_PROFILE_STORE.getMobile.toString()}
        onTextChange={val => {
          STUDENT_EDIT_PROFILE_STORE.setMobile(val);
        }}
      />
    </View>
  );
});

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
