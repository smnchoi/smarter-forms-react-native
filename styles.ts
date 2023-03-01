import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    marginTop: 30,
    marginBottom: 8,
    paddingHorizontal: 8,
    width: "100%",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 4,
  },

  error: {
    color: "red",
  },
});
