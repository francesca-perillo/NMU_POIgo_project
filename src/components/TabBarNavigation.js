import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const TabBarNavigation = ({ tabs, navigationProps }) => {
    return (
        <View style={styles.container}>
            {tabs.map((tab, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        style={styles.tab}
                        onPress={() => navigationProps.navigation.navigate(tab.route)}
                    >
                        <Text>
                            <Ionicons name={tab.icon} size={30} color={'#0A3556'} />
                        </Text>
                        <Text style={styles.tabText}>{tab.name}</Text>
                    </TouchableOpacity>
                );
            })}
        </View> 
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#D7E5EE",
        margin: 20,
        padding: 10,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 10,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 20,
    },
    tab: {
        alignItems: "center",
    },
    tabText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#0A3556",
    },
});

export default TabBarNavigation;