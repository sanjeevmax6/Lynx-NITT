import React from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import {TextInput} from 'react-native-paper';
import TagItem from './TagItem';
import * as color from '../../utils/colors';
import {EVENT_EDIT_STORE} from '../../mobx/EVENT_EDIT_STORE';
import styles from './styles';
import {observer} from 'mobx-react';
import {verticalScale} from 'react-native-size-matters';

const WIDTH = Dimensions.get('window').width;

const EventEditTags = observer(() => {
  return (
    <View style={{width: WIDTH}}>
      <View style={styles.viewScale}>
        <TextInput
          underlineColor="transparent"
          label="Add Tags"
          placeholder="Add Tags"
          multiline={true}
          style={styles.textInputStyles}
          value={EVENT_EDIT_STORE.getEditTag}
          theme={{
            colors: {
              primary: color.BLACK,
            },
          }}
          selectionColor={color.WHITE}
          onChangeText={nTag => EVENT_EDIT_STORE.setEditTag(nTag)}
          left={<TextInput.Icon name={'tag'} color={color.BLACK} />}
          right={
            <TextInput.Icon
              name={'plus'}
              color={color.BLACK}
              onPress={() => EVENT_EDIT_STORE.addTag()}
            />
          }
        />
        {EVENT_EDIT_STORE.getEditTags.length > 0 && (
          <View
            style={{
              paddingVertical: verticalScale(4),
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {EVENT_EDIT_STORE.getEditTags.map((item, index) => {
              return <TagItem item={item} index={index} key={index} />;
            })}
          </View>
        )}
      </View>
    </View>
  );
});

export default EventEditTags;
