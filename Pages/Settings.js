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
import * as actions from "../store/actions/recipes";

const Settings = (props) => {
  const mealTimes = useSelector((state) => state.recipes.mealTimes);
  const dispatch = useDispatch();

  const [openBreakfast, setOpenBreakfast] = useState(false);
  const [openLunch, setOpenLunch] = useState(false);
  const [openSupper, setOpenSupper] = useState(false);

  const [breakfast, setBreakfast] = useState();
  const [lunch, setLunch] = useState();
  const [supper, setSupper] = useState();

  const breakfastTimeHandler = (event, date) => {
      console.log(event)
    if (event.type !== "dismissed") {
      setOpenBreakfast(false);

      let newMealTimes = { ...mealTimes };

      newMealTimes.breakfastTime.hour = date.getHours();
      newMealTimes.breakfastTime.minute = date.getMinutes();

      console.log(newMealTimes)
      dispatch(actions.changeSettings(newMealTimes));
      setBreakfast(date);
    }
  };
  const lunchTimeHandler = (event, date) => {
    if (event.type !== "dismissed") {
      setOpenLunch(false);

      let newMealTimes = { ...mealTimes };

      newMealTimes.lunchTime.hour = date.getHours();
      newMealTimes.lunchTime.minute = date.getMinutes();

      dispatch(actions.changeSettings(newMealTimes));
      setLunch(date);
    }
  };
  const supperTimeHandler = (event, date) => {
    if (event.type !== "dismissed") {
      setOpenSupper(false);

      let newMealTimes = { ...mealTimes };

      newMealTimes.supperTime.hour = date.getHours();
      newMealTimes.supperTime.minute = date.getMinutes();

      dispatch(actions.changeSettings(newMealTimes));
      setSupper(date);
    }
  };

  return (
    <ScrollView>
      <View>
        <Title style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}>
          Your Meal Times
        </Title>

        <View style={styles.formControl}>


        <View style={styles.row}>
        <View style={styles.viewAroundSettingText}><Text>Breakfast</Text></View>
          <View style={styles.textboxContainer}>
            <TouchableOpacity
              style={styles.textContainer}
              onPress={() => setOpenBreakfast(!openBreakfast)}
            >
              <Text style={styles.dateText}>
                {breakfast
                  ? breakfast.getHours() + ":" + breakfast.getMinutes()
                  : mealTimes.breakfastTime.hour +
                    ":" +
                    mealTimes.breakfastTime.minute}
              </Text>
            </TouchableOpacity>
          </View>
          
          </View>

          <View style={styles.row}>
              <View style={styles.viewAroundSettingText}><Text>Lunch</Text></View>
          
          <View style={styles.textboxContainer}>
            <TouchableOpacity
              style={styles.textContainer}
              onPress={() => setOpenBreakfast(!openLunch)}
            >
              <Text style={styles.dateText}>
                {lunch
                  ? lunch.getHours() + ":" + lunch.getMinutes()
                  : mealTimes.lunchTime.hour + ":" + mealTimes.lunchTime.minute}
              </Text>
            </TouchableOpacity>
          </View>
          </View>

          <View style={styles.row}>
          <Text>Dinner</Text>
          <View style={styles.textboxContainer}>
            <TouchableOpacity
              style={styles.textContainer}
              onPress={() => setOpenBreakfast(!openSupper)}
            >
              <Text style={styles.dateText}>
                {supper
                  ? supper.getHours() + ":" + supper.getMinutes()
                  : mealTimes.supperTime.hour +
                    ":" +
                    mealTimes.supperTime.minute}
              </Text>
            </TouchableOpacity>
          </View>
            </View>

          {openBreakfast && (
            <DateTimePicker
              value={breakfast ? breakfast : new Date()}
              mode={"time"}
              is24Hour={true}
              display="spinner"
              onChange={breakfastTimeHandler}
            />
          )}
          {openLunch && (
            <DateTimePicker
              value={lunch ? lunch : new Date()}
              mode={"time"}
              is24Hour={true}
              display="spinner"
              onChange={lunchTimeHandler}
            />
          )}
          {openSupper && (
            <DateTimePicker
              value={supper ? supper : new Date()}
              mode={"time"}
              is24Hour={true}
              display="spinner"
              onChange={supperTimeHandler}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

Settings.navigationOptions = (navData) => {
  return {
    headerTitle: "Settings",
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
  textboxContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  viewAroundSettingText:{
    //maxWidth : 300,
    // width: 100,
    // backgroundColor: "grey",
    // justifyContent: "center"
  },
  row: {
    // paddingHorizontal : 20,
    flexDirection:"row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  textContainer: {
    textAlignVertical: "center",
    shadowOpacity: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: Colors.primaryColor,
    minHeight: 25,
  },
  dateText: {
    color: Colors.primaryColor,
    fontWeight: "bold",
  },
  formControl: {
    width: "100%",
  }
});
export default Settings;
