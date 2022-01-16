import React from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, Alert, Dimensions} from "react-native";
import { Entypo } from '@expo/vector-icons';
import colors from "../config/colors";

//dati per la popolazione statica degli alert
const data_items = [
    {
        id: 1,
        title: 'Tavernetta da ciccio',
        message: 'Caratteristica cucina tipica locale, ci troviamo in via roba 56.',
        img: 'https://www.design-italia.it/wp-content/uploads/2018/01/arredare-tavernetta.png',
    },
    {
        id: 2,
        title: 'Faro Capo Trionto ',
        message: 'Angolo suggestivo dello ionio, mare stupendo e pace',
        img: 'https://www.investinitalyrealestate.com/wp-content/uploads/2019/07/FaroCapoTrionto_Corigliano_CS_EST_02-2-700x466.jpg',
    },
    {
        id: 3,
        title: 'Muraglie di Annibale',
        message: 'Le cosiddette “Muraglie di Annibale”...',
        img: 'https://ecodellojonio.b-cdn.net/media/posts/2014/06/muraglie-17.jpg?aspect_ratio=16:9&width=1152',
    },
    {
        id: 4,
        title: 'Fiume Trionto',
        message: 'Il territorio di Pietrapaola, è caratterizzato dalla particolare presenza di grotte e ...',
        img: 'http://www.mobitaly.it/MultimediaFiles/Img/FiumeTrionto_1.JPG',
    },
];

const ListPoiScreen = (navigation) => {

  return (
    <SafeAreaView style={styles.container}>

    <View style={styles.row_container}>
      <Text style={styles.title}>Punti di interesse</Text>
      <Entypo style={styles.header_icon} name='bell' size={30} color={colors.dark_blue_palette} onPress={() => alert(`Lista delle notifiche`)} />
    </View>

    <Searchbar
      style={styles.searchbar}
      placeholder="Ricerca fra i punti di interesse..."
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
      <View style={styles.body}>
      
      <FlatList
          data={data_items}
          renderItem={({item, id})=> {

            return <View style={styles.item} onPress={()=> Alert.alert('sei andato su questo punto di interesse!')}>
                      <Image
                        style={styles.image_item}
                        source={{
                          uri: item.img,
                        }}
                      />
                      <View style={styles.description_item}>
                          <Text style={styles.title_item}>{item.title}</Text>
                          <Text numberOfLines={2} style={styles.message_item}>{item.message}</Text>
                      </View>  
                    </View>}}
          keyExtractor={item => `${item.id}`}
        />
      </View>    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dirty_white_palette,
    borderWidth: 1,
    borderColor: colors.dirty_white_palette,
    borderBottomColor: colors.grey,
    marginRight:10,
    marginLeft:10,
  },
  searchbar: {
    backgroundColor: colors.white,
    marginLeft: 10,
    marginRight: 10,
    borderRadius:30,
    shadowColor: colors.dirty_white_palette,
    borderBottomColor: colors.black,
    borderTopColor:colors.dirty_white_palette,
    borderRightColor:colors.dirty_white_palette,
    borderLeftColor:colors.dirty_white_palette,
  },
  item: {
    width: Dimensions.get('window').width/1.1,
    flexDirection: "row",
    alignItems:"center",
    padding: 10,
    borderColor:colors.grey,
    borderTopColor:colors.dirty_white_palette,
    borderRightColor:colors.dirty_white_palette,
    borderLeftColor:colors.dirty_white_palette,
    borderWidth:1,
  },
  description_item: {
    flex: 4,
    paddingLeft:5,
    flexDirection: "column",

  },
  image_item: {
    flex: 1,
    borderRadius: 10,
    height: Dimensions.get('window').width/5,
  },
  title_item: {
    fontSize: 20,
    color: colors.dark_blue_palette,
    fontWeight: "bold",
    marginVertical: 8,
  },
  message_item: {
    fontSize: 18,
    color: "black",
    marginRight: "4%",
    fontStyle:"italic",
    marginBottom:"4%"
  },
  row_container: {
    flexDirection: "row"
  },
  title: {
    fontSize: 35,
    padding: 5,
    color: colors.dark_blue_palette,
    fontWeight: "bold",
    textAlign: 'center',
    flex: 5,
    flexDirection: "row",
  },
  header:{
    backgroundColor: colors.white,
  },
  header_title:{
    flex: 6,
    flexDirection: "row",
  },
  header_icon: {
    fontSize: 40,
    flex: 1,
    paddingTop:5,
    paddingBottom:5,
    justifyContent:"center",
    alignItems: "center",
  },
  body: {
    flex: 6,
    alignItems: "center",
  },
});


export default ListPoiScreen;