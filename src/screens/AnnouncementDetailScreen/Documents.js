import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {API_GET_IMAGE} from '../../utils/API_CONSTANTS';
import * as colors from '../../utils/colors';
import {openLink} from '../../utils/helperFunction/openLink';

const DisplayDocument = ({data}) => {
  const type = data.mimetype.split('/');

  return (
    <>
      {type[0] === 'image' ? (
        <TouchableOpacity
          style={{
            alignItems: 'center',
            elevation: 1,
            width: scale(150),
            borderRadius: moderateScale(12),
            marginTop: verticalScale(10),
          }}
          onPress={() => {
            openLink(API_GET_IMAGE + data.file_stored_name);
          }}>
          <Image
            style={{
              width: scale(149),
              height: scale(150),
              borderTopLeftRadius: moderateScale(12),
              borderTopRightRadius: moderateScale(12),
              backgroundColor: 'white',
              //marginVertical: verticalScale(10),
            }}
            resizeMode="cover"
            source={{
              uri: API_GET_IMAGE + data.file_stored_name,
            }}
          />
          <Text
            numberOfLines={1}
            style={{...styles.documentName, marginTop: 0}}>
            {data.originalname}
          </Text>
        </TouchableOpacity>
      ) : (
        <>
          {type[1] === 'pdf' ? (
            <>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  elevation: 1,
                  width: scale(150),
                  marginTop: verticalScale(10),
                  borderRadius: moderateScale(12),
                }}
                onPress={() => {
                  openLink(API_GET_IMAGE + data.file_stored_name);
                }}>
                <Image
                  style={{
                    width: scale(150),
                    height: scale(150),
                    marginVertical: verticalScale(10),
                  }}
                  resizeMode="contain"
                  source={{
                    uri: 'https://imagizer.imageshack.com/img924/8466/roc9oy.png',
                  }}
                />
                <Text numberOfLines={1} style={styles.documentName}>
                  {data.originalname}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  elevation: 1,
                  width: scale(150),
                  marginTop: verticalScale(10),
                  borderRadius: moderateScale(12),
                }}
                onPress={() => {
                  openLink(API_GET_IMAGE + data.file_stored_name);
                }}>
                <Image
                  style={{
                    width: scale(150),
                    height: scale(150),
                    marginVertical: verticalScale(10),
                  }}
                  resizeMode="contain"
                  source={{
                    uri: 'https://imagizer.imageshack.com/img922/9100/T8XvCz.png',
                  }}
                />
                <Text numberOfLines={1} style={styles.documentName}>
                  {data.originalname}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </>
  );
};
const Documents = ({docs}) => {
  return (
    <View style={{alignContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '300',
          fontSize: scale(18),
          paddingVertical: verticalScale(10),
          textDecorationLine: 'underline',
          color: colors.Accent,
        }}>
        Documents
      </Text>
      {docs.map((item, index) => {
        console.log(item);
        return <DisplayDocument key={index} data={item} />;
      })}
    </View>
  );
};

export default Documents;

const styles = StyleSheet.create({
  documentName: {
    fontSize: scale(11),
    fontWeight: '300',
    marginTop: verticalScale(-6),
    paddingBottom: verticalScale(3),
  },
});
