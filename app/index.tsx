import "@/global.css";
import {
  useFonts,
  MontserratAlternates_700Bold,
} from "@expo-google-fonts/montserrat-alternates";

import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "@/components/Button";
import Candle from "@/components/Candle";
import Timer from "@/components/Timer";
import Fire from "@/components/Fire";
import Confetti from "@/components/Conffeti";
import { useClickSound } from "@/hooks/UseSound";

import {
  CirclePlus,
  VolumeOff,
  Volume2,
  Moon,
  Sun,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react-native";

const STORAGE_THEME = "@timervela:theme";

export default function Home() {
  const [listCounters, setListCounters] = useState<number[]>([]);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);
  const [timerHasTime, setTimerHasTime] = useState(false);
  const [surprised, setSurprised] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0); // ← incrementar força remontagem

  // ── Tema persiste ──────────────────────────
  const [isDark, setIsDark] = useState(false);
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_THEME).then((saved) => {
      if (saved !== null) setIsDark(saved === "dark");
      setThemeLoaded(true);
    });
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    AsyncStorage.setItem(STORAGE_THEME, next ? "dark" : "light");
  }

  const [volume, setVolume] = useState(true);
  const { playClick } = useClickSound(volume);

  const [fontsLoaded] = useFonts({ MontserratAlternates_700Bold });

  const iconSize = 70;
  const iconColor = isDark ? "#fff" : "#000";

  // Só mostra fogo se estiver rodando E houver tempo definido
  const showFire = isTimeRunning && timerHasTime;

  function handleTimeEnd() {
    setIsTimeRunning(false);
    setShowConfetti(true);
    setConfettiKey((k) => k + 1); // ← força o Confetti a remontar
    setSurprised(true);
  }

  function handleReset() {
    playClick();
    setIsTimeRunning(false);
    setResetSignal((prev) => prev + 1);
    setShowConfetti(false);
    setTimerHasTime(false);
    setSurprised(false);
  }

  // Chamado quando o usuário confirma um novo tempo no seletor
  function handleTimeSelect() {
    setSurprised(false); // ← fecha a boca
    setShowConfetti(false); // ← esconde confetti
  }

  if (!themeLoaded || !fontsLoaded) return null;

  return (
    <View
      className="flex-1 flex-col"
      style={{ backgroundColor: isDark ? "#121212" : "#fff" }}
    >
      {/* ── Header ── */}
      <View className="flex-row justify-between mx-7 mt-10">
        <View className="flex-row justify-evenly w-full">
          {/* Botão de tema */}
          <TouchableOpacity
            onPress={() => {
              playClick();
              toggleTheme();
            }}
          >
            {isDark ? (
              <Moon size={iconSize} color="#fff" />
            ) : (
              <Sun size={iconSize} color="#000" />
            )}
          </TouchableOpacity>

          {/* Botão de volume */}
          <TouchableOpacity
            onPress={() => {
              playClick(); // toca antes de desligar
              setVolume((v) => !v);
            }}
          >
            {volume ? (
              <Volume2 size={iconSize} color={iconColor} />
            ) : (
              <VolumeOff size={iconSize} color={iconColor} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Conteúdo central ── */}
      <View className="flex-col items-center justify-center grow-[1]">
        {listCounters.length > 0 ? (
          <>
            <View className="space-y-2 items-center">
              {showFire && <Fire />}
              <Candle surprised={surprised} />
            </View>

            <Timer
              theme={isDark ? "dark" : "light"}
              isRunning={isTimeRunning}
              resetSignal={resetSignal}
              volume={volume}
              onTimeEnd={handleTimeEnd}
              onTimerTick={(secs) => setTimerHasTime(secs > 0)}
              onTimeSelect={handleTimeSelect}
            />

            <View className="flex-row justify-around mt-10 w-full">
              <Button
                text={isTimeRunning ? "Pausar" : "Começar"}
                background="#0f0"
                textSize={20}
                textColor="#fff"
                paddingX={20}
                paddingY={10}
                rounded={999}
                icon={isTimeRunning ? Pause : Play}
                onClickSound={playClick}
                func={() => {
                  if (!isTimeRunning && !timerHasTime) return;
                  setIsTimeRunning((prev) => !prev);
                }}
              />
              <Button
                text="Resetar"
                background="#f00"
                textSize={20}
                textColor="#fff"
                paddingX={20}
                paddingY={10}
                rounded={999}
                icon={RotateCcw}
                onClickSound={playClick}
                func={handleReset}
              />
            </View>
          </>
        ) : (
          // ✅ Fix texto "Adicione um Timer": color via style inline,
          //    evita conflito de className com NativeWind em certas versões
          <TouchableOpacity
            onPress={() => {
              playClick();
              setListCounters([1, 2, 3]);
            }}
            className="items-center"
          >
            <CirclePlus
              color="#aaa"
              size={120}
              className="mb-3 cursor-pointer"
            />
            <Text
              style={{
                fontFamily: "MontserratAlternates_700Bold",
                fontSize: 24,
                color: isDark ? "#ffffff" : "#000000",
              }}
            >
              Adicione um Timer
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ── Confetti ── */}
      <View className="absolute left-0 bottom-0 w-dvw h-dvh">
        {showConfetti && <Confetti key={confettiKey} />}
      </View>
    </View>
  );
}
