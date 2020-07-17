import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { Left, Right, Icon } from 'native-base';
import {Title,Paragraph,TextInput, Button }from 'react-native-paper';

class FeedbackPage extends Component {
    render() {
        return (
            <View style={styles.container}>
               <Header
                   backgroundColor ='black'
                    leftComponent={<Icon name="menu"  style={{color:'white'}}  onPress={() => this.props.navigation.openDrawer()} />}
                    centerComponent={<Text style={{color:'white'}}>Salwaa's Menu Planner</Text>}
                    rightComponent={<Icon name="cart"  style={{color:'white'}} onPress={() => this.props.navigation.openDrawer()}/>} //this will be the buy more recipes navigation
                />
                <View style={{ }} >
    
    <Title style={{ marginTop: 15,marginLeft:15, marginRight:15 }}>
      Send Us Your Feedback
    </Title>
    <Paragraph style={{ marginTop: 15,marginLeft:15, marginRight:15 }}>
      We would love to hear from you! </Paragraph>
    <TextInput
      style={{ marginTop: 15,marginLeft:15, marginRight:15 }}
      label='Subject'
      mode='outlined'
    />
    <TextInput
      style={{ marginTop: 15, height:250, marginLeft:15, marginRight:15}}
      label='Your message goes here...'
      mode='flat'
    />
     <Button
    style={{ marginTop: 15, marginLeft:15, marginRight:15 }}
    icon="send"
    mode="contained"
    color="#ffd13b"
  >
    send Feedback
  </Button>

    </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
export default  FeedbackPage;




