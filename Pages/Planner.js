import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Header } from "react-native-elements";
import { Left, Right, Icon } from "native-base";
import { FAB, Portal, Provider } from "react-native-paper";

import HeaderButton from "../components/HeaderButton";
import PlannerListItem from "../components/PlannerListItem";

import * as Calendar from "expo-calendar";
import * as Permissions from "expo-permissions";
import Colors from "../constants/Colors";
import { HeaderBackground } from "react-navigation-stack";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions/recipes";

const PlannerPage = ({ navigation }) => {

  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const dispatch = useDispatch();
  const calendarID = useSelector((state) => state.recipes.calendarID);


  function getMinDate() {
    var x = new Date();
    x.setMonth(x.getMonth() - 1);
    return x;
  }

  function getMaxDate() {
    var x = new Date();
    x.setMonth(x.getMonth() + 12);
    return x;
  }
  
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync();
        console.log("Here are all your calendars:");
        console.log(calendarID);
        console.log({calendars});
        //await Calendar.deleteCalendarAsync("1");

        if (calendars.find(cal => cal.title === "Meal Planner Calendar")) {
          console.log(calendars.find(cal => cal.title === "Meal Planner Calendar").id);
          dispatch(actions.setCalendarID(calendars.find(cal => cal.title === "Meal Planner Calendar").id));
        } else {
          Alert.alert("You have no calendars, create one to add events");
          let x = await createCalendar();
          console.log(x);
        }

        let x = await Calendar.getEventsAsync([calendarID], getMinDate(), new Date())

        console.log(x);
      }
    })();
  });

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

  const logEvents = () => {
    (async () => {
      let x = await Calendar.getEventsAsync(["1"], getMinDate(), getMaxDate());
      console.log(x);
    })();
  };

  const uri =
    "https://www.withablast.net/wp-content/uploads/2013/01/Cape-Chicken-Breyani-c-768x535.jpg";

  return (
    <Provider>
      {console.log(calendarID)}
      <ScrollView>
        <Text>Monday, August 31</Text>
        <PlannerListItem
          title="Cape Chicken Breyani"
          image={uri}
          time={"Dinner"}
        ></PlannerListItem>
        <Text>Tuesday, September 1</Text>
        <PlannerListItem
          title="Cape Chicken Breyani"
          image={uri}
          time={"Lunch"}
        ></PlannerListItem>
        <PlannerListItem
          title="Cape Chicken Breyani"
          image={uri}
          time={"Dinner"}
        ></PlannerListItem>
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