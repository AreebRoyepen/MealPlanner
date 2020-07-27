import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import * as recipeActions from "../store/actions/recipes";
import RecipeItem from "./RecipeItem";
import Colors from "../constants/Colors";

const RecipeList = (props) => {
  const favoriteRecipes = useSelector((state) => state.recipes.favoriteRecipes);

  const recipes = useSelector((state) => state.recipes.recipes);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadRecipes = useCallback(async () => {
    setIsRefreshing(true);
    try {
      dispatch(recipeActions.getRecipes());
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

  useEffect(() => {
    setIsLoading(true);
    loadRecipes().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadRecipes]);

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
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        onRefresh={loadRecipes}
        refreshing={isRefreshing}
        data={recipes}
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
