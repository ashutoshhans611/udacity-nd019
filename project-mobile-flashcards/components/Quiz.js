import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";

import * as actions from "../actions";
import { gray, white, red } from "../utils/colors";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

class Quiz extends Component {
  static navigationOptions = {
    title: "Quiz"
  };

  state = {
    deck: {},
    index: 0,
    correct: 0,
    incorrect: 0,
    front: true
  };

  componentDidMount() {
    const navParams = this.props.navigation.state.params;
    const deck = this.props.decks[navParams.title];

    this.setState({ deck });
  }

  onClickCorrect = () => {
    let { index, correct } = this.state;
    index++;
    correct++;

    if (index <= this.state.deck.questions.length) {
      this.setState({ index, correct, front: true });
    } else {
      // Skip notifications if the user completed at least one quiz for that day.
      clearLocalNotification().then(setLocalNotification);
    }
  };

  onClickIncorrect = () => {
    let { index, incorrect } = this.state;
    index++;
    incorrect++;

    if (index <= this.state.deck.questions.length) {
      this.setState({ index, incorrect, front: true });
    } else {
      // Skip notifications if the user completed at least one quiz for that day.
      clearLocalNotification().then(setLocalNotification);
    }
  };

  onClickRestart = () => {
    this.setState({
      index: 0,
      correct: 0,
      incorrect: 0,
      front: true
    });
  };

  renderQuestion(question) {
    if (this.state.front) {
      return (
        <View style={styles.center}>
          <Text style={{ fontSize: 40 }}>{question.question}</Text>
          <TouchableOpacity onPress={() => this.setState({ front: false })}>
            <Text style={{ fontSize: 20, color: red }}>answer</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.center}>
          <Text style={{ fontSize: 40 }}>{question.answer}</Text>
          <TouchableOpacity onPress={() => this.setState({ front: true })}>
            <Text style={{ fontSize: 20, color: red }}>question</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
    const { deck, index, correct, incorrect } = this.state;

    if (deck.questions === undefined || deck.questions.length === 0) {
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.center}>
            <Text style={{ fontSize: 30 }}>No Questions</Text>
          </View>
        </View>
      );
    }

    const remain = index < deck.questions.length ? true : false;

    if (!remain) {
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.center}>
            <Text style={{ fontSize: 30 }}>Accuracy</Text>
            <Text style={{ fontSize: 50 }}>
              {Math.round(correct / (correct + incorrect) * 100)}%
            </Text>
          </View>

          <View style={[styles.center, { justifyContent: "flex-start" }]}>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: white }]}
              onPress={this.onClickRestart}
            >
              <Text style={[styles.btnText, { color: gray }]}>
                Restart Quiz
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: gray }]}
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={[styles.btnText, { color: white }]}>
                Back to Deck
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <View>
          <Text style={{ fontSize: 40 }}>
            {index + 1}/{deck.questions.length}
          </Text>
        </View>

        {this.renderQuestion(deck.questions[index])}

        <View style={[styles.center, { justifyContent: "flex-start" }]}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: white }]}
            onPress={this.onClickCorrect}
          >
            <Text style={[styles.btnText, { color: gray }]}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: gray }]}
            onPress={this.onClickIncorrect}
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

function mapStateToProps({ decks }) {
  return { decks };
}

export default connect(mapStateToProps, actions)(Quiz);
