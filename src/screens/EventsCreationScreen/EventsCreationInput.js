import React from 'react';
import {TextInput, Divider} from 'react-native-paper';
import {View, StyleSheet, FlatList} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import LinkItem from './LinkItem';
import * as color from '../../utils/colors';

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
          backgroundColor="#00000000"
          underlineColor="#00000000"
          label="Event Title"
          placeholder="Event Title (max 300)"
          value={inputStates.title}
          onChangeText={nTitle => inputStates.setTitle(nTitle)}
          left={<TextInput.Icon name={'lead-pencil'} color={color.BLACK} />}
        />
      </View>
      <View style={styles.viewScale}>
        <TextInput
          backgroundColor="#00000000"
          underlineColor="#00000000"
          label="Event Description"
          placeholder="Event Description"
          value={inputStates.desc}
          onChangeText={nDesc => inputStates.setDesc(nDesc)}
          multiline={true}
          left={<TextInput.Icon name={'text-subject'} color={color.BLACK} />}
        />
      </View>
      <View style={styles.viewScale}>
        <TextInput
          underlineColor="#00000000"
          label="Event Links"
          placeholder="Event Links"
          value={inputStates.link}
          onChangeText={nLinks => inputStates.setLink(nLinks)}
          left={<TextInput.Icon name={'link'} color={color.BLACK} />}
          right={<TextInput.Icon name={'plus'} onPress={() => addLink()} />}
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
    paddingHorizontal: scale(2),
    paddingVertical: verticalScale(4),
  },
});

export default EventCreationInputs;
