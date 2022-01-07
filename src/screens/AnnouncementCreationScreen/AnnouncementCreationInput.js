import React from 'react';
import {TextInput} from 'react-native-paper';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import LinkItem from './LinkItem';
import * as color from '../../utils/colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {ANNOUNCEMENT_CREATION_STORE} from '../../mobx/ANNOUNCEMENT_CREATION_STORE.js';

const maxSubjectLength = 150;
const maxAnnouncementLength = 300;
import {observer} from 'mobx-react';

const AnnouncementCreationInputs = observer(() => {
  const addLink = () => {
    if (ANNOUNCEMENT_CREATION_STORE.getLink.trim() !== '') {
      ANNOUNCEMENT_CREATION_STORE.setLinks([
        ANNOUNCEMENT_CREATION_STORE.getLink.trim(),
        ...ANNOUNCEMENT_CREATION_STORE.getLinks,
      ]);
      ANNOUNCEMENT_CREATION_STORE.setLink('');
    }
  };

  const removeLink = link => {
    ANNOUNCEMENT_CREATION_STORE.setLinks(
      ANNOUNCEMENT_CREATION_STORE.getLinks.filter(item => item !== link),
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
          value={ANNOUNCEMENT_CREATION_STORE.getTitle}
          multiline={true}
          theme={{
            colors: {
              primary: color.BLACK,
            },
          }}
          selectionColor={color.WHITE}
          onChangeText={nTitle => {
            ANNOUNCEMENT_CREATION_STORE.setTitle(nTitle);
          }}
          left={<TextInput.Icon name={'lead-pencil'} color={color.BLACK} />}
        />
        <Text
          style={[
            styles.wordCount,
            {
              color:
                maxSubjectLength - ANNOUNCEMENT_CREATION_STORE.getTitle.length <
                0
                  ? 'red'
                  : 'black',
            },
          ]}>
          {maxSubjectLength - ANNOUNCEMENT_CREATION_STORE.getTitle.length}
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
          value={ANNOUNCEMENT_CREATION_STORE.getDescription}
          placeholder="Announcement (max 300)"
          multiline={true}
          theme={{
            colors: {
              primary: color.BLACK,
            },
          }}
          selectionColor={color.WHITE}
          onChangeText={nDesc => {
            ANNOUNCEMENT_CREATION_STORE.setDescription(nDesc);
          }}
          left={<TextInput.Icon name={'text-subject'} color={color.BLACK} />}
        />
        <Text
          style={[
            styles.wordCount,
            {
              color:
                maxAnnouncementLength -
                  ANNOUNCEMENT_CREATION_STORE.getDescription.length <
                0
                  ? 'red'
                  : 'black',
            },
          ]}>
          {maxAnnouncementLength -
            ANNOUNCEMENT_CREATION_STORE.getDescription.length}
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
          value={ANNOUNCEMENT_CREATION_STORE.getLink}
          theme={{
            colors: {
              primary: color.BLACK,
              underlineColor: color.WHITE,
            },
          }}
          selectionColor={color.WHITE}
          onChangeText={nLinks => ANNOUNCEMENT_CREATION_STORE.setLink(nLinks)}
          left={<TextInput.Icon name={'link'} color={color.BLACK} />}
          right={
            <TextInput.Icon
              name={'plus'}
              color={color.BLACK}
              onPress={() => addLink()}
            />
          }
        />
        {ANNOUNCEMENT_CREATION_STORE.getLinks.length > 0 && (
          <View style={styles.viewScale}>
            <FlatList
              data={ANNOUNCEMENT_CREATION_STORE.getLinks}
              renderItem={({item}) => (
                <LinkItem item={item} deleteItem={removeLink} />
              )}
            />
          </View>
        )}
      </View>
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
    paddingVertical: verticalScale(4),
  },
  wordCount: {
    fontSize: scale(10),
    textAlign: 'right',
    paddingHorizontal: HorizontalPadding,
  },
});

export default AnnouncementCreationInputs;
