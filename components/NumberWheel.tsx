import { useRef, useEffect } from "react";
import { View, Text, Pressable, PanResponder } from "react-native";

type NumberWheelProps = {
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
  max?: number;
};

export function NumberWheel({
  value,
  onChange,
  suffix,
  max = 59,
}: NumberWheelProps) {
  const prev = value === 0 ? max : value - 1;
  const next = value === max ? 0 : value + 1;

  const valueRef = useRef(value);
  const dragStartValue = useRef(value);
  const dragAccumulator = useRef(0);
  const isDragging = useRef(false);

  // Mantém valueRef sempre atualizado
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  function wrap(n: number) {
    return ((n % (max + 1)) + (max + 1)) % (max + 1);
  }

  function increment() {
    onChange(wrap(valueRef.current + 1));
  }

  function decrement() {
    onChange(wrap(valueRef.current - 1));
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        isDragging.current = true;
        dragAccumulator.current = 0;
        // Agora lê o valor atual pela ref, não pelo closure
        dragStartValue.current = valueRef.current;
      },

      onPanResponderMove: (_, gestureState) => {
        const STEP = 20;
        const totalSteps = Math.round(-gestureState.dy / STEP);
        const newValue = wrap(dragStartValue.current + totalSteps);

        if (newValue !== valueRef.current) {
          valueRef.current = newValue;
          onChange(newValue);
        }
      },

      onPanResponderRelease: () => {
        isDragging.current = false;
        dragAccumulator.current = 0;
      },

      onPanResponderTerminate: () => {
        isDragging.current = false;
        dragAccumulator.current = 0;
      },
    }),
  ).current;

  return (
    <View
      className="h-28 justify-center items-center overflow-hidden"
      // @ts-ignore
      onWheel={(e) => {
        e.preventDefault();
        const newValue = wrap(valueRef.current + (e.deltaY < 0 ? 1 : -1));
        valueRef.current = newValue;
        onChange(newValue);
      }}
    >
      <Pressable onPress={decrement}>
        <Text className="text-4xl text-gray-400 opacity-40">
          {String(prev).padStart(2, "0")}
        </Text>
      </Pressable>

      <View {...panResponder.panHandlers}>
        <View className="flex-row items-end">
          <Text className="text-5xl font-bold text-black">
            {String(value).padStart(2, "0")}
          </Text>
          {suffix && <Text className="text-2xl ml-1 text-black">{suffix}</Text>}
        </View>
      </View>

      <Pressable onPress={increment}>
        <Text className="text-4xl text-gray-400 opacity-40">
          {String(next).padStart(2, "0")}
        </Text>
      </Pressable>
    </View>
  );
}
