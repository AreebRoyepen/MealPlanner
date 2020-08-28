import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert,ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Header } from 'react-native-elements';
import { Left, Right, Icon } from 'native-base';
import { FAB, Portal, Provider } from 'react-native-paper';

import HeaderButton from '../components/HeaderButton';
import PlannerListItem from "../components/PlannerListItem";

import * as Calendar from 'expo-calendar';
import * as Permissions from 'expo-permissions';
import Colors from '../constants/Colors';
import { HeaderBackground } from 'react-navigation-stack';

const PlannerPage = ({ navigation }) => {

  const [calendarID, setCalendarID] = useState()

  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

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
    })();
    

  }

  const logEvents = () => {

    (async () => {

  
      let x = await Calendar.getEventAsync("1", new Date(), new Date());
      console.log(x)
    })();

  }

        return (
               <Provider>
                <ScrollView>
                <Text>Monday, August 31</Text>
                 <PlannerListItem></PlannerListItem>
                <Text>Tuesday, September 1</Text>
                 <PlannerListItem></PlannerListItem>
                 <PlannerListItem></PlannerListItem>
                 <Text>Wednesday, September 2</Text>
                 <PlannerListItem></PlannerListItem>
                 <PlannerListItem></PlannerListItem>
                 <PlannerListItem></PlannerListItem>
                 <Text>Thursday, September 3</Text>
                 <PlannerListItem></PlannerListItem>
                 <PlannerListItem></PlannerListItem>
                 <PlannerListItem></PlannerListItem>
                 <PlannerListItem></PlannerListItem>
                 <Text>Friday, September 4</Text>
                 <PlannerListItem></PlannerListItem>
                 <PlannerListItem></PlannerListItem>
                 <PlannerListItem></PlannerListItem>
                 <PlannerListItem></PlannerListItem>
                 <PlannerListItem></PlannerListItem>
                </ScrollView>
      <Portal>
        <FAB.Group
          open={open}
          theme={{ colors: { accent: 'red' } }}
          color="white" 
          icon={open ? 'calendar-today' : 'plus' }

          actions={[
            { icon: 'plus', label:'add meal to planner', onPress: () => navigation.navigate('CreateAgenda')},
            {
              icon: 'email',
              label: 'Email me my meal plan',
              onPress: () => console.log('Pressed email'),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
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
        width : "100%",
        height:200,
    },
    buttons : {
      flex : 1,
      justifyContent : "center",
      alignItems: "center",
    padding: 15,
    },
    openButton: {
      backgroundColor: "#F194FF",
    },
});
export default  PlannerPage;


/****
 * 
 * 
 * 
 * 
 * 
                <Button onPress = {() => createCalendar()} color = {Colors.buttonColor} title = "Create Calendar" />
                <Button onPress = {() => deleteHandler()} color = {Colors.buttonColor} title = "Delete Calendar" />

                <Button onPress = {() => addEvent()} color = {Colors.buttonColor} title = "Add event to Calendar" />

                <Button onPress = {() => logEvents()} color = {Colors.buttonColor} title = "Log Events" />
 */