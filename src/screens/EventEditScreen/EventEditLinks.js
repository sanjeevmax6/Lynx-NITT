import React from 'react';
import {View, FlatList} from 'react-native';
import {TextInput} from 'react-native-paper';
import LinkItem from './LinkItem';
import * as colors from '../../utils/colors';
import {EVENT_EDIT_STORE} from '../../mobx/EVENT_EDIT_STORE';
import styles from './styles';
import {observer} from 'mobx-react';
import {verticalScale} from 'react-native-size-matters';

const EventEditLinks = observer(() => {
  return (
    <View>
      <View style={styles.viewScale}>
        <TextInput
          underlineColor="transparent"
          label="Event Links"
          placeholder="Event Links"
          style={styles.textInputStyles}
          value={EVENT_EDIT_STORE.getEditLink}
          selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
          theme={{
            colors: {
              primary: colors.BLACK,
            },
          }}
          onChangeText={nLink => EVENT_EDIT_STORE.setEditLink(nLink)}
          left={<TextInput.Icon name={'link'} color={colors.BLACK} />}
          right={
            <TextInput.Icon
              name={'plus'}
              color={colors.BLACK}
              onPress={() => EVENT_EDIT_STORE.addLink()}
            />
          }
        />
        {EVENT_EDIT_STORE.getEditLinks.length > 0 && (
          <View style={{paddingVertical: verticalScale(4)}}>
            {EVENT_EDIT_STORE.getEditLinks.map((link, index) => {
              return <LinkItem item={link} index={index} key={index} />;
            })}
            {/* <FlatList
              data={EVENT_EDIT_STORE.getEditLinks}
              renderItem={props => {
                return <LinkItem item={props.item} index={props.index} />;
              }}
            /> */}
          </View>
        )}
      </View>
    </View>
  );
});

export default EventEditLinks;
