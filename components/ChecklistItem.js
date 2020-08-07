import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItem , CheckBox, Body } from 'native-base';
import Colors from "../constants/Colors";

const ChecklistItem = (props) => {
    return (
        <ListItem>
            <CheckBox checked={props.checked} color = {Colors.buttonColor} onPress = {props.onPress}/>
            <Body style = {{paddingLeft : 10}}>
            <Text selectable style = {props.checked && styles.checkedItem} >{props.children}</Text>
            </Body>
          </ListItem>
    );
  };

  const styles = StyleSheet.create({
    checkedItem: {    
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid',
      color: "grey"
    },
  });

  export default ChecklistItem;