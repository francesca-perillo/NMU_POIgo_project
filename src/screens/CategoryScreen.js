import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Pressable, TouchableOpacity, ImageBackground, Dimensions, Alert } from "react-native";
import colors from '../config/colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as CategoriesController from '../controller/CategoriesController';
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";


const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);


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
                            image: subcategory.photo,
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

        <View style={{ backgroundColor: colors.white }}>

            {/**header: parte superiore dello schermo! */}
            <View
                style={styles.header}>
                <Text style={styles.title}>Categorie</Text>
                <Text style={styles.subtitle}>Scegli le tue preferenze!</Text>
            </View>

            {/**categorie: dati della lista delle categorie scorrevoli orizzontalmente */}
            <View style={styles.listOfcategory}>
                <FlatList
                    horizontal={true}
                    data={categories}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>

            {/**sottocategorie: dati della lista delle sottocategorie scorrevoli verticalmente */}
            <View style={styles.listOfSubcategory}>
                <FlatList
                    numColumns={3}
                    data={subcategories}
                    renderItem={renderSubcategory}
                    keyExtractor={(item) => item.id}
                />
            </View>

            {selectedSubcategories.length > 0 ? (
                <View style={styles.containerButton}>
                    <Pressable style={styles.buttonGoMap} onPress={() => navigateToMapWithSection()}>
                        <Text style={styles.buttonGoMapText} >Vai alla mappa</Text>
                    </Pressable>

                    <Pressable style={styles.buttonGoList} onPress={() => navigateToListWithSection()}>
                        <Text style={styles.buttonGoListText} >Vai alla lista</Text>
                    </Pressable>
                </View>
            ) : (
                <View style={styles.containerButton}>
                    <Pressable style={styles.buttonGoMapDisabled} onPress={() => Alert.alert(
                        'Per poter proseguire, scegli prima una sottocategotia',
                        'Puoi scegliere quello che più fa per te! Affrettati... hai tanti posti ancora da scopire!',
                        [
                            { text: 'Grazie, ho capito!'},
                        ],
                        {
                            cancelable: false
                        })}>
                        <Text style={styles.buttonGoMapTextDisabled} >Vai alla mappa</Text>
                    </Pressable>

                    <Pressable style={styles.buttonGoListDisabled} onPress={() => Alert.alert(
                        'Per poter proseguire, scegli prima una sottocategotia',
                        'Puoi scegliere quello che più fa per te! Affrettati... hai tanti posti ancora da scopire!',
                        [
                            { text: 'Grazie, ho capito!'},
                        ],
                        {
                            cancelable: false
                        })}>
                        <Text style={styles.buttonGoListTextDisabled} >Vai alla lista</Text>
                    </Pressable>
                </View>
            )
            }

        </View>
    );
};

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
    listOfcategory: {
        width: '100%',
        height: 50,
        paddingLeft: 10,
        paddingTop: 10,
        marginTop: (Dimensions.get('window').height / 12) * 0.1,
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    buttonContainer: {
        padding: 10,
        borderRadius: 10,
        width: 150,
        height: 40,
        marginRight: 5,
        backgroundColor: colors.white,
        borderColor: colors.dark_blue_palette,
        borderWidth: 1,
    },
    buttonContainerPress: {
        borderColor: colors.dark_blue_palette,
        borderWidth: 1,
        backgroundColor: colors.dark_blue_palette,
    },
    buttonText: {
        fontSize: 15,
        textAlign: 'center',
        color: colors.dark_blue_palette,
    },
    buttonTextPress: {
        color: colors.white,
    },
    listOfSubcategory: {
        height: Dimensions.get('window').height,
        backgroundColor: colors.white,
        marginTop: 10,
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
        fontSize: 15,
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
        bottom: Platform.OS === "ios" ? Dimensions.get('window').height / 2.5 : Dimensions.get('window').height / 2.7,
        position: 'absolute'
    },
    buttonGoMap: {
        alignItems: "center",
        backgroundColor: colors.dark_blue_palette,
        position: "absolute",
        width: Dimensions.get('window').width / 2.5,
        marginLeft: Dimensions.get('window').width / 12,
        borderWidth: 1,
        borderColor: colors.dark_blue_palette,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 10,
    },
    buttonGoMapDisabled: {
        alignItems: "center",
        borderColor: colors.grey,
        backgroundColor: colors.grey,
        borderWidth: 1,
        position: "absolute",
        width: Dimensions.get('window').width / 2.5,
        marginLeft: Dimensions.get('window').width / 12,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 10,
    },
    buttonGoMapText: {
        color: colors.white,
        textAlign: 'center',
        fontSize: 15,
    },
    buttonGoMapTextDisabled: {
        color: colors.white,
        textAlign: 'center',
        fontSize: 15,
    },
    buttonGoList: {
        alignItems: "center",
        position: "absolute",
        width: Dimensions.get('window').width / 2.5,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 10,
        borderColor: colors.dark_blue_palette,
        borderWidth: 1,
        marginLeft: Dimensions.get('window').width / 2,
    },
    buttonGoListDisabled: {
        alignItems: "center",
        position: "absolute",
        width: Dimensions.get('window').width / 2.5,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 10,
        borderColor: colors.grey,
        borderWidth: 1,
        marginLeft: Dimensions.get('window').width / 2,
    },
    buttonGoListText: {
        color: colors.dark_blue_palette,
        fontSize: 15,
    },
    buttonGoListTextDisabled: {
        color: colors.grey,
        fontSize: 15,
    },
})

export default CategoryScreen;