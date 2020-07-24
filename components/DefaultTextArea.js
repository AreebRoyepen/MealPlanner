import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const DefaultTextArea = (props) => {
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        multiline
        style={styles.input}
        //value={description}
        //onChangeText={text => setDescription(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal : 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default DefaultTextArea;
