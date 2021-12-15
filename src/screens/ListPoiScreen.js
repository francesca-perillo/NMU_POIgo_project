import React from "react";
import { StyleSheet, Text, View, Pressable, FlatList, TouchableOpacity, SafeAreaView, Image } from "react-native";
import colors from '../config/colors';
import { Ionicons, Entypo } from '@expo/vector-icons';

//dati per la popolazione statica degli alert
const data_items = [
    {
        id: "1",
        title: 'Tavernetta da ciccio',
        message: 'Caratteristica cucina tipica locale, ci troviamo in via roba 56.',
        img: 'https://www.facebook.com/tavernetta58/photos/a.883014318494234/2923881761074136',
    },
    {
        id: "2",
        title: 'Faro Capo Trionto ',
        message: 'Angolo suggestivo dello ionio, mare stupendo e pace',
        img: 'https://www.investinitalyrealestate.com/wp-content/uploads/2019/07/FaroCapoTrionto_Corigliano_CS_EST_02-2-700x466.jpg',
    },
    {
        id: "3",
        title: 'Muraglie di Annibale',
        message: 'Di notevole interesse archeologico-ambientale: le cosiddette “Muraglie di Annibale”. Si tratta di un vasto insediamento di un ignoto ...',
        img: 'https://ecodellojonio.b-cdn.net/media/posts/2014/06/muraglie-17.jpg?aspect_ratio=16:9&width=1152',
    },
    {
        id: "4",
        title: 'Fiume Trionto',
        message: 'Il territorio di Pietrapaola, che si estende dal Mar Ionio alla Presila, di probabile origine Brettia, è caratterizzato dalla particolare presenza di grotte e ...',
        img: 'http://www.mobitaly.it/MultimediaFiles/Img/FiumeTrionto_1.JPG',
    },
];

const Item = ({ title, message, img }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.hidden}>{message}</Text>
            <View style={styles.item}>
                <Image
                    style={styles.image_item}
                    source={{
                        uri: img,
                    }}
                />
                <View style={styles.description_item}>
                    <Text style={styles.title_item}>{title}</Text>
                    <Text style={styles.message_item}>{message}</Text>
                </View>

            </View>
        </SafeAreaView>
    )
};

function ListPoiScreen() {

    const renderItem = ({ item }) => (
        <Item
            title={item.title}
            message={item.message}
            img={item.img} />
    );

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.titleScreen}>Lista POI</Text>
                <Entypo style={styles.notification} name='bell' size={35} color={colors.dark_blue_palette} onPress={() => alert(`Lista delle notifiche`)} />
            </View>

            <View style={styles.searchbar}>
                <Text style={styles.searchbar_text}>Cerca un punto d'interesse</Text>
                <Ionicons style={styles.searchbar_icon} name="search" size={24} color="grey" />
            </View>

            <View style={styles.body}>
                <FlatList
                    data={data_items}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>

            <Pressable style={styles.buttonGoMap} onPress={() => navigation.navigate('Map')}>
                <Text style={styles.buttonGoMapText} >Vai alla mappa</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dirty_white_palette,
        borderWidth: 1,
        borderColor: colors.dirty_white_palette,
        borderBottomColor: colors.grey,
        marginRight: 10,
        marginLeft: 10,
    },
    header: {
        height: 100,
        flexDirection: 'row',
    },
    body: {
        flex: 6,
        alignItems: "center",
    },
    titleScreen: {
        top: 50,
        fontSize: 40,
        fontWeight: 'bold',
        color: colors.dark_blue_palette,
        paddingLeft: 20,
    },
    title: {
        fontSize: 24,
        color: 'white',
    },
    containerList: {
        flexDirection: 'row',
        height: 550,
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

    buttonGoMap: {
        alignItems: "center",
        backgroundColor: colors.dark_blue_palette,
        borderRadius: 50,
        marginTop: 20,
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

export default ListPoiScreen;