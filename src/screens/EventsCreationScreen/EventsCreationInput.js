import React from 'react';
import {TextInput, Divider} from 'react-native-paper';
import {View, StyleSheet, FlatList} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import LinkItem from './LinkItem';
import * as color from '../../utils/colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
const EventCreationInputs = ({inputStates}) => {
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

  return (
    <View style={styles.container}>
      <View style={styles.viewScale}>
        <TextInput
          underlineColor="transparent"
          label="Event Title"
          style={{
            backgroundColor: color.GRAY_LIGHT,
            marginHorizontal: HorizontalPadding,
            borderTopLeftRadius: moderateScale(12),
          }}
          placeholder="Event Title (max 300)"
          value={inputStates.title}
          onChangeText={nTitle => inputStates.setTitle(nTitle)}
          left={<TextInput.Icon name={'lead-pencil'} color={color.Tertiary} />}
        />
      </View>
      <View style={styles.viewScale}>
        <TextInput
          underlineColor="transparent"
          style={{
            backgroundColor: color.GRAY_LIGHT,
            marginHorizontal: HorizontalPadding,
            // borderTopLeftRadius: moderateScale(9),
          }}
          label="Event Description"
          placeholder="Event Description"
          value={inputStates.desc}
          onChangeText={nDesc => inputStates.setDesc(nDesc)}
          multiline={true}
          left={<TextInput.Icon name={'text-subject'} color={color.Tertiary} />}
        />
      </View>
      <View style={styles.viewScale}>
        <TextInput
          underlineColor="transparent"
          style={{
            backgroundColor: color.GRAY_LIGHT,
            marginHorizontal: HorizontalPadding,
            borderBottomRightRadius: moderateScale(12),
          }}
          label="Event Links"
          placeholder="Event Links"
          value={inputStates.link}
          onChangeText={nLinks => inputStates.setLink(nLinks)}
          left={<TextInput.Icon name={'link'} color={color.Tertiary} />}
          right={
            <TextInput.Icon
              name={'plus'}
              color={color.Tertiary}
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
});

export default EventCreationInputs;
