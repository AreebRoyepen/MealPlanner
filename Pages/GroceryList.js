import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { Left, Right, Icon } from 'native-base';
import { Checkbox } from 'react-native-paper';

class GroceryListPage extends Component {
    render() {
        return (
            <View style={styles.container}>
               <Header
                     backgroundColor ='black'
                    leftComponent={<Icon name="menu"  style={{color:'white'}}  onPress={() => this.props.navigation.openDrawer()} />}
                    centerComponent={<Text style={{color:'white'}}>Salwaa's Menu Planner</Text>}
                    rightComponent={<Icon name="cart"  style={{color:'white'}} onPress={() => this.props.navigation.openDrawer()}/>} //this will be the buy more recipes navigation
                />
                
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
export default  GroceryListPage;