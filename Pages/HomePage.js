import React, { Component } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { Header } from 'react-native-elements';
import { Icon } from 'native-base';
import { Card, Button  } from 'react-native-paper';

class HomePage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header style ={{width: 10}}
                    backgroundColor ='black'
                    leftComponent={<Icon name="menu"  style={{color:'white'}}  onPress={() => this.props.navigation.openDrawer()} />}
                    centerComponent={<Text style={{color:'white'}}>Salwaa's Menu Planner</Text>}
                    rightComponent={<Icon name="cart"  style={{color:'white'}} onPress={() => this.props.navigation.openDrawer()}/>} //this will be the buy more recipes navigation
                />
              
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
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
export default HomePage;