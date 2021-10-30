import React, {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {View, StyleSheet, FlatList, Dimensions, Keyboard} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import * as color from '../../utils/colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {SafeAreaView} from 'react-native-safe-area-context';
import Error from './Error';
const WIDTH = Dimensions.get('window').width;
const EventCreationInputs = ({inputStates, scrollViewRef, callback}) => {
  const maxTitleLength = 150;
  const maxDescLength = 300;

  const [titleLength, setTitleLength] = useState(maxTitleLength);
  const [descLength, setDescLength] = useState(maxDescLength);

  const onChangeTitleLength = text => {
    setTitleLength(maxTitleLength - text.length);
  };
  const onChangeDescLength = text => {
    setDescLength(maxDescLength - text.length);
  };

  const [titleEr, setTitleEr] = useState(0);
  const [descEr, setdescEr] = useState(0);
  const scroll = () => {
    setTitleEr(0);
    setdescEr(0);
    if (!inputStates.title) {
      setTitleEr(1);
      return;
    }
    if (!inputStates.desc) {
      setdescEr(1);
      return;
    }
    if (titleLength < 0) {
      setTitleEr(2);
      return;
    }
    if (descLength < 0) {
      setdescEr(2);
      return;
    }

    callback('Date and Time', 2);
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: WIDTH,
        animated: true,
      });
      Keyboard.dismiss();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewScale}>
        <TextInput
          underlineColor="transparent"
          label="Event Title"
          style={{
            backgroundColor: color.GRAY_LIGHT,
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
          right={<TextInput.Affix text={'/' + titleLength} />}
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

        {titleEr == 1 && <Error text="Please fill in the Title" />}
        {titleEr == 2 && <Error text="Exceeds Word Limit" />}
      </View>
      <View style={styles.viewScale}>
        <TextInput
          underlineColor="transparent"
          style={{
            backgroundColor: color.GRAY_LIGHT,

            borderTopLeftRadius: moderateScale(9),
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
          right={<TextInput.Affix text={'/' + descLength} />}
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

        {descEr == 1 && <Error text="Please fill in the Description" />}
        {descEr == 2 && <Error text="Exceeds Word Limit" />}
      </View>
      <Button
        style={styles.next}
        mode="contained"
        onPress={scroll}
        labelStyle={{color: color.regNext}}>
        Next
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: verticalScale(4),
    width: WIDTH,
  },
  viewScale: {
    paddingHorizontal: HorizontalPadding,
    paddingVertical: verticalScale(4),
  },
  wordCount: {
    fontSize: scale(10),
    textAlign: 'right',
    paddingHorizontal: HorizontalPadding,
  },
  next: {
    position: 'absolute',
    bottom: verticalScale(20),
    right: verticalScale(20),
    backgroundColor: color.regAttach,
  },
});

export default EventCreationInputs;
