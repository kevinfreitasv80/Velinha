import "@/global.css";
import {
  useFonts,
  MontserratAlternates_700Bold,
} from "@expo-google-fonts/montserrat-alternates";

import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/Button";

import { Menu, CirclePlus, VolumeOff, Volume2, X } from "lucide-react-native";
import { useEffect, useState } from "react";

export default function Home() {
  const [fontsLoaded] = useFonts({
    MontserratAlternates_700Bold,
  });

  const [volume, setVolume] = useState(true);
  const [menu, setMenu] = useState(false);
  const iconSize = 50;

  return (
    <SafeAreaView className="grid grid-flow-col grid-cols-1 grid-rows-3 h-dvh">
      <View className="flex-row justify-between mx-7 mt-3">
        <View className="flex-row space-x-5">
          {!menu ? (
            <Menu
              size={iconSize}
              className="cursor-pointer"
              onPress={() => setMenu(!menu)}
            />
          ) : (
            <X
              size={iconSize}
              className="cursor-pointer"
              onPress={() => setMenu(!menu)}
            />
          )}

          <CirclePlus size={iconSize} className="cursor-pointer" />
        </View>
        {volume ? (
          <Volume2
            size={iconSize}
            onPress={() => setVolume(!volume)}
            className="cursor-pointer"
          />
        ) : (
          <VolumeOff
            size={iconSize}
            onPress={() => setVolume(!volume)}
            className="cursor-pointer"
          />
        )}
      </View>
      <View className="flex-col items-center justify-center">
        <CirclePlus color={"#aaa"} size={120} className="mb-3 cursor-pointer" />
        <Text
          className="text-xl"
          style={{ fontFamily: "MontserratAlternates_700Bold" }}
        >
          Adicione um Timer
        </Text>
      </View>
      {/* <View className="flex-row justify-center mt-10 space-x-10">
        <Button text="Começar" color="#0f0" textSize={20} />
        <Button text="Resetar" color="#f00" textSize={20} />
      </View> */}
    </SafeAreaView>
  );
}
