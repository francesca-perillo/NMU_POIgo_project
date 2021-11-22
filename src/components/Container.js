import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Container = ({ children }) => {
    return (
        <LinearGradient colors={['#00809A', '#0284C9']} style={styles.linearGradient}>
            {children}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
});

export default Container;