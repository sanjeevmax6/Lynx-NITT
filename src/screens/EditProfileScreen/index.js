import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
  BackHandler,
} from 'react-native';
import {Divider, Button} from 'react-native-paper';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import DocumentPicker from 'react-native-document-picker';
import FileItem from './FileItem';
import EditProfileInputs from './EditProfileInputs';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import EditProfileScreenHeader from './EditProfileScreenHeader';
import StudentPhoto from './StudentPhoto';
import {TabVisibility} from '../../redux/reducers/bottomNav';
import {useDispatch} from 'react-redux';

const EditProfileScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setDatePicker] = useState(false);
  const [aadharNumber, setAadharNumber] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [address, setAddress] = useState();
  const [studentPic, setStudentPic] = useState('');
  const [isStudentPicSelected, setStudentPicSelected] = useState(false);

  const maxNameLength = 50;
  const maxAddressLength = 300;
  const [nameLength, setNameLength] = useState(maxNameLength);
  const [addressLength, setAddressLength] = useState(maxAddressLength);
  const inputStates = {
    name,
    setName,
    aadharNumber,
    setAadharNumber,
    address,
    setAddress,
    dob,
    setDob,
    showDatePicker,
    setDatePicker,
    nameLength,
    setNameLength,
    addressLength,
    setAddressLength,
    maxAddressLength,
    maxNameLength,
  };

  const PhotoStates = {
    studentPic,
    setStudentPic,
    isStudentPicSelected,
    setStudentPicSelected,
  };

  const dispatch = useDispatch();

  function toggleTab(tabShow) {
    dispatch(TabVisibility(tabShow));
  }

  const selectFiles = async () => {
    try {
      const files = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      setSelectedFiles(prevList => {
        return [...prevList, ...files];
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) console.log(err);
      else throw err;
    }
  };

  const removeFile = uri => {
    setSelectedFiles(prevList => {
      return prevList.filter(item => item.uri !== uri);
    });
  };

  useEffect(() => {
    toggleTab(false);
    const backPress = BackHandler.addEventListener('backPress', onBackPress);

    return () => {
      backPress.remove();
    };
  }, []);

  const onBackPress = () => {
    Alert.alert('', 'Are you sure you want to discard changes?', [
      {
        text: 'DISCARD',
        onPress: () => {
          toggleTab(true);
          navigation.goBack();
        },
        style: 'cancel',
      },
      {text: 'KEEP EDITING'},
    ]);
    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      <EditProfileScreenHeader
        navigation={navigation}
        isValid={addressLength >= 0 && nameLength >= 0}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        ListFooterComponentStyle={{flex: 1, justifyContent: 'flex-end'}}
        ListFooterComponent={<View style={{height: verticalScale(6)}} />}
        ListHeaderComponent={
          <>
            <StudentPhoto PhotoStates={PhotoStates} />
            <Divider style={styles.divider} />
            <EditProfileInputs inputStates={inputStates} />
            <Divider style={styles.divider} />
            <View style={styles.uploadButton}>
              <Button
                icon="upload"
                mode="text"
                onPress={() => selectFiles()}
                color={colors.WHITE}>
                UPLOAD PASSPORT
              </Button>
            </View>
          </>
        }
        data={selectedFiles}
        renderItem={({item}) => (
          <FileItem item={item} deleteItem={removeFile} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.Secondary,
  },
  viewScale: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(5),
  },
  divider: {
    height: verticalScale(2),
    backgroundColor: colors.GRAY_MEDIUM,
  },
  buttonViewTheme: {
    fontSize: 16,
    padding: moderateScale(8),
    backgroundColor: colors.CreationScreen_Button,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextTheme: {
    fontSize: 16,
    marginLeft: scale(10),
    color: colors.CreationScreen_ButtonText,
  },
  footer: {
    flexDirection: 'row',
    paddingVertical: verticalScale(5),
  },
  twoButtonContainer: {
    flexDirection: 'row',
  },
  twoButtonLeft: {
    flex: 1,
    paddingRight: scale(5),
    paddingLeft: scale(20),
    paddingVertical: verticalScale(5),
  },
  twoButtonRight: {
    flex: 1,
    paddingRight: scale(20),
    paddingLeft: scale(5),
    paddingVertical: verticalScale(5),
  },
  uploadButton: {
    backgroundColor: colors.Tertiary,
    borderRadius: moderateScale(6),
    marginVertical: verticalScale(9),
    marginHorizontal: HorizontalPadding,
  },
});

export default EditProfileScreen;
