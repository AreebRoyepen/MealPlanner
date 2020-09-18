import { Platform } from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import HomePage from '../pages/HomePage';
import CreateAgenda from '../pages/CreateAgenda';
import FeedbackPage from '../pages/Feedback';
import GroceryListPage from '../pages/GroceryList';
import PlannerPage from '../pages/Planner';
import  RecipesPage from '../pages/Recipes';
import Colors from '../constants/Colors';
import RecipeDatailPage from '../pages/RecipeDatailPage';
import Settings from '../pages/Settings';

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


const SettingsNavigator = createStackNavigator(
  {
    CreateAgenda: {
      screen: Settings,
      navigationOptions: {
        title: 'Settings'
      }
    },
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: HomePage,
      navigationOptions: {
        title: 'Home Page'
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
    RecipeDetail : {
      screen: RecipeDatailPage,
      navigationOptions: {
        title: 'Recipe Details'
      }
    },
    CreateAgenda: {
      screen: CreateAgenda,
      navigationOptions: {
        title: 'Create Agenda'
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
    RecipeDetail : {
      screen: RecipeDatailPage,
      avigationOptions: {
        title: 'Recipe Details'
      }
    },
    CreateAgenda: {
      screen: CreateAgenda,
      navigationOptions: {
        title: 'Create Agenda'
      }
    },
  },
  
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions
  }
);


const MainNavigator = createDrawerNavigator(
  {
    Planner: {
      screen: PlannerNavigator,
      navigationOptions: {
        title: 'Your Planner'
      }
    },
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

    Feedback: {
      screen: FeedbackNavigator,
      navigationOptions: {
        title: 'Send Feedback'
      }
    },
    Settings: {
      screen: SettingsNavigator,
      navigationOptions: {
        title: 'Settings'
      }
    },
    // CreateAgenda: {
    //   screen:  CreateAgendaNavigator,
    //   navigationOptions: {
    //     title: ' Create Agenda'
    //   }
    // },
    
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: 'open-sans'
      }
    }
  }
);

export default createAppContainer(MainNavigator);
