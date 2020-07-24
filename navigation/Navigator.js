import React from 'react';
import { Platform, Text } from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';

import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import HomePage from '../Pages/HomePage';
import FeedbackPage from '../Pages/Feedback';
import GroceryListPage from '../Pages/GroceryList';
import PlannerPage from '../Pages/Planner';
import  RecipesPage from '../Pages/Recipes';
import Colors from '../constants/Colors';
import RecipeDatailPage from '../Pages/RecipeDatailPage';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  headerTitle: 'A Screen'
};

const FeedbackNavigator = createStackNavigator(
  {
    Feedback: {
      screen: FeedbackPage,
      navigationOptions: {
        title: 'Feedback Page'
      }
    },
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const GroceriesListNavigator = createStackNavigator(
  {
    GroceryList: {
      screen: GroceryListPage,
      navigationOptions: {
        title: 'Grocery List'
      }
    },
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const PlannerNavigator = createStackNavigator(
  {
    Planner: {
      screen: PlannerPage,
      navigationOptions: {
        title: 'Your Planner'
      }
    },
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const RecipesNavigator = createStackNavigator(
  {
    Recipes: {
      screen: RecipesPage,
      navigationOptions: {
        title: 'Recipes'
      }
    },
    RecipeDetail : RecipeDatailPage
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions
  }
);


const MainNavigator = createDrawerNavigator(
  {

    Recipes: {
      screen: RecipesNavigator,
      navigationOptions: {
        title: 'Recipes'
      }
    },
    GroceryList: {
      screen: GroceriesListNavigator,
      navigationOptions: {
        title: 'Grocery List'
      }
    },
    Planner: {
      screen: PlannerNavigator,
      navigationOptions: {
        title: 'Your Planner'
      }
    },
    Feedback: {
      screen: FeedbackNavigator,
      navigationOptions: {
        title: 'Send Feedback'
      }
    },
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: 'open-sans-bold'
      }
    }
  }
);

export default createAppContainer(MainNavigator);
