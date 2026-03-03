import { useRef } from "react";
import { View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

export default function Confetti() {
  const confettiRef = useRef<ConfettiCannon>(null);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ConfettiCannon
        ref={confettiRef}
        count={200}
        origin={{ x: 0, y: -10 }}
        autoStart={true}
        fadeOut={true}
      />
    </View>
  );
}
