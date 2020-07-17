import React, { Component } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { Header } from 'react-native-elements';
import { Icon,Container, Content, Card, CardItem,  Thumbnail } from 'native-base';

class HomePage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header style ={{width: 10}}
                    leftComponent={<Icon name="menu"  style={{color:'white'}}  onPress={() => this.props.navigation.openDrawer()} />}
                    centerComponent={<Text style={{color:'white'}}>Salwaa's Menu Planner</Text>}
                    rightComponent={<Icon name="cart"  style={{color:'white'}} onPress={() => this.props.navigation.openDrawer()}/>} //this will be the buy more recipes navigation
                />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Container>
                <Content>
                    <Card >
                        <CardItem>
                            <Text>jjjjj Songs9</Text>
                          
                        </CardItem>

                        <CardItem >
                            <Image   style={{ height:100, width:100 }}  source={require('./../assets/home.jpg')} />
                        </CardItem>

                        <CardItem>
                            <Icon name={'ios-musical-notes'} style={{color : '#ED4A6A'}} />
                            <Text>Listen now</Text>
                        </CardItem>
                   </Card>
                </Content>
            </Container>
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
export default HomePage;