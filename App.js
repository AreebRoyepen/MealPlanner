import React, { Component } from 'react';
import { Text, View, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import HomePage from './Pages/HomePage';
import FeedbackPage from './Pages/Feedback';
import GroceryListPage from './Pages/GroceryList';
import PlannerPage from './Pages/Planner';
import  RecipesPage from './Pages/Recipes';


const { width } = Dimensions.get("window");

const CustomDrawerNavigation = (props) => {
  return (
   
    <SafeAreaView style={{ flex: 1}} >
      <View style={{ height: 230, backgroundColor: '#d2d2d2', opacity: 0.9 }}>
      
        <View style={{ height: 250, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('./assets/home.jpg')} style={{ height: 220, width: 240}} />
        </View>
      
      </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>

    </SafeAreaView>
    
  );
}

const Drawer = createDrawerNavigator({
  Home: {
    screen: HomePage,
    navigationOptions: {
      title: 'Homepage'
    }
  },
  Feedback: {
    screen: FeedbackPage,
    navigationOptions: {
      title: 'Feedback Page'
    }
  },
  GroceryList: {
    screen: GroceryListPage,
    navigationOptions: {
      title: 'Grocery List Page'
    }
  },
  Planner: {
    screen: PlannerPage,
    navigationOptions: {
      title: 'Planner Page'
    }
  },
  Recipes: {
    screen: RecipesPage,
    navigationOptions: {
      title: 'Recipes Page'
    }
  }
},
  {
    drawerPosition: 'left',
    contentComponent: CustomDrawerNavigation,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerWidth: (width / 3) * 2
  });

const App = createAppContainer(Drawer);

export default App;