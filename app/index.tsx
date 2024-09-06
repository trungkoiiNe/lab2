import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
// import { useNavigation } from '@react-navigation/native';

// ThemeToggle Component
const ThemeToggle = ({
  isDarkTheme,
  toggleTheme,
}: {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}) => (
  <View style={styles.themeToggle}>
    <Icon
      name={isDarkTheme ? "sun" : "moon"}
      size={30}
      color={isDarkTheme ? "white" : "black"}
      onPress={toggleTheme}
    />
  </View>
);

// Display Component
const Display = ({
  input,
  result,
  isDarkTheme,
}: {
  input: string;
  result: string;
  isDarkTheme: boolean;
}) => (
  <ScrollView style={styles.display}>
    <TextInput
      // ref={inputRef}
      style={[
        styles.inputText,
        {
          color: isDarkTheme ? "white" : "black",
          flex: 1,
          textAlignVertical: "top",
        },
      ]}
      value={input}
      editable={false}
      multiline={true}
    />
    <Text
      style={[styles.resultText, { color: isDarkTheme ? "white" : "black" }]}
    >
      {result}
    </Text>
  </ScrollView>
);

// CalculatorButtons Component
const CalculatorButtons = ({
  handleButtonPress,
}: {
  handleButtonPress: (value: string) => void;
}) => {
  const buttons = [
    "1",
    "2",
    "3",
    "+",
    "4",
    "5",
    "6",
    "-",
    "7",
    "8",
    "9",
    "*",
    "C",
    "0",
    "=",
    "/",
  ];
  return (
    <View style={styles.buttonContainer}>
      {buttons.map((button) => (
        <TouchableOpacity
          key={button}
          style={styles.button}
          onPress={() => handleButtonPress(button)}
        >
          <Text style={styles.buttonText}>{button}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// History Component
const History = ({
  history,
  isDarkTheme,
}: {
  history: string[];
  isDarkTheme: boolean;
}) => (
  <ScrollView style={styles.historyContainer}>
    {history.map((entry, index) => {
      const [expression, result] = entry.split(" = ");
      return (
        <View key={index} style={styles.historyRow}>
          <Text
            style={[
              styles.historyCell,
              { color: isDarkTheme ? "white" : "black" },
            ]}
          >
            {expression}
          </Text>
          <Text
            style={[
              styles.historyCell,
              { color: isDarkTheme ? "white" : "black" },
            ]}
          >
            {result}
          </Text>
        </View>
      );
    })}
  </ScrollView>
);

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const handleButtonPress = (value: string) => {
    const operators = ["+", "-", "*", "/"];
    if (value === "=") {
      calculateResult();
    } else if (value === "C") {
      setInput("");
      setResult("");
    } else {
      setInput((prevInput) => {
        const lastChar = prevInput.slice(-1);
        if (operators.includes(lastChar) && operators.includes(value)) {
          return prevInput.slice(0, -1) + value;
        }
        return prevInput + value;
      });
    }
  };

  const calculateResult = () => {
    try {
      const res = eval(input).toString();
      setResult(res);
      setHistory((prevHistory) => [...prevHistory, `${input} = ${res}`]);
    } catch (e) {
      setResult("Error");
    }
  };
  return (
    <View
      style={[
        styles.container,
        isDarkTheme ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemeToggle
          isDarkTheme={isDarkTheme}
          toggleTheme={() => setIsDarkTheme(!isDarkTheme)}
        />

      </View>
      <Display input={input} result={result} isDarkTheme={isDarkTheme} />
      <CalculatorButtons handleButtonPress={handleButtonPress} />
      <History history={history} isDarkTheme={isDarkTheme} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  lightContainer: {
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  themeToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  display: {
    flex: 1,
    backgroundColor: "gray",
  },
  inputText: {
    margin: 10,
    fontSize: 36,
  },
  resultText: {
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  button: {
    width: "22%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    marginVertical: 10,
    borderColor: "black",
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 24,
  },
  historyContainer: {
    flex: 1,
    marginTop: 20,
  },
  historyRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "black",
    paddingVertical: 5,
  },
  historyCell: {
    flex: 1,
    fontSize: 18,
    marginVertical: 2,
    textAlign: "center",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "black",
  },
  MinigameButton: {
    width: "22%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    marginVertical: 10,
    borderColor: "black",
    borderWidth: 2,
  },
  MinigameText: {
    fontSize: 24,
    color: "red",
  },
});
export default App;
