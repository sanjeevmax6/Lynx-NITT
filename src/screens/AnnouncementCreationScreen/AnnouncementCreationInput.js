import React from 'react';
import {TextInput} from 'react-native-paper';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import LinkItem from './LinkItem';
import * as colors from '../../utils/colors';
import {
  ANNOUNCEMENT_MAX_LENGTH,
  ANNOUNCEMENT_MAX_TITLE_LENGTH,
  HorizontalPadding,
  MAX_LINKS_ANNOUNCEMENT,
} from '../../utils/UI_CONSTANTS';
import {ANNOUNCEMENT_CREATION_STORE} from '../../mobx/ANNOUNCEMENT_CREATION_STORE.js';
import {useToast} from 'react-native-toast-notifications';

import {observer} from 'mobx-react';
import {isValidLink} from '../../utils/helperFunction/FormValidation';

const AnnouncementCreationInputs = observer(() => {
  const toast = useToast();
  const addLink = async () => {
    if (
      ANNOUNCEMENT_CREATION_STORE.getLinks.length + 1 >
      MAX_LINKS_ANNOUNCEMENT
    ) {
      toast.show('Maximum link count reached', {type: 'warning'});
    }
    if (ANNOUNCEMENT_CREATION_STORE.getLink.trim() !== '') {
      const res = await isValidLink(ANNOUNCEMENT_CREATION_STORE.getLink.trim());
      if (!res) {
        toast.show('Not a valid link', {
          type: 'danger',
        });
        return;
      }

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
          label="Announcement Title"
          style={{
            backgroundColor: colors.GRAY_LIGHT,
            marginHorizontal: HorizontalPadding,
            borderTopLeftRadius: moderateScale(12),
          }}
          placeholder="Announcement Title (max 150)"
          value={ANNOUNCEMENT_CREATION_STORE.getTitle}
          multiline={true}
          theme={{
            colors: {
              primary: colors.BLACK,
            },
          }}
          selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
          onChangeText={nTitle => {
            ANNOUNCEMENT_CREATION_STORE.setTitle(nTitle);
          }}
          left={<TextInput.Icon name={'lead-pencil'} color={colors.BLACK} />}
          right={
            <TextInput.Affix
              text={
                '/' +
                (ANNOUNCEMENT_MAX_TITLE_LENGTH -
                  ANNOUNCEMENT_CREATION_STORE.getTitle.length)
              }
              textStyle={{
                color:
                  ANNOUNCEMENT_MAX_TITLE_LENGTH -
                    ANNOUNCEMENT_CREATION_STORE.getTitle.length <
                  0
                    ? colors.Tertiary
                    : colors.GRAY_DARK,
              }}
            />
          }
        />
      </View>
      <View style={styles.viewScale}>
        <TextInput
          underlineColor="transparent"
          style={{
            backgroundColor: colors.GRAY_LIGHT,
            marginHorizontal: HorizontalPadding,
            // borderTopLeftRadius: moderateScale(9),
          }}
          label="Announcement"
          value={ANNOUNCEMENT_CREATION_STORE.getDescription}
          placeholder="Announcement (max 300)"
          multiline={true}
          theme={{
            colors: {
              primary: colors.BLACK,
            },
          }}
          selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
          onChangeText={nDesc => {
            ANNOUNCEMENT_CREATION_STORE.setDescription(nDesc);
          }}
          left={<TextInput.Icon name={'text-subject'} color={colors.BLACK} />}
          right={
            <TextInput.Affix
              text={
                '/' +
                (ANNOUNCEMENT_MAX_LENGTH -
                  ANNOUNCEMENT_CREATION_STORE.getDescription.length)
              }
              textStyle={{
                color:
                  ANNOUNCEMENT_MAX_LENGTH -
                    ANNOUNCEMENT_CREATION_STORE.getDescription.length <
                  0
                    ? colors.Tertiary
                    : colors.GRAY_DARK,
              }}
            />
          }
        />
      </View>
      <View style={styles.viewScale}>
        <TextInput
          underlineColor="transparent"
          style={{
            backgroundColor: colors.GRAY_LIGHT,
            marginHorizontal: HorizontalPadding,
            borderBottomRightRadius: moderateScale(12),
          }}
          label="Links"
          placeholder="Links"
          value={ANNOUNCEMENT_CREATION_STORE.getLink}
          theme={{
            colors: {
              primary: colors.BLACK,
              underlineColor: colors.WHITE,
            },
          }}
          selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
          onChangeText={nLinks => ANNOUNCEMENT_CREATION_STORE.setLink(nLinks)}
          left={<TextInput.Icon name={'link'} color={colors.BLACK} />}
          right={
            <TextInput.Icon
              name={'plus'}
              color={colors.BLACK}
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
