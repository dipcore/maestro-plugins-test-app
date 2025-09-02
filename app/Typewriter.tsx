import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
interface KeyLog {
  key: string;
  timestamp: string;
  action: "added" | "deleted";
}

const Typewriter: React.FC = () => {
  const [text, setText] = useState("");
  const [keyLogs, setKeyLogs] = useState<KeyLog[]>([]);
  const [previousText, setPreviousText] = useState("");

  const handleTextChange = (newText: string) => {
    const currentTime = new Date().toLocaleTimeString();

    // Determine what changed
    if (newText.length > previousText.length) {
      // Character was added
      const addedChar = newText.slice(previousText.length);
      setKeyLogs((prev) => [
        {
          key: addedChar || "space",
          timestamp: currentTime,
          action: "added",
        },
        ...prev.slice(0, 19),
      ]); // Keep last 20 entries
    } else if (newText.length < previousText.length) {
      // Character was deleted
      const deletedChar = previousText.slice(
        newText.length,
        newText.length + 1
      );
      setKeyLogs((prev) => [
        {
          key: deletedChar || "backspace",
          timestamp: currentTime,
          action: "deleted",
        },
        ...prev.slice(0, 19),
      ]);
    }

    setText(newText);
    setPreviousText(newText);
  };

  const clearAll = () => {
    setText("");
    setKeyLogs([]);
    setPreviousText("");
  };

  const clearLogs = () => {
    setKeyLogs([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Typewriter Test</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Type something:</Text>
        <TextInput
          testID="textInput"
          style={styles.textInput}
          value={text}
          onChangeText={handleTextChange}
          placeholder="Start typing..."
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statText}>Characters: {text.length}</Text>
        <Text style={styles.statText}>Key Events: {keyLogs.length}</Text>
      </View>

      <View style={styles.logsContainer}>
        <Text style={styles.logsTitle}>Key Input Log:</Text>
        <View style={styles.logsList}>
          {keyLogs.map((log, index) => (
            <Text
              key={index}
              style={[
                styles.logItem,
                log.action === "deleted" ? styles.deletedLog : styles.addedLog,
              ]}
            >
              {log.timestamp} - {log.action === "added" ? "+" : "-"}"{log.key}"
            </Text>
          ))}
          {keyLogs.length === 0 && (
            <Text style={styles.noLogs}>No key inputs yet. Start typing!</Text>
          )}
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={clearLogs}>
          <Text style={styles.buttonText}>Clear Logs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={clearAll}>
          <Text style={styles.buttonText}>Clear All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f6fa",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    minHeight: 100,
    textAlignVertical: "top",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
    padding: 10,
    backgroundColor: "#e8e8e8",
    borderRadius: 8,
  },
  statText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  logsContainer: {
    flex: 1,
    marginVertical: 20,
  },
  logsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  logsList: {
    flex: 1,
    maxHeight: 300,
  },
  logItem: {
    fontSize: 14,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginVertical: 1,
    borderRadius: 4,
  },
  addedLog: {
    backgroundColor: "#d4edda",
    color: "#155724",
  },
  deletedLog: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
  },
  noLogs: {
    fontSize: 16,
    textAlign: "center",
    fontStyle: "italic",
    color: "#666",
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    gap: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Typewriter;
