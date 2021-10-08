import React, {useState, useRef, useEffect} from 'react';
import {
  FlatList,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Text, FAB, IconButton, Divider} from 'react-native-paper';
import DatePicker from 'react-native-modern-datepicker';
import {
  scale,
  ScaledSheet,
  verticalScale,
  moderateScale,
  ms,
} from 'react-native-size-matters';
import moment from 'moment';

let width = Dimensions.get('window').width;

const TopLayout = props => {
  const [expanded, setexpanded] = useState(true);
  const maxHeight = width * 0.9 + 55;
  const animation = useRef(new Animated.Value(maxHeight)).current;
  const [icon, setIcon] = useState('arrow-up-drop-circle');
  const [b, setb] = useState(true);
  const [selDate, setSelDate] = useState(
    new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
  );
  const [day, setDay] = useState('');

  const onSelectedChange = dateString => {
    setSelDate(dateString);
    var d = Date.parse(dateString);
    var day = moment(d).format('LLLL');
    var splitday = day.split(' ');
    var formatday =
      splitday[0] + ' ' + splitday[1] + ' ' + splitday[2] + ' ' + splitday[3];
    setDay(formatday);
    // props.updateDate(d);
  };

  const toggle = () => {
    var ht = 0;
    setb(false);
    setIcon('arrow-down-drop-circle');
    if (!expanded) {
      ht = maxHeight;
      setb(true);
      setIcon('arrow-up-drop-circle');
    }

    Animated.spring(animation, {
      toValue: ht,
      useNativeDriver: false,
    }).start();
    setexpanded(!expanded);
  };

  return (
    <View>
      <Animated.View style={[{height: animation}]}>
        {b && (
          <DatePicker
            selected={selDate}
            mode="calendar"
            minuteInterval={30}
            style={{borderRadius: 10}}
            minHeight={maxHeight}
            onSelectedChange={onSelectedChange}
          />
        )}
      </Animated.View>
      <Divider style={{height: 0.8}} />
      <TouchableOpacity style={styles.dateLayout} onPress={toggle}>
        <Text style={styles.dateText}>{day}</Text>
        <IconButton icon={icon} size={scale(15)} />
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  dateLayout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: '18@s',
    marginLeft: '12@s',
    fontWeight: 'bold',
  },
});

export default TopLayout;
