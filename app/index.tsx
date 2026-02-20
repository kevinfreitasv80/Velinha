import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Candle from "@/components/Candle/Candle";
import { TimerPickerModal } from "react-native-timer-picker";
import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react-native";

export default function Home() {
  const [showPicker, setShowPicker] = useState(true);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function formatNumber(num: number) {
    return num.toString().padStart(2, "0");
  }

  function formatTime(seconds: number) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${formatNumber(hrs)}:${formatNumber(mins)}:${formatNumber(secs)}`;
  }

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  function handleStartStop() {
    if (remainingSeconds === 0) return;
    setIsRunning((prev) => !prev);
  }

  function handleReset() {
    setIsRunning(false);
    setRemainingSeconds(totalSeconds);
  }

  function handleNewTime() {
    setIsRunning(false);
    setShowPicker(true);
    setRemainingSeconds(totalSeconds);
  }

  return (
    <View style={styles.container}>
      <Candle size={remainingSeconds / totalSeconds} />

      <Text style={styles.timerText} onPress={handleNewTime}>
        {formatTime(remainingSeconds)}
      </Text>

      <TimerPickerModal
        closeOnOverlayPress
        modalTitle="Set Timer"
        onCancel={() => setShowPicker(false)}
        onConfirm={(pickedDuration) => {
          const total =
            (pickedDuration.hours || 0) * 3600 +
            (pickedDuration.minutes || 0) * 60 +
            (pickedDuration.seconds || 0);

          setTotalSeconds(total);
          setRemainingSeconds(total);
          setShowPicker(false);
        }}
        setIsVisible={setShowPicker}
        visible={showPicker}
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.buttonStartStop}
          onPress={handleStartStop}
        >
          {isRunning ? (
            <Pause color={"#fff"} style={{ marginRight: 10 }} />
          ) : (
            <Play color={"#fff"} style={{ marginRight: 10 }} />
          )}
          <Text style={styles.buttonText}>{isRunning ? "Stop" : "Start"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <RotateCcw style={{ marginRight: 10 }} color={"#fff"} />
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundImage: background,
  },

  timerText: {
    fontSize: 48,
    fontWeight: "bold",
    marginVertical: 20,
  },

  buttonsContainer: {
    flexDirection: "row",
    gap: 15,
  },

  buttonStartStop: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    boxShadow: "inset 0 0 .35em white",
  },

  resetButton: {
    backgroundColor: "#f44336",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    boxShadow: "inset 0 0 .35em white",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "center",
  },
});
