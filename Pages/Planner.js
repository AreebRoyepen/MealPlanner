import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Header } from 'react-native-elements';
import { Left, Right, Icon } from 'native-base';

import HeaderButton from '../components/HeaderButton';
import AgendaItem from "../components/AgendaItem";

const PlannerPage = () => {

  function getMinDate(){

    var x = new Date();
    x.setDate(1);
    x.setMonth(x.getMonth()-1);
    return x
  }

  function getMaxDate(){

    var x = new Date();
    x.setDate(1);
    x.setMonth(x.getMonth()+ 12);
    return x
  }

        return (
            <View style={styles.container}>

                {/* <Agenda
                
                items={{
                  '2020-07-22': [{name: 'item 1 - any js object'}],
                  '2020-07-23': [{name: 'item 2 - any js object', height: 80}],
                  '2020-07-24': [],
                  '2020-07-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
                }}
                
                pastScrollRange={0} 
                
                futureScrollRange={5}
                renderEmptyDate={() => {return (<View><Text>This is empty</Text></View>);}}
                renderItem={(item, firstItemInDay) => {return <AgendaItem item = {item} />}}
                theme={{

                  //caleder theme
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    textSectionTitleDisabledColor: '#d9e1e8',
                    selectedDayBackgroundColor: 'black',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    dotColor: 'black',
                    selectedDotColor: 'black',
                    // arrowColor: 'orange',
                    disabledArrowColor: '#d9e1e8',
                    // monthTextColor: 'blue',
                    // indicatorColor: 'blue',
                    // textDayFontFamily: 'monospace',
                    // textMonthFontFamily: 'monospace',
                    // textDayHeaderFontFamily: 'monospace',
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16,


                  agendaDayTextColor: 'black',
                  agendaDayNumColor: 'black',
                  agendaTodayColor: '#ffd13b',
                  agendaKnobColor: 'black'
                }}

                /> */}

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
        flex: 1
    }
});
export default  PlannerPage;