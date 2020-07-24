import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ListItem = (props) => {
    return (
      <View style={styles.listItem}>
        <Text selectable >{props.children}</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    listItem: {    
      marginVertical: 10,
      marginHorizontal: 20,
      borderColor: "#ccc",
      borderWidth: 1,
      padding: 10,
    },
  });

  export default ListItem;