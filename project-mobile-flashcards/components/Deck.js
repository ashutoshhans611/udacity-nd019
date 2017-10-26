import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";

import * as actions from "../actions";
import { gray, white } from "../utils/colors";

class Deck extends Component {
  static navigationOptions = {
    title: "Deck"
  };

  render() {
    const navParams = this.props.navigation.state.params;
    const deck = this.props.decks[navParams.title];

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.center}>
          <Text style={{ fontSize: 40 }}>{deck.title}</Text>
          <Text style={{ fontSize: 20 }}>{deck.questions.length} cards</Text>
        </View>
        <View style={[styles.center, { justifyContent: "flex-start" }]}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: white }]}
            onPress={() =>
              this.props.navigation.navigate("NewQuestion", {
                title: deck.title
              })}
          >
            <Text style={[styles.btnText, { color: gray }]}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: gray }]}
            onPress={() =>
              this.props.navigation.navigate("Quiz", {
                title: deck.title
              })}
          >
            <Text style={[styles.btnText, { color: white }]}>Start Quiz</Text>
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

function mapStateToProps({ decks }) {
  return { decks };
}

export default connect(mapStateToProps, actions)(Deck);
