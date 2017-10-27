import { StyleSheet } from "react-native";

import { gray, white } from "../utils/colors";

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 20
  },
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

export default styles;
