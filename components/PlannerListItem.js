import React, { useState } from "react";
import { Card, CardItem, Body, Left, Thumbnail } from "native-base";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TouchableHighlight,
  Modal,
} from "react-native";
import Colors from "../constants/Colors";

const PlannerListItem = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Card>
        <CardItem
          button
          onLongPress={props.onLongPress}
          onPress={props.onPress}
        >
          <Left>
            <Thumbnail square small source={{ uri: props.image }} />
            <Body>
              <Text style={styles.titleText}>{props.title}</Text>
            </Body>
          </Left>
          <Text style={styles.mealColor}>{props.time}</Text>
        </CardItem>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontWeight: "bold",
  },
  mealColor: {
    color: Colors.accentColor,
  },
});

export default PlannerListItem;
