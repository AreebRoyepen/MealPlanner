import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Linking,
  TextInput,
  Text,
  Button,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Title, Paragraph } from "react-native-paper";

import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";

const FeedbackPage = () => {
  const [subject, setSubject] = useState();
  const [message, setMessage] = useState();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <ScrollView>
        <View>
          <Title style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}>
            Send Us Your Feedback
          </Title>
          <Paragraph style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}>
            We would love to hear from you!
          </Paragraph>

          <View style={styles.formControl}>
            <Text style={styles.label}>Subject</Text>
            <TextInput
              multiline
              style={styles.input}
              onChangeText={(e) => setSubject(e)}
              //value={description}
              //onChangeText={text => setDescription(text)}
            />
          </View>

          <View style={styles.formControl}>
            <Text style={styles.label}>Message</Text>
            <TextInput
              multiline
              style={styles.input}
              onChangeText={(e) => setMessage(e)}
              //value={description}
              //onChangeText={text => setDescription(text)}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              icon="send"
              mode="contained"
              color={Colors.buttonColor}
              onPress={() =>
                Linking.openURL(
                  `mailto:areeb.royepen@gmail.com?subject=${subject}&body=${message}`
                )
              }
              title="Send Feedback"
            />
          </View>
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
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  buttonContainer: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
});
export default FeedbackPage;
