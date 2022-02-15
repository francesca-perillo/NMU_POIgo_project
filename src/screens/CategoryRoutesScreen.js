import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground, Alert, Dimensions } from "react-native";
import colors from '../config/colors';
import * as CategoriesRoutesController from '../controller/CategoriesRoutesController';

const category = [
    {
        id: '6201441a99be0e7cfe49a2d2',
        title: 'Colline storiche',
        image: 'https://res.cloudinary.com/silviodima/image/upload/v1644249585/POIGO/path_colline_storiche_jkgiu9.jpg',
    },
    {
        id: "2",
        title: "Vie dello shopping",
        image: "https://res.cloudinary.com/silviodima/image/upload/v1644924237/POIGO/shopping_iutvtq.jpg",
    },
    {
        id: "3",
        title: "Percorso enogastronomico",
        image: "https://res.cloudinary.com/silviodima/image/upload/v1644924236/POIGO/gastronomy_rxbts7.jpg",
    },
    {
        id: "4",
        title: "Percorso storico-artistico",
        image: "https://res.cloudinary.com/silviodima/image/upload/v1644924235/POIGO/museum_iivnzr.jpg",
    },
];

const CategoryRoutesScreen = ({ navigation }) => {
    //Qui le categorie vengono prese dal db, ma dal momento che non sono presenti tutte, sono state 
    //importate manualmente sia quelle veritiere che quelle fittizie.
    //Quando si avranno le categorie basterà togliere questo commento, le categorie fittizie e sarà funzionante.
    /*
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
    */

    const renderItem = ({ item }) => (
        <Item id={item.id} title={item.title} image={item.image} />
    );

    const Item = ({ id, title, image }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Route', { category: id })}>
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
                    data={category}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: (Dimensions.get('window').height / 13) * 2,
        backgroundColor: colors.beau_blue,
        alignItems: 'center',
        borderBottomLeftRadius: 100,
    },
    title: {
        fontSize: 30,
        color: colors.dark_blue_palette,
        fontWeight: "bold",
        marginTop: (Dimensions.get('window').height / 12) * 0.75,
    },
    subtitle: {
        color: colors.sea_blue,
        fontSize: 18,
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