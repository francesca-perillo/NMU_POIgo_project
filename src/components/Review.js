import React from "react";
import { StyleSheet, Text, View } from 'react-native';

const Review = ({ review }) => {
    return (
        <View style={styles.reviewsContainer}>
            <Text style={styles.userName}>{review.userName}</Text>
            <Text style={styles.reviewsDescription}>
                {review.description}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    reviewsContainer: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 5,
        backgroundColor: '#F5F5F5',
    },
    userName: {
        fontSize: 20,
        color: '#0A3556'
    },
    reviewsDescription: {
    }
});

export default Review;