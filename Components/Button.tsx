import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/utils/Colors";

type ButtonProps = {
  title: string;
  type: "top" | "right" | "number";
  onPress: () => void;
};

const Button: React.FC<ButtonProps> = ({ title, type, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor:
            type === "top"
              ? Colors.btnDark
              : type === "right"
              ? Colors.btnRight
              : Colors.btnLight,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: type === "number" ? Colors.black : Colors.white }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 80,
    width: 80,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  text: {
    fontSize: 34,
    fontWeight: "bold",
  },
});
