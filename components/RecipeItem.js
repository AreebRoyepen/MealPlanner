import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Button
} from 'react-native';

const RecipeItem = props => {

  const recipe = props.recipe;

  return (
    <View style={styles.recipeItem}>
      <TouchableOpacity onPress={props.onSelectRecipe} onLongPress ={props.longPress}>
        <View>
          <View style={{ ...styles.row, ...styles.header }}>
          
            <ImageBackground
              source={{ uri: recipe.path }}
              style={styles.bgImage}
            >
              
              <View style={styles.titleContainer}>
              
                <Text style={styles.title} numberOfLines={1}>
                  {recipe.name}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.row, ...styles.details }}>
            {/* <Text>{recipe.description}</Text>
            <Text>{recipe.category}</Text> */}            
          </View>
          
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  recipeItem: {
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
  row: {
    flexDirection: 'row'
  },
  header: {
    height: '85%'
  },
  details: {
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
