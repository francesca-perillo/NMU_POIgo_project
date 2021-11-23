import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, Pressable, TouchableOpacity } from "react-native";
import colors from '../config/colors';
import { Ionicons, Entypo } from '@expo/vector-icons';

const category = [
    {
        id: "1",
        title: "Cibo",
    },
    {
        id: "2",
        title: "Turismo",
    },
    {
        id: "3",
        title: "Affari",
    },
    {
        id: "4",
        title: "Shopping",
    },
];

const subcategory = [
    {
        id: "1",
        title: "Ristoranti",
    },
    {
        id: "2",
        title: "Pizzerie",
    },
    {
        id: "3",
        title: "Pasticcerie",
    },
    {
        id: "4",
        title: "Enoteche",
    },
];

const CategoryScreen = ({ navigation }) => {

    const [selectedCategory, setSelectedCategory] = useState('1');
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);

    const Item = ({ id, title }) => {
        const isSelected = selectedCategory === id;

        return (
            <TouchableOpacity onPress={() => setSelectedCategory(id)}>
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

    const ItemSubcategory = ({ id, title }) => {
        const isSelected = selectedSubcategories.includes(id);

        return (
            <TouchableOpacity
                style={[
                    styles.subcategoryContainer,
                    ...(isSelected ? [styles.subcategoryContainerPress] : [])
                ]}
                onPress={() => onSubcategoryPress(id)}
            >
                <Text
                    style={[
                        styles.subcategoryText,
                        ...(isSelected ? [styles.subcategoryTextPress] : [])
                    ]}
                >
                    {title}
                </Text>
            </TouchableOpacity>
        )
    };

    const renderItem = ({ item }) => (
        <Item id={item.id} title={item.title} />
    );

    const renderSubcategory = ({ item }) => (
        <ItemSubcategory id={item.id} title={item.title} />
    );

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.title}>Categorie</Text>
                <Entypo style={styles.notification} name='bell' size={35} color={colors.dark_blue_palette} onPress={() => alert(`Lista delle notifiche`)} />
            </View>

            <View style={styles.searchbar}>
                <Text style={styles.searchbar_text}>Cerca una categoria</Text>
                <Ionicons style={styles.searchbar_icon} name="search" size={24} color="grey" />
            </View>

            <View style={styles.listOfcategory}>
                <FlatList
                    horizontal={true}
                    data={category}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>

            <View style={styles.listOfSubcategory}>
                <FlatList
                    numColumns={3}
                    data={subcategory}
                    renderItem={renderSubcategory}
                    keyExtractor={(item) => item.id}
                />
            </View>

            <Pressable style={styles.buttonGoMap} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonGoMapText} >Vai alla mappa</Text>
            </Pressable>
            <Pressable style={styles.buttonGoList} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonGoListText} >Vai alla lista</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 100,
        flexDirection: 'row',
    },
    title: {
        top: 50,
        fontSize: 40,
        fontWeight: 'bold',
        color: colors.dark_blue_palette,
        paddingLeft: 20,
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
        marginLeft: 15,
        marginRight: 15,
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
        marginHorizontal: 10,
        marginTop: 20,
    },
    buttonContainer: {
        padding: 10,
        borderRadius: 10,
        width: 90,
        height: 40,
        margin: 5,
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
        marginHorizontal: 20,
        marginTop: 20,
    },
    subcategoryContainer: {
        borderRadius: 10,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: 'white',
    },
    subcategoryContainerPress: {
        backgroundColor: colors.pale_blue_palette,
    },
    subcategoryText: {
        fontSize: 15,
        textAlign: 'center',
        color: colors.dark_blue_palette,
    },
    subcategoryTextPress: {
        color: 'white',
    },
    buttonGoMap: {
        alignItems: "center",
        backgroundColor: colors.dark_blue_palette,
        borderRadius: 50,
        marginTop: 150,
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