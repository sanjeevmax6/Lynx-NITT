import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';

import {STUDENT_REGISTRATION_STORE} from '../../mobx/STUDENT_REGISTRATION_STORE';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import {observer} from 'mobx-react';
import {
  COUNTRY_DATA,
  MODAL_TYPE_CODE,
  MODAL_TYPE_GENDER,
  MODAL_TYPE_NATIONALITY,
} from '../../utils/MODAL_DATABASE';
import {Divider, Searchbar} from 'react-native-paper';

const DropDownModal = observer(({modalType, data}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => {
    setSearchQuery(query);
  };

  return (
    <View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={STUDENT_REGISTRATION_STORE.getModalVisible}
          onRequestClose={() => {
            STUDENT_REGISTRATION_STORE.toggleModalVisible();
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {modalType != MODAL_TYPE_GENDER && (
                <Searchbar
                  style={{elevation: 0, margin: 10, padding: 0, color: 'red'}}
                  placeholder={'SEARCH'}
                  onChangeText={onChangeSearch}
                  value={searchQuery}
                  iconColor={colors.BLACK}
                />
              )}
              <FlatList
                data={data.filter(item => {
                  if (
                    item.name.toUpperCase().search(searchQuery.toUpperCase()) !=
                    -1
                  )
                    return true;
                  else return false;
                })}
                showsVerticalScrollIndicator={false}
                style={{width: '100%'}}
                showsHorizontalScrollIndicator={false}
                //   ListFooterComponent={}
                //ListHeaderComponent={}

                bounces={false}
                bouncesZoom={false}
                renderItem={({item}) => (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        if (modalType === MODAL_TYPE_CODE)
                          STUDENT_REGISTRATION_STORE.setCountryCode(item.code);
                        else if (modalType === MODAL_TYPE_NATIONALITY)
                          STUDENT_REGISTRATION_STORE.setNationality(item.name);
                        else if (modalType === MODAL_TYPE_GENDER)
                          STUDENT_REGISTRATION_STORE.setGender(item.name);
                        else
                          STUDENT_REGISTRATION_STORE.setDepartment(item.name);
                        setSearchQuery('');
                        STUDENT_REGISTRATION_STORE.toggleModalVisible();
                      }}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          marginVertical: verticalScale(6),
                        }}>
                        <View style={{width: '80%'}}>
                          <Text>{item.name}</Text>
                        </View>
                        {modalType === MODAL_TYPE_CODE && (
                          <View style={{width: '20%'}}>
                            <Text>+{item.code}</Text>
                          </View>
                        )}
                      </View>
                      <Divider />
                    </TouchableOpacity>
                  </View>
                )}
                numColumns={1}
                keyExtractor={(item, index) => index}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setSearchQuery('');
                  STUDENT_REGISTRATION_STORE.toggleModalVisible();
                }}>
                <Text style={styles.textStyle}>CLOSE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </View>
  );
});

export default DropDownModal;

const styles = StyleSheet.create({
  modalView: {
    marginVertical: scale(12),
    marginHorizontal: scale(8),
    height: (2.3 * Dimensions.get('window').height) / 3,
    backgroundColor: colors.WHITE,
    opacity: 0.99,
    borderRadius: scale(20),
    padding: scale(20),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: scale(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },

  modalText: {
    marginBottom: scale(15),
    letterSpacing: 0.7,
    color: colors.GRAY_LIGHT,
    fontSize: scale(16),
    textAlign: 'justify',
  },
  modalTitle: {
    fontSize: scale(18),
    color: colors.GRAY_LIGHT,
    fontWeight: 'bold',
  },
  closeButton: {
    borderRadius: scale(10),
    padding: scale(10),
    elevation: 2,
    backgroundColor: colors.EventDescriptionScreen_Button,
    marginTop: verticalScale(6),
  },
  textStyle: {
    color: 'white',
    fontSize: scale(15),
    paddingHorizontal: scale(18),
    textAlign: 'center',
  },
  container: {flex: 1},
});
