import React, { useState } from "react";
import {
  GestureResponderEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface TapLog {
  id: number;
  type: "screen" | "button" | "absolute";
  coordinates?: { x: number; y: number };
  timestamp: string;
  timeSinceLast?: number;
}

const MultiTap: React.FC = () => {
  const [tapCount, setTapCount] = useState(0);
  const [lastTapTime, setLastTapTime] = useState<number | null>(null);
  const [timeBetweenTaps, setTimeBetweenTaps] = useState<number | null>(null);
  const [tapCoordinates, setTapCoordinates] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [tapLogs, setTapLogs] = useState<TapLog[]>([]);

  const logTap = (
    type: "screen" | "button" | "absolute",
    coordinates?: { x: number; y: number },
    timeDiff?: number
  ) => {
    const newLog: TapLog = {
      id: Date.now(),
      type,
      coordinates,
      timestamp: new Date().toLocaleTimeString(),
      timeSinceLast: timeDiff,
    };
    setTapLogs((prev) => [newLog, ...prev.slice(0, 19)]); // Keep last 20 logs
  };

  const handleScreenTap = (event: GestureResponderEvent) => {
    const currentTime = Date.now();
    let timeDiff: number | undefined;

    setTapCount((prev) => prev + 1);

    if (lastTapTime !== null) {
      timeDiff = currentTime - lastTapTime;
      setTimeBetweenTaps(timeDiff);
    }

    // Capture coordinates
    const { pageX, pageY } = event.nativeEvent;
    setTapCoordinates({ x: pageX, y: pageY });

    // Log the tap
    logTap("screen", { x: pageX, y: pageY }, timeDiff);

    setLastTapTime(currentTime);
  };

  const handleButtonTap = () => {
    const currentTime = Date.now();
    let timeDiff: number | undefined;

    setTapCount((prev) => prev + 1);

    if (lastTapTime !== null) {
      timeDiff = currentTime - lastTapTime;
      setTimeBetweenTaps(timeDiff);
    }

    // Log the tap
    logTap("button", undefined, timeDiff);

    setLastTapTime(currentTime);
  };

  const resetTaps = () => {
    setTapCount(0);
    setLastTapTime(null);
    setTimeBetweenTaps(null);
    setTapCoordinates(null);
    setTapLogs([]);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleScreenTap}>
        <View style={styles.container}>
          <Text style={styles.title}>Multi Tap Test</Text>

          <View style={styles.statsContainer}>
            <Text style={styles.statText}>Tap Count: {tapCount}</Text>
            {timeBetweenTaps !== null && (
              <Text style={styles.statText}>
                Time Between Taps: {timeBetweenTaps}ms
              </Text>
            )}
            {tapCoordinates && (
              <Text style={styles.statText}>
                Last Tap: x={Math.round(tapCoordinates.x)}, y=
                {Math.round(tapCoordinates.y)}
              </Text>
            )}
          </View>

          <View style={styles.logsContainer}>
            <Text style={styles.logsTitle}>Tap Log:</Text>
            <ScrollView
              style={styles.logsList}
              showsVerticalScrollIndicator={false}
            >
              {tapLogs.map((log) => (
                <Text key={log.id} style={styles.logItem}>
                  {log.timestamp} - {log.type.toUpperCase()}
                  {log.coordinates &&
                    ` (${Math.round(log.coordinates.x)}, ${Math.round(
                      log.coordinates.y
                    )})`}
                  {log.timeSinceLast && ` - ${log.timeSinceLast}ms`}
                </Text>
              ))}
              {tapLogs.length === 0 && (
                <Text style={styles.noLogs}>No taps yet. Start tapping!</Text>
              )}
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleButtonTap}>
          <Text style={styles.buttonText}>Tap Me!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetTaps}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  statsContainer: {
    marginVertical: 24,
    alignItems: "center",
  },
  statText: {
    fontSize: 18,
    marginVertical: 4,
  },
  logsContainer: {
    flex: 1,
    width: "100%",
    marginVertical: 20,
    maxHeight: 300,
  },
  logsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  logsList: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  logItem: {
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginVertical: 1,
    backgroundColor: "#f8f9fa",
    borderRadius: 4,
  },
  noLogs: {
    fontSize: 14,
    textAlign: "center",
    fontStyle: "italic",
    color: "#666",
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    gap: 16,
    width: "100%",
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
  absoluteButton: {
    position: "absolute",
    left: 200,
    top: 300,
    zIndex: 999,
    elevation: 10,
    backgroundColor: "#FF3B30",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default MultiTap;
