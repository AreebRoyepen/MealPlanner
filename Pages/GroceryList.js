import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  //Button,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import { useSelector } from "react-redux";
import { fetchInventory } from "../api/Api";
import { ScrollView } from "react-native-gesture-handler";
import ListItem from "../components/ListItem";
import { Icon, Input, Button } from "native-base";

import Colors from "../constants/Colors";

const GroceryListPage = (props) => {
  const recipes = useSelector((state) => state.recipes.selectedRecipes);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [groceries, setGroceries] = useState([]);

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

      if(resp.error){
        setError(true)
      }else{

      console.log(resp)

      list = Object.entries(resp); //fuck yes

      setGroceries(list);

      setError(false);}
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

  useEffect(() => {
    setIsLoading(true);
    getList();
    setIsLoading(false);
  }, [getList]);


  return (

    isLoading ? 
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
      :

      error === true ?

      
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>You have not selected any recipes</Text>
      </View>

      :
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.textboxContainer}>
            <View style={{ textAlign: "center" }}>
              <Text style={{ textAlignVertical: "center" }}> to </Text>
            </View>

            <Button transparent onPress={getList}>
              <Icon
                name="funnel"
                style={{ fontSize: 20, color: Colors.buttonColor }}
              />
            </Button>
          </View>
        }
        onRefresh={getList}
        refreshing={isRefreshing}
        data={groceries}
        keyExtractor={(item, index) => item[0]}
        renderItem={(x) => <ListItem>{x.item[0] + " " + x.item[1]}</ListItem>}
        style={{ width: "100%" }}
      />
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
    textAlign: "center",
    //backgroundColor: "grey"
  },
});
export default GroceryListPage;
