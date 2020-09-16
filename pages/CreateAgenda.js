import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Button,
  Alert,
  Switch,
} from "react-native";

import { Title } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { fetchInventory } from "../api/Api";
import { CheckBox, Toast } from "native-base";
import * as Calendar from "expo-calendar";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

import Colors from "../constants/Colors";
import RecipeModal from "../components/RecipeModal";

const CreateAgenda = (props) => {
  const mealTimes = useSelector((state) => state.recipes.mealTimes);

  const recipes = useSelector((state) => state.recipes.selectedRecipes);

  const [selectedRecipe, setSelectedRecipe] = useState(
    props.navigation.getParam("recipe")
  );
  const dropdown = props.navigation.getParam("dropdown");
  const edit = props.navigation.getParam("edit");

  const [openDate, setOpenDate] = useState(false);
  const [modal, setModalOpen] = useState(false);
  const [date, setDate] = useState();

  const [isBreakfastSelected, setBreakfastSelection] = useState(false);
  const [isLunchSelected, setLunchSelection] = useState(false);
  const [isDinnerSelected, setDinnerSelection] = useState(false);

  const calendarID = useSelector((state) => state.recipes.calendarID);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [hourBefore, setHourBefore] = useState(false);
  const [morningOf, setMorningOf] = useState(false);
  const [nighBefore, setNightBefore] = useState(false);

  const dateHandler = (event, date) => {
    if (event.type !== "dismissed") {
      setOpenDate(false);
      setDate(date);
    }
  };

  useEffect(() => {
    if (edit) {
      let x = new Date(selectedRecipe.startDate);
      console.log(selectedRecipe)
      if (selectedRecipe.notes.includes("Breakfast")) {
        setBreakfastSelection(true);
      } else if (selectedRecipe.notes.includes("Lunch")) {
        setLunchSelection(true);
      } else if (selectedRecipe.notes.includes("Dinner")) {
        setDinnerSelection(true);
      }
      setDate(x);
    }
  }, []);

  const setBreakfastSelectionHandler = () => {
    setBreakfastSelection(true);
    setLunchSelection(false);
    setDinnerSelection(false);
  };

  const setLunchSelectionHandler = () => {
    setLunchSelection(true);
    setBreakfastSelection(false);
    setDinnerSelection(false);
  };

  const setDinnerSelectionHandler = () => {
    setDinnerSelection(true);
    setLunchSelection(false);
    setBreakfastSelection(false);
  };

  const addEvent = () => {
    let alarm = [];
    if(!isBreakfastSelected  && !isLunchSelected && !isDinnerSelected){
      Alert.alert("Choose a meal time, please")
      return
    }
    if (date) {
      
      if (isBreakfastSelected) {
        date.setHours(mealTimes.breakfastTime.hour);
        date.setMinutes(mealTimes.breakfastTime.minute);
        setDate(date);
      } else if (isLunchSelected) {
        date.setHours(mealTimes.lunchTime.hour);
        date.setMinutes(mealTimes.lunchTime.minute);
        setDate(date);
      } else if (isDinnerSelected) {
        date.setHours(mealTimes.supperTime.hour);
        date.setMinutes(mealTimes.supperTime.minute);
        setDate(date);
      } else {
        Alert.alert("Choose a meal time please");
      }

      if(isEnabled){

        if(hourBefore){
          alarm = [...alarm, {relativeOffset: -60 }]
        }
        if(morningOf){
          let alarmTime = new Date(date);
          alarmTime.setHours(6);
          let x = date.getTime() - alarmTime.getTime();
          alarm = [...alarm, {relativeOffset: -(x/60000)}]
        }
        if(nighBefore){
          let alarmTime = new Date(date);
          alarmTime.setDate(alarmTime.getDate() - 1);
          alarmTime.setHours(18);
          let x = date.getTime() - alarmTime.getTime();
          alarm = [...alarm, {relativeOffset: -(x/60000)}]
        }
      }

      var endDate = new Date(date.getTime());
      endDate.setHours(endDate.getHours() + 1);

      (async () => {
        let details = {
          title: selectedRecipe.name,
          startDate: date,
          endDate: endDate,
          notes: mealTimeString(),
          alarms : alarm
        };

        let x = await Calendar.createEventAsync(calendarID.toString(), details);
      })();
      Toast.show({
        text: "Item added to planner",
        duration: 3000,
      });
      props.navigation.popToTop();
    } else {
      Alert.alert("Choose a date please");
    }
  };

  function mealTimeString() {
    if (isBreakfastSelected) {
      return "Breakfast";
    } else if (isLunchSelected) {
      return "Lunch";
    } else if (isDinnerSelected) {
      return "Dinner";
    }
  }

  const editEvent = () => {
    if (date) {
      if (isBreakfastSelected) {
        date.setHours(mealTimes.breakfastTime.hour);
        date.setMinutes(mealTimes.breakfastTime.minute);
        setDate(date);
      } else if (isLunchSelected) {
        date.setHours(mealTimes.lunchTime.hour);
        date.setMinutes(mealTimes.lunchTime.minute);
        setDate(date);
      } else if (isDinnerSelected) {
        date.setHours(mealTimes.supperTime.hour);
        date.setMinutes(mealTimes.supperTime.minute);
        setDate(date);
      } else {
        Alert.alert("Choose a meal time please");
      }

      console.log("DATE");
      console.log(date);
      var endDate = new Date(date.getTime());
      endDate.setHours(endDate.getHours() + 1);

      (async () => {
        let details = {
          title: selectedRecipe.recipe.name,
          startDate: date,
          endDate: endDate,
          notes: mealTimeString(),
        };

        await Calendar.updateEventAsync(selectedRecipe.id, details);
      })();
      Toast.show({
        text: "Item Edited",
        duration: 3000,
      });
      props.navigation.popToTop();
    } else {
      Alert.alert("Choose a date please");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      {console.log(selectedRecipe)}
      <ScrollView>
        <View>
          <View style={styles.formControl}>
            <Title style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}>
              Your Selected Meal
            </Title>
            {dropdown ? (
              <View>
                <View style={styles.textboxContainer}>
                  <TouchableOpacity
                    style={styles.textContainer}
                    onPress={() => setModalOpen(!modal)}
                  >
                    <Text style={styles.dateText}>
                      {selectedRecipe ? selectedRecipe.name : "Select a Meal"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <RecipeModal
                  visible={modal}
                  recipe={(x) => setSelectedRecipe(x)}
                  close={() => setModalOpen(!modal)}
                ></RecipeModal>
              </View>
            ) : (
              <View>
                {/* <TextInput
                  style={styles.input}
                  placeholder="search for recipes/meals"
                  value={
                    edit ? selectedRecipe.recipe.name : selectedRecipe.name
                  }
                /> */}
                <View style={styles.textboxContainer}>
                  <TouchableOpacity
                    style={styles.textContainer}
                    onPress={() => setModalOpen(!modal)}
                  >
                    <Text style={styles.dateText}>
                      {edit ? selectedRecipe.recipe.name : selectedRecipe.name}
                    </Text>
                  </TouchableOpacity>
                </View>
                <RecipeModal
                  visible={modal}
                  recipe={(x) =>
                    setSelectedRecipe({ ...selectedRecipe, recipe: x })
                  }
                  close={() => setModalOpen(!modal)}
                ></RecipeModal>
              </View>
            )}
          </View>

          <Title style={{ marginLeft: 15, marginRight: 15 }}>
            Your Meal Day
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
                minimumDate={new Date()}
                value={date ? date : new Date()}
                mode={"date"}
                is24Hour={true}
                display="spinner"
                onChange={dateHandler}
              />
            )}
          </View>

          <Title style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}>
            Your Meal Time
          </Title>

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

          <View style={styles.rowReminder}>
            <View style={styles.textboxContainer}>
              <Title style={{ marginLeft: 15, marginRight: 15 }}>
                Set Reminder
              </Title>
            </View>
            <View style={styles.textboxContainer}>
              <Switch
                trackColor={{ false: "#767577", true: Colors.buttonColor }}
                thumbColor={isEnabled ? Colors.buttonColor : "#f4f3f4"}
                //ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>

          {isEnabled && (
            <View>
              <View style={styles.checkboxRowReminders}>
              <View style={styles.checkboxContainer}>
                  <CheckBox
                    color={Colors.buttonColor}
                    checked={hourBefore}
                    onPress={() => setHourBefore(!hourBefore)}
                    style={styles.checkbox}
                  />
                  <Text style={styles.label}>1 Hour Before</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    color={Colors.buttonColor}
                    checked={morningOf}
                    onPress={() => setMorningOf(!morningOf)}
                    style={styles.checkbox}
                  />
                  <Text style={styles.label}>Morning Of</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    color={Colors.buttonColor}
                    checked={nighBefore}
                    onPress={() => setNightBefore(!nighBefore)}
                    style={styles.checkbox}
                  />
                  <Text style={styles.label}>Night Before</Text>
                </View>
              </View>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <Button
              icon="send"
              mode="contained"
              color={Colors.buttonColor}
              title={edit ? "Edit Meal In Planner" : "Add Meal To Planner"}
              onPress={() => (edit ? editEvent() : addEvent())}
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
    alignContent: "center",
  },
  row: {
    justifyContent: "center",
    alignItems: "center",
  },
  rowReminder: {
    // paddingHorizontal : 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textContainer: {
    //textAlignVertical: "center",
    shadowOpacity: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: Colors.primaryColor,
    borderRadius: 1,
    minHeight: 30,
    backgroundColor: "#EEE",
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    color: Colors.primaryColor,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
    paddingHorizontal: 20,
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
    marginBottom: 30
  },
  checkboxRowReminders: {
    flexDirection: "row",
    marginBottom: 20,
    //justifyContent: "space-between",
    //marginHorizontal: 30,
    marginVertical: 20,
  },
  checkboxRow: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
    marginHorizontal: 30,
    marginVertical: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    alignSelf: "center",
  },
});
export default CreateAgenda;
