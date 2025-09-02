import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Index from "./Index";
import MultiSwipe from "./MultiSwipe";
import MultiTap from "./MultiTap";
import Typewriter from "./Typewriter";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnsafeRouting = any;

const { Navigator, Screen } = createStackNavigator<UnsafeRouting>();

const App = () => {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Navigator id="root">
            <Screen
              key={"Index"}
              name={"Index"}
              component={Index}
              options={{ headerShown: false }}
            />
            <Screen key={"MultiTap"} name={"MultiTap"} component={MultiTap} />
            <Screen
              key={"MultiSwipe"}
              name={"MultiSwipe"}
              component={MultiSwipe}
            />
            <Screen
              key={"Typewriter"}
              name={"Typewriter"}
              component={Typewriter}
            />
          </Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
};

export default App;
