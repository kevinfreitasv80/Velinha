import { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

/* ─── individual animated flame layer ─── */
function FlameLayer({
  color,
  width,
  height,
  blurRadius,
  duration,
  phaseOffset = 0,
  children,
}: {
  color: string;
  width: number;
  height: number;
  blurRadius?: number;
  duration: number;
  phaseOffset?: number;
  children?: React.ReactNode;
}) {
  const scaleX = useRef(new Animated.Value(1)).current;
  const scaleY = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const flicker = (
      anim: Animated.Value,
      toValue: number,
      back: number,
      dur: number,
    ) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue,
            duration: dur,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: back,
            duration: dur * 0.8,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
      );

    // Start with a small delay so layers are out of phase
    const timeout = setTimeout(() => {
      flicker(scaleX, 0.88, 1.06, duration * 0.55).start();
      flicker(scaleY, 1.08, 0.94, duration * 0.6).start();
      flicker(
        translateY,
        -height * 0.07,
        height * 0.02,
        duration * 0.5,
      ).start();
      flicker(opacity, 0.82, 1, duration * 0.7).start();
    }, phaseOffset);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: 0,
        alignSelf: "center",
        width,
        height,
        borderRadius: width / 2,
        borderTopLeftRadius: width * 0.6,
        borderTopRightRadius: width * 0.6,
        backgroundColor: color,
        transform: [{ scaleX }, { scaleY }, { translateY }],
        opacity,
      }}
    >
      {children}
    </Animated.View>
  );
}

/* ─── floating ember dot ─── */
function Ember({
  startX,
  delay,
  size = 3,
}: {
  startX: number;
  delay: number;
  size?: number;
}) {
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(startX)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const run = () => {
      translateY.setValue(0);
      translateX.setValue(startX);
      opacity.setValue(0);
      scale.setValue(1);

      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -40,
            duration: 1200,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: startX + (Math.random() > 0.5 ? 6 : -6),
            duration: 1200,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 0.1,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(opacity, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ]).start(() => run());
    };

    run();
  }, []);

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: 8,
        left: "50%",
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: "#ffcc44",
        opacity,
        transform: [{ translateX }, { translateY }, { scale }],
      }}
    />
  );
}

/* ─── main component ─── */
export default function Fire() {
  return (
    <View
      style={{
        width: 36,
        height: 64,
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      {/* Outermost: deep red base */}
      <FlameLayer
        color="#cc1100"
        width={30}
        height={56}
        duration={850}
        phaseOffset={0}
      />

      {/* Mid: orange */}
      <FlameLayer
        color="#ff4400"
        width={22}
        height={46}
        duration={750}
        phaseOffset={120}
      />

      {/* Inner: bright orange-yellow */}
      <FlameLayer
        color="#ff8800"
        width={15}
        height={34}
        duration={680}
        phaseOffset={240}
      />

      {/* Core: yellow-white */}
      <FlameLayer
        color="#ffdd00"
        width={9}
        height={22}
        duration={600}
        phaseOffset={80}
      />

      {/* Hot center: near-white */}
      <View
        style={{
          position: "absolute",
          bottom: 3,
          alignSelf: "center",
          width: 5,
          height: 10,
          borderRadius: 3,
          backgroundColor: "#fffbe0",
        }}
      />

      {/* Floating embers */}
      <Ember startX={-4} delay={0} size={2.5} />
      <Ember startX={3} delay={400} size={2} />
      <Ember startX={0} delay={750} size={3} />
      <Ember startX={-6} delay={1100} size={2} />
    </View>
  );
}
