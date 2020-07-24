import React, { useEffect, useCallback, useState } from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../components/HeaderButton";
//import DefaultText from '../components/DefaultText';
import { toggleFavorite } from "../store/actions/recipes";
import Colors from "../constants/Colors";
import { fetchIngredients , fetchSteps } from "../api/Api";
import ListItem from "../components/ListItem";



const RecipeDatailPage = (props) => {
  const [steps, setSteps] = useState();
  const [ingredients, setIngredients] = useState();

  const [ingredientsIsLoading, setIngredientsLoading] = useState(true);
  const [stepsIsLoading, setStepsLoading] = useState(true);

  const [errorIngredients, setErrorIngredients] = useState(true);

  const [errorSteps, setErrorSteps] = useState(true);

  const recipe = props.navigation.getParam("recipe");

  const currentRecipeIsFavorite = useSelector(state =>
    state.recipes.favoriteRecipes.some(x => x.id === recipe.id)
  );

  const dispatch = useDispatch();

  useEffect( () => {

    setIngredientsLoading(true);
    let resp;

    async function getIngredients(){
      try{
        resp = await fetchIngredients(recipe.id);
        setIngredients(resp.data);
          setErrorIngredients(false);
      }catch(err){
        setErrorIngredients(true);
      }finally{
        setIngredientsLoading(false)
      }
    }
    getIngredients();

    setStepsLoading(true);

    async function getSteps(){
      try{
        resp = await fetchSteps(recipe.id);
        setSteps(resp.data);
        setErrorSteps(false);
      }catch(err){
        setErrorSteps(true);
      }finally{
        setStepsLoading(false)
      }
    }
    getSteps()

  }, []);

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(recipe.id));
  }, [dispatch, recipe]);

  useEffect(() => {
    // props.navigation.setParams({ recipeTitle: selectedRecipe.title });
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentRecipeIsFavorite });
  }, [currentRecipeIsFavorite]);

  return (
    
    <ScrollView>
      {console.log(steps)}
      <Image source={{ uri: recipe.path }} style={styles.image} />
      <View style={styles.details}>
        {/* <Text>{selectedRecipe.duration}m</Text>
        <Text>{selectedRecipe.complexity.toUpperCase()}</Text>
        <Text>{selectedRecipe.affordability.toUpperCase()}</Text> */}
        <Text  >{recipe.description}</Text>
        <Text>{recipe.category}</Text>
      </View>
      <Text style={styles.title}>Ingredients</Text>

      {ingredientsIsLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="small" color={Colors.primaryColor} />
        </View>
      ) : (

        errorIngredients || ingredients === undefined ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Nothing to show</Text>
          </View>
        ) :

        ingredients.map((ingredient) => (
          <ListItem key={ingredient.name}>
            {ingredient.name +
              " " +
              ingredient.quantity +
              " " +
              ingredient.unit}
          </ListItem>
        ))
      )}
      <Text style={styles.title}>Steps</Text>

      {stepsIsLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="small" color={Colors.primaryColor} />
        </View>
      ) : (

        errorSteps || steps === undefined  ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Nothing to show</Text>
          </View>
        ) :
        
        steps.map((step) => (
          <ListItem key={step.step}>
            {step.instruction + "  " + step.note}
          </ListItem>
        ))
      )}
    </ScrollView>
  );
};

RecipeDatailPage.navigationOptions = (navigationData) => {
  // const id = navigationData.navigation.getParam('id');
  const recipeTitle = navigationData.navigation.getParam("recipeTitle");
  const toggleFavorite = navigationData.navigation.getParam("toggleFav");
  const isFavorite = navigationData.navigation.getParam("isFav");
  // const selectedRecipe = MEALS.find(recipe => recipe.id === id);
  return {
    headerTitle: recipeTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? "ios-star" : "ios-star-outline"}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {    
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});

export default RecipeDatailPage;
