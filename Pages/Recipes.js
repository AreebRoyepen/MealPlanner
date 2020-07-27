import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import RecipeList from "../components/RecipeList";
import DefaultTextInput from "../components/DefaultTextInput";

const RecipesPage = (props) => {
  
    const [search, setSearch] = useState();


  return (
    <View style={styles.container}>
        <DefaultTextInput 
        label = "Search"
        value = {search}
        onChangeText = {(item)=> {setCurrentRecipes (recipes.filter((x) => {x.name.search(item.name)}))}}
        />
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
