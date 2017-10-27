import React from "react";
import { View, StatusBar } from "react-native";
import { createStore } from "redux";
import { Constants } from "expo";
import { Provider } from "react-redux";

import store from "./store";
import MainNavigator from "./MainNavigator";
import UdaciStatusBar from "./UdaciStatusBar";
import { setLocalNotification } from "./utils/helpers";
import styles from "./styles";

export default class App extends React.Component {
  componentDidMount() {
    // Push notifications are generated at a 8pm if the user hasn't completed at least one quiz for that day.
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.outerContainer}>
          <UdaciStatusBar barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
