import React from "react";
import { StyleSheet, Text, View } from 'react-native';

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
        fontSize: 20,
        color: '#0A3556',
    },
    infoDetail: {
        fontSize: 20,
    },
});

export default ContactInfo;