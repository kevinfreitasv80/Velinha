import { View, Text, StyleSheet } from "react-native";
import Candle from "@/components/Candle/Candle";

export default function Home() {
  return (
    <View>
      <Candle />
      <View>
        <Text>00</Text>
        <Text>:</Text>
        <Text>00</Text>
      </View>
    </View>
  );
}
