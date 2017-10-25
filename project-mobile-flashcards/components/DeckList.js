import React, { Component } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { List, ListItem } from "react-native-elements";

class DeckList extends Component {
  static navigationOptions = {
    title: "Deck View"
  };

  state = {
    data: [
      {
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
      {
        title: "JavaScript",
        questions: [
          {
            question: "What is a closure?",
            answer:
              "The combination of a function and the lexical environment within which that function was declared."
          }
        ]
      }
    ]
  };

  render() {
    return (
      <List
        containerStyle={{
          marginTop: 0,
          borderTopWidth: 0,
          borderBottomWidth: 0
        }}
      >
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              onPress={() =>
                this.props.navigation.navigate("DeckDetail", {
                  title: item.title
                })}
              key={item.title}
              title={
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text>{item.title}</Text>
                </View>
              }
              subtitle={
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text>{`${item.questions.length} cards`}</Text>
                </View>
              }
            />
          )}
        />
      </List>
    );
  }
}

export default DeckList;
