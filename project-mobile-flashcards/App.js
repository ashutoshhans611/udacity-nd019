import React from "react";
import { View, StatusBar } from "react-native";
import { createStore } from "redux";
import { Constants } from "expo";
import { Provider } from "react-redux";

import store from "./store";
import MainNavigator from "./MainNavigator";
import { setLocalNotification } from "./utils/helpers";

function UdaciStatusBar(props) {
  return (
    <View style={{ height: Constants.statusBarHeight }}>
      <StatusBar translucent props />
    </View>
  );
}

export default class App extends React.Component {
  componentDidMount() {
    // Push notifications are generated at a 8pm if the user hasn't completed at least one quiz for that day.
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
