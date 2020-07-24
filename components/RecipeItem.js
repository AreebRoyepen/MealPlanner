import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Button
} from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import * as recipeActions from "../store/actions/recipes";

// import DefaultText from './DefaultText';

const RecipeItem = props => {


  const recipe = props.recipe;


  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={props.onSelectRecipe} onLongPress ={props.longPress}>
        <View>
          <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
          
            <ImageBackground
              source={{ uri: recipe.path }}
              style={styles.bgImage}
            >
              <View style = {styles.buttonContainer}>
              {/* <Button  onPress ={props.addRecipe} title = "ADD" /> */}
              </View>
              
              <View style={styles.titleContainer}>
              
                <Text style={styles.title} numberOfLines={1}>
                  {recipe.name}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
            {/* <Text>{recipe.duration}m</Text>
            <Text>{recipe.complexity.toUpperCase()}</Text>
            <Text>{recipe.affordability.toUpperCase()}</Text> */}

            {/* <Text>{recipe.description}</Text>
            <Text>{recipe.category}</Text> */}

            
          </View>
          
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  mealRow: {
    flexDirection: 'row'
  },
  mealHeader: {
    height: '85%'
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%'
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  },
  buttonContainer : {
    //width: "20%",
    alignItems:"center",
    backgroundColor:"transparent"
  },

});

export default RecipeItem;
