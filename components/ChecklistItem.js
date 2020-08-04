import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItem , CheckBox, Body } from 'native-base';
import Colors from "../constants/Colors";

const ChecklistItem = (props) => {
    return (
        <ListItem>
            <CheckBox checked={props.checked} color = {Colors.buttonColor} onPress = {props.onPress}/>
            <Body style = {{paddingLeft : 10}}>
            <Text selectable >{props.children}</Text>
            </Body>
          </ListItem>
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

  export default ChecklistItem;