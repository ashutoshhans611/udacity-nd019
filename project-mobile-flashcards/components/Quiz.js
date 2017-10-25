import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { gray, white } from "../utils/colors";

class Quiz extends Component {
  static navigationOptions = {
    title: "Quiz"
  };

  clickCorrect = () => {
    console.log("click Corrent");
  };
  clickIncorrect = () => {
    console.log("click Incorrent");
  };
  state = {
    data: {
      React: {
        title: "React",
        questions: [
          {
            question: "What is React?",
            answer: "A library for managing user interfaces"
          },
          {
            question: "Where do you make Ajax requests in React?",
            answer: "The componentDidMount lifecycle event"
          }
        ]
      },
      JavaScript: {
        title: "JavaScript",
        questions: [
          {
            question: "What is a closure?",
            answer:
              "The combination of a function and the lexical environment within which that function was declared."
          }
        ]
      }
    }
  };

  render() {
    const navParams = this.props.navigation.state.params;
    const deck = this.state.data[navParams.title];

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.center}>
          <Text style={{ fontSize: 40 }}>{deck.questions[0].question}</Text>
          <Text style={{ fontSize: 20 }}>{deck.questions[0].answer}</Text>
        </View>
        <View style={[styles.center, { justifyContent: "flex-start" }]}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: white }]}
            onPress={() => this.clickCorrect}
          >
            <Text style={[styles.btnText, { color: gray }]}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: gray }]}
            onPress={this.clickIncorrect}
          >
            <Text style={[styles.btnText, { color: white }]}>Incorrect</Text>
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

export default Quiz;
