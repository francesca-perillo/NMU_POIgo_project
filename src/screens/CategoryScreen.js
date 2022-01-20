import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, FlatList, Pressable, TouchableOpacity, ImageBackground, Dimensions, Image } from "react-native";
import colors from '../config/colors';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as CategoriesController from '../controller/CategoriesController';

const Stack = createNativeStackNavigator();

const CategoryScreen = ({ navigation }) => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);

    const navigateToMapWithSection = () => {
        const sections = [];

        selectedSubcategories.forEach(id => {
            categories.forEach(currentCategory =>
                currentCategory.subcategories.filter(subcategory => subcategory.id === id).forEach(subcategory =>
                    subcategory.sections.forEach(section =>
                        sections.push(section)
                    )
                )
            );
        });

        navigation.navigate('Map', { sections: sections })
    };

    const navigateToListWithSection = () => {
        const sections = [];

        selectedSubcategories.forEach(id => {
            categories.forEach(currentCategory =>
                currentCategory.subcategories.filter(subcategory => subcategory.id === id).forEach(subcategory =>
                    subcategory.sections.forEach(section =>
                        sections.push(section)
                    )
                )
            );
        });

        navigation.navigate('ListPoi', { sections: sections })
    };


    useEffect(() => {
        const loadCategories = async () => {
            const categoriesFromApi = await CategoriesController.getAllCategories();
            //L'oggetto categoriesFromApi rappresenta gli oggetti che ho ricevuto dal server. A noi interessa mantenere
            //la vecchia struttura, dunque usiamo map che ci permette di strutturare l'oggetto come vogliamo (come la vecchia struttura).
            const categories = categoriesFromApi.map(category => {
                return {
                    id: category._id,
                    title: category.name,
                    subcategories: category.subcategories.map(subcategory => {
                        return {
                            id: subcategory._id,
                            title: subcategory.name,
                            image: `http://192.168.1.11:3000${subcategory.photo}`,
                            sections: subcategory.sections.map(section => {
                                return {
                                    id: section._id,
                                    title: section.name,
                                }
                            })
                        }
                    })
                }
            });
            setCategories(categories);
            if (categories.length > 0) {
                setSelectedCategory(categories[0].id);
                setSubcategories(categories[0].subcategories);
            }
        };

        loadCategories();
    }, [])

    const onCategoryPress = (categoryId) => {
        setSelectedCategory(categoryId);
        const category = categories.find(category => category.id === categoryId);
        setSubcategories(category.subcategories);
    }

    const Item = ({ id, title }) => {
        const isSelected = selectedCategory === id;
        return (
            <TouchableOpacity onPress={() => onCategoryPress(id)}>
                <View
                    style={[
                        styles.buttonContainer,
                        ...(isSelected ? [styles.buttonContainerPress] : [])
                    ]}
                >
                    <Text style={[
                        styles.buttonText,
                        ...(isSelected ? [styles.buttonTextPress] : [])
                    ]}>
                        {title}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    };

    const onSubcategoryPress = (id) => {
        if (selectedSubcategories.includes(id)) {
            setSelectedSubcategories(selectedSubcategories.filter(item => item !== id));
        } else {
            setSelectedSubcategories([...selectedSubcategories, id]);
        }
    }

    const ItemSubcategory = ({ id, title, image }) => {
        const isSelected = selectedSubcategories.includes(id);

        return (
            <TouchableOpacity
                style={styles.subcategoryContainer}
                onPress={() => onSubcategoryPress(id)}
            >
                <ImageBackground source={{ uri: image }} style={[
                    styles.image,
                    ...(isSelected ? [styles.imagePress] : []),
                ]}>
                    <View style={styles.darkOverlay} />
                </ImageBackground>
                <View style={styles.subcategoryTextContainer}>
                    <Text style={styles.subcategoryText}>
                        {title}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    };

    const renderItem = ({ item }) => (
        <Item id={item.id} title={item.title} />
    );

    const renderSubcategory = ({ item }) => (
        <ItemSubcategory id={item.id} title={item.title} image={item.image} />
    );

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.title}>Categorie</Text>
                <Text style={styles.subtitle}>Seleziona le tue preferenze!</Text>
            </View>

            <View style={styles.searchbar}>
                <Text style={styles.searchbar_text}>Cerca una categoria</Text>
                <Ionicons style={styles.searchbar_icon} name="search" size={24} color="grey" />
            </View>

            <View style={styles.listOfcategory}>
                <FlatList
                    horizontal={true}
                    data={categories}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>

            <View style={styles.listOfSubcategory}>
                <FlatList
                    numColumns={3}
                    data={subcategories}
                    renderItem={renderSubcategory}
                    keyExtractor={(item) => item.id}
                />
            </View>

            <View style={styles.containerButton}>
                <Pressable style={styles.buttonGoMap} onPress={() => navigateToMapWithSection()}>
                    <Text style={styles.buttonGoMapText} >Vai alla mappa</Text>
                </Pressable>

                <Pressable style={styles.buttonGoList} onPress={() => navigateToListWithSection()}>
                    <Text style={styles.buttonGoListText} >Vai alla lista</Text>
                </Pressable>
            </View>
        </View>
    );
};

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
    searchbar: {
        backgroundColor: 'white',
        top: 10,
        borderRadius: 10,
        height: 50,
        marginLeft: 10,
        marginRight: 10,
        padding: 15,
        flexDirection: 'row',
    },
    searchbar_text: {
        fontSize: 15,
        top: 1,
        color: colors.grey,
        left: 10,
    },
    searchbar_icon: {
        position: 'absolute',
        top: 10,
        right: 30,
    },
    listOfcategory: {
        width: '100%',
        height: 50,
        marginHorizontal: 10,
        marginTop: 30,
    },
    buttonContainer: {
        padding: 10,
        borderRadius: 10,
        width: 150,
        height: 40,
        marginRight: 5,
        backgroundColor: 'white',
    },
    buttonContainerPress: {
        backgroundColor: colors.pale_blue_palette,
    },
    buttonText: {
        fontSize: 15,
        textAlign: 'center',
        color: colors.dark_blue_palette,
    },
    buttonTextPress: {
        color: 'white',
    },
    listOfSubcategory: {
        marginTop: 10,
        height: Dimensions.get('window').height / 6,
    },
    subcategoryContainer: {
        borderRadius: 10,
        width: 110,
        height: 110,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    subcategoryTextContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 1,
        shadowColor: 'black',
    },
    subcategoryText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        opacity: 1,
    },
    image: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        justifyContent: 'center',
        opacity: 0.5,
    },
    imagePress: {
        opacity: 1,
    },
    darkOverlay: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        backgroundColor: 'black',
        borderRadius: 10,
        opacity: 0.5,
    },
    containerButton: {
        width: "100%",
        alignSelf: "center",
        marginTop: Dimensions.get('window').height / 5,
    },
    buttonGoMap: {
        alignItems: "center",
        backgroundColor: colors.dark_blue_palette,
        borderRadius: 50,
        marginTop: 100,
        marginHorizontal: 50,
        paddingVertical: 20,
    },
    buttonGoMapText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 15,
    },
    buttonGoList: {
        alignItems: "center",
        margin: 5,
    },
    buttonGoListText: {
        color: colors.dark_blue_palette,
        fontSize: 15,
        textDecorationLine: 'underline',
    },
})

export default CategoryScreen;