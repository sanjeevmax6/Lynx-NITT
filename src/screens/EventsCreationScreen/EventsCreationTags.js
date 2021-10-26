import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {TextInput} from 'react-native-paper';
import EventCreationTagItem from './EventCreationTagItem';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import * as color from '../../utils/colors';
import {verticalScale, scale} from 'react-native-size-matters';

const EventsCreationTag = ({tagStates}) => {
  const [tag, setTag] = useState('');

  const addTag = () => {
    if (tag !== '') {
      tagStates.setTags(prevList => {
        setTag('');
        return [...prevList, tag];
      });
    }
  };

  const removeTag = delTag => {
    tagStates.setTags(prevList => {
      return prevList.filter(item => item != delTag);
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        underlineColor="transparent"
        label="Add Tags"
        style={styles.textInputStyle}
        placeholder="Add Tags"
        multiline={true}
        value={tag}
        theme={{
          colors: {
            primary: color.BLACK,
          },
        }}
        onChangeText={nTag => {
          setTag(nTag);
        }}
        left={<TextInput.Icon name={'tag'} color={color.BLACK} />}
        right={
          <TextInput.Icon
            name={'plus'}
            color={color.BLACK}
            onPress={() => addTag()}
          />
        }
      />
      {tagStates.tags.length > 0 && (
        <FlatList
          listKey="tags"
          style={styles.flatListStyle}
          data={tagStates.tags}
          renderItem={({item}) => (
            <EventCreationTagItem item={item} removeTag={removeTag} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputStyle: {
    backgroundColor: color.GRAY_LIGHT,
    marginHorizontal: HorizontalPadding,
    marginVertical: verticalScale(8),
  },
  flatListStyle: {
    flexDirection: 'row',
    paddingHorizontal: scale(4),
    marginBottom: verticalScale(8),
    flexWrap: 'wrap',
  },
});

export default EventsCreationTag;
