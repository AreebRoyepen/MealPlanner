import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Header } from "react-native-elements";
import { Left, Right, Icon } from "native-base";
import { FAB, Portal, Provider } from "react-native-paper";

import HeaderButton from "../components/HeaderButton";
import PlannerListItem from "../components/PlannerListItem";

import * as Calendar from "expo-calendar";
import Colors from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions/recipes";

const PlannerPage = ({ navigation }) => {

  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const dispatch = useDispatch();
  const calendarID = useSelector((state) => state.recipes.calendarID);
  const recipes = useSelector((state) => state.recipes.recipes);
  const [refresh, setRefresh] = useState(false)

  const [calendarRecipes, setCalendarRecipes] = useState();


  function returnMorningDate(){
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
  
  useEffect(() =>{
    
    pageLoad();
  },[pageLoad])
  
  const pageLoad = useCallback(async () => {
    let calendarRecipes;
      setRefresh(true)
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync();
        //await Calendar.deleteCalendarAsync("1");

        if (calendars.find(cal => cal.title === "Meal Planner Calendar")) {
          dispatch(actions.setCalendarID(calendars.find(cal => cal.title === "Meal Planner Calendar").id));
        } else {
          Alert.alert("You have no calendars, create one to add events");
          let x = await createCalendar();
        }
        calendarRecipes = await Calendar.getEventsAsync([calendarID], returnMorningDate(), getMaxDate())
        
        getRecipes(calendarRecipes)

        //console.log(x);
      }
    
  },[calendarID]);

  const deleteHandler = () => {
    (async () => {
      await Calendar.deleteCalendarAsync("1");
    })();
  };

  const createCalendar = () => {
    (async () => {
      let details = {
        title: "Meal Planner Calendar",
        color: Colors.primaryColor,
        source: {
          isLocalAccount: true,
          name: "test",
        },
        name: "expo calendar",
        ownerAccount: "bleh",
        accessLevel: "owner",
      };

      let x = await Calendar.createCalendarAsync(details);
      console.log("THIS IS THE CALENDER ID" , x);
      dispatch(actions.setCalendarID(x));

    })();
  };

  const getRecipes = (calendarRecipes) => {

    let selectedRecipes =[];

    calendarRecipes.forEach((item, index) =>{
      selectedRecipes.push(recipes.find((x) => x.name === item.title))

      })
      
      setRefresh(false)
      setCalendarRecipes(selectedRecipes)


  }


  return (
    <Provider>
      <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={pageLoad}
              />
            }>
        <Text>Monday, August 31</Text>



        {calendarRecipes ? calendarRecipes.map((recipe) => (
        
          <PlannerListItem
            key={recipe.id}
            title={recipe.name}
            image={recipe.path}
            time={"Dinner"}
          ></PlannerListItem>
        ))
      :
      console.log(recipe)
      }

      </ScrollView>
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
              onPress: () => navigation.navigate("CreateAgenda"),
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
});
export default PlannerPage;