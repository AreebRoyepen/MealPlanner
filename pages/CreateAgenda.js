import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  SectionList,
  KeyboardAvoidingView,
  Linking,
  TextInput,
  Button,
  Alert,
} from "react-native";

import { Title, Paragraph } from "react-native-paper";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import { fetchInventory } from "../api/Api";
import ChecklistItem from "../components/ChecklistItem";
import { Icon, Input, CheckBox, ListItem, Toast } from "native-base";
import * as Calendar from "expo-calendar";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

import Colors from "../constants/Colors";
import * as recipeActions from "../store/actions/recipes";

const CreateAgenda = (props) => {

  const mealTimes = useSelector((state) => state.recipes.mealTimes);


  const recipes = useSelector((state) => state.recipes.selectedRecipes);

  const selectedRecipe = props.navigation.getParam("recipe");

  const [openDate, setOpenDate] = useState(false);

  const [date, setDate] = useState();

  const [isBreakfastSelected, setBreakfastSelection] = useState(false);
  const [isLunchSelected, setLunchSelection] = useState(false);
  const [isDinnerSelected, setDinnerSelection] = useState(false);

  const calendarID = useSelector((state) => state.recipes.calendarID);

  const dateHandler = (event, date) => {
    if (event.type !== "dismissed") {
      setOpenDate(false);
      setDate(date);
    }
  };

  const setBreakfastSelectionHandler = () => {
    setBreakfastSelection(true)
    setLunchSelection(false)
    setDinnerSelection(false)

  }

  const setLunchSelectionHandler = () => {
    setLunchSelection(true)
    setBreakfastSelection(false)
    setDinnerSelection(false)

  }

  const setDinnerSelectionHandler = () => {
    setDinnerSelection(true)
    setLunchSelection(false)
    setBreakfastSelection(false)

  }

  const addEvent = () => {

    if(date){

      if(isBreakfastSelected){
        date.setHours(mealTimes.breakfastTime.hour);
        date.setMinutes(mealTimes.breakfastTime.minute);
        setDate(date)
      }else if (isLunchSelected){
        date.setHours(mealTimes.lunchTime.hour);
        date.setMinutes(mealTimes.lunchTime.minute);
        setDate(date)
      }else if (isDinnerSelected){
        date.setHours(mealTimes.supperTime.hour);
        date.setMinutes(mealTimes.supperTime.minute);
        setDate(date)
      }else{
        Alert.alert("Choose a meal time please")
      }

      console.log("DATE")
      console.log(date)
      var endDate = new Date(date.getTime());
      endDate.setHours(endDate.getHours() + 1);

      (async () => {
        let details = {
          title: selectedRecipe.name,
          startDate: date,
          endDate: endDate,
          notes: "Please do not edit. This event has been created by your Meal Planner app. \n\nCheck the app for instructions and ingredients :)"
        };
  
        let x = await Calendar.createEventAsync(calendarID.toString(), details);
      })();
      Toast.show({
        text: "Item added to planner",
        duration: 3000                  
      });
      props.navigation.popToTop();
    }else{
      Alert.alert("Choose a date please")
    }



  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      {console.log(selectedRecipe)}
      <ScrollView>
        <View>
          <Title style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}>
            Setting A Meal For The Day
          </Title>

          <View style={styles.formControl}>
            <View style={styles.textboxContainer}>
                <TouchableOpacity
                  style={styles.textContainer}
                  onPress={() => setOpenDate(!openDate)}
                >
                  <Text style={styles.dateText}>
                    {date ? date.toDateString() : "Select a day"}
                  </Text>
                </TouchableOpacity>
              </View>

            {openDate && (
              <DateTimePicker
              minimumDate= {new Date()}
                value={date ? date : new Date()}
                mode={"date"}
                is24Hour={true}
                display="spinner"
                onChange={dateHandler}
              />
            )}
          </View>

          <View style={styles.formControl}>
            <Text style={styles.label}>Meal</Text>
            <TextInput
              style={styles.input}
              placeholder="search for recipes/meals"
              value= {selectedRecipe.name}
            />
          </View>

          <View style={styles.checkboxRow}>
            <View style={styles.checkboxContainer}>
              <CheckBox
                color={Colors.buttonColor}
                checked={isBreakfastSelected}
                onPress={setBreakfastSelectionHandler}
                style={styles.checkbox}
              />
              <Text style={styles.label}>breakfast</Text>
              </View>

               <View style={styles.checkboxContainer}>
              <CheckBox
                color={Colors.buttonColor}
                checked={isLunchSelected}
                onPress={setLunchSelectionHandler}
                style={styles.checkbox}
              />
              <Text style={styles.label}>lunch</Text>
            </View>
             <View style={styles.checkboxContainer}>
              <CheckBox
                color={Colors.buttonColor}
                checked={isDinnerSelected}
                onPress={setDinnerSelectionHandler}
                style={styles.checkbox}
              />
              <Text style={styles.label}>dinner</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              icon="send"
              mode="contained"
              color={Colors.buttonColor}
              title="Add Meal To Planner"
              onPress={() => addEvent()}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

CreateAgenda.navigationOptions = (navData) => {
  return {
    headerTitle: "Create Agenda",
    // headerLeft: () => (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       title="Menu"
    //       iconName="ios-menu"
    //       onPress={() => {
    //         navData.navigation.toggleDrawer();
    //       }}
    //     />
    //   </HeaderButtons>
    // ),
  };
};

const styles = StyleSheet.create({
  checkedList: {
    flexGrow: 1,
  },
  textboxContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  row: {
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    textAlignVertical: "center",
    shadowOpacity: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: Colors.primaryColor,
    minHeight:25
  },
  dateText: {
    color: Colors.primaryColor,
    fontWeight: "bold",
  },
  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
    paddingHorizontal: 20
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
  checkboxRow: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
    marginHorizontal: 30,
    marginVertical: 20
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems:"center",
  },
  checkbox: {
    alignSelf: "center",
  }
});
export default CreateAgenda;
