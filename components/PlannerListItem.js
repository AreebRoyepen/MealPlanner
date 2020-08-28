import React, { Component, useState } from "react";
import { Image, ScrollView } from 'react-native';
import { Container,Button, Header, Content, Card, CardItem, Body,Left, Thumbnail, Icon} from 'native-base';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TouchableHighlight,
  Modal
} from 'react-native';
import { Badge } from 'react-native-paper';

const PlannerListItem = props => {
 const uri = "https://www.withablast.net/wp-content/uploads/2013/01/Cape-Chicken-Breyani-c-768x535.jpg";
 const [modalVisible, setModalVisible] = useState(false);
  return (
    <View >
            <Card  >
            <CardItem  button   onPress={() => {
          setModalVisible(true);}}>
              <Left>
              <Thumbnail square small source={{uri: uri}} />
                <Body>
                  <Text style={styles.titleText}>Cape Chicken Breyani</Text>
                </Body>

              </Left>
              <Text style={styles.dinnerColor}>Dinner</Text>
            </CardItem>
          </Card>
          <Modal style={styles.modalView}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to delete?</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>confirm</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>cancel</Text>
            </TouchableHighlight>
            
          </View>
        </View>
      </Modal>

        
    </View>
  );
};

const styles = StyleSheet.create({
  plannerListItem: {
    height: "200%",
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10
  },
  titleText: {
    fontWeight: "bold"
  }
  ,
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row'
  },
  header: {
    height: '85%'
  },
  details: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%'
  },
  dinnerColor:{
    color:'blue'
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  },
  buttonContainer : {
    //width: "20%",
    alignItems:"center",
    backgroundColor:"transparent"
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'rgba(0, 0, 0, 0.5)',
    opacity:0.9
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

});

export default PlannerListItem;
