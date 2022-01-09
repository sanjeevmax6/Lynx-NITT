import React from 'react';
import {TextInput} from 'react-native-paper';
import {View} from 'react-native';
import * as color from '../../utils/colors';
import {EVENT_EDIT_STORE} from '../../mobx/EVENT_EDIT_STORE';
import Error from '../../components/Error';
import {
  EVENT_TITLE_MAX_SIZE,
  EVENT_DESC_MAX_SIZE,
} from '../../utils/UI_CONSTANTS';
import styles from './styles';
import {observer} from 'mobx-react';
import {verticalScale} from 'react-native-size-matters';

const EventEditInput = observer(() => {
  return (
    <View style={{marginTop: verticalScale(4)}}>
      {/* EVENT TITLE */}
      <View style={styles.viewScale}>
        <TextInput
          style={styles.textInputStyles}
          underlineColor="transparent"
          label="Event Title"
          multiline={true}
          theme={{
            colors: {
              primary: color.BLACK,
            },
          }}
          selectionColor={color.WHITE}
          placeholder={`Event Title (max ${EVENT_TITLE_MAX_SIZE})`}
          value={EVENT_EDIT_STORE.getEditTitle}
          onChangeText={nTitle => EVENT_EDIT_STORE.setEditTitle(nTitle)}
          left={<TextInput.Icon name={'lead-pencil'} color={color.Accent} />}
          right={
            <TextInput.Affix
              text={'/' + EVENT_EDIT_STORE.getCharLeftTitle}
              textStyle={{
                color:
                  EVENT_EDIT_STORE.getCharLeftTitle < 0
                    ? color.Tertiary
                    : color.GRAY_DARK,
              }}
            />
          }
        />
        {EVENT_EDIT_STORE.getTitleError === 1 && (
          <Error text="Please fill in the Title" />
        )}
        {EVENT_EDIT_STORE.getTitleError === 2 && (
          <Error text="Exceeds Word Limit" />
        )}
      </View>

      {/* EVENT DESCRIPTION */}
      <View style={styles.viewScale}>
        <TextInput
          style={styles.textInputStyles}
          underlineColor="transparent"
          label="Event Description"
          placeholder={`Event Description (max ${EVENT_DESC_MAX_SIZE})`}
          value={EVENT_EDIT_STORE.getEditDesc}
          theme={{
            colors: {
              primary: color.BLACK,
            },
          }}
          selectionColor={color.WHITE}
          onChangeText={nDesc => EVENT_EDIT_STORE.setEditDesc(nDesc)}
          multiline={true}
          left={<TextInput.Icon name={'text-subject'} color={color.BLACK} />}
          right={
            <TextInput.Affix
              text={'/' + EVENT_EDIT_STORE.getCharLeftDesc}
              textStyle={{
                color:
                  EVENT_EDIT_STORE.getCharLeftDesc < 0
                    ? color.Tertiary
                    : color.GRAY_DARK,
              }}
            />
          }
        />
        {EVENT_EDIT_STORE.getDescError === 1 && (
          <Error text="Please fill in the Description" />
        )}
        {EVENT_EDIT_STORE.getDescError === 2 && (
          <Error text="Exceeds Word Limit" />
        )}
      </View>
    </View>
  );
});

export default EventEditInput;
