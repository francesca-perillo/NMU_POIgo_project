import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground, Alert, Dimensions } from "react-native";
import colors from '../config/colors';
import { Ionicons, Entypo } from '@expo/vector-icons';
import * as CategoriesRoutesController from '../controller/CategoriesRoutesController';

// const category = [
//     {
//         id: "1",
//         title: "Vie dello shopping",
//         image: require("../../assets/img/categoryRoutes/shopping.jpg"),
//     },
//     {
//         id: "2",
//         title: "Percorsi enogastronomici",
//         image: require("../../assets/img/categoryRoutes/gastronomy.jpg"),
//     },
//     {
//         id: "4",
//         title: "Vie dell'artigianato",
//         image: require("../../assets/img/categoryRoutes/craftsmanship.jpg"),
//     },
// ];

const CategoryRoutesScreen = ({ navigation }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            const categoriesFromApi = await CategoriesRoutesController.getAllCategories();
            const categories = categoriesFromApi.map(category => {
                return {
                    id: category._id,
                    title: category.name,
                    image: category.photo,
                }
            });

            setCategories(categories);
        };

        loadCategories();
    }, [])

    const renderItem = ({ item }) => (
        <Item id={item.id} title={item.title} image={item.image} />
    );

    const Item = ({ id, title, image }) => {
        return (
            <TouchableOpacity onPress={() => Alert.alert('Vai alla mappa')}>
                <View style={styles.categoryContainer}>
                    <ImageBackground source={{ uri: image }} style={styles.categoryImage}>
                        <View style={styles.darkOverlay} />
                    </ImageBackground>

                    <View style={styles.categoryTextContainer}>
                        <Text style={styles.categoryText}>
                            {title}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.title}>Percorsi</Text>
                <Text style={styles.subtitle}>Scegli la tua avventura!</Text>
            </View>

            <View style={styles.listOfcategory}>
                <FlatList
                    vertical={true}
                    data={categories}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: Dimensions.get('window').height / 6,
        backgroundColor: colors.dark_blue_palette,
        borderBottomRightRadius: 200,
    },
    title: {
        fontSize: 40,
        color: colors.white,
        fontWeight: "bold",
        marginTop: Dimensions.get('window').height / 16,
        marginLeft: 20
    },
    subtitle: {
        color: colors.grey,
        fontSize: 25,
        marginLeft: 20,
        fontStyle: "italic",
    },
    notification: {
        position: 'absolute',
        top: 50,
        right: 40,
    },
    searchbar: {
        backgroundColor: 'white',
        borderRadius: 10,
        height: 50,
        marginLeft: 10,
        marginRight: 10,
        padding: 15,
        flexDirection: 'row',
    },
    searchbar_text: {
        fontSize: 15,
        color: colors.grey,
        left: 10,
    },
    searchbar_icon: {
        position: 'absolute',
        top: 10,
        right: 30,
    },
    listOfcategory: {
        borderRadius: 10,
        margin: 10,
        marginTop: 15,
    },
    categoryContainer: {
        height: 100,
        width: '100%',
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden',
    },
    darkOverlay: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        backgroundColor: 'black',
        borderRadius: 20,
        opacity: 0.5,
    },
    categoryImage: {
        height: '100%',
        width: '100%',
        borderRadius: 20,
        opacity: 1,
    },
    categoryTextContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 1,
        shadowColor: 'black',
    },
    categoryText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        opacity: 1,
    }
})

export default CategoryRoutesScreen;