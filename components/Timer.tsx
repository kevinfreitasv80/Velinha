import { View, Text, TouchableOpacity, AppState, Platform } from "react-native";
import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Audio } from "expo-av";

import Button from "./Button";
import { NumberWheel } from "./NumberWheel";
import { TimerIcon } from "lucide-react-native";

// ─────────────────────────────────────────────
// 🔊 CAMINHOS DOS SONS — edite apenas aqui
// ─────────────────────────────────────────────
import SOUND_TIMER_END from "@/assets/sounds/timer-end.wav";
import SOUND_TICK from "@/assets/sounds/tick.wav";
// nome dos arquivos usados no app.json (para notificações)
const SOUND_TIMER_END_FILENAME = "timer-end.wav";
const SOUND_TICK_FILENAME = "tick.wav"; // usado só em foreground
// ─────────────────────────────────────────────

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function setupNotifications() {
  if (!Device.isDevice) return;

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") return;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("timer-end", {
      name: "Fim do Cronômetro",
      importance: Notifications.AndroidImportance.HIGH,
      sound: SOUND_TIMER_END_FILENAME,
      vibrationPattern: [0, 300, 200, 300],
    });
  }
}

async function scheduleEndNotification(
  secondsFromNow: number,
): Promise<string | null> {
  if (!Device.isDevice || secondsFromNow <= 0) return null;

  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Cadê meu fogo?",
        body: "Tempo esgotado!",
        sound: SOUND_TIMER_END_FILENAME,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: secondsFromNow,
        channelId: "timer-end",
      },
    });
    return id;
  } catch {
    return null;
  }
}

async function cancelNotification(id: string | null) {
  if (id) await Notifications.cancelScheduledNotificationAsync(id);
}

// ─────────────────────────────────────────────

type TimerProps = {
  theme: string;
  isRunning: boolean;
  resetSignal: number;
  onTimeEnd?: () => void;
  onFinish?: () => void;
  /** Volume ligado/desligado vindo do pai */
  volume: boolean;
  /** Chamado a cada segundo com os segundos restantes — usado para controlar o fogo */
  onTimerTick?: (secondsLeft: number) => void;
  /** Chamado quando o usuário confirma um novo tempo — reseta estados visuais no pai */
  onTimeSelect?: () => void;
};

const HOUR2SECONDS = 3600;
const MINUTE2SECONDS = 60;

