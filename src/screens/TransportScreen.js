import React from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, Dimensions } from "react-native";
import colors from '../config/colors';
//per navigare tra le schermate si importa useNavigator e
//si dichiara const navigation = useNavigation();
import { useNavigation } from '@react-navigation/native';
//barra di ricerca
import { Searchbar } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;

const TransportScreen = () => {
    const navigation = useNavigation();

    // to search bar 
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeText = query => setSearchQuery(query);

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.title}>Offerta di trasporto</Text>
                <Searchbar
                    style={styles.searchbar}
                    placeholder="Cerca..."
                    onChangeText={onChangeText}
                    value={searchQuery}
                />

            </View>

            <View style={styles.information}>
                <Text style={styles.infoText}>In questo momento ti trovi in <Text style={{ fontStyle: 'italic' }}>Via Cristoforo Colombo n.14</Text>, le persone di solito cercano informazioni per:</Text>
            </View>

            <View style={styles.body}>

                <ScrollView>

                    <View style={styles.card}>

                        <View style={styles.row_container}>
                            <Text style={styles.enf}>Da: </Text>
                            <Text>Via Cristoforo Colombo n.14</Text>
                        </View>

                        <View style={styles.row_container}>
                            <Text style={styles.enf}>A: </Text>
                            <Text>Via Lamberti n.64</Text>
                        </View>

                        <View style={styles.line}></View>

                        <View style={styles.row_container}>

                            <View style={[styles.column_container]}>
                                <Text style={styles.mezzoTrasporto1}>BUS</Text>
                                <Text>7.40 - 8:10**</Text>
                                <Text>8:15 - 8:30</Text>
                                <Text>10:30 - 11:00*</Text>
                            </View>

                            <View style={[styles.column_container]}>
                                <Text style={styles.mezzoTrasporto2}>METRO</Text>
                                <Text>X</Text>
                            </View>

                            <View style={[styles.column_container]}>
                                <Text style={styles.mezzoTrasporto3}>TRENO</Text>
                                <Text>X</Text>
                            </View>

                        </View>

                        <View style={styles.line}></View>

                        <Text> * Transita per Via Vergine </Text>
                        <Text> ** Transita per Via Borgogna </Text>

                    </View>

                    {/**SECONDA CARTA */}
                    <View style={styles.card}>

                        <View style={styles.row_container}>
                            <Text style={styles.enf}>Da: </Text>
                            <Text>Via Cristoforo Colombo n.14</Text>
                        </View>

                        <View style={styles.row_container}>
                            <Text style={styles.enf}>A: </Text>
                            <Text>Via Europa</Text>
                        </View>

                        <View style={styles.line}></View>

                        <View style={styles.row_container}>

                            <View style={[styles.column_container]}>
                                <Text style={styles.mezzoTrasporto1}>BUS</Text>
                                <Text>7.40 - 8:40*</Text>
                                <Text>8:15 - 8:45</Text>
                                <Text>10:30 - 11:00</Text>
                            </View>

                            <View style={[styles.column_container]}>
                                <Text style={styles.mezzoTrasporto2}>METRO</Text>
                                <Text>X</Text>
                            </View>

                            <View style={[styles.column_container]}>
                                <Text style={styles.mezzoTrasporto3}>TRENO</Text>
                                <Text>7.00 - 7:20</Text>
                                <Text>8:10 - 8:30</Text>
                            </View>

                        </View>

                        <View style={styles.line}></View>

                        <Text> * Transita per Via Madonna delle Grazie </Text>

                    </View>

                    <View style={styles.card}>

                        <View style={styles.row_container}>
                            <Text style={styles.enf}>Da: </Text>
                            <Text>Via Cristoforo Colombo n.14</Text>
                        </View>

                        <View style={styles.row_container}>
                            <Text style={styles.enf}>A: </Text>
                            <Text>Via delle Tofane n.56</Text>
                        </View>

                        <View style={styles.line}></View>

                        <View style={styles.row_container}>

                            <View style={[styles.column_container]}>
                                <Text style={styles.mezzoTrasporto1}>BUS</Text>
                                <Text>7.40 - 8:10**</Text>
                                <Text>8:15 - 8:30</Text>
                                <Text>10:30 - 11:00*</Text>
                            </View>

                            <View style={[styles.column_container]}>
                                <Text style={styles.mezzoTrasporto2}>METRO</Text>
                                <Text>X</Text>
                            </View>

                            <View style={[styles.column_container]}>
                                <Text style={styles.mezzoTrasporto3}>TRENO</Text>
                                <Text>7.40 - 7:47</Text>
                                <Text>8:15 - 8:22</Text>
                            </View>

                        </View>

                        <View style={styles.line}></View>

                        <Text> * Transita per Via Margherita </Text>
                        <Text> ** Transita per Via Delle Martiri </Text>

                    </View>

                </ScrollView>


                <View style={styles.containerButton}>
                    <Pressable style={styles.button} onPress={() => navigation.navigate('CarSharing')}>
                        <Text style={styles.textNoleggio}> Non vuoi dipendere da nessuno? </Text>
                        <Text style={styles.buttonText}>Noleggia un'auto</Text>
                    </Pressable>
                </View>



            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dirty_white_palette,
        justifyContent: 'center',
    },
    header: {
        height: (Dimensions.get('window').height / 13) * 2,
        backgroundColor: colors.beau_blue,
        alignItems: 'center',
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
    },
    title: {
        fontSize: 30,
        color: colors.dark_blue_palette,
        fontWeight: "bold",
        marginTop: (Dimensions.get('window').height / 12) * 0.75,
    },
    searchbar: {
        borderRadius: 50,
        alignSelf: "center",
        width: Dimensions.get('window').width / 2,
        marginTop: Dimensions.get('window').height / 50,
        //per togliere le ombre di default.
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    buttonImage: {
        width: windowWidth - 60,
        height: 120,
        marginBottom: 40,
        borderRadius: 60,
        //opacity: 0.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    enf: {
        fontWeight: "bold",
    },
    information: {
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
    },
    infoText: {
        fontSize: 16,
    },
    row_container: {
        flexDirection: "row",
        marginTop: 5,
    },
    column_container: {
        flexDirection: "column",
        flex: 4,
        overflow: "hidden",
        alignItems: "center",
    },
    body: {
        flex: 6,
        marginBottom: 80,
    },
    card: {
        borderColor: colors.grey,
        borderWidth: 1,
        width: Dimensions.get('window').width / 1.1,
        alignSelf: "center",
        padding: 10,
        borderRadius: 20,
        marginBottom: 20,
        backgroundColor: colors.white,
    },
    line: {
        borderWidth: 0.5,
        marginRight: 5,
        marginLeft: 5,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: colors.grey, //for android
        borderColor: colors.grey,
    },
    mezzoTrasporto1: {
        textAlign: "center",
        fontWeight: "bold",
        color: colors.white,
        width: 70,
        borderWidth: 1,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 5,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: colors.green_confirm_operation,
    },
    mezzoTrasporto2: {
        textAlign: "center",
        fontWeight: "bold",
        color: colors.white,
        width: 70,
        borderWidth: 1,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 5,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: colors.light_blue_palette,
    },
    mezzoTrasporto3: {
        textAlign: "center",
        fontWeight: "bold",
        color: colors.white,
        width: 70,
        borderWidth: 1,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 5,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: colors.red_discard_operation,
    },
    textNoleggio: {
        textAlign: 'center',
        fontSize: 12,
        color: colors.dirty_white_palette,
    },
    containerButton: {
        alignSelf: "center",
        marginBottom: 15,
        marginTop: 5,
    },
    button: {
        backgroundColor: colors.dark_blue_palette,
        padding: "3%",
        borderRadius: 50,
        alignSelf: 'stretch',
    },
    buttonText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
    },
});

export default TransportScreen;