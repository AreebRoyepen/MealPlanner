import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import { Icon, Input, Item } from "native-base";

const SearchBox = props => {


    return (
        <Item>
          <Icon active name="search" />
          <Input placeholder="Search " onChangeText = {props.onChangeText} value = {props.value} />
          </Item>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    textboxContainer: {
      flexDirection: "row",
      
    }
  });
  
  export default SearchBox;