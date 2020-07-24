import React, { Component, useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import { useSelector } from "react-redux";
//import {  } from "react-native-gesture-handler";

import {fetchInventory} from "../api/Api";
import { ScrollView } from "react-native-gesture-handler";
import ListItem from "../components/ListItem";

const GroceryListPage = props => {
  
  const recipes = useSelector((state) => state.recipes.selectedRecipes);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [groceries, setGroceries] = useState({})

  const getList = useCallback (async() => {

    let param = "";
    for (let x of recipes){
      param = param + x.id + ","
    }

    setIsRefreshing(true)
      try{
        let resp = await fetchInventory(param);
        let list = [];

        list  =  Object.entries(resp) ; //fuck yes

        console.log(list)
        setGroceries(list)

        setError(false);
      }catch(err){
        setError(true);
      }finally{
        setIsRefreshing(false)
      }
    
  },[recipes]);

  useEffect(() => {

    const willFocusSub = props.navigation.addListener("willFocus", getList);

    return () => {
      willFocusSub.remove();
    };
  }, [getList]);

  useEffect(() => {

    setIsLoading(true);
    getList();
    setIsLoading(false)


  }, [getList])


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return (
    <ScrollView>
    <View style={styles.container}>

      <FlatList
        onRefresh={getList}
        refreshing={isRefreshing}
        data={groceries}
        keyExtractor={(item, index) => item[0]}
        renderItem={(x) => <ListItem>{x.item[0] + " " + x.item[1]}</ListItem>}
        style={{ width: "100%" }}
      />
    </View>
    </ScrollView>
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
});
export default GroceryListPage;
