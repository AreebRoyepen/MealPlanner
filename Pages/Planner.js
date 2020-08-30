import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Header } from 'react-native-elements';
import { Left, Right, Icon } from 'native-base';

import HeaderButton from '../components/HeaderButton';
import AgendaItem from "../components/AgendaItem";

import * as Calendar from 'expo-calendar';
import * as Permissions from 'expo-permissions';
import Colors from '../constants/Colors';

const PlannerPage = () => {

  const [calendarID, setCalendarID] = useState()

  function getMinDate(){

    var x = new Date();
    x.setMonth(x.getMonth()-1);
    return x
  }

  function getMaxDate(){

    var x = new Date();
    x.setMonth(x.getMonth()+ 12);
    return x
  }
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync();
        console.log('Here are all your calendars:');
        if(calendars.length !== 0){
          
          console.log( {calendars} )
        } else{
          
        Alert.alert("You have no calendars, create one to add events")
        }
        
      }
    })();

  });

  const deleteHandler = () => {

    (async () => {await Calendar.deleteCalendarAsync("1")} )();
    
  }

  const createCalendar = () => { 

    (async () => {
      let details = {
        title : "test calendar",
        color : Colors.primaryColor,
        source : {
          isLocalAccount : true,
          name: 'test'
        },
        name: "expo calendar",
        ownerAccount: "bleh",
        accessLevel: "owner"
      }

      let x = await Calendar.createCalendarAsync(details);
      console.log(x);
      setCalendarID(x)
    })();

  }

  const addEvent = () => {

    (async () => {
      let details = {

        title : "test",
        startDate : new Date(),
        endDate : new Date()
  
      }
  
      let x = await Calendar.createEventAsync("1", details);
      console.log("event:");
      console.log(x);
    })();
    

  }

  const logEvents = () => {

    (async () => {

  
      let x = await Calendar.getEventsAsync(["1"], getMinDate(), getMaxDate());
      console.log(x)
    })();

  }

        return (
            <View style={styles.container}>

              <View style = {styles.buttons}> 

                
                <Button onPress = {() => createCalendar()} color = {Colors.buttonColor} title = "Create Calendar" />
                <Button onPress = {() => deleteHandler()} color = {Colors.buttonColor} title = "Delete Calendar" />

                <Button onPress = {() => addEvent()} color = {Colors.buttonColor} title = "Add event to Calendar" />

                <Button onPress = {() => logEvents()} color = {Colors.buttonColor} title = "Log Events" />

              </View>
            </View>
        );
}

PlannerPage.navigationOptions = navData =>{
    return {
        headerTitle: "Your Planner",
        headerLeft: () =>
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Menu"
              iconName="ios-menu"
              onPress={() => {
                navData.navigation.toggleDrawer();
              }}
            />
          </HeaderButtons>
        
      };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection : "row",
        width : "100%"
    },
    buttons : {
      flex : 1,
      justifyContent : "center",
      alignItems: "center",
    padding: 15,
    }
});
export default  PlannerPage;