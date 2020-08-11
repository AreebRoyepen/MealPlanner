import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Header } from 'react-native-elements';
import { Icon } from 'native-base';
import { Card, Button  } from 'react-native-paper';

import HeaderButton from '../components/HeaderButton';

const HomePage = () => {


        return (
            <View style={styles.container}>
             
              <Card.Title
                  title="Cape Malay and Other Recipes"
                  subtitle="Plan your menu for the next few days/weeks"
                  style={{alignItems: "center"}}
             />
             <Text style={{marginTop:-15,marginLeft: 15,marginBottom : 20, color:'black'}}>No more DAILY deciding for busy homes</Text>
               
                <Card>
                    <Card.Cover  source={require('./../assets/home.jpg')} style={{height:400}} />
                </Card>
                <Button
                    style={{ marginTop: 15, marginLeft:15, marginRight:15, color:'white' }}
                    icon="send"
                    mode="contained"
                    color="#ffd13b"
                   
                >
                    send Feedback
                </Button>
              
            </View>
        );
    
}

HomePage.navigationOptions = navData =>{
    return {
        headerTitle: "Salwaa's Menu Planner",
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


export default HomePage;