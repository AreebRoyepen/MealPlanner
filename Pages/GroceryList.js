import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  //Button,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import { fetchInventory } from "../api/Api";
import ChecklistItem from "../components/ChecklistItem";
import { Icon, Input, Button } from "native-base";

import Colors from "../constants/Colors";

import * as recipeActions from "../store/actions/recipes";

import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { startClock } from "react-native-reanimated";

const GroceryListPage = (props) => {
  const recipes = useSelector((state) => state.recipes.selectedRecipes);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const groceries = useSelector((state) => state.recipes.ingredientsList);
  const [checkedGroceries, setCheckedGroceries] = useState([]);

  const dispatch = useDispatch();

  function getMinDate() {
    var x = new Date();
    x.setDate(1);
    x.setMonth(x.getMonth() - 1);
    return x;
  }

  function getMaxDate() {
    var x = new Date();
    x.setDate(1);
    x.setMonth(x.getMonth() + 12);
    return x;
  }

  const getList = useCallback(async () => {
    let param = "";
    
    console.log(recipes)

    for (let x of recipes) {
      param = param + x.id + ",";
    }

    setIsRefreshing(true);
    console.log(param)
    try {
      let resp = await fetchInventory(param);
      let list = [];

      if (resp.error) {
        console.log("ERROR FOR GROCERIES")
        console.log(resp);
        setError(true);
      } else {
        console.log(resp);

        list = Object.entries(resp).map(([key, value]) => [key, value, false]);

        //setGroceries(list);

        dispatch(recipeActions.addToIngredientsList(list));

        console.log(list);

        setError(false);
      }
    } catch (err) {
      setError(true);
    } finally {
      setIsRefreshing(false);
    }
  }, [dispatch]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", getList);

    return () => {
      willFocusSub.remove();
    };
  }, [getList]);

  useEffect(() => {
    setIsLoading(true);
    getList();
    setIsLoading(false);
  }, [getList]);

  const checkItem = (x) => {

    const currentGroceries = [...groceries]
    const index = currentGroceries.findIndex((item) => item === x);

    const currentCheckedGroceries = [...checkedGroceries]

    let item = currentGroceries[index];

    item[2] = !item[2];

    currentGroceries[index] = item;
    // currentGroceries.pop(index)
    console.log(item);
    currentCheckedGroceries.push(item);
    setCheckedGroceries(currentCheckedGroceries);

    dispatch(recipeActions.addToIngredientsList(currentGroceries));

  };

  const isChecked = (x) => {
    const index = groceries.findIndex((item) => item === x);

    const item = groceries[index];

    return item[2];
  };


  const startDateHandler = (event, date) => {
    if(event.type !== "dismissed"){
      setOpenStartDate(false)
      setStartDate(date)
    }
  }
  
  const endDateHandler = (event, date) => {

    if(event.type !== "dismissed"){
      setOpenEndDate(false)
      setEndDate(date)
    }
    
    
  }


  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={Colors.primaryColor} />
    </View>
  ) : error === true ? (
    <ScrollView
    
    refreshControl={
      <RefreshControl
        refreshing={isLoading}
        onRefresh={getList}
      />
    }

    >
<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={styles.textboxContainer}>
            {/* <View style={{ textAlign: "center" }}>
              <Text style={{ textAlignVertical: "center" }}> to </Text>
            </View> */}

            {/* <Button transparent onPress={getList}>
              <Icon
                name="ios-funnel"
                style={{ fontSize: 20, color: Colors.buttonColor }}
              />
            </Button> */}
          </View>
      <Text>You have not selected any recipes</Text>
    </View>
    </ScrollView>
    
  ) : (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.textboxContainer}>
            
            <View style = {styles.row}>
            <TouchableOpacity style = {styles.textContainer} onPress={() => setOpenStartDate(!openStartDate)} >
              <Text style = {styles.dateText}>{startDate.toDateString()}</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <Text> to </Text>
            </View>

            <View style = {styles.row}>
            <TouchableOpacity style = {styles.textContainer} onPress={() => setOpenEndDate(!openEndDate)} >
              <Text style = {styles.dateText} >{endDate.toDateString()}</Text>
            </TouchableOpacity>
            </View>

            <Button transparent onPress={getList}>
              <Icon
                name="ios-funnel"
                style={{ fontSize: 20, color: Colors.buttonColor }}
              />
            </Button>

          </View>
        }
        onRefresh={getList}
        refreshing={isRefreshing}
        data={groceries}
        keyExtractor={(item, index) => item[0]}
        renderItem={(x) => (
          <ChecklistItem
            onPress={() => checkItem(x.item)}
            checked={
              groceries[groceries.findIndex((item) => item === x.item)][2]
            }
          >
            {x.item[0] + " " + x.item[1]}
          </ChecklistItem>
        )}
        extraData={checkedGroceries || groceries}
        style={{ width: "100%" }}
      />


{openStartDate && (
        <DateTimePicker
          value={startDate}
          mode={"date"}
          is24Hour={true}
          display="spinner"
          onChange={startDateHandler}
        />
      )}

{openEndDate && (
        <DateTimePicker
        minimumDate = {startDate}
          value={endDate}
          mode={"date"}
          is24Hour={true}
          display="spinner"
          onChange={endDateHandler}
        />
      )}
    </View>
  );
};

GroceryListPage.navigationOptions = (navData) => {
  return {
    headerTitle: "Grocery List",
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
  textboxContainer: {
    margin: 10,
    flexDirection: "row",
    //backgroundColor: "grey",
    justifyContent: "center"
  },
  row: {
    justifyContent: 'center', 
    alignItems: 'center',
    
  },
  textContainer: {
    textAlignVertical: "center",
    shadowOpacity: 20,
    paddingHorizontal: 20
  },
  dateText: {
    color:Colors.primaryColor,
    fontStyle:"italic",
    fontWeight: "bold"
  }
});
export default GroceryListPage;
