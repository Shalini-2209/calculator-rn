import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button } from "react-native";

const App = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operator, setOperator] = useState("");
  const [calculation, setCalculation] = useState("");
  const [history, setHistory] = useState("");

  const handlePress = (input) => {
    if (Number.isInteger(input)) {
      if (operator == "") {
        let temp = num1 == "" ? input : num1 * 10 + input;
        setNum1(temp);
      } else {
        let temp = num2 == "" ? input : num2 * 10 + input;
        setNum2(temp);
      }
    } else if (input == "C") {
      setNum1("");
      setNum2("");
      setOperator("");
      // setCalculation("");
      // setHistory("");
    } else if (input == "=") {
      setNum1(calculate());
      setNum2("");
      setOperator("");
    } else {
      if (num2 != "") {
        setNum1(calculate());
        setNum2("");
      }
      setOperator(input);
    }
  };

  const calculate = () => {
    let res = num1 + " " + operator + " " + num2;
    console.log(num1);
    let hist = history + "\n" + "------------------------" + "\n" + res;
    // console.log(hist);
    setHistory(hist);
    setCalculation(res);
    switch (operator) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return num1 / num2;
    }
  };

  let rows = [];
  const nums = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ["C", 0, "="],
  ];
  for (let i = 0; i < 4; i++) {
    let row = [];
    for (let j = 0; j < 3; j++) {
      row.push(
        <TouchableOpacity
          style={styles.btn}
          onPress={() => handlePress(nums[i][j])}
          key={nums[i][j]}
        >
          <Text style={styles.btnText}>{nums[i][j]}</Text>
        </TouchableOpacity>
      );
    }
    rows.push(
      <View style={styles.row} key={i}>
        {row}
      </View>
    );
  }

  const operations = ["+", "-", "*", "/"];
  let ops = [];
  for (let k = 0; k < 4; k++) {
    ops.push(
      <TouchableOpacity
        onPress={() => handlePress(operations[k])}
        style={styles.btn}
        key={operations[k]}
      >
        <Text style={styles.btnText}>{operations[k]}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="History" onPress={() => setCalculation(history)} />
      <Text style={styles.calculationText}>{calculation}</Text>

      <View style={styles.result}>
        <Text style={styles.resultText}>
          {num1} {operator} {num2}
        </Text>
      </View>
      <View style={styles.buttons}>
        <View style={styles.numbers}>{rows}</View>
        <View style={styles.operations}>{ops}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // calculation: {
  //   flex: 2,
  //   backgroundColor: "#e5e8e8",

  //   // justifyContent: 'center',
  //   // alignItems: 'flex-end',
  // },
  calculationText: {
    marginTop: 10,
    fontSize: 25,
    color: "black",
    backgroundColor: "#E5E4E2",
  },
  result: {
    // flex: 1,
    height: 100,
    backgroundColor: "#E5E4E2",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  resultText: {
    fontSize: 24,
    color: "black",
  },
  buttons: {
    flexGrow: 2,
    flexDirection: "row",
  },
  numbers: {
    flex: 3,
    backgroundColor: "#2c3e50",
  },
  operations: {
    flex: 1,
    backgroundColor: "#148f77",
    justifyContent: "space-around",
    alignItems: "stretch",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  btn: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  btnText: {
    color: "white",
    fontSize: 24,
    fontWeight: "400",
  },
});

export default App;
