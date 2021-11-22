import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image} from "react-native";
import colors from "../config/colors";


const AlertRow = ({ data_items }) => {
    return (
        <SafeAreaView style={styles.container}>
                <View style={styles.item}>
                    <View style={styles.description_item}>
                        <Text style={styles.title_item}>{data_items.title}</Text>
                        <Text style={styles.message_item}>{data_items.message}</Text>
                    </View>
                    <Image
                        style={styles.image_item}
                        source={{
                            uri: data_items.img,
                        }}
                    />
                </View>
        </SafeAreaView>
    );  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.dirty_white_palette,
    },
    hidden: {
      color: colors.dirty_white_palette,
      marginVertical:-15,
    },
    item: {
      flex: 1,
      padding: 20,
      flexDirection: "row",
    },
    description_item: {
      flex: 3,
      backgroundColor: colors.grey_palette,
      borderBottomLeftRadius: 35,
      borderTopLeftRadius: 5,
      flexDirection: "column"
    },
    image_item: {
      flex: 1,
      borderTopRightRadius: 35,
      borderBottomRightRadius: 5,
    },
    title_item: {
      fontSize: 20,
      color: colors.dark_blue_palette,
      fontWeight: "bold",
      marginLeft: "8%",
      marginVertical: 8,
    },
    message_item: {
      fontSize: 18,
      color: "black",
      marginLeft: "8%",
      marginRight: "4%",
      marginBottom:"4%"
    },
  });
  

export default AlertRow;