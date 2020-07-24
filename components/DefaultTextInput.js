import React from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
  } from 'react-native';

const DefaultTextInput = props => {

    return (
        <View style={styles.formControl}>
        <Text style={styles.label}>{props.label}</Text>
        <TextInput
          style={styles.input}
          value={props.value}
          onChangeText={text => props.onChangeText(text)}
        />
      </View>
    )

}

const styles = StyleSheet.create({
    formControl: {
      width: '100%'
    },
    label: {
      fontFamily: 'open-sans-bold',
      marginVertical: 8,
      paddingHorizontal :10
    },
    input: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1
    }
  });


export default DefaultTextInput;