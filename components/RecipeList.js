import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import * as recipeActions from "../store/actions/recipes";
import RecipeItem from "./RecipeItem";
import Colors from "../constants/Colors";
import { ActionSheet } from "native-base";
import SearchBox from "./SearchBox";

const RecipeList = (props) => {

  const favoriteRecipes = useSelector((state) => state.recipes.favoriteRecipes);

  const initialRecipes = useSelector((state) => state.recipes.recipes);
  const [filteredRecipes, setFilteredRecipes] = useState(initialRecipes);
  const [searchWord, setSearchWord] = useState();

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const BUTTONS = ["Add to Favourites", "Add to Planner", "Cancel"];
  const CANCEL_INDEX = 2;

  const loadRecipes = useCallback(async () => {
    setIsRefreshing(true);
    try {
      dispatch(recipeActions.getRecipes());
      setFilteredRecipes(initialRecipes)
    } catch (err) {
      console.log(err);
      setError(true);
    }
    setIsRefreshing(false);
  }, [isRefreshing, dispatch, error]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadRecipes);

    return () => {
      willFocusSub.remove();
    };
  }, [loadRecipes]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   loadRecipes().then(() => {
  //     setFilteredRecipes(initialRecipes)
  //     setIsLoading(false);
  //   });
  // }, [dispatch, loadRecipes]);

  const renderMealItem = (itemData) => {
    const isFavorite = favoriteRecipes.some(
      (meal) => meal.id === itemData.item.id
    );

    return isLoading ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    ) : (
      <RecipeItem
        recipe={itemData.item}
        onSelectRecipe={() => {
          props.navigation.navigate({
            routeName: "RecipeDetail",
            params: {
              recipe: itemData.item,
              recipeTitle: itemData.item.title,
              isFav: isFavorite,
            },
          });
        }}
        longPress={() => 
          ActionSheet.show(
            {
              options: BUTTONS,
              cancelButtonIndex: CANCEL_INDEX,
              title: "Options"
            },
            buttonIndex => {
              if(buttonIndex === 0){
                dispatch(recipeActions.toggleFavorite(itemData.item.id));
              }if(buttonIndex ===1){
                dispatch(recipeActions.addToMyPlanner(itemData.item));
              }
            }
          )
        }
      />
    );
  };

  const searchRecipes = (text) => {

    setSearchWord(text)

    const filteredList = initialRecipes.filter((item) => { return item.name.search(text) >-1 })

    setFilteredRecipes(filteredList)

  }

  return (
    <View style={styles.list}>
      <FlatList
      ListEmptyComponent = {() => <Text>Loading ... </Text>}
      ListHeaderComponent = {<SearchBox value = {searchWord} onChangeText = {(text) => searchRecipes(text)}  />}
        onRefresh={loadRecipes}
        refreshing={isRefreshing}
        data={initialRecipes}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={renderMealItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});

export default RecipeList;
