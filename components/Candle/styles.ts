import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    top: 20, // substitui 1.25em
    left: -14, // substitui -0.9em
  },

  flame: {
    position: "absolute",
    bottom: 0,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    transform: [{ rotate: "-45deg" }, { scaleX: 0.5 }, { scaleY: 0.5 }],
  },

  yellow: {
    bottom: 5,
    left: 14,
    width: 32,
    height: 32,
    backgroundColor: "gold",
    shadowColor: "gold",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 9,
    elevation: 10,
  },

  orange: {
    left: 10,
    bottom: 3,
    width: 40,
    height: 40,
    backgroundColor: "orange",
    shadowColor: "orange",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 9,
    elevation: 10,
  },

  red: {
    left: 5,
    width: 50,
    height: 50,
    backgroundColor: "orangered",
    shadowColor: "orangered",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 8,
  },

  white: {
    left: 14,
    bottom: 5,
    width: 32,
    height: 32,
    backgroundColor: "white",
    shadowColor: "white",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 9,
    elevation: 10,
  },

  body: {
    backgroundColor: "#e2e3df",
    width: 32,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    position: "relative",
  },

  top: {
    position: "absolute",
    top: -8,
    backgroundColor: "#8c8c8a",
    width: "100%",
    height: 16,
    borderRadius: 999,
  },

  eyes: {
    flexDirection: "row",
  },

  eye: {
    position: "absolute",
    top: "20%",
    backgroundColor: "#fff",
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 999,
    overflow: "hidden",
  },

  L: {
    left: -16,
  },

  R: {
    right: -16,
  },

  eyelid: {
    position: "relative",
    backgroundColor: "#aaa",
    width: "100%",
    zIndex: 3,
  },

  pupil: {
    position: "absolute",
    zIndex: 2,
    width: 16,
    height: 16,
    backgroundColor: "#0bf",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -8 }, { translateY: -8 }],
    borderRadius: 999,
  },
});
