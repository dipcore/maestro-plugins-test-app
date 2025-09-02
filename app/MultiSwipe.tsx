import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";

interface SwipeData {
  direction: string;
  distance: number;
  velocity: number;
  timestamp: string;
}

const MultiSwipe: React.FC = () => {
  const [swipes, setSwipes] = useState<SwipeData[]>([]);
  const [swipeCount, setSwipeCount] = useState(0);

  const handleSwipe = (event: any) => {
    const { translationX, translationY, velocityX, velocityY, state } =
      event.nativeEvent;

    if (state === State.END) {
      const distance = Math.sqrt(
        translationX * translationX + translationY * translationY
      );
      const velocity = Math.sqrt(velocityX * velocityX + velocityY * velocityY);

      // Determine swipe direction
      let direction = "";
      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? "Right" : "Left";
      } else {
        direction = translationY > 0 ? "Down" : "Up";
      }

      const swipeData: SwipeData = {
        direction,
        distance: Math.round(distance),
        velocity: Math.round(velocity),
        timestamp: new Date().toLocaleTimeString(),
      };

      setSwipes((prev) => [swipeData, ...prev.slice(0, 9)]); // Keep last 10 swipes
      setSwipeCount((prev) => prev + 1);
    }
  };

  const resetSwipes = () => {
    setSwipes([]);
    setSwipeCount(0);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler
        onGestureEvent={handleSwipe}
        onHandlerStateChange={handleSwipe}
      >
        <View style={styles.swipeArea}>
          <Text style={styles.title}>Multi Swipe Test</Text>

          <View style={styles.statsContainer}>
            <Text style={styles.statText}>Total Swipes: {swipeCount}</Text>
          </View>

          <View style={styles.swipeList}>
            <Text style={styles.listTitle}>Recent Swipes:</Text>
            {swipes.map((swipe, index) => (
              <Text key={index} style={styles.swipeItem}>
                {swipe.timestamp} - {swipe.direction} | Distance:{" "}
                {swipe.distance}px | Velocity: {swipe.velocity}
              </Text>
            ))}
            {swipes.length === 0 && (
              <Text style={styles.noSwipes}>
                No swipes detected yet. Swipe anywhere on the screen!
              </Text>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={resetSwipes}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swipeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f6fa",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  statsContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  statText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  swipeList: {
    flex: 1,
    width: "100%",
    maxWidth: 400,
    marginVertical: 20,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  swipeItem: {
    fontSize: 14,
    marginVertical: 2,
    padding: 8,
    backgroundColor: "#e8e8e8",
    borderRadius: 4,
  },
  noSwipes: {
    fontSize: 16,
    textAlign: "center",
    fontStyle: "italic",
    color: "#666",
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: "80%",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
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

export default MultiSwipe;
