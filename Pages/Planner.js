import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  SectionList,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { FAB, Portal, Provider } from "react-native-paper";

import HeaderButton from "../components/HeaderButton";
import PlannerListItem from "../components/PlannerListItem";

import * as Calendar from "expo-calendar";
import Colors from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions/recipes";
import { ActionSheet, Toast } from "native-base";
import * as Api from "../api/Api";

const PlannerPage = ({ navigation }) => {
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const dispatch = useDispatch();
  const storedCalendarID = useSelector((state) => state.recipes.calendarID);
  const favoriteRecipes = useSelector((state) => state.recipes.favoriteRecipes);

  // const recipes = useSelector((state) => state.recipes.recipes);
  const recipes = useRef();
  const [refresh, setRefresh] = useState(false);

  const [calendarRecipes, setCalendarRecipes] = useState([]);

  function returnMorningDate() {
    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    return date;
  }

  function getMaxDate() {
    var x = new Date();
    x.setMonth(x.getMonth() + 12);
    return x;
  }

  const getRecipes = useCallback( async () => {
      const response = await Api.fetchRecipes();
      dispatch(actions.setRecipes(response.data));
      return response.data;
    
  }

  );

  useEffect(() => {
    const willFocusSub = navigation.addListener("willFocus", pageLoad);

    return () => {
      willFocusSub.remove();
    };
  }, [pageLoad]);


  const pageLoad = useCallback(async () => {
    setRefresh(true);
    let calendarRecipes;
    let calendarID;
    
    if (typeof recipes.current === "undefined") {
      recipes.current = await getRecipes();
      //console.log(recipes.current);
    }
    
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync();
        //await Calendar.deleteCalendarAsync("1");
        // console.log(calendars)
        if (calendars.find((cal) => cal.title === "Meal Planner Calendar")) {
          calendarID = calendars.find(
            (cal) => cal.title === "Meal Planner Calendar"
          ).id;

          dispatch(actions.setCalendarID(calendarID));
        } else {
          Alert.alert("You have no calendars, create one to add events");
          await createCalendar();
        }
        // console.log("calendar ID")
        // console.log(calendarID)
        calendarRecipes = await Calendar.getEventsAsync(
          [calendarID],
          returnMorningDate(),
          getMaxDate()
        );

        let orderedList = orderCalendar(calendarRecipes)

        let x = addRecipesToList(orderedList);
        makeList(x);
      }
    
  }, [dispatch]);

  const deleteHandler = () => {
    (async () => {
      await Calendar.deleteCalendarAsync("1");
    })();
  };

  const createCalendar = useCallback(async () => {
    let details = {
      title: "Meal Planner Calendar",
      color: Colors.primaryColor,
      source: {
        isLocalAccount: true,
        name: "meal planner",
      },
      name: "expo calendar",
      ownerAccount: "Meal Planner",
      accessLevel: "read",
    };

    let x = await Calendar.createCalendarAsync(details);
    console.log("THIS IS THE CALENDER ID", x);
    dispatch(actions.setCalendarID(x));
  });

  const makeList = (x) => {
    console.log(x);
    function getDate(y) {
      let dte = new Date(y);
      return dte.toDateString();
    }

    let arr;
    let finalarr = [];
    
    if(x.length === 0){
      return
    }

    x.forEach((item, index) => {
      if (arr === undefined)
        arr = { title: getDate(item.startDate), data: [item] };
      else if (getDate(item.startDate) === getDate(arr.title)) {
        arr = { title: getDate(item.startDate), data: [...arr.data, item] };
      } else {
        finalarr.push(arr);
        let newarr = { title: getDate(item.startDate), data: [item] };
        arr = newarr;
      }
    });
    finalarr.push(arr);

    //console.log(finalarr)
    setCalendarRecipes(finalarr);
    setRefresh(false);
  };

  const addRecipesToList = (calendarRecipes) => {
  
    let x = [...calendarRecipes];
    
    x.forEach((item, index) => {
      x[index] = {
        ...item,
        recipe: recipes.current.find((x) => x.name === item.title),
      };
      //selectedRecipes.push(recipes.find((x) => x.name === item.title))
    });

    return x;
  };

  const orderCalendar = (list) => {

    console.log(list);

    list.sort((a, b) => (a.startDate > b.startDate) ? 1 :  -1 )

    return list


  }
  return (
    <Provider>

      {calendarRecipes.length !== 0 ?
      <SectionList
            sections={calendarRecipes}
        ListEmptyComponent={
          <View>
            <Text>Planner empty, choose a recipe to add</Text>
          </View>
        }
        onRefresh={pageLoad}
        refreshing={refresh}
        //keyExtractor={(item, index) => item + index}
        renderItem={(itemData) => {
          //console.log(itemData.item);
          return (
            <PlannerListItem
              onPress={() =>
                navigation.navigate({
                  routeName: "RecipeDetail",
                  params: {
                    recipe: itemData.item.recipe,
                    //recipeTitle: itemData.item.title,
                    isFav: favoriteRecipes.some(
                      (meal) => meal.id === itemData.item.recipe.id
                    ),
                  },
                })
              }
              onLongPress={() =>
                ActionSheet.show(
                  {
                    options: ["Edit Event", "Delete Event", "Cancel"],
                    cancelButtonIndex: 2,
                    title: "Options",
                  },
                  (buttonIndex) => {
                    if (buttonIndex === 0) {
                      navigation.navigate({
                        routeName: "CreateAgenda",
                        params: { recipe: itemData.item, edit: true },
                      });
                    }
                    if (buttonIndex === 1) {
                      // delete event
                      (async () => {
                        await Calendar.deleteEventAsync(itemData.item.id);

                        pageLoad();

                        Toast.show({
                          text: "Item Deleted",
                          duration: 3000,
                        });
                      })();
                    }
                  }
                )
              }
              key={itemData.item.id}
              title={itemData.item.recipe.name}
              image={itemData.item.recipe.path}
              time={itemData.item.notes.includes("Breakfast") ? "Breakfast" : itemData.item.notes.includes("Lunch") ? "Lunch" :itemData.item.notes.includes("Dinner") ? "Dinner" : ""}
            ></PlannerListItem>
          );
        }}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.header}>
          <Text >{title}</Text>
          </View>
        )}
        style={{ width: "100%" }}
      />
    
    
      :


      <View>
            <Text>Planner empty, choose a recipe to add</Text>
          </View>
      
      
      
      }
      


      <Portal>
        <FAB.Group
          open={open}
          fabStyle={{ backgroundColor: Colors.buttonColor }}
          color="white"
          icon={"calendar-today"}
          actions={[
            {
              icon: "plus",
              label: "add meal to planner",
              onPress: () => navigation.navigate({routeName:'CreateAgenda', params: {dropdown:true}}),
            },
            // {
            //   icon: 'email',
            //   label: 'Email me my meal plan',
            //   onPress: () => console.log('Pressed email'),
            // },
          ]}
          onStateChange={onStateChange}
          //onPress={() => {  navigation.navigate('CreateAgenda') }}
        />
      </Portal>
    </Provider>
  );
};

PlannerPage.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Planner",
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
    flexDirection: "row",
    width: "100%",
    height: 200,
  },
  buttons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",

  }
});
export default PlannerPage;
