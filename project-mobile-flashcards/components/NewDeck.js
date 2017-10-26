import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FormLabel, FormInput } from "react-native-elements";

import { gray, white } from "../utils/colors";

class NewDeck extends Component {
  static navigationOptions = {
    title: "New Deck"
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FormLabel>What is the title of your new deck?</FormLabel>
        <FormInput onChangeText={() => console.log("onChangeText")} />
        <View style={[styles.center, { justifyContent: "flex-start" }]}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: white }]}
            onPress={() => console.log("new deck")}
          >
            <Text style={[styles.btnText, { color: gray }]}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30
  },
  btn: {
    padding: 10,
    backgroundColor: gray,
    alignSelf: "center",
    borderRadius: 5,
    margin: 5
  },
  btnText: {
    color: white,
    fontSize: 20
  }
});

export default NewDeck;
