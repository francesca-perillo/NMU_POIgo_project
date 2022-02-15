import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import colors from "../config/colors";

const ContactInfo = ({ contactInfo }) => {
    return (
        <View style={styles.infoRow}>
            <Text style={styles.infoName}>{contactInfo.name}</Text>
            <Text style={styles.infoDetail}>{contactInfo.detail}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    infoRow: {
        flexDirection: 'row',
    },
    infoName: {
        fontSize: 18,
        color: colors.dark_blue_palette,
    },
    infoDetail: {
        fontSize: 18,
        marginRight: 60,
    },
});

export default ContactInfo;