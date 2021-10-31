import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import EventCreationTagItem from './EventCreationTagItem';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import * as color from '../../utils/colors';
import {
  verticalScale,
  scale,
  ScaledSheet,
  moderateScale,
} from 'react-native-size-matters';
import LinkItem from './LinkItem';
import Error from './Error';
import {eventCreation_ImageTitle} from '../../utils/stringConstants';

const WIDTH = Dimensions.get('window').width;

const EventsCreationTag = ({tagStates, scrollViewRef, callback}) => {
  //handling scroll
  const createEvent = () => {
    if (tagStates.tags.length == 0) {
      setTagEr(true);
      return;
    }
    if (tagStates.links.length == 0) {
      setLinkEr(true);
      return;
    }

    console.log('Event Created');
  };

  const back = () => {
    callback(eventCreation_ImageTitle, 4);
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: WIDTH * 3,
        animated: true,
      });
      Keyboard.dismiss();
    }
  };
  //

  const [tag, setTag] = useState('');
  const [tagEr, setTagEr] = useState(false);
  const [linkEr, setLinkEr] = useState(false);
  const addTag = () => {
    if (tag !== '') {
      tagStates.setTags(prevList => {
        setTag('');
        console.log(tagStates.tags);
        return [...prevList, tag];
      });
    }
    setTagEr(false);
  };

  const removeTag = delTag => {
    tagStates.setTags(prevList => {
      return prevList.filter(item => item != delTag);
    });
  };
  const addLink = () => {
    if (tagStates.link !== '') {
      tagStates.setLinks(prevList => {
        return [tagStates.link, ...prevList];
      });
      tagStates.setLink('');
    }
    setLinkEr(false);
  };

  const removeLink = link => {
    tagStates.setLinks(prevList => {
      return prevList.filter(item => item != link);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
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
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {tagStates.tags.map((item, index) => {
              return (
                <View key={index}>
                  <EventCreationTagItem item={item} removeTag={removeTag} />
                </View>
              );
            })}
          </View>
        )}
        {tagEr && <Error text={'Please add a Tag'} />}
      </View>
      <View style={styles.viewScale}>
        <TextInput
          underlineColor="transparent"
          style={{
            backgroundColor: color.GRAY_LIGHT,
            borderTopRightRadius: moderateScale(9),
            borderTopLeftRadius: moderateScale(9),
            borderBottomLeftRadius: moderateScale(9),
            borderBottomRightRadius: moderateScale(9),
          }}
          label="Event Links"
          placeholder="Event Links"
          value={tagStates.link}
          theme={{
            colors: {
              primary: color.BLACK,
            },
          }}
          onChangeText={nLinks => tagStates.setLink(nLinks)}
          left={<TextInput.Icon name={'link'} color={color.BLACK} />}
          right={
            <TextInput.Icon
              name={'plus'}
              color={color.BLACK}
              onPress={() => addLink()}
            />
          }
        />
        {tagStates.links.length > 0 && (
          <View style={styles.viewScale}>
            <FlatList
              data={tagStates.links}
              renderItem={({item}) => (
                <LinkItem item={item} deleteItem={removeLink} />
              )}
            />
          </View>
        )}
        {linkEr && <Error text={'Please add a Link'} />}
      </View>

      {/* Navigation Buttons */}
      <Button
        style={styles.next}
        mode="contained"
        labelStyle={{color: color.regNext}}
        onPress={createEvent}>
        Create Event
      </Button>
      <Button
        style={styles.back}
        mode="outline"
        onPress={back}
        labelStyle={{color: color.regAttach}}
        icon="chevron-left">
        Back
      </Button>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    paddingHorizontal: scale(HorizontalPadding),
  },
  tagContainer: {},
  textInputStyle: {
    backgroundColor: color.GRAY_LIGHT,
    borderTopRightRadius: moderateScale(9),
    borderTopLeftRadius: moderateScale(9),
    borderBottomLeftRadius: moderateScale(9),
    borderBottomRightRadius: moderateScale(9),
  },
  flatListStyle: {
    flexDirection: 'row',
    paddingHorizontal: scale(4),
    marginBottom: verticalScale(8),
    flexWrap: 'wrap',
  },
  next: {
    position: 'absolute',
    bottom: '20@vs',
    right: '20@vs',
    backgroundColor: color.regAttach,
  },
  back: {
    position: 'absolute',
    bottom: '20@vs',
    left: '10@vs',
  },
  viewScale: {
    paddingVertical: verticalScale(4),
  },
});

export default EventsCreationTag;
