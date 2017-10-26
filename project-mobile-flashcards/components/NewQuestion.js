import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FormLabel, FormInput } from "react-native-elements";
import { connect } from "react-redux";

import * as actions from "../actions";
import { gray, white } from "../utils/colors";

class NewQuestion extends Component {
  static navigationOptions = {
    title: "New Question"
  };

  state = {
    answer: "",
    question: ""
  };

  onButtonPress = () => {
    const navParams = this.props.navigation.state.params;

    this.props.addCardToDeck(navParams.title, {
      question: this.state.question,
      answer: this.state.answer
    });

    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FormLabel>Question</FormLabel>
        <FormInput onChangeText={question => this.setState({ question })} />
        <FormLabel>Answer</FormLabel>
        <FormInput onChangeText={answer => this.setState({ answer })} />
        <View style={[styles.center, { justifyContent: "flex-start" }]}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: white }]}
            onPress={this.onButtonPress}
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

export default connect(null, actions)(NewQuestion);
