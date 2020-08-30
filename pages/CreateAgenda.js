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
  CheckBox,
} from "react-native";

import { Title, Paragraph } from "react-native-paper";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import { fetchInventory } from "../api/Api";
import ChecklistItem from "../components/ChecklistItem";
import { Icon, Input} from "native-base";

import Colors from "../constants/Colors";

import * as recipeActions from "../store/actions/recipes";

import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

const CreateAgenda = (props) => {
  const recipes = useSelector((state) => state.recipes.selectedRecipes);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const groceries = useSelector((state) => state.recipes.ingredientsList );

  const dispatch = useDispatch();
  const [isBreakfastSelected, setBreakfastSelection] = useState(false);
  const [isLunchfastSelected, setLunchfastSelection] = useState(false);
  const [isDinnerfastSelected, setDinnerfastSelection] = useState(false);

  const getList = useCallback(async () => {
    let param = "";

    for (let x of recipes) {
      param = param + x.id + ",";
    }

    setIsRefreshing(true);

    try {
      let resp = await fetchInventory(param);
      let list = [];

      if (resp.error) {
        console.log("ERROR FOR GROCERIES");
        console.log(resp);
        setError(true);
      } else {
        list = Object.entries(resp).map(([key, value]) => ({
          ingredient: key,
          quantity: value,
          checked: false,
        }));

        dispatch(recipeActions.addToIngredientsList(list));

        setError(false);
      }
    } catch (err) {
      setError(true);
    } finally {
      setIsRefreshing(false);
    }
  }, [recipes]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", getList);    

    return () => {
      willFocusSub.remove();
    };
  }, [getList]);


  const startDateHandler = (event, date) => {
    if (event.type !== "dismissed") {
      setOpenStartDate(false);
      setStartDate(date);
    }
  };

  const endDateHandler = (event, date) => {
    if (event.type !== "dismissed") {
      setOpenEndDate(false);
      setEndDate(date);
    }
  };

  return(
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS == "ios" ? "padding" : "height"}
    keyboardVerticalOffset={90}
  >
    <ScrollView>
  
            
  
      <View>
        <Title style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}>
          Setting A Meal For The Day
        </Title>

        <View style={styles.formControl}>
          
          <Text style={styles.label}>Select Day</Text>
          <View style={styles.textboxContainer}>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.textContainer}
                  onPress={() => setOpenStartDate(!openStartDate)}
                >
                  <Text style={styles.dateText}>
                    {startDate ? startDate.toDateString() : "Start Date"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          
        {openStartDate && (
          <DateTimePicker
            value={startDate ? startDate : new Date()}
            mode={"date"}
            is24Hour={true}
            display="spinner"
            onChange={startDateHandler}
          />
        )}

        {openEndDate && (
          <DateTimePicker
            minimumDate={startDate}
            value={endDate ? endDate : new Date()}
            mode={"date"}
            is24Hour={true}
            display="spinner"
            onChange={endDateHandler}
          />
        )}
          
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Meal</Text>
          <TextInput
            style={styles.input}
           placeholder ='search for recipes/meals'
          />
        </View>

        <View style={styles.checkboxContainer}>
        <CheckBox
          value={isBreakfastSelected}
          onValueChange={setBreakfastSelection}
          style={styles.checkbox}
        />
        <Text style={styles.label}>breakfast</Text>
        <CheckBox
          value={isLunchfastSelected}
          onValueChange={setLunchfastSelection}
          style={styles.checkbox}
        />
        <Text style={styles.label}>lunch</Text>
        <CheckBox
          value={isDinnerfastSelected}
          onValueChange={setDinnerfastSelection}
          style={styles.checkbox}
        />
        <Text style={styles.label}>dinner</Text>
      </View>

        <View style={styles.buttonContainer}>
          <Button
            icon="send"
            mode="contained"
            color={Colors.buttonColor}
            title="Add To Meal Planner"
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
  mainList: {
    flexGrow: 1,
  },
  checkedList: {
    flexGrow: 1,
  },
  textboxContainer: {
    margin: 5,
    flexDirection: "row",
    //backgroundColor: "grey",
  },
  row: {
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    textAlignVertical: "center",
    shadowOpacity: 20,
    paddingHorizontal: 20,
  },
  dateText: {
    color: Colors.primaryColor,
    fontWeight: "bold",
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
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
export default CreateAgenda;
