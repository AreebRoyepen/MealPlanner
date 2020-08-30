import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  SectionList,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import { fetchInventory } from "../api/Api";
import ChecklistItem from "../components/ChecklistItem";
import { Icon, Input, Button } from "native-base";

import Colors from "../constants/Colors";

import * as recipeActions from "../store/actions/recipes";

import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

const GroceryListPage = (props) => {
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

  // useEffect(() => {
  //   setIsLoading(true);
  //   getList();
  //   setIsLoading(false);
  // }, [getList]);

  const checkItem = (x) => {

    const currentGroceries = [...groceries];
    const index = currentGroceries.findIndex((item) => item === x);

    let item = currentGroceries[index];

    item.checked = !item.checked;

    currentGroceries[index] = item;

    dispatch(recipeActions.editIngredientsList(currentGroceries));

  };

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

//   if(groceries.length === 0) {
//     return (
//       <View style = {{ flex: 1, justifyContent: "center", alignItems: "center" }}>      
//       <Text >
//       Use the buttons above to generate a grocery list
//     </Text>
    
// </View>
//     )
//   }

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={Colors.primaryColor} />
    </View>
  ) : error === true ? (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={getList} />
      }
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>You have not selected any recipes</Text>
      </View>
    </ScrollView>
  ) : (
      <View style={styles.mainList}>
        <SectionList
          ListEmptyComponent = {
      <View style = {{ flex: 1, justifyContent: "center", alignItems: "center" }}>      
      <Text >
      Use the buttons above to generate a grocery list
    </Text>
    
</View>
          }
          ListHeaderComponent={
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

              <View style={styles.row}>
                <Text> to </Text>
              </View>

              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.textContainer}
                  onPress={() => setOpenEndDate(!openEndDate)}
                >
                  <Text style={styles.dateText}>
                    {endDate ? endDate.toDateString() : "End Date"}
                  </Text>
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
          // renderSectionHeader={({ section: { title } }) => (
          //   <Text >{title}</Text>
          // )}
          renderSectionFooter = {() => <View style ={{marginVertical : 10}}></View> }
          onRefresh={getList}
          refreshing={isRefreshing}
          sections={[{title: "checked", data :groceries.filter((item) => {return item.checked === false})}, 
                      {title:"unchecked", data : groceries.filter((item) => {return item.checked === true})}]}
          keyExtractor={(item, index) => item.ingredient}
          renderItem={(x) => (
            <ChecklistItem
              onPress={() => checkItem(x.item)}
              checked={
                groceries[groceries.findIndex((item) => item === x.item)]
                  .checked
              }
            >
              {x.item.ingredient + " " + x.item.quantity}
            </ChecklistItem>
          )}
          extraData={groceries}
          style={{ width: "100%" }}
        />

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

{console.log(groceries)}        
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
  mainList: {
    flexGrow: 1,
  },
  checkedList: {
    flexGrow: 1,
  },
  textboxContainer: {
    margin: 10,
    flexDirection: "row",
    //backgroundColor: "grey",
    justifyContent: "center",
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
    fontStyle: "italic",
    fontWeight: "bold",
  },
});
export default GroceryListPage;
