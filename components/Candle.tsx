import { View } from "react-native";
import { useEffect, useState } from "react";

type CandleProps = {
  /** Quando true, a vela abre a boca (surpresa) */
  surprised?: boolean;
};

export default function Candle({ surprised = false }: CandleProps) {
  const [action, setAction] = useState(true);
  const [isBlink, setIsBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleBlinking();
      setAction((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  function handleBlinking() {
    setIsBlink(true);
    const timeout = setTimeout(() => {
      setIsBlink(false);
      clearTimeout(timeout);
    }, 250);
  }

  return (
    <View>
      <View className="border-black border-[5px] w-[6em] h-[12em] rounded-xl relative bg-white">
        {/* Olho esquerdo */}
        <View className="border-black border-[5px] w-[4.5em] h-[4.5em] rounded-full absolute -left-[1.5em] top-[1em] bg-white overflow-hidden">
          <View
            className="w-full bg-gray-900 absolute z-10"
            style={{ height: isBlink ? 70 : 0 }}
          />
          <View className="w-[2.3em] h-[2.3em] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300">
            <View className="w-[.6em] h-[.6em] rounded-full bg-white absolute right-1 top-2" />
            <View className="w-[.3em] h-[.3em] rounded-full bg-white absolute left-1 bottom-2" />
          </View>
        </View>

        {/* Olho direito */}
        <View className="border-black border-[5px] w-[4.5em] h-[4.5em] rounded-full absolute -right-[1.5em] top-[1em] bg-white overflow-hidden">
          <View
            className="w-full bg-gray-900 absolute z-10"
            style={{ height: isBlink ? 70 : 0 }}
          />
          <View className="w-[2.3em] h-[2.3em] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300">
            <View className="w-[.6em] h-[.6em] rounded-full bg-white absolute left-1 top-2" />
            <View className="w-[.3em] h-[.3em] rounded-full bg-white absolute right-1 bottom-2" />
          </View>
        </View>

        {/* Boca — normal: linha horizontal | surpresa: círculo aberto */}
        {surprised ? (
          // Boca aberta (O) — surpresa
          <View
            className="absolute bottom-[1.2em] left-1/2 -translate-x-1/2 rounded-full border-black border-[4px]"
            style={{
              width: 32,
              height: 32,
              backgroundColor: "#111",
            }}
          />
        ) : (
          // Boca normal — traço
          <View className="bg-black w-[3em] h-1 rounded-full absolute bottom-1/4 left-1/2 -translate-x-1/2" />
        )}
      </View>
    </View>
  );
}
