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

class NewDeck extends Component {
  static navigationOptions = {
    title: "New Deck"
  };

  state = {
    title: ""
  };

  onButtonPress = () => {
    this.props.saveDeckTitle(this.state.title).done(() => {
      this.input.clearText();
      this.props.getDecks();
      this.props.navigation.navigate("Deck", {
        title: this.state.title
      });
    });
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <FormLabel>What is the title of your new deck?</FormLabel>
        <FormInput
          ref={input => (this.input = input)}
          onChangeText={title => this.setState({ title })}
        />
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

export default connect(null, actions)(NewDeck);
