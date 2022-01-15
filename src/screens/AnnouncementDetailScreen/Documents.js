import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {API_GET_IMAGE} from '../../utils/API_CONSTANTS';
import * as colors from '../../utils/colors';

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
            style={{
              fontSize: scale(12),
              fontWeight: '500',
              marginTop: verticalScale(0),
              paddingBottom: verticalScale(3),
            }}>
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
                }}>
                <Image
                  style={{
                    width: scale(150),
                    height: scale(150),
                    marginVertical: verticalScale(10),
                  }}
                  resizeMode="contain"
                  source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png',
                  }}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: scale(12),
                    fontWeight: '500',
                    marginTop: verticalScale(-6),
                    paddingBottom: verticalScale(3),
                  }}>
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
                }}>
                <Image
                  style={{
                    width: scale(150),
                    height: scale(150),
                    marginVertical: verticalScale(10),
                  }}
                  resizeMode="contain"
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/270/270006.png',
                  }}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: scale(12),
                    fontWeight: '500',
                    marginTop: verticalScale(-6),
                    paddingBottom: verticalScale(3),
                  }}>
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

const styles = StyleSheet.create({});
