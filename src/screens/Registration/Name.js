import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  Dimensions,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {verticalScale, ScaledSheet, scale} from 'react-native-size-matters';
import NextButton from './nextButton';
import * as colors from '../../utils/colors';
import Error from '../../components/Error';
import {STUDENT_REGISTRATION_STORE} from '../../mobx/STUDENT_REGISTRATION_STORE';
import DropDownModal from './DropDownModal';
import {
  COUNTRIES,
  COUNTRY_DATA,
  DEPARTMENTS,
  Gender,
  MODAL_TYPE_CODE,
  MODAL_TYPE_DEPARTMENT,
  MODAL_TYPE_GENDER,
  MODAL_TYPE_NATIONALITY,
} from '../../utils/MODAL_DATABASE';
import {observer} from 'mobx-react';

const WIDTH = Dimensions.get('window').width;

const Name = observer(({scrollViewRef, callback}) => {
  const [er, setEr] = useState(false);
  const [erMsg, setErMsg] = useState('');
  const [modalType, setmodalType] = useState(false);
  const [data, setData] = useState([]);
  const scroll = () => {
    if (
      !STUDENT_REGISTRATION_STORE.getFirstName ||
      !STUDENT_REGISTRATION_STORE.getLastName
    ) {
      setEr(true);
      setErMsg('Enter your name');
      return;
    }
    if (STUDENT_REGISTRATION_STORE.getDepartment == 'Department') {
      setEr(true);
      setErMsg('Enter your Department');
      return;
    }

    if (!STUDENT_REGISTRATION_STORE.getMobileNumber) {
      setEr(true);
      setErMsg('Enter your Mobile Number');
      return;
    }

    if (STUDENT_REGISTRATION_STORE.getGender === 'Gender') {
      setEr(true);
      setErMsg('Select Your Gender');
      return;
    }

    if (!STUDENT_REGISTRATION_STORE.getNationality) {
      setEr(true);
      setErMsg('Select your Nationality');
      return;
    }

    setEr(false);

    callback('Basic Information', 'Enter your date of birth and address', 1);
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: WIDTH,
        animated: true,
      });
    }
  };

  const lastNameInput = useRef(); // for focus transfer

  const mobileInput = useRef();

  return (
    <SafeAreaView>
      <DropDownModal modalType={modalType} data={data} />
      <ScrollView style={styles.scrollView}>
        <View style={{paddingHorizontal: scale(20)}}>
          <TextInput
            label="First Name"
            mode="outlined"
            theme={{
              colors: {
                primary: er ? colors.Tertiary : 'black',
              },
            }}
            selectionColor={colors.WHITE}
            outlineColor={er ? colors.Tertiary : null}
            style={styles.input}
            onChangeText={fname => {
              STUDENT_REGISTRATION_STORE.setFirstName(fname);
            }}
            returnKeyType="next"
            onSubmitEditing={() => lastNameInput.current.focus()}
          />
          <TextInput
            label="Last Name"
            mode="outlined"
            theme={{
              colors: {
                primary: er ? colors.Tertiary : 'black',
              },
            }}
            selectionColor={colors.WHITE}
            outlineColor={er ? colors.Tertiary : null}
            style={{...styles.input, marginTop: verticalScale(5)}}
            onChangeText={val => {
              STUDENT_REGISTRATION_STORE.setLastName(val);
            }}
            returnKeyType="next"
            ref={lastNameInput}
          />

          <TouchableOpacity
            style={{marginTop: verticalScale(5)}}
            onPress={() => {
              setmodalType(MODAL_TYPE_DEPARTMENT);
              setData(DEPARTMENTS);
              STUDENT_REGISTRATION_STORE.toggleModalVisible();
            }}>
            <TextInput
              mode="outlined"
              disabled={true}
              theme={{
                colors: {
                  primary: er ? colors.Tertiary : 'black',
                },
              }}
              selectionColor={colors.WHITE}
              outlineColor={er ? colors.Tertiary : null}>
              {STUDENT_REGISTRATION_STORE.getDepartment}
            </TextInput>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{marginTop: verticalScale(5)}}
              onPress={() => {
                setmodalType(MODAL_TYPE_CODE);
                setData(COUNTRY_DATA);
                STUDENT_REGISTRATION_STORE.toggleModalVisible();
              }}>
              <TextInput
                mode="outlined"
                disabled={true}
                theme={{
                  colors: {
                    primary: er ? colors.Tertiary : 'black',
                  },
                }}
                selectionColor={colors.WHITE}
                outlineColor={er ? colors.Tertiary : null}>
                +{''}
                {STUDENT_REGISTRATION_STORE.getCountryCode}
              </TextInput>
            </TouchableOpacity>
            <TextInput
              label="Mobile Number"
              mode="outlined"
              keyboardType="phone-pad"
              theme={{
                colors: {
                  primary: er ? colors.Tertiary : 'black',
                },
              }}
              outlineColor={er ? colors.Tertiary : null}
              style={{
                flex: 1,
                marginLeft: scale(5),
                marginTop: verticalScale(5),
              }}
              onChangeText={val => {
                STUDENT_REGISTRATION_STORE.setMobileNumber(val);
              }}
              ref={mobileInput}
              returnKeyType="next"
            />
          </View>
          <TouchableOpacity
            style={{marginTop: verticalScale(5)}}
            onPress={() => {
              setmodalType(MODAL_TYPE_GENDER);
              setData(Gender);
              STUDENT_REGISTRATION_STORE.toggleModalVisible();
            }}>
            <TextInput
              mode="outlined"
              disabled={true}
              theme={{
                colors: {
                  primary: er ? colors.Tertiary : 'black',
                },
              }}
              selectionColor={colors.WHITE}
              outlineColor={er ? colors.Tertiary : null}>
              {STUDENT_REGISTRATION_STORE.getGender}
            </TextInput>
          </TouchableOpacity>

          <TouchableOpacity
            style={{marginTop: verticalScale(5)}}
            onPress={() => {
              setmodalType(MODAL_TYPE_NATIONALITY);
              setData(COUNTRIES);
              STUDENT_REGISTRATION_STORE.toggleModalVisible();
            }}>
            <TextInput
              mode="outlined"
              disabled={true}
              theme={{
                colors: {
                  primary: er ? colors.Tertiary : 'black',
                },
              }}
              selectionColor={colors.WHITE}
              outlineColor={er ? colors.Tertiary : null}>
              {STUDENT_REGISTRATION_STORE.getNationality}
            </TextInput>
          </TouchableOpacity>
          {er && <Error text={erMsg} />}
          <View
            style={{
              height: verticalScale(170),

              width: scale(50),
            }}
          />
        </View>
        <NextButton handler={scroll} />
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    backgroundColor: colors.regBackground,
    paddingHorizontal: '20@s',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    width: WIDTH,
    height: '100%',
    backgroundColor: colors.regBackground,
  },
  input: {
    width: '100%',
  },
});

export default Name;
