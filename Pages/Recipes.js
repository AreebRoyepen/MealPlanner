import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Header } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Icon,Container, Content,  InputGroup, Input} from 'native-base';
import { useSelector } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import RecipeList from '../components/RecipeList';

const RecipesPage = props => {

    const availableMeals = useSelector(state => state.meals.filteredMeals);

        return (
            <View style={styles.container}>
                {/* <Header
                    leftComponent={<Icon name="menu"  style={{color:'white'}}  onPress={() => this.props.navigation.openDrawer()} />}
                    centerComponent={<Text style={{color:'white'}}>Salwaa's Menu Planner</Text>}
                    rightComponent={<Icon name="cart"  style={{color:'white'}} onPress={() => this.props.navigation.openDrawer()}/>} //this will be the buy more recipes navigation
                /> */}
               
                {/* <Container>
                <Content>
                <Grid>
                        <Col style={{ }}><Text style={{fontSize:18, marginTop:10, marginLeft:10}}>RECIPES</Text></Col>
                        <Col style={{  width:250 }}>
                        <InputGroup borderType="rounded" >
                        <Icon name="ios-search" style={{color:'#384850'}}/>
                        <Input placeholder="Search Recipes" style={{color: '#00c497'}} />
                    </InputGroup>
                        </Col>
                    </Grid>   

                    <Grid style={{marginTop:40, marginBottom:30}}>
                        <Col style={{ backgroundColor:'red',height:200}}></Col>
                        <Col style={{  backgroundColor:'green',height:200}}></Col>
                    </Grid>   

                    <Grid style={{marginTop:40, marginBottom:30}}>
                        <Col style={{ backgroundColor:'red',height:200}}></Col>
                        <Col style={{  backgroundColor:'green',height:200}}></Col>
                    </Grid>   

                    <Grid style={{marginTop:40, marginBottom:30}}>
                        <Col style={{ backgroundColor:'red',height:200}}></Col>
                        <Col style={{  backgroundColor:'green',height:200}}></Col>
                    </Grid>   
                  
                </Content>
            </Container> */}

<RecipeList listData={availableMeals} navigation={props.navigation} />
            </View>
        );
}

RecipesPage.navigationOptions = navData =>{
    return {
        headerTitle: "Recipes",
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
export default  RecipesPage;