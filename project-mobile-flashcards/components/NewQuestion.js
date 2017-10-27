import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { FormLabel, FormInput } from "react-native-elements";
import { connect } from "react-redux";

import * as actions from "../actions";
import { gray, white } from "../utils/colors";
import styles from "../styles";

class NewQuestion extends Component {
  static navigationOptions = {
    title: "New Question"
  };

  state = {
    answer: "",
    question: ""
  };

  onButtonPress = () => {
    const { params: navParams } = this.props.navigation.state;

    this.props.addCardToDeck(navParams.title, {
      question: this.state.question,
      answer: this.state.answer
    });

    this.props.navigation.goBack();
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
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
      </KeyboardAvoidingView>
    );
  }
}

export default connect(null, actions)(NewQuestion);
