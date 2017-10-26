import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FormLabel, FormInput } from "react-native-elements";
import { connect } from "react-redux";

import * as actions from "../actions";
import { gray, white } from "../utils/colors";

class NewDeck extends Component {
  static navigationOptions = {
    title: "New Deck"
  };

  state = {
    title: ""
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FormLabel>What is the title of your new deck?</FormLabel>
        <FormInput onChangeText={title => this.setState({ title })} />
        <View style={[styles.center, { justifyContent: "flex-start" }]}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: white }]}
            onPress={() => this.props.saveDeckTitle(this.state.title)}
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

export default connect(null, actions)(NewDeck);
