import React from 'react';
import {View, ScrollView} from 'react-native';
import {Chip, TextInput} from 'react-native-paper';
import * as colors from '../../utils/colors';
import {verticalScale, scale, moderateScale} from 'react-native-size-matters';
import {FEEDBACK_MAX_LENGTH, HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {observer} from 'mobx-react';
import {FEEDBACK_STORE} from '../../mobx/FEEDBACK_STORE';
import ScreenHeader from './ScreenHeader';
import {useIsFocused} from '@react-navigation/native';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';

const FeedBackScreen = observer(({navigation}) => {
  const isFocused = useIsFocused();
  if (isFocused) {
    BOTTOM_NAV_STORE.setTabVisibility(false);
  }

  return (
    <View>
      <ScreenHeader navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextInput
          underlineColor="transparent"
          label={'Feedback'}
          value={FEEDBACK_STORE.getFeedback}
          style={{
            backgroundColor: colors.GRAY_LIGHT,
            borderTopRightRadius: moderateScale(6),
            borderTopLeftRadius: moderateScale(6),
            borderBottomLeftRadius: moderateScale(6),
            borderBottomRightRadius: moderateScale(6),
            marginHorizontal: scale(HorizontalPadding),
            marginTop: verticalScale(10),
          }}
          placeholder={'Give a brief overview'}
          multiline={true}
          keyboardType={'default'}
          theme={{
            colors: {
              primary: colors.BLACK,
            },
          }}
          selectionColor={colors.GRAY_DARK}
          onChangeText={text => {
            FEEDBACK_STORE.setFeedback(text);
          }}
          left={
            <TextInput.Icon name={'tooltip-outline'} color={colors.Accent} />
          }
          right={
            <TextInput.Affix
              text={
                '/' + (FEEDBACK_MAX_LENGTH - FEEDBACK_STORE.getFeedback.length)
              }
              textStyle={{
                color:
                  FEEDBACK_MAX_LENGTH - FEEDBACK_STORE.getFeedback.length < 0
                    ? colors.Tertiary
                    : colors.GRAY_DARK,
              }}
            />
          }
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: verticalScale(25),

            marginHorizontal: scale(HorizontalPadding),
          }}>
          <Chip
            icon={'bug'}
            style={{
              backgroundColor:
                FEEDBACK_STORE.getType === 'Bug'
                  ? colors.GRAY_DARK
                  : colors.GRAY_LIGHT,
            }}
            selectedColor={colors.BLACK}
            selected={FEEDBACK_STORE.getType === 'Bug'}
            onPress={() => {
              FEEDBACK_STORE.setType('Bug');
            }}>
            Bug
          </Chip>
          <Chip
            icon={'star'}
            style={{
              backgroundColor:
                FEEDBACK_STORE.getType === 'Suggestion'
                  ? colors.GRAY_DARK
                  : colors.GRAY_LIGHT,
            }}
            selectedColor={colors.BLACK}
            selected={FEEDBACK_STORE.getType === 'Suggestion'}
            onPress={() => {
              FEEDBACK_STORE.setType('Suggestion');
            }}>
            Suggestion
          </Chip>
        </View>
      </ScrollView>
    </View>
  );
});

export default FeedBackScreen;
