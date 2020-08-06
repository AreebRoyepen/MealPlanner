import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import RecipeList from "../components/RecipeList";
import { useDispatch } from "react-redux";

import * as recipeActions from "../store/actions/recipes"

const RecipesPage = (props) => {

  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(recipeActions.getRecipes());
  }, [dispatch])

  return (
    <View style={styles.container}>

      <RecipeList
      
      navigation={props.navigation}
        
      />
    </View>
  );
};

RecipesPage.navigationOptions = (navData) => {
  return {
    headerTitle: "Recipes",
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
export default RecipesPage;
