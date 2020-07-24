import React, { Component } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Header } from "react-native-elements";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Title, Paragraph, TextInput, Button } from "react-native-paper";

import HeaderButton from "../components/HeaderButton";
import DefaultTextInput from "../components/DefaultTextInput";
import DefaultTextArea from "../components/DefaultTextArea";
import Colors from "../constants/Colors";

const FeedbackPage = () => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == "ios" ? "padding" : "height"} keyboardVerticalOffset = {90}>
    <ScrollView>
    
    <View >
        <Title style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}>
          Send Us Your Feedback
        </Title>
        <Paragraph style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}>
          We would love to hear from you!
        </Paragraph>
        <DefaultTextInput
          label="Subject"
        />
        <DefaultTextArea
          label="Message"
          rows={5}
        />
        <Button
          style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}
          icon="send"
          mode="contained"
          color={Colors.buttonColor}
        >
          Send Feedback
        </Button>
    </View>
    
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

FeedbackPage.navigationOptions = (navData) => {
  return {
    headerTitle: "Feedback",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default FeedbackPage;
