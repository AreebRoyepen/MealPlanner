import React, { useEffect, useState } from "react";
import { Alert, FlatList, Modal, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import RecipeItem from "./RecipeItem";
import SearchBox from "./SearchBox";

const RecipeModal = (props) => {

    const initialRecipes = useSelector((state) => state.recipes.recipes);
    const [filteredRecipes, setFilteredRecipes] = useState();
    const [searchWord, setSearchWord] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {

        setFilteredRecipes(initialRecipes);
      }, [initialRecipes]);

      const searchRecipes = (text) => {

        setSearchWord(text)
        const filteredList = initialRecipes.filter((item) => { return item.name.toLowerCase().includes(text.toLowerCase()) })
        setFilteredRecipes(filteredList)
    
      }

      const selectedRecipe = (recipe) => {
        props.recipe(recipe)
        props.close()
      }

      const renderMealItem = (itemData) => {
    
        return (
          <RecipeItem
            recipe={itemData.item}
            onSelectRecipe={()=>selectedRecipe(itemData.item)}
          />
        );
      };
    
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={props.visible}
          onRequestClose={props.close}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FlatList
                ListEmptyComponent={() =>
                  isLoading ? (
                    <Text>Loading ... </Text>
                  ) : (
                    <Text> No Items </Text>
                  )
                }
                ListHeaderComponent={
                  <SearchBox
                    value={searchWord}
                    onChangeText={(text) => searchRecipes(text)}
                  />
                }
                data={filteredRecipes}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={renderMealItem}
                style={{ width: "100%" }}
                extraData={initialRecipes}
              />

            </View>
          </View>
        </Modal>
      </View>
    );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default RecipeModal;


