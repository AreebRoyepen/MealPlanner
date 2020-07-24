import React, { PureComponent } from "react";
import { View, Text, StyleSheet } from "react-native";

class AgendaItem extends PureComponent {
  render() {
    return (
      <View>
        <Text>{this.props.item.name}</Text>
      </View>
    );
  }
}

export default AgendaItem;
