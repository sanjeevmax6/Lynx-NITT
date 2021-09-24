import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Image
} from 'react-native';
import { scale } from 'react-native-size-matters';
import * as color from '../../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const ClubSearchCard = ({ clubIconUrl, clubName, clubDescription, isFollowing }) => {
    return (
        <TouchableOpacity >
            <View style={styles.container}>
                <View style={styles.imageView}>
                    <Image style={styles.clubIcon}
                        PlaceholderContent={<ActivityIndicator color={color.Secondary} />}
                        source={{ uri: clubIconUrl }} />
                </View>
                <View style={styles.item}>
                    <Text style={styles.headerText}>{clubName}</Text>
                    <Text style={styles.itemText}>{clubDescription}</Text>
                    {isFollowing ? <Text style={styles.itemText}>Following</Text> : null}
                </View>
                <View style={styles.iconStyle}>
                    <Icon name='close' size={17.5} color={color.GRAY_DARK} />
                </View>
            </View>
        </TouchableOpacity>
    )
};

export default ClubSearchCard;

const styles = StyleSheet.create({
    container: {
        margin: scale(5),
        flexDirection: 'row',
        flexWrap: "wrap",
        flex: 1
    },

    clubIcon:
    {
        borderRadius: scale(25),
        justifyContent: 'center',
        width: scale(50),
        marginLeft: scale(5),
        height: scale(50),
    },

    headerText: {
        fontSize: scale(12),
        fontWeight: 'bold',
    },

    item: {
        flex: 1,
        marginLeft: scale(13),
        justifyContent: 'center',
        flexDirection: 'column',
    },

    itemText: {
        fontSize: scale(12),
    },

    imageView: {
        justifyContent: 'center',
    },

    iconStyle: {
        justifyContent: 'center',
        paddingRight: scale(5)
    }
})