export default function Timer({
  theme,
  isRunning,
  resetSignal,
  onTimeEnd,
  onFinish,
  volume,
  onTimerTick,
  onTimeSelect,
}: TimerProps) {
  const [selecting, setSelecting] = useState(false);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [initialSeconds, setInitialSeconds] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [time, setTime] = useState("00:00:00");

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const notifIdRef = useRef<string | null>(null);
  const appStateRef = useRef(AppState.currentState);
  const endSoundRef = useRef<Audio.Sound | null>(null);
  const tickSoundRef = useRef<Audio.Sound | null>(null);
  const hasEndedRef = useRef(false);

  // Setup de permissões uma vez
  useEffect(() => {
    setupNotifications();

    const sub = AppState.addEventListener("change", (next) => {
      appStateRef.current = next;
    });
    return () => sub.remove();
  }, []);

  // Pré-carrega os sons
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

        const { sound: endSound } = await Audio.Sound.createAsync(
          SOUND_TIMER_END,
          {
            shouldPlay: false,
          },
        );
        const { sound: tickSound } = await Audio.Sound.createAsync(SOUND_TICK, {
          shouldPlay: false,
        });

        if (mounted) {
          endSoundRef.current = endSound;
          tickSoundRef.current = tickSound;
        }
      } catch {
        // Arquivos de som ainda não existem — sem problema
      }
    })();

    return () => {
      mounted = false;
      endSoundRef.current?.unloadAsync();
      tickSoundRef.current?.unloadAsync();
    };
  }, []);

  function formatTime(total: number) {
    const h = Math.floor(total / HOUR2SECONDS)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((total % HOUR2SECONDS) / MINUTE2SECONDS)
      .toString()
      .padStart(2, "0");
    const s = (total % MINUTE2SECONDS).toString().padStart(2, "0");
    setTime(`${h}:${m}:${s}`);
  }

  function defineTime() {
    const total = hours * HOUR2SECONDS + minutes * MINUTE2SECONDS + seconds;
    setInitialSeconds(total);
    setCurrentSeconds(total);
    formatTime(total);
    hasEndedRef.current = false;
    onTimerTick?.(total);
    onTimeSelect?.(); // ← avisa o pai que um novo tempo foi escolhido
  }

  // ─── Tick sound por segundo ───
  async function playTick() {
    if (!volume) return;
    try {
      await tickSoundRef.current?.replayAsync();
    } catch {}
  }

  // ─── Som de fim em foreground ───
  async function playEnd() {
    if (!volume) return;
    try {
      await endSoundRef.current?.replayAsync();
    } catch {}
  }

  // ─── Controle principal ───
  useEffect(() => {
    if (isRunning && currentSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentSeconds((prev) => {
          const next = prev - 1;
          onTimerTick?.(next);
          return next;
        });
        playTick();
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (isRunning && currentSeconds === 0 && !hasEndedRef.current) {
        hasEndedRef.current = true;
        // App em foreground → toca som diretamente
        if (appStateRef.current === "active") {
          playEnd();
        }
        onTimeEnd?.();
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, currentSeconds]);

  // ─── Agenda/cancela notificação quando inicia/para ───
  useEffect(() => {
    if (isRunning && currentSeconds > 0) {
      scheduleEndNotification(currentSeconds).then((id) => {
        notifIdRef.current = id;
      });
    } else {
      cancelNotification(notifIdRef.current);
      notifIdRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  // ─── Atualiza display ───
  useEffect(() => {
    formatTime(currentSeconds);
    if (currentSeconds <= 0 && isRunning) onFinish?.();
  }, [currentSeconds]);

  // ─── Reset externo ───
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    cancelNotification(notifIdRef.current);
    notifIdRef.current = null;
    hasEndedRef.current = false;
    setCurrentSeconds(initialSeconds);
    formatTime(initialSeconds);
    onTimerTick?.(initialSeconds);
  }, [resetSignal]);

  const isDark = theme === "dark";

  return (
    <>
      {selecting ? (
        <View className="absolute flex-1 z-10">
          <View className="bg-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-2xl border-2 border-gray-500">
            <Text
              className="text-center text-2xl"
              style={{ fontFamily: "MontserratAlternates_700Bold" }}
            >
              Alterar Tempo
            </Text>

            <View className="flex-row gap-6 justify-center my-5">
              <NumberWheel
                value={hours}
                onChange={setHours}
                suffix="h"
                max={23}
              />
              <NumberWheel value={minutes} onChange={setMinutes} suffix="m" />
              <NumberWheel value={seconds} onChange={setSeconds} suffix="s" />
            </View>

            <View className="flex-row space-x-5">
              <Button
                borderColor="#777"
                borderSize={5}
                rounded={999}
                paddingX={30}
                paddingY={8}
                textSize={16}
                textColor="#777"
                text="Cancelar"
                func={() => setSelecting(false)}
              />
              <Button
                borderColor="#0f0"
                borderSize={5}
                rounded={999}
                paddingX={30}
                paddingY={8}
                textSize={16}
                textColor="#0f0"
                text="Confirmar"
                func={() => {
                  defineTime();
                  setSelecting(false);
                }}
              />
            </View>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => setSelecting(true)}
          className="flex-row justify-center items-center mt-5"
        >
          <TimerIcon
            size={60}
            className="mr-5"
            color={isDark ? "#fff" : "#000"}
          />
          <Text
            className="text-6xl"
            style={{
              fontFamily: "MontserratAlternates_700Bold",
              color: isDark ? "#fff" : "#000",
            }}
          >
            {time}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
}
