import React, {useState} from 'react';
import {TextInput, Divider} from 'react-native-paper';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import LinkItem from './LinkItem';
import * as color from '../../utils/colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
const AnnouncementCreationInputs = ({inputStates}) => {
  const addLink = () => {
    if (inputStates.link !== '') {
      inputStates.setLinks(prevList => {
        return [inputStates.link, ...prevList];
      });
      inputStates.setLink('');
    }
  };

  const removeLink = link => {
    inputStates.setLinks(prevList => {
      return prevList.filter(item => item != link);
    });
  };

  const onChangeSubjectLength = text => {
    inputStates.setSubjectLength(inputStates.maxSubjectLength - text.length);
  };
  const onChangeAnnouncementLength = text => {
    inputStates.setAnnouncementLength(
      inputStates.maxAnnouncementLength - text.length,
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewScale}>
        <TextInput
          underlineColor="transparent"
          label="Announcement Subject"
          style={{
            backgroundColor: color.GRAY_LIGHT,
            marginHorizontal: HorizontalPadding,
            borderTopLeftRadius: moderateScale(12),
          }}
          placeholder="Announcement Subject (max 150)"
          value={inputStates.title}
          multiline={true}
          theme={{
            colors: {
              primary: color.BLACK,
            },
          }}
          selectionColor={color.WHITE}
          onChangeText={nTitle => {
            inputStates.setTitle(nTitle);
            onChangeSubjectLength(nTitle);
          }}
          left={<TextInput.Icon name={'lead-pencil'} color={color.BLACK} />}
        />
        <Text
          style={[
            styles.wordCount,
            {color: inputStates.subjectLength < 0 ? 'red' : 'black'},
          ]}>
          {inputStates.subjectLength}
        </Text>
      </View>
      <View style={styles.viewScale}>
        <TextInput
          underlineColor="transparent"
          style={{
            backgroundColor: color.GRAY_LIGHT,
            marginHorizontal: HorizontalPadding,
            // borderTopLeftRadius: moderateScale(9),
          }}
          label="Announcement"
          placeholder="Announcement (max 300)"
          multiline={true}
          theme={{
            colors: {
              primary: color.BLACK,
            },
          }}
          selectionColor={color.WHITE}
          value={inputStates.desc}
          onChangeText={nDesc => {
            inputStates.setDesc(nDesc);
            onChangeAnnouncementLength(nDesc);
          }}
          multiline={true}
          left={<TextInput.Icon name={'text-subject'} color={color.BLACK} />}
        />
        <Text
          style={[
            styles.wordCount,
            {color: inputStates.announcementLength < 0 ? 'red' : 'black'},
          ]}>
          {inputStates.announcementLength}
        </Text>
      </View>
      <View style={styles.viewScale}>
        <TextInput
          underlineColor="transparent"
          style={{
            backgroundColor: color.GRAY_LIGHT,
            marginHorizontal: HorizontalPadding,
            borderBottomRightRadius: moderateScale(12),
          }}
          label="Links"
          placeholder="Links"
          value={inputStates.link}
          theme={{
            colors: {
              primary: color.BLACK,
              underlineColor: color.WHITE,
            },
          }}
          selectionColor={color.WHITE}
          onChangeText={nLinks => inputStates.setLink(nLinks)}
          left={<TextInput.Icon name={'link'} color={color.BLACK} />}
          right={
            <TextInput.Icon
              name={'plus'}
              color={color.BLACK}
              onPress={() => addLink()}
            />
          }
        />
        {inputStates.links.length > 0 && (
          <View style={styles.viewScale}>
            <FlatList
              data={inputStates.links}
              renderItem={({item}) => (
                <LinkItem item={item} deleteItem={removeLink} />
              )}
            />
          </View>
        )}
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

export default AnnouncementCreationInputs;
