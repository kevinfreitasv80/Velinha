import { useEffect, useRef, useState } from "react";
import { styles } from "./styles";
import { View, Animated, Easing } from "react-native";

type CandleProps = {
  size: number;
};

export default function Candle({ size }: CandleProps) {
  const [blink, setBlink] = useState(false);

  // 🔥 animação da chama
  const flicker = useRef(new Animated.Value(0)).current;

  // 🔥 LOOP DA CHAMA (mais natural)
  useEffect(() => {
    const animate = () => {
      Animated.timing(flicker, {
        toValue: Math.random(),
        duration: 80 + Math.random() * 150,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(animate);
    };

    animate();
  }, []);

  // 👀 BLINK automático a cada 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);

      setTimeout(() => {
        setBlink(false);
      }, 250);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 🔥 interpolação da chama
  const rotate = flicker.interpolate({
    inputRange: [0, 1],
    outputRange: ["-3deg", "3deg"],
  });

  const scaleY = flicker.interpolate({
    inputRange: [0, 1],
    outputRange: [0.92, 1.08],
  });

  return (
    <View style={[styles.body, { height: size * 70 }]}>
      <View style={styles.top}>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ rotate }, { scaleY }],
            },
          ]}
        >
          <View style={[styles.red, styles.flame]} />
          <View style={[styles.orange, styles.flame]} />
          <View style={[styles.yellow, styles.flame]} />
          <View style={[styles.white, styles.flame]} />
        </Animated.View>
      </View>

      <View style={styles.eyes}>
        <View style={[styles.eye, styles.L]}>
          <View style={[styles.eyelid, { height: blink ? "100%" : "0%" }]} />
          <View style={styles.pupil} />
        </View>

        <View style={[styles.eye, styles.R]}>
          <View style={[styles.eyelid, { height: blink ? "100%" : "0%" }]} />
          <View style={styles.pupil} />
        </View>
      </View>
    </View>
  );
}
