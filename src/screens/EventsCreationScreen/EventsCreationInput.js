import React from 'react';
import {TextInput} from 'react-native-paper';
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
  const onChangeTitleLength = text => {
    inputStates.setTitleLength(inputStates.maxTitleLength - text.length);
  };
  const onChangeDescLength = text => {
    inputStates.setDescLength(inputStates.maxDescLength - text.length);
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
          placeholder="Event Title (max 150)"
          multiline={true}
          value={inputStates.title}
          theme={{
            colors: {
              primary: color.BLACK,
            },
          }}
          onChangeText={nTitle => {
            inputStates.setTitle(nTitle);
            onChangeTitleLength(nTitle);
          }}
          left={<TextInput.Icon name={'lead-pencil'} color={color.BLACK} />}
          right={<TextInput.Affix text={'/' + inputStates.titleLength} />}
        />
        {/*
        <Text
          style={[
            styles.wordCount,
            {color: inputStates.titleLength < 0 ? 'red' : 'black'},
          ]}>
          {inputStates.titleLength}
        </Text>
        */}
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
          multiline={true}
          theme={{
            colors: {
              primary: color.BLACK,
            },
          }}
          placeholder="Event Description (max 300)"
          value={inputStates.desc}
          onChangeText={nDesc => {
            inputStates.setDesc(nDesc);
            onChangeDescLength(nDesc);
          }}
          multiline={true}
          left={<TextInput.Icon name={'text-subject'} color={color.BLACK} />}
          right={<TextInput.Affix text={'/' + inputStates.descLength} />}
        />
        {/*
        <Text
          style={[
            styles.wordCount,
            {color: inputStates.descLength < 0 ? 'red' : 'black'},
          ]}>
          {inputStates.descLength}
        </Text>
        */}
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
          theme={{
            colors: {
              primary: color.BLACK,
            },
          }}
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

export default EventCreationInputs;
