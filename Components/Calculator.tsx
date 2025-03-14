import { StyleSheet, Text, View } from "react-native";
import React, { useReducer } from "react";
import { Colors } from "@/utils/Colors";
import Button from "./Button";

const initialState = {
  displayValue: "0",
  firstValue: "",
  operator: "",
  waitingForSecondOperand: false,
};

const calculatorReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_NUMBER":
      if (state.displayValue === "0" || state.waitingForSecondOperand) {
        return { ...state, displayValue: action.payload, waitingForSecondOperand: false };
      }
      return { ...state, displayValue: state.displayValue + action.payload };

    case "INPUT_OPERATOR":
      if (state.operator && !state.waitingForSecondOperand) {
        return {
          ...state,
          displayValue: String(eval(`${state.firstValue} ${state.operator} ${state.displayValue}`)),
          firstValue: state.displayValue,
          operator: action.payload,
          waitingForSecondOperand: true,
        };
      }
      return { ...state, firstValue: state.displayValue, operator: action.payload, waitingForSecondOperand: true };

    case "CALCULATE":
      if (!state.operator || state.waitingForSecondOperand) return state;
      return {
        ...state,
        displayValue: String(eval(`${state.firstValue} ${state.operator} ${state.displayValue}`)),
        firstValue: "",
        operator: "",
        waitingForSecondOperand: false,
      };

    case "CLEAR":
      return initialState;

    case "DELETE":
      return { ...state, displayValue: state.displayValue.length > 1 ? state.displayValue.slice(0, -1) : "0" };

    default:
      return state;
  }
};

const Calculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.equation}>{state.firstValue} {state.operator}</Text>
        <Text style={styles.result}>{state.displayValue}</Text>
      </View>
      <View style={styles.keypad}>
        {["C", "⌫", "%", "÷", "7", "8", "9", "x", "4", "5", "6", "-", "1", "2", "3", "+", "0", "00", ".", "="]
          .map((btn) => (
            <Button
              key={btn}
              title={btn}
              type={"number"}
              onPress={() => {
                if (btn === "C") dispatch({ type: "CLEAR" });
                else if (btn === "⌫") dispatch({ type: "DELETE" });
                else if (btn === "=") dispatch({ type: "CALCULATE" });
                else if (["+", "-", "x", "÷", "%"].includes(btn)) dispatch({ type: "INPUT_OPERATOR", payload: btn.replace("x", "*").replace("÷", "/") });
                else dispatch({ type: "INPUT_NUMBER", payload: btn });
              }}
            />
          ))}
      </View>
    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  container: { flex: 1 },
  display: {
    flex: 1,
    backgroundColor: Colors.gray,
    padding: 20,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  equation: { fontSize: 30, fontWeight: "300" },
  result: { fontSize: 70, fontWeight: "300" },
  keypad: {
    flex: 2,
    backgroundColor: Colors.light,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 30,
  },
});
