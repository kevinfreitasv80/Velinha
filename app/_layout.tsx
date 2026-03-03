import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function Layoult() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </SafeAreaProvider>
  );
}